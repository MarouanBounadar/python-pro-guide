import os
import sys
import socket
import threading
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

def start_server(port, base_dir):
    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=base_dir, **kwargs)
        def log_message(self, format, *args):
            pass

    with socketserver.TCPServer(('127.0.0.1', port), QuietHandler) as httpd:
        httpd.serve_forever()

def main():
    base_dir = get_base_dir()
    port = get_free_port()
    
    # Start local HTTP server thread
    server_thread = threading.Thread(target=start_server, args=(port, base_dir), daemon=True)
    server_thread.start()
    
    url = f"http://127.0.0.1:{port}/index.html"
    title = "Python Pro Guide - SMI / IA S1 (Université Ibn Tofail)"

    # Try native webview first
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
    except Exception as e:
        # Fallback to browser
        webbrowser.open(url)
        # Keep alive
        import time
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            pass

if __name__ == '__main__':
    main()
