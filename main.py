import os
import sys
import json
import io
import contextlib
import traceback
import threading
import socket
import http.server
import socketserver
import webbrowser

def get_base_dir():
    if getattr(sys, 'frozen', False):
        return getattr(sys, '_MEIPASS', os.path.dirname(sys.executable))
    return os.path.dirname(os.path.abspath(__file__))

def get_free_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('127.0.0.1', 0))
    port = s.getsockname()[1]
    s.close()
    return port

def run_user_code(code_str, timeout=4.0):
    res = {"output": "", "error": "", "timed_out": False}
    def worker():
        buf_out = io.StringIO()
        buf_err = io.StringIO()
        safe_globals = {
            '__name__': '__main__',
            '__builtins__': __builtins__
        }
        try:
            with contextlib.redirect_stdout(buf_out), contextlib.redirect_stderr(buf_err):
                exec(code_str, safe_globals)
            res["output"] = buf_out.getvalue()
            res["error"] = buf_err.getvalue()
        except Exception:
            res["error"] = traceback.format_exc()
    
    t = threading.Thread(target=worker, daemon=True)
    t.start()
    t.join(timeout=timeout)
    if t.is_alive():
        res["timed_out"] = True
        res["error"] = "Erreur: Le programme a dÃ©passÃ© le temps limite de 4 secondes (boucle infinie possible)."
    return res

def start_server(port, base_dir):
    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=base_dir, **kwargs)
            
        def log_message(self, format, *args):
            pass

        def do_POST(self):
            if self.path == '/api/run_code':
                content_length = int(self.headers.get('Content-Length', 0))
                post_data = self.rfile.read(content_length)
                try:
                    payload = json.loads(post_data.decode('utf-8'))
                    code = payload.get('code', '')
                    result = run_user_code(code)
                    response_bytes = json.dumps(result).encode('utf-8')
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Content-Length', str(len(response_bytes)))
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(response_bytes)
                except Exception as e:
                    err_resp = json.dumps({"output": "", "error": str(e)}).encode('utf-8')
                    self.send_response(500)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Content-Length', str(len(err_resp)))
                    self.end_headers()
                    self.wfile.write(err_resp)
            else:
                self.send_response(404)
                self.end_headers()

        def do_OPTIONS(self):
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

    with socketserver.TCPServer(('127.0.0.1', port), QuietHandler) as httpd:
        httpd.serve_forever()

def main():
    base_dir = get_base_dir()
    port = get_free_port()
    
    # DÃ©marrage du serveur HTTP local
    server_thread = threading.Thread(target=start_server, args=(port, base_dir), daemon=True)
    server_thread.start()
    
    url = f"http://127.0.0.1:{port}/index.html"
    title = "Python Pro Guide - SMI / IA S1 (UniversitÃ© Ibn Tofail)"

    # FenÃªtre desktop native via webview
    try:
        import webview
        webview.create_window(
            title=title,
            url=url,
            width=1280,
            height=850,
            min_size=(960, 600),
            text_select=True,
            confirm_close=False
        )
        webview.start()
    except Exception:
        # Fallback au navigateur web par dÃ©faut
        webbrowser.open(url)
        import time
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            pass

if __name__ == '__main__':
    main()
