// Application Universitaire - Programmation Python 1
// SMI / IA S1 • Faculté des Sciences Kénitra (UIT)

let currentView = "courses";
let currentChapterId = "ch1";
let currentExerciseChapter = "ch1";
let activeExam = null;
let examAnswers = {};
let examTimer = null;
let examSeconds = 30 * 60;
let flashcardIndex = 0;

// Progress Tracking System (Persistance LocalStorage)
let userProgress = JSON.parse(localStorage.getItem("py_progress_v2") || JSON.stringify({
  readChapters: ["ch1"],
  completedLabs: [],
  doneExercises: [],
  passedExams: {},
  passedQuizzes: []
}));
if (!userProgress.completedLabs) userProgress.completedLabs = [];

function saveProgress() {
  localStorage.setItem("py_progress_v2", JSON.stringify(userProgress));
  updateProgressBar();
}

function calculateProgress() {
  const totalChapters = DETAILED_COURSES.length; // 6
  let totalExos = 0;
  Object.keys(CHAPTER_EXERCISES).forEach(k => totalExos += CHAPTER_EXERCISES[k].length); // 24
  const totalExams = EXAM_SUBJECTS.length; // 2
  const totalLabs = DETAILED_COURSES.length; // 6 DataCamp Labs
  const totalItems = totalChapters + totalExos + totalExams + totalLabs;

  const doneChapters = userProgress.readChapters.length;
  const doneExos = userProgress.doneExercises.length;
  const doneExams = Object.keys(userProgress.passedExams).length;
  const doneLabs = userProgress.completedLabs.length;
  const totalDone = doneChapters + doneExos + doneExams + doneLabs;

  return Math.min(100, Math.round((totalDone / totalItems) * 100));
}

function updateProgressBar() {
  const pct = calculateProgress();
  const bar = document.getElementById("globalProgressBar");
  const text = document.getElementById("globalProgressText");
  const subtext = document.getElementById("globalProgressSub");
  
  if (bar) bar.style.width = `${pct}%`;
  if (text) text.innerText = `${pct}%`;
  if (subtext) {
    let totalExos = 0;
    Object.keys(CHAPTER_EXERCISES).forEach(k => totalExos += CHAPTER_EXERCISES[k].length);
    subtext.innerText = `${userProgress.readChapters.length}/6 Cours • ${userProgress.completedLabs.length}/6 Labs Pratiques • ${userProgress.doneExercises.length}/${totalExos} Exos • ${Object.keys(userProgress.passedExams).length}/${EXAM_SUBJECTS.length} Examens`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  setupNavigation();
  updateProgressBar();
  showView("courses");
  lucide.createIcons();
}

function setupNavigation() {
  document.querySelectorAll("[data-nav]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const target = el.getAttribute("data-nav");
      showView(target);
    });
  });
}

function showView(viewId, param = null) {
  currentView = viewId;
  const main = document.getElementById("mainContent");

  document.querySelectorAll(".nav-btn").forEach(b => {
    b.classList.remove("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-600/30");
    b.classList.add("text-slate-400");
    if (b.getAttribute("data-nav") === viewId) {
      b.classList.add("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-600/30");
      b.classList.remove("text-slate-400");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (viewId === "courses") {
    currentChapterId = param || currentChapterId || "ch1";
    main.innerHTML = renderCoursesView(currentChapterId);
  } else if (viewId === "exercises") {
    currentExerciseChapter = param || currentExerciseChapter || "ch1";
    main.innerHTML = renderExercisesView(currentExerciseChapter);
  } else if (viewId === "exams") {
    main.innerHTML = renderExamsView();
  } else if (viewId === "quiz") {
    main.innerHTML = renderQuizView();
  } else if (viewId === "flashcards") {
    main.innerHTML = renderFlashcardsView();
  }

  lucide.createIcons();
}

// ----------------- 1. COURS DÉTAILLÉS & ATELIERS DATACAMP -----------------
function renderCoursesView(chapterId) {
  const ch = DETAILED_COURSES.find(c => c.id === chapterId) || DETAILED_COURSES[0];
  const isRead = userProgress.readChapters.includes(ch.id);
  const isLabDone = userProgress.completedLabs.includes(ch.id);

  return `
    <div class="space-y-8 animate-fade max-w-5xl mx-auto">
      <!-- Chapter Selector Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        ${DETAILED_COURSES.map(c => `
          <button onclick="showView('courses', '${c.id}')" 
                  class="px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${c.id === ch.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'}">
            <span>Ch ${c.num}</span>
            <span class="hidden md:inline">${c.title.split('&')[0]}</span>
            ${userProgress.readChapters.includes(c.id) ? '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>' : ''}
          </button>
        `).join("")}
      </div>

      <!-- Chapter Header Card -->
      <div class="figma-card p-6 md:p-8 rounded-3xl border-indigo-500/20">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div class="flex items-center gap-2">
            <span class="badge-tech">Chapitre ${ch.num}</span>
            <span class="text-xs text-slate-500 font-mono flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${ch.readTime}</span>
          </div>
          <button onclick="toggleChapterRead('${ch.id}')" 
                  class="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${isRead ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}">
            <i data-lucide="${isRead ? 'check-circle' : 'circle'}" class="w-4 h-4"></i>
            ${isRead ? 'Chapitre Marqué comme Compris ✅' : 'Marquer comme Lu et Compris'}
          </button>
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">${ch.title}</h1>
      </div>

      <!-- Core Course Sections -->
      <div class="space-y-6">
        ${ch.sections.map(sec => `
          <div class="figma-card p-6 md:p-8 rounded-3xl space-y-4">
            <h3 class="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <i data-lucide="book-open" class="w-4 h-4 text-indigo-400"></i> ${sec.heading}
            </h3>
            <div class="text-slate-200 text-xs md:text-sm leading-relaxed">
              ${sec.content}
            </div>
          </div>
        `).join("")}
      </div>

      <!-- DATACAMP INTERACTIVE HANDS-ON LAB -->
      ${ch.datacamp ? `
      <div class="figma-card p-6 md:p-8 rounded-3xl border-emerald-500/30 bg-gradient-to-b from-[#0c1424] to-[#070b14] space-y-6 shadow-2xl relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black shadow-lg shadow-emerald-500/10">
              <i data-lucide="terminal" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] uppercase tracking-wider font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Laboratoire Pratique Interactif
                </span>
                ${isLabDone ? '<span class="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1"><i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Validé (+50 XP)</span>' : ''}
              </div>
              <h3 class="text-base md:text-lg font-bold text-white mt-1">${ch.datacamp.title}</h3>
            </div>
          </div>
          
          <!-- Action Tools -->
          <div class="flex items-center gap-2">
            <button onclick="toggleDatacampHint('${ch.id}')" class="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs font-semibold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition">
              <i data-lucide="lightbulb" class="w-3.5 h-3.5"></i> Indice
            </button>
            <button onclick="toggleDatacampSolution('${ch.id}')" class="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs font-semibold text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition">
              <i data-lucide="code" class="w-3.5 h-3.5"></i> Solution
            </button>
            <button onclick="resetDatacampCode('${ch.id}')" class="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 flex items-center gap-1.5 transition" title="Réinitialiser le code">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <!-- Consigne & Objectif -->
        <div class="p-4 md:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs md:text-sm text-slate-300 leading-relaxed">
          <div class="flex items-center gap-2 font-bold text-emerald-400 mb-2">
            <i data-lucide="target" class="w-4 h-4"></i> Instructions / Mission :
          </div>
          <div class="space-y-1.5 text-slate-300">${ch.datacamp.consigne}</div>
        </div>

        <!-- Indice Drawer -->
        <div id="dc-hint-${ch.id}" class="hidden p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
          <div class="font-bold flex items-center gap-1.5 text-amber-300 mb-1">
            <i data-lucide="help-circle" class="w-4 h-4"></i> Indice Pédagogique :
          </div>
          <div>${ch.datacamp.hint}</div>
        </div>

        <!-- Solution Drawer -->
        <div id="dc-solution-${ch.id}" class="hidden p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
          <div class="font-bold flex items-center gap-1.5 text-cyan-300 mb-2">
            <i data-lucide="check-check" class="w-4 h-4"></i> Solution Officielle :
          </div>
          <pre class="font-mono bg-[#05070e] p-3 rounded-xl border border-cyan-500/20 text-cyan-300 text-xs overflow-x-auto whitespace-pre">${ch.datacamp.solution}</pre>
        </div>

        <!-- Editor & Terminal Split Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <!-- Left: Code Editor -->
          <div class="space-y-2 flex flex-col">
            <div class="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span class="flex items-center gap-1.5 text-slate-300 font-semibold">
                <i data-lucide="file-code" class="w-3.5 h-3.5 text-emerald-400"></i> main.py (Éditeur)
              </span>
              <span class="text-[11px] text-slate-500 font-mono">Python 3.12</span>
            </div>
            
            <div class="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#060a13] focus-within:border-emerald-500/60 transition flex-1 flex flex-col">
              <div class="bg-slate-900/60 border-b border-slate-800 px-3 py-1.5 flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span class="text-[10px] text-slate-500 font-mono ml-2">script interactif</span>
              </div>
              <textarea id="dc-editor-${ch.id}" rows="9" spellcheck="false" 
                        class="w-full flex-1 bg-transparent p-4 font-mono text-xs md:text-sm text-emerald-300 focus:outline-none resize-none leading-relaxed">${ch.datacamp.initialCode}</textarea>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 pt-1">
              <button onclick="runDatacampCode('${ch.id}')" 
                      class="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 shadow-md transition active:scale-[0.98]">
                <i data-lucide="play" class="w-4 h-4 text-emerald-400 fill-emerald-400"></i> Exécuter le code
              </button>
              <button onclick="checkDatacampSolution('${ch.id}')" 
                      class="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition active:scale-[0.98]">
                <i data-lucide="check-circle" class="w-4 h-4"></i> Vérifier ma solution
              </button>
            </div>
          </div>

          <!-- Right: Terminal Output -->
          <div class="space-y-2 flex flex-col">
            <div class="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span class="flex items-center gap-1.5 text-slate-300 font-semibold">
                <i data-lucide="terminal" class="w-3.5 h-3.5 text-emerald-400"></i> Console / Sortie (Stdout)
              </span>
              <button onclick="clearTerminal('${ch.id}')" class="text-[10px] text-slate-500 hover:text-slate-300 transition">Effacer</button>
            </div>

            <div class="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#05070e] flex-1 flex flex-col">
              <div class="bg-slate-900/60 border-b border-slate-800 px-3 py-1.5 flex items-center justify-between">
                <span class="text-[10px] text-slate-500 font-mono">bash / stdout</span>
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div id="dc-terminal-${ch.id}" class="p-4 font-mono text-xs text-slate-300 overflow-y-auto min-h-[190px] flex-1 whitespace-pre-wrap leading-relaxed">
                <span class="text-slate-600 italic">Cliquez sur « Exécuter le code » pour voir la sortie console ici...</span>
              </div>
            </div>

            <!-- Feedback Area -->
            <div id="dc-feedback-${ch.id}" class="min-h-[42px] flex items-center"></div>
          </div>
        </div>
      </div>
      ` : ''}

      <!-- Exam Summary Checklist -->
      <div class="figma-card p-6 md:p-8 rounded-3xl border-indigo-500/30 space-y-4 bg-gradient-to-br from-indigo-950/30 to-slate-900/60">
        <h3 class="text-base font-bold text-white flex items-center gap-2">
          <i data-lucide="bookmark-check" class="w-5 h-5 text-indigo-400"></i> Fiche de Révision & Mémo de l'Examen (À retenir par cœur)
        </h3>
        <ul class="space-y-2 text-xs md:text-sm text-slate-300">
          ${ch.memo.map(m => `
            <li class="flex items-start gap-2.5">
              <i data-lucide="chevron-right" class="w-4 h-4 text-indigo-400 shrink-0 mt-0.5"></i>
              <span>${m}</span>
            </li>
          `).join("")}
        </ul>
        <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <button onclick="showView('exercises', '${ch.id}')" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition">
            Passer aux Exercices Corrigés de ce Chapitre <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function toggleChapterRead(chId) {
  if (userProgress.readChapters.includes(chId)) {
    userProgress.readChapters = userProgress.readChapters.filter(id => id !== chId);
  } else {
    userProgress.readChapters.push(chId);
  }
  saveProgress();
  showView("courses", chId);
}

// ----------------- DATACAMP LAB HANDLERS & PYTHON EXECUTOR -----------------
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function toggleDatacampHint(chId) {
  const el = document.getElementById(`dc-hint-${chId}`);
  if (el) el.classList.toggle("hidden");
}

function toggleDatacampSolution(chId) {
  const el = document.getElementById(`dc-solution-${chId}`);
  if (el) el.classList.toggle("hidden");
}

function resetDatacampCode(chId) {
  const ch = DETAILED_COURSES.find(c => c.id === chId);
  if (!ch || !ch.datacamp) return;
  const editor = document.getElementById(`dc-editor-${chId}`);
  if (editor) editor.value = ch.datacamp.initialCode;
  const feedback = document.getElementById(`dc-feedback-${chId}`);
  if (feedback) feedback.innerHTML = "";
  const terminal = document.getElementById(`dc-terminal-${chId}`);
  if (terminal) terminal.innerHTML = `<span class="text-slate-600 italic">Code réinitialisé. Cliquez sur « Exécuter le code ».</span>`;
}

function clearTerminal(chId) {
  const terminal = document.getElementById(`dc-terminal-${chId}`);
  if (terminal) terminal.innerHTML = `<span class="text-slate-600 italic">Console effacée.</span>`;
}

async function executePythonApiOrFallback(code) {
  try {
    const res = await fetch('/api/run_code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code })
    });
    if (res.ok) {
      const data = await res.json();
      return {
        output: data.output || '',
        error: data.error || '',
        isRealPython: true
      };
    }
  } catch (e) {
    // Fallback to JS evaluation if offline/file:///
  }
  return evaluatePythonFallbackInJS(code);
}

function evaluatePythonFallbackInJS(code) {
  let output = "";
  let error = "";
  try {
    const lines = code.split('\n');
    let env = {};
    
    for (let rawLine of lines) {
      let line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      if (line.includes('#')) line = line.split('#')[0].trim();

      // print(...)
      if (line.startsWith('print(') && line.endsWith(')')) {
        let content = line.substring(6, line.length - 1).trim();
        let parts = parsePrintArgs(content);
        let evaluatedParts = parts.map(p => evalExpr(p, env));
        output += evaluatedParts.join(' ') + '\n';
        continue;
      }
      
      // Variable assignment: var = expr
      if (line.includes('=') && !line.includes('==') && !line.includes('<=') && !line.includes('>=') && !line.includes('!=')) {
        let eqIdx = line.indexOf('=');
        let varName = line.substring(0, eqIdx).trim();
        let expr = line.substring(eqIdx + 1).trim();
        
        if (varName.includes(',')) {
          let vars = varName.split(',').map(v => v.trim());
          let vals = expr.split(',').map(v => evalExpr(v.trim(), env));
          vars.forEach((v, idx) => { env[v] = vals[idx]; });
        } else {
          env[varName] = evalExpr(expr, env);
        }
        continue;
      }
    }
  } catch (err) {
    error = "SyntaxError: " + err.message;
  }
  return { output, error, isRealPython: false };
}

function parsePrintArgs(str) {
  let args = [];
  let current = "";
  let inQuotes = false;
  let quoteChar = "";
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    if ((c === '"' || c === "'") && (i === 0 || str[i-1] !== '\\')) {
      if (!inQuotes) { inQuotes = true; quoteChar = c; }
      else if (quoteChar === c) { inQuotes = false; }
    }
    if (c === ',' && !inQuotes) {
      args.push(current.trim());
      current = "";
    } else {
      current += c;
    }
  }
  if (current.trim()) args.push(current.trim());
  return args;
}

function evalExpr(expr, env) {
  expr = expr.trim();
  if (expr === 'True') return true;
  if (expr === 'False') return false;
  if (expr === 'None') return null;
  
  // Strings
  if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
    return expr.substring(1, expr.length - 1);
  }
  
  // Numbers
  if (!isNaN(expr) && expr !== '') return Number(expr);
  
  // int(float(x)) or int(x) or float(x)
  if (expr.startsWith('int(') && expr.endsWith(')')) {
    let sub = expr.substring(4, expr.length - 1);
    let val = evalExpr(sub, env);
    return Math.trunc(Number(val));
  }
  if (expr.startsWith('float(') && expr.endsWith(')')) {
    let sub = expr.substring(6, expr.length - 1);
    let val = evalExpr(sub, env);
    return parseFloat(val);
  }
  if (expr.startsWith('str(') && expr.endsWith(')')) {
    let sub = expr.substring(4, expr.length - 1);
    return String(evalExpr(sub, env));
  }
  if (expr.startsWith('bool(') && expr.endsWith(')')) {
    let sub = expr.substring(5, expr.length - 1);
    let val = evalExpr(sub, env);
    return Boolean(val);
  }
  if (expr.startsWith('len(') && expr.endsWith(')')) {
    let sub = expr.substring(4, expr.length - 1);
    let val = evalExpr(sub, env);
    return val ? val.length : 0;
  }

  // Lists: ['a', 'b']
  if (expr.startsWith('[') && expr.endsWith(']')) {
    let inner = expr.substring(1, expr.length - 1).trim();
    if (!inner) return [];
    return inner.split(',').map(item => evalExpr(item.trim(), env));
  }

  // Slicing: arr[1:3] or arr[::-1]
  if (expr.includes('[') && expr.endsWith(']')) {
    let openIdx = expr.indexOf('[');
    let baseName = expr.substring(0, openIdx).trim();
    let sliceSpec = expr.substring(openIdx + 1, expr.length - 1).trim();
    let baseVal = env[baseName] !== undefined ? env[baseName] : evalExpr(baseName, env);
    
    if (sliceSpec.includes(':')) {
      let parts = sliceSpec.split(':');
      if (parts.length === 3 && parts[2] === '-1') {
        if (Array.isArray(baseVal)) return [...baseVal].reverse();
        if (typeof baseVal === 'string') return baseVal.split('').reverse().join('');
      }
      let start = parts[0] ? Number(parts[0]) : 0;
      let stop = parts[1] ? Number(parts[1]) : (baseVal ? baseVal.length : 0);
      if (Array.isArray(baseVal) || typeof baseVal === 'string') {
        return baseVal.slice(start, stop);
      }
    } else {
      let idx = Number(sliceSpec);
      return baseVal ? baseVal[idx] : undefined;
    }
  }

  // Variable lookup
  if (env[expr] !== undefined) return env[expr];

  // Mathematical / Boolean expression evaluation
  try {
    let jsExpr = expr.replace(/\b([a-zA-Z_]\w*)\b/g, (match) => {
      if (match === 'True') return 'true';
      if (match === 'False') return 'false';
      if (match === 'and') return '&&';
      if (match === 'or') return '||';
      if (match === 'not') return '!';
      if (env[match] !== undefined) {
        return typeof env[match] === 'string' ? JSON.stringify(env[match]) : env[match];
      }
      return match;
    });
    return Function('"use strict"; return (' + jsExpr + ')')();
  } catch(e) {
    return expr;
  }
}

async function runDatacampCode(chId) {
  const editor = document.getElementById(`dc-editor-${chId}`);
  const terminal = document.getElementById(`dc-terminal-${chId}`);
  if (!editor || !terminal) return;

  const code = editor.value;
  terminal.innerHTML = `<span class="text-cyan-400 font-mono flex items-center gap-2"><i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i> Exécution en cours...</span>`;
  lucide.createIcons();

  const res = await executePythonApiOrFallback(code);
  let termHtml = "";
  if (res.output) {
    termHtml += `<div class="text-emerald-400 whitespace-pre-wrap">${escapeHtml(res.output)}</div>`;
  }
  if (res.error) {
    termHtml += `<div class="text-rose-400 whitespace-pre-wrap font-semibold">${escapeHtml(res.error)}</div>`;
  }
  if (!res.output && !res.error) {
    termHtml += `<div class="text-slate-500 italic">Code exécuté sans erreur (aucune sortie console).</div>`;
  }
  terminal.innerHTML = termHtml;
}

async function checkDatacampSolution(chId) {
  const ch = DETAILED_COURSES.find(c => c.id === chId);
  if (!ch || !ch.datacamp) return;

  const editor = document.getElementById(`dc-editor-${chId}`);
  const terminal = document.getElementById(`dc-terminal-${chId}`);
  const feedback = document.getElementById(`dc-feedback-${chId}`);
  if (!editor || !terminal || !feedback) return;

  const code = editor.value;
  feedback.innerHTML = `<span class="text-xs text-slate-400 flex items-center gap-1.5"><i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i> Vérification des résultats...</span>`;
  lucide.createIcons();

  const res = await executePythonApiOrFallback(code);
  
  let termHtml = "";
  if (res.output) termHtml += `<div class="text-emerald-400 whitespace-pre-wrap">${escapeHtml(res.output)}</div>`;
  if (res.error) termHtml += `<div class="text-rose-400 whitespace-pre-wrap">${escapeHtml(res.error)}</div>`;
  terminal.innerHTML = termHtml;

  const out = (res.output || "").trim();
  const keyword = ch.datacamp.expectedOutputKeyword;
  const isMatch = out.includes(keyword);

  if (isMatch && !res.error) {
    if (!userProgress.completedLabs.includes(chId)) {
      userProgress.completedLabs.push(chId);
      saveProgress();
    }
    feedback.innerHTML = `
      <div class="w-full p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between shadow-lg shadow-emerald-500/10 animate-fade">
        <span class="flex items-center gap-2">
          <i data-lucide="award" class="w-4 h-4 text-emerald-400"></i>
          <span>🎉 <strong>Bravo !</strong> Défi validé avec succès. Sortie attendue [<code>${escapeHtml(keyword)}</code>] confirmée ! (+50 XP)</span>
        </span>
        <span class="badge-tech bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Succès 100%</span>
      </div>
    `;
    lucide.createIcons();
    updateProgressBar();
  } else {
    feedback.innerHTML = `
      <div class="w-full p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center justify-between shadow-lg animate-fade">
        <span class="flex items-center gap-2">
          <i data-lucide="alert-circle" class="w-4 h-4 text-rose-400 shrink-0"></i>
          <span>La sortie obtenue ne contient pas le résultat attendu (<code>${escapeHtml(keyword)}</code>). Vérifiez votre logique ou cliquez sur <strong>Indice</strong> !</span>
        </span>
      </div>
    `;
    lucide.createIcons();
  }
}

// ----------------- 2. EXERCICES PAR CHAPITRE AVEC ÉDITEUR & CORRECTION -----------------
function renderExercisesView(chapterId) {
  const exos = CHAPTER_EXERCISES[chapterId] || [];
  const currentCh = DETAILED_COURSES.find(c => c.id === chapterId) || DETAILED_COURSES[0];

  return `
    <div class="space-y-8 animate-fade max-w-5xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
          <i data-lucide="pen-tool" class="w-4 h-4"></i> Entraînement & Pratique Intensive
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Exercices Corrigés par Chapitre</h1>
        <p class="text-xs text-slate-400 mt-1">Espace dédié pour résoudre chaque exercice avec zone de code, test en direct et corrigé pas à pas.</p>
      </div>

      <!-- Chapter Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        ${DETAILED_COURSES.map(c => `
          <button onclick="showView('exercises', '${c.id}')" 
                  class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${c.id === chapterId ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'}">
            <span>Chapitre ${c.num}</span> (${(CHAPTER_EXERCISES[c.id] || []).length} Exos)
          </button>
        `).join("")}
      </div>

      <!-- Exercise Cards -->
      <div class="space-y-8">
        ${exos.map((exo, i) => {
          const isDone = userProgress.doneExercises.includes(exo.id);
          return `
            <div class="figma-card p-6 md:p-8 rounded-3xl space-y-5 border-slate-800" id="exo-card-${exo.id}">
              <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div class="flex items-center gap-2">
                  <span class="badge-tech text-emerald-400 bg-emerald-500/10 border-emerald-500/30">${exo.title}</span>
                </div>
                <button onclick="toggleExerciseDone('${exo.id}')" 
                        class="px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${isDone ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'}">
                  <i data-lucide="${isDone ? 'check-circle-2' : 'circle'}" class="w-4 h-4"></i>
                  ${isDone ? 'Résolu ✅' : 'Marquer comme Résolu'}
                </button>
              </div>

              <!-- Énoncé -->
              <div class="space-y-2">
                <span class="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Énoncé du Problème :</span>
                <div class="text-xs md:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  ${exo.enonce}
                </div>
              </div>

              <!-- Zone de Résolution / Brouillon Étudiant avec Test -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Votre Espace de Résolution (Brouillon & Code) :</span>
                  <button onclick="runExerciseCode('${exo.id}')" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-emerald-400 border border-slate-700 flex items-center gap-1.5 transition">
                    <i data-lucide="play" class="w-3 h-3 fill-emerald-400"></i> Tester ce code
                  </button>
                </div>
                <textarea id="exo-code-${exo.id}" rows="4" placeholder="Écrivez votre raisonnement ou votre code Python ici avant de vérifier..." 
                          class="w-full bg-[#0a0f1d] border border-slate-800 rounded-2xl p-4 text-xs font-mono text-emerald-300 focus:outline-none focus:border-indigo-500"></textarea>
                <div id="exo-term-${exo.id}" class="hidden p-3 rounded-xl bg-[#05070e] border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap"></div>
              </div>

              <!-- Bouton Corrigé & Affichage -->
              <div class="pt-2">
                <button onclick="toggleElement('corr-${exo.id}')" 
                        class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 flex items-center gap-2 border border-slate-700 transition">
                  <i data-lucide="eye" class="w-4 h-4"></i> Voir la Correction Détaillée & Justification
                </button>

                <div id="corr-${exo.id}" class="hidden mt-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-950 border border-indigo-500/30 text-xs md:text-sm text-slate-200 leading-relaxed space-y-2">
                  <div class="flex items-center gap-2 text-indigo-400 font-bold mb-2">
                    <i data-lucide="check-check" class="w-4 h-4"></i> Corrigé Officiel Pas à Pas :
                  </div>
                  <div>${exo.correction}</div>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

async function runExerciseCode(exoId) {
  const textarea = document.getElementById(`exo-code-${exoId}`);
  const term = document.getElementById(`exo-term-${exoId}`);
  if (!textarea || !term) return;
  const code = textarea.value;
  if (!code.trim()) return;
  term.classList.remove('hidden');
  term.innerHTML = `<span class="text-cyan-400">Exécution en cours...</span>`;
  const res = await executePythonApiOrFallback(code);
  let out = "";
  if (res.output) out += `<span class="text-emerald-400">${escapeHtml(res.output)}</span>`;
  if (res.error) out += `<span class="text-rose-400">${escapeHtml(res.error)}</span>`;
  if (!out) out = `<span class="text-slate-500">Exécuté avec succès (aucun print).</span>`;
  term.innerHTML = out;
}

function toggleExerciseDone(exoId) {
  if (userProgress.doneExercises.includes(exoId)) {
    userProgress.doneExercises = userProgress.doneExercises.filter(id => id !== exoId);
  } else {
    userProgress.doneExercises.push(exoId);
  }
  saveProgress();
  showView("exercises", currentExerciseChapter);
}

// ----------------- 3. EXAMENS COMPLETS & NOTÉS (/20) -----------------
function renderExamsView() {
  if (activeExam) {
    return renderActiveExamView();
  }

  return `
    <div class="space-y-8 animate-fade max-w-5xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
          <i data-lucide="award" class="w-4 h-4"></i> Conditions Réelles d'Évaluation (SMI / IA - UIT Kénitra)
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Centre d'Examens & Contrôles Sommatifs</h1>
        <p class="text-xs text-slate-400 mt-1">Banque massive d'épreuves officielles sur 20 points, chronométrées avec calcul automatique de la note et corrigé pas à pas.</p>
      </div>

      <!-- Exam Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${EXAM_SUBJECTS.map(exam => {
          const score = userProgress.passedExams[exam.id];
          const durationText = typeof exam.duration === 'number' ? `${exam.duration} min` : (exam.duration || "30 min");
          const totalPts = exam.totalPoints || exam.questions.reduce((s, q) => s + (q.pts || 1), 0);
          return `
            <div class="figma-card p-6 rounded-3xl border-slate-800 space-y-4 flex flex-col justify-between hover:border-amber-500/30 transition shadow-lg">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="badge-tech text-amber-400 bg-amber-500/10 border-amber-500/30 font-mono text-[10px]">${exam.sessionBadge || exam.id.toUpperCase()}</span>
                  <span class="text-xs text-slate-500 font-mono flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${durationText}</span>
                </div>
                <h3 class="text-sm md:text-base font-bold text-white line-clamp-2">${exam.title}</h3>
                <p class="text-xs text-slate-300 leading-relaxed">${exam.desc || "Sujet officiel complet avec calcul de la note sur 20 et corrigé pas à pas."}</p>
                <div class="pt-1 text-xs font-mono text-slate-400 flex items-center gap-2">
                  <span>Note max : <strong class="text-amber-400">${totalPts} Pts</strong></span>
                  <span>•</span>
                  <span>${exam.questions.length} Questions</span>
                </div>
              </div>

              <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  ${score !== undefined ? `
                    <div class="text-xs">
                      <span class="text-slate-400">Note :</span>
                      <span class="font-bold ${score >= 10 ? 'text-emerald-400' : 'text-rose-400'}">${score} / 20</span>
                    </div>
                  ` : '<span class="text-[11px] text-slate-500 italic">Non encore passé</span>'}
                </div>
                <button onclick="startExam('${exam.id}')" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition active:scale-[0.98]">
                  <i data-lucide="play" class="w-3.5 h-3.5 fill-slate-950"></i> Commencer
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <!-- Exam Traps Warning Board -->
      <div class="figma-card p-6 md:p-8 rounded-3xl border-rose-500/30 bg-gradient-to-br from-rose-950/20 to-slate-900/60 space-y-4">
        <h3 class="text-base font-bold text-rose-300 flex items-center gap-2">
          <i data-lucide="alert-triangle" class="w-5 h-5 text-rose-400"></i> Les 10 Pièges Classiques de l'Examen UIT Kénitra
        </h3>
        <p class="text-xs text-slate-400">Ces erreurs récurrentes font perdre la majorité des points chaque année au rattrapage :</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          ${EXAM_TRAPS.map(trap => `
            <div class="p-3.5 rounded-2xl bg-slate-950 border border-rose-500/20 text-xs space-y-1">
              <div class="font-bold text-white flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                <span>${trap.trap}</span>
              </div>
              <div class="text-slate-400 text-[11px] leading-relaxed pl-3.5">${trap.explanation}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function startExam(examId) {
  activeExam = EXAM_SUBJECTS.find(e => e.id === examId);
  if (!activeExam) return;
  examAnswers = {};
  const durationMin = typeof activeExam.duration === 'number' ? activeExam.duration : 30;
  examSeconds = durationMin * 60;
  
  if (examTimer) clearInterval(examTimer);
  examTimer = setInterval(() => {
    examSeconds--;
    const m = Math.floor(examSeconds / 60);
    const s = examSeconds % 60;
    const el = document.getElementById("examTimerDisplay");
    if (el) el.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    if (examSeconds <= 0) {
      clearInterval(examTimer);
      finishExam();
    }
  }, 1000);

  showView("exams");
}

function renderActiveExamView() {
  const m = Math.floor(examSeconds / 60);
  const s = examSeconds % 60;
  const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div class="figma-card p-6 rounded-3xl border-amber-500/30 flex flex-wrap items-center justify-between gap-4 sticky top-20 z-40 bg-[#0d1424]/95 backdrop-blur-xl">
        <div>
          <span class="badge-tech text-amber-400 bg-amber-500/10">${activeExam.sessionBadge || activeExam.id.toUpperCase()}</span>
          <h2 class="text-lg font-black text-white mt-1">${activeExam.title}</h2>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-amber-400 font-mono font-bold text-sm">
            <i data-lucide="timer" class="w-4 h-4 animate-spin"></i>
            <span id="examTimerDisplay">${timeStr}</span>
          </div>
          <button onclick="finishExam()" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition">
            <i data-lucide="check" class="w-4 h-4"></i> Soumettre & Obtenir la Note
          </button>
        </div>
      </div>

      <div class="space-y-6">
        ${activeExam.questions.map((q, idx) => `
          <div class="figma-card p-6 md:p-8 rounded-3xl space-y-4 border-slate-800">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-indigo-400">Question ${idx + 1} / ${activeExam.questions.length}</span>
              <span class="text-xs font-mono text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">${q.pts || 1} Point${(q.pts || 1) > 1 ? 's' : ''}</span>
            </div>
            <div class="text-xs md:text-sm text-slate-100 font-medium whitespace-pre-line">${q.text || q.q}</div>

            <div class="space-y-2 pt-2">
              ${q.options.map((opt, oIdx) => `
                <label class="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800/80 cursor-pointer transition">
                  <input type="radio" name="exam_q_${q.id}" value="${oIdx}" onchange="recordExamAnswer('${q.id}', ${oIdx})" 
                         ${examAnswers[q.id] === oIdx ? 'checked' : ''}
                         class="w-4 h-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 bg-slate-900 border-slate-700">
                  <span class="text-xs text-slate-300">${opt}</span>
                </label>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>

      <div class="text-center pt-4 pb-12">
        <button onclick="finishExam()" class="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 transition">
          Valider et Terminer l'Épreuve
        </button>
      </div>
    </div>
  `;
}

function recordExamAnswer(qId, oIdx) {
  examAnswers[qId] = oIdx;
}

function finishExam() {
  if (examTimer) clearInterval(examTimer);

  let earnedPoints = 0;
  let totalPossible = activeExam.totalPoints || activeExam.questions.reduce((sum, q) => sum + (q.pts || 1), 0);

  activeExam.questions.forEach(q => {
    const pts = q.pts || 1;
    if (examAnswers[q.id] === q.correct) {
      earnedPoints += pts;
    }
  });

  const finalScore = Math.round((earnedPoints / totalPossible) * 20 * 10) / 10;
  userProgress.passedExams[activeExam.id] = finalScore;
  saveProgress();

  const finishedExam = activeExam;
  const userAnswersCopy = { ...examAnswers };
  activeExam = null;

  const main = document.getElementById("mainContent");
  main.innerHTML = `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div class="figma-card p-8 rounded-3xl text-center space-y-4 border-indigo-500/40 bg-gradient-to-b from-indigo-950/40 to-slate-950 shadow-2xl">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-3xl ${finalScore >= 10 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'} font-black text-2xl mb-2">
          ${finalScore >= 10 ? '🎓' : '⚠️'}
        </div>
        <h2 class="text-2xl font-black text-white">Résultat Officiel de l'Épreuve</h2>
        <div class="text-4xl md:text-5xl font-black font-mono ${finalScore >= 10 ? 'text-emerald-400' : 'text-rose-400'}">
          ${finalScore} <span class="text-xl text-slate-500">/ 20</span>
        </div>
        <p class="text-xs text-slate-300 max-w-md mx-auto">
          ${finalScore >= 16 ? "Excellent travail ! Mention Très Bien. Vous maîtrisez le programme de Pr. El Alaoui." : 
            finalScore >= 10 ? "Examen validé avec succès ! Revoyez les pièges ci-dessous pour viser la mention." : 
            "Non validé pour le moment. Révisez attentivement la correction pas à pas ci-dessous et recommencez."}
        </p>
        <div class="pt-2">
          <button onclick="showView('exams')" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition">
            Retourner à la Liste des Examens
          </button>
        </div>
      </div>

      <!-- Correction Détaillée Pas à Pas -->
      <div class="space-y-5">
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <i data-lucide="check-check" class="w-5 h-5 text-emerald-400"></i> Corrigé Officiel et Justifications Détaillées
        </h3>

        ${finishedExam.questions.map((q, idx) => {
          const userAns = userAnswersCopy[q.id];
          const isCorrect = userAns === q.correct;
          const pts = q.pts || 1;
          return `
            <div class="figma-card p-6 rounded-3xl space-y-3 border ${isCorrect ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-rose-500/30 bg-rose-950/10'}">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
                  Question ${idx + 1} • ${isCorrect ? 'Correct (+' + pts + ' pts)' : 'Erreur (0 / ' + pts + ' pts)'}
                </span>
                <span class="text-xs text-slate-400 font-mono">Réponse choisie : ${userAns !== undefined ? q.options[userAns] : 'Aucune'}</span>
              </div>
              <div class="text-xs md:text-sm text-white font-medium whitespace-pre-line">${q.text || q.q}</div>
              <div class="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div class="font-bold text-emerald-400">Bonne Réponse : ${q.options[q.correct]}</div>
                <div class="text-slate-300 text-[11px] leading-relaxed pt-1">${q.justification || q.explain}</div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  lucide.createIcons();
}

// ----------------- 4. BANQUE DE QCM & QUIZ D'EXAMEN -----------------
function renderQuizView() {
  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2 border border-cyan-500/20">
          <i data-lucide="help-circle" class="w-4 h-4"></i> Auto-Évaluation Rapide
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Quiz & QCM d'Entraînement</h1>
        <p class="text-xs text-slate-400 mt-1">Questions pièges ciblées avec retour immédiat et explications détaillées.</p>
      </div>

      <div class="space-y-6">
        ${QUIZ_BANK.map((item, idx) => `
          <div class="figma-card p-6 md:p-8 rounded-3xl space-y-4 border-slate-800" id="quiz-card-${item.id}">
            <div class="flex items-center justify-between">
              <span class="badge-tag bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">${item.tag}</span>
              <span class="text-xs font-mono text-slate-500">Question ${idx + 1} / ${QUIZ_BANK.length}</span>
            </div>
            <div class="text-xs md:text-sm text-slate-100 font-medium whitespace-pre-line">${item.question}</div>

            <div class="space-y-2 pt-2">
              ${item.options.map((opt, oIdx) => `
                <button onclick="checkQuizItem('${item.id}', ${oIdx}, ${item.correct})" 
                        class="quiz-btn-${item.id} w-full text-left p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800/80 text-xs text-slate-300 transition flex items-center justify-between">
                  <span>${opt}</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-600"></i>
                </button>
              `).join("")}
            </div>

            <div id="quiz-exp-${item.id}" class="hidden p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-200 leading-relaxed">
              <strong class="font-bold text-indigo-400 block mb-1">Explication :</strong>
              ${item.explanation}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function checkQuizItem(qId, selected, correct) {
  const buttons = document.querySelectorAll(`.quiz-btn-${qId}`);
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correct) {
      btn.classList.add("bg-emerald-950", "border-emerald-500", "text-emerald-300");
    } else if (idx === selected) {
      btn.classList.add("bg-rose-950", "border-rose-500", "text-rose-300");
    }
  });
  const exp = document.getElementById(`quiz-exp-${qId}`);
  if (exp) exp.classList.remove("hidden");
}

// ----------------- 5. DECK FLASHCARDS 3D -----------------
function renderFlashcardsView() {
  const card = FLASHCARDS[flashcardIndex];
  return `
    <div class="space-y-8 animate-fade max-w-2xl mx-auto">
      <div class="text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
          <i data-lucide="layers" class="w-4 h-4"></i> Mémorisation Active
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Flashcards de Révision 3D</h1>
        <p class="text-xs text-slate-400 mt-1">Mémorisez rapidement les définitions et pièges essentiels du programme.</p>
      </div>

      <div class="perspective-1000 w-full h-80 cursor-pointer" onclick="flipActiveCard()">
        <div id="activeCardInner" class="flashcard-inner relative w-full h-full transform-style-3d">
          <div class="absolute inset-0 backface-hidden figma-card p-8 rounded-3xl flex flex-col justify-between items-center text-center shadow-2xl">
            <div class="flex items-center justify-between w-full">
              <span class="badge-tag bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">${card.tag}</span>
              <span class="text-xs text-slate-500 font-mono">${flashcardIndex + 1} / ${FLASHCARDS.length}</span>
            </div>
            <h3 class="text-base md:text-lg font-bold text-white leading-relaxed px-4">${card.front}</h3>
            <div class="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <i data-lucide="rotate-cw" class="w-3.5 h-3.5 text-indigo-400"></i> Cliquez pour retourner
            </div>
          </div>
          <div class="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 rounded-3xl border border-emerald-500/40 flex flex-col justify-between items-center text-center shadow-2xl">
            <span class="badge-tag bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Réponse & Règle</span>
            <p class="text-xs md:text-sm text-slate-200 leading-relaxed font-medium px-2">${card.back}</p>
            <div class="text-xs text-slate-400 font-mono">Cliquez pour revenir</div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2">
        <button onclick="flashcardIndex=(flashcardIndex-1+FLASHCARDS.length)%FLASHCARDS.length; showView('flashcards')" 
                class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2 border border-slate-800 transition">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Précédente
        </button>
        <button onclick="FLASHCARDS.sort(()=>Math.random()-0.5); flashcardIndex=0; showView('flashcards')" 
                class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-amber-400 flex items-center gap-1.5 border border-slate-800 transition">
          <i data-lucide="shuffle" class="w-4 h-4"></i> Aléatoire
        </button>
        <button onclick="flashcardIndex=(flashcardIndex+1)%FLASHCARDS.length; showView('flashcards')" 
                class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition">
          Suivante <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `;
}

function flipActiveCard() {
  const inner = document.getElementById("activeCardInner");
  if (inner) inner.classList.toggle("is-flipped");
}

function toggleElement(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("hidden");
}
