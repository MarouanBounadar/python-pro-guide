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
let currentQuizFilter = 'all';
let currentFlashcardFilter = 'all';

// Audio Synthesizer (Zero-dependency Web Audio API)
let soundEnabled = JSON.parse(localStorage.getItem("py_sound_enabled") ?? "true");

function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem("py_sound_enabled", JSON.stringify(soundEnabled));
  updateSoundButton();
  if (soundEnabled) playAudioFeedback("click");
}

function updateSoundButton() {
  const btn = document.getElementById("soundToggleBtn");
  if (btn) {
    btn.innerHTML = soundEnabled 
      ? `<i data-lucide="volume-2" class="w-4 h-4 text-cyan-400"></i>`
      : `<i data-lucide="volume-x" class="w-4 h-4 text-slate-500"></i>`;
    btn.title = soundEnabled ? "Effets sonores activés (cliquer pour couper)" : "Effets sonores coupés (cliquer pour activer)";
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
  }
}

function playAudioFeedback(type) {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === "success") {
      const freqs = [523.25, 659.25, 783.99]; // Do, Mi, Sol
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.22);
      });
    } else if (type === "error") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(174.61, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(146.83, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === "badge_unlock") {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do aigu
      notes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.35);
      });
    } else if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }
  } catch (e) {}
}

// Gamification & Badges System
function checkBadges(triggerSound = true) {
  if (!userProgress.unlockedBadges) userProgress.unlockedBadges = [];
  const newlyUnlocked = [];

  // 1. Premier Pas
  if (userProgress.readChapters && userProgress.readChapters.length >= 1 && !userProgress.unlockedBadges.includes("first_step")) {
    userProgress.unlockedBadges.push("first_step");
    newlyUnlocked.push("first_step");
  }
  // 2. Alchimiste du Code
  if (userProgress.completedLabs && userProgress.completedLabs.length >= 3 && !userProgress.unlockedBadges.includes("code_novice")) {
    userProgress.unlockedBadges.push("code_novice");
    newlyUnlocked.push("code_novice");
  }
  // 3. Chasseur de Pièges
  if (userProgress.passedQuizzes && userProgress.passedQuizzes.length >= 20 && !userProgress.unlockedBadges.includes("trap_hunter")) {
    userProgress.unlockedBadges.push("trap_hunter");
    newlyUnlocked.push("trap_hunter");
  }
  // 4. Maître Algorithmique
  if (userProgress.completedLabs && userProgress.completedLabs.length >= 6 && !userProgress.unlockedBadges.includes("code_master")) {
    userProgress.unlockedBadges.push("code_master");
    newlyUnlocked.push("code_master");
  }
  // 5. Major de Promo
  const hasHighExam = Object.values(userProgress.passedExams || {}).some(s => (typeof s === 'number' ? s : s.note) >= 16);
  if (hasHighExam && !userProgress.unlockedBadges.includes("major_promo")) {
    userProgress.unlockedBadges.push("major_promo");
    newlyUnlocked.push("major_promo");
  }
  // 6. Génie du Python
  if (calculateProgress() === 100 && !userProgress.unlockedBadges.includes("python_guru")) {
    userProgress.unlockedBadges.push("python_guru");
    newlyUnlocked.push("python_guru");
  }

  if (newlyUnlocked.length > 0) {
    saveProgress();
    if (triggerSound) {
      playAudioFeedback("badge_unlock");
      showBadgeToast(newlyUnlocked[0]);
    }
  }

  updateBadgesHeaderButton();
}

function updateBadgesHeaderButton() {
  const el = document.getElementById("badgesBadgeText");
  if (el && typeof BADGES_CONFIG !== 'undefined') {
    const count = userProgress.unlockedBadges ? userProgress.unlockedBadges.length : 0;
    el.innerText = `${count}/${BADGES_CONFIG.length}`;
  }
}

function renderBadgesGrid() {
  const container = document.getElementById("badgesGridContainer");
  if (!container || typeof BADGES_CONFIG === 'undefined') return;

  container.innerHTML = BADGES_CONFIG.map(b => {
    const isUnlocked = userProgress.unlockedBadges && userProgress.unlockedBadges.includes(b.id);
    return `
      <div class="p-4 rounded-2xl border transition-all ${isUnlocked ? 'bg-gradient-to-br from-slate-900 to-indigo-950/60 border-amber-500/40 shadow-lg shadow-amber-500/10' : 'bg-slate-950/60 border-slate-800/80 opacity-60'} flex items-start gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white shrink-0 shadow-md ${isUnlocked ? 'scale-105' : 'grayscale'}">
          <i data-lucide="${b.icon}" class="w-6 h-6"></i>
        </div>
        <div class="space-y-1 flex-1">
          <div class="flex items-center justify-between">
            <h4 class="text-xs md:text-sm font-bold text-white">${b.title}</h4>
            <span class="text-[10px] font-mono font-bold ${isUnlocked ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' : 'text-slate-500 bg-slate-900'} px-2 py-0.5 rounded-full">
              ${isUnlocked ? 'Débloqué ✅' : 'Verrouillé 🔒'}
            </span>
          </div>
          <p class="text-[11px] text-slate-300 leading-relaxed">${b.desc}</p>
          <div class="pt-1 text-[10px] font-mono text-cyan-400 font-bold">+${b.xp} XP</div>
        </div>
      </div>
    `;
  }).join("");

  if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
}
window.renderBadgesGrid = renderBadgesGrid;

function showBadgeToast(badgeId) {
  if (typeof BADGES_CONFIG === 'undefined') return;
  const b = BADGES_CONFIG.find(item => item.id === badgeId);
  if (!b) return;

  const toast = document.getElementById("badgeToast");
  const title = document.getElementById("badgeToastTitle");
  if (toast && title) {
    title.innerText = `${b.title} (+${b.xp} XP)`;
    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 4500);
  }
}

// Progress Tracking System (Persistance LocalStorage)
let userProgress = JSON.parse(localStorage.getItem("py_progress_v2") || JSON.stringify({
  readChapters: ["ch1"],
  completedLabs: [],
  doneExercises: [],
  passedExams: {},
  passedQuizzes: [],
  unlockedBadges: []
}));
if (!userProgress.completedLabs) userProgress.completedLabs = [];
if (!userProgress.unlockedBadges) userProgress.unlockedBadges = [];

function saveProgress() {
  localStorage.setItem("py_progress_v2", JSON.stringify(userProgress));
  updateProgressBar();
}

function calculateProgress() {
  const totalChapters = DETAILED_COURSES.length; // 6
  let totalExos = 0;
  Object.keys(CHAPTER_EXERCISES).forEach(k => totalExos += CHAPTER_EXERCISES[k].length); // 24
  const totalExams = EXAM_SUBJECTS.length; // 2
  const totalLabs = DETAILED_COURSES.length; // 6 Ateliers Pratiques
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
  updateSoundButton();
  checkBadges(false);
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
  } else if (viewId === "playground") {
    main.innerHTML = renderPlaygroundView();
  }

  lucide.createIcons();
}

// ----------------- 1. COURS DÉTAILLÉS & ATELIERS PRATIQUES -----------------
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

      <!-- LABORATOIRE INTERACTIF DE CODE PYTHON -->
      ${ch.lab ? `
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
              <h3 class="text-base md:text-lg font-bold text-white mt-1">${ch.lab.title}</h3>
            </div>
          </div>
          
          <!-- Action Tools -->
          <div class="flex items-center gap-2">
            <button onclick="toggleLabHint('${ch.id}')" class="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs font-semibold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition">
              <i data-lucide="lightbulb" class="w-3.5 h-3.5"></i> Indice
            </button>
            <button onclick="toggleLabSolution('${ch.id}')" class="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs font-semibold text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition">
              <i data-lucide="code" class="w-3.5 h-3.5"></i> Solution
            </button>
            <button onclick="resetLabCode('${ch.id}')" class="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 flex items-center gap-1.5 transition" title="Réinitialiser le code">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <!-- Consigne & Objectif -->
        <div class="p-4 md:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs md:text-sm text-slate-300 leading-relaxed">
          <div class="flex items-center gap-2 font-bold text-emerald-400 mb-2">
            <i data-lucide="target" class="w-4 h-4"></i> Instructions / Mission :
          </div>
          <div class="space-y-1.5 text-slate-300">${ch.lab.consigne}</div>
        </div>

        <!-- Indice Drawer -->
        <div id="dc-hint-${ch.id}" class="hidden p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
          <div class="font-bold flex items-center gap-1.5 text-amber-300 mb-1">
            <i data-lucide="help-circle" class="w-4 h-4"></i> Indice Pédagogique :
          </div>
          <div>${ch.lab.hint}</div>
        </div>

        <!-- Solution Drawer -->
        <div id="dc-solution-${ch.id}" class="hidden p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
          <div class="font-bold flex items-center gap-1.5 text-cyan-300 mb-2">
            <i data-lucide="check-check" class="w-4 h-4"></i> Solution Officielle :
          </div>
          <pre class="font-mono bg-[#05070e] p-3 rounded-xl border border-cyan-500/20 text-cyan-300 text-xs overflow-x-auto whitespace-pre">${ch.lab.solution}</pre>
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
                        class="w-full flex-1 bg-transparent p-4 font-mono text-xs md:text-sm text-emerald-300 focus:outline-none resize-none leading-relaxed">${ch.lab.initialCode}</textarea>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 pt-1">
              <button onclick="runLabCode('${ch.id}')" 
                      class="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 shadow-md transition active:scale-[0.98]">
                <i data-lucide="play" class="w-4 h-4 text-emerald-400 fill-emerald-400"></i> Exécuter le code
              </button>
              <button onclick="checkLabSolution('${ch.id}')" 
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

// ----------------- ATELIERS PRATIQUES & PYTHON EXECUTOR -----------------
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function toggleLabHint(chId) {
  const el = document.getElementById(`dc-hint-${chId}`);
  if (el) el.classList.toggle("hidden");
}

function toggleLabSolution(chId) {
  const el = document.getElementById(`dc-solution-${chId}`);
  if (el) el.classList.toggle("hidden");
}

function resetLabCode(chId) {
  const ch = DETAILED_COURSES.find(c => c.id === chId);
  if (!ch || !ch.lab) return;
  const labData = ch.lab;
  const editor = document.getElementById(`dc-editor-${chId}`);
  if (editor) editor.value = labData.initialCode;
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

async function runLabCode(chId) {
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

async function checkLabSolution(chId) {
  const ch = DETAILED_COURSES.find(c => c.id === chId);
  if (!ch || !ch.lab) return;
  const labData = ch.lab;

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
  const keyword = labData.expectedOutputKeyword;
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

      <!-- Random Exam Generator Hero Card -->
      <div class="figma-card p-6 md:p-8 rounded-3xl border-amber-500/40 bg-gradient-to-br from-[#1c1408] via-[#100d07] to-[#070912] shadow-2xl relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <i data-lucide="sparkles" class="w-4 h-4 text-amber-400"></i> Mode Entraînement Infini
            </div>
            <h2 class="text-xl md:text-2xl font-black text-white">Générateur d'Examen Blanc Aléatoire</h2>
            <p class="text-xs md:text-sm text-slate-300 leading-relaxed">
              Tirez un sujet d'examen unique et inédit composé de <strong>10 questions de QCM</strong> piochées au hasard dans le programme, <strong>2 problèmes d'analyse de trace mémoire</strong> et <strong>1 problème d'algorithmique</strong>. Barème officiel complet sur 20 points en 45 minutes !
            </p>
          </div>
          <button onclick="generateAndStartRandomExam()" 
                  class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs md:text-sm flex items-center gap-2.5 shadow-xl shadow-amber-500/25 transition active:scale-[0.98]">
            <i data-lucide="dice-5" class="w-5 h-5 fill-slate-950"></i> Lancer un Examen Blanc Unique
          </button>
        </div>
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

function startExam(examOrId) {
  if (typeof examOrId === "object" && examOrId !== null) {
    activeExam = examOrId;
  } else {
    activeExam = EXAM_SUBJECTS.find(e => e.id === examOrId);
  }
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
  checkBadges();
  if (finalScore >= 16) playAudioFeedback("badge_unlock");
  else if (finalScore >= 10) playAudioFeedback("success");
  else playAudioFeedback("error");

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

// ----------------- 4. BANQUE DE QCM & QUIZ D'EXAMEN (100 QUESTIONS) -----------------
function setQuizFilter(filter) {
  currentQuizFilter = filter;
  showView("quiz");
}

function resetQuizProgress() {
  if (confirm("Voulez-vous réinitialiser votre progression sur les 100 questions de Quiz ?")) {
    userProgress.passedQuizzes = [];
    saveProgress();
    showView("quiz");
  }
}

function renderQuizView() {
  const chapters = [
    { id: "all", label: "Tous les Chapitres", count: QUIZ_BANK.length },
    { id: 1, label: "Ch 1: Architecture (16)", count: 16 },
    { id: 2, label: "Ch 2: Types & E/S (17)", count: 17 },
    { id: 3, label: "Ch 3: Opérateurs (17)", count: 17 },
    { id: 4, label: "Ch 4: Conditions (16)", count: 16 },
    { id: 5, label: "Ch 5: Boucles (17)", count: 17 },
    { id: 6, label: "Ch 6: Séquences (17)", count: 17 }
  ];

  const filteredQuiz = (currentQuizFilter === "all" || !currentQuizFilter)
    ? QUIZ_BANK 
    : QUIZ_BANK.filter(q => String(q.chapter) === String(currentQuizFilter));

  const passedCount = userProgress.passedQuizzes ? userProgress.passedQuizzes.length : 0;
  const pct = Math.round((passedCount / QUIZ_BANK.length) * 100);

  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <!-- Header with Score & Stats -->
      <div class="figma-card p-6 md:p-8 rounded-3xl border-cyan-500/20 bg-gradient-to-br from-[#0b1528] via-[#090d18] to-[#060a12]">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2 border border-cyan-500/20">
              <i data-lucide="help-circle" class="w-4 h-4"></i> Auto-Évaluation Sommative • 100 Questions QCM
            </div>
            <h1 class="text-2xl md:text-3xl font-black text-white">Banque de Quiz & QCM Universitaires</h1>
            <p class="text-xs text-slate-400 mt-1">100 questions ciblées avec retour immédiat, scores en temps réel et explications académiques pas à pas.</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl text-center min-w-[110px]">
              <div class="text-xs text-slate-400 font-medium">Réussite</div>
              <div class="text-lg md:text-xl font-black text-cyan-400">${passedCount} / ${QUIZ_BANK.length}</div>
              <div class="text-[10px] text-slate-500 font-mono">${pct}% complété</div>
            </div>
            <button onclick="resetQuizProgress()" class="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 transition" title="Réinitialiser les scores">
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- Mini Progress Bar -->
        <div class="mt-5 w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
          <div class="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full transition-all duration-500" style="width: ${pct}%"></div>
        </div>
      </div>

      <!-- Chapter Filter Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        ${chapters.map(ch => `
          <button onclick="setQuizFilter('${ch.id}')" 
                  class="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${String(currentQuizFilter) === String(ch.id) ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'}">
            <span>${ch.label}</span>
          </button>
        `).join("")}
      </div>

      <!-- Questions List -->
      <div class="space-y-6">
        <div class="text-xs text-slate-400 font-mono flex items-center justify-between">
          <span>Affichage de ${filteredQuiz.length} questions</span>
          <span>Chapitre ${currentQuizFilter === 'all' ? 'Tous' : currentQuizFilter}</span>
        </div>

        ${filteredQuiz.map((item, idx) => {
          const isPassed = userProgress.passedQuizzes && userProgress.passedQuizzes.includes(item.id);
          return `
          <div class="figma-card p-6 md:p-8 rounded-3xl space-y-4 border-slate-800 relative ${isPassed ? 'border-emerald-500/30' : ''}" id="quiz-card-${item.id}">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="badge-tag bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">${item.chapterTitle || ('Ch ' + item.chapter)}</span>
                <span class="badge-tech text-[10px]">${item.tag}</span>
              </div>
              <div class="flex items-center gap-2">
                ${isPassed ? '<span class="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1"><i data-lucide="check-circle-2" class="w-3 h-3"></i> Validé</span>' : ''}
                <span class="text-xs font-mono text-slate-500">Q.${idx + 1} / ${filteredQuiz.length}</span>
              </div>
            </div>

            <div class="text-xs md:text-sm text-slate-100 font-medium whitespace-pre-line leading-relaxed">${item.question}</div>

            <div class="space-y-2 pt-2">
              ${item.options.map((opt, oIdx) => `
                <button onclick="checkQuizItem('${item.id}', ${oIdx}, ${item.correct})" 
                        class="quiz-btn-${item.id} w-full text-left p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800/80 text-xs text-slate-300 transition flex items-center justify-between group">
                  <span class="leading-snug">${opt}</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition"></i>
                </button>
              `).join("")}
            </div>

            <div id="quiz-exp-${item.id}" class="hidden p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-200 leading-relaxed shadow-inner">
              <strong class="font-bold text-indigo-400 flex items-center gap-1.5 mb-1">
                <i data-lucide="info" class="w-3.5 h-3.5"></i> Explication Académique :
              </strong>
              <div class="text-slate-300 whitespace-pre-line">${item.explanation}</div>
            </div>
          </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function checkQuizItem(qId, selected, correct) {
  const buttons = document.querySelectorAll(`.quiz-btn-${qId}`);
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correct) {
      btn.classList.remove("bg-slate-950/80", "border-slate-800/80", "text-slate-300");
      btn.classList.add("bg-emerald-950", "border-emerald-500", "text-emerald-300", "font-semibold");
    } else if (idx === selected) {
      btn.classList.remove("bg-slate-950/80", "border-slate-800/80", "text-slate-300");
      btn.classList.add("bg-rose-950", "border-rose-500", "text-rose-300");
    }
  });

  const exp = document.getElementById(`quiz-exp-${qId}`);
  if (exp) exp.classList.remove("hidden");

  if (selected === correct) {
    playAudioFeedback("success");
    if (!userProgress.passedQuizzes) userProgress.passedQuizzes = [];
    if (!userProgress.passedQuizzes.includes(qId)) {
      userProgress.passedQuizzes.push(qId);
      saveProgress();
      checkBadges();
    }
  } else {
    playAudioFeedback("error");
  }

  lucide.createIcons();
}

// ----------------- 5. DECK FLASHCARDS 3D (100 CARTES) -----------------
function setFlashcardFilter(filter) {
  currentFlashcardFilter = filter;
  flashcardIndex = 0;
  showView("flashcards");
}

function renderFlashcardsView() {
  const chapters = [
    { id: "all", label: "Toutes (100)", count: FLASHCARDS.length },
    { id: 1, label: "Ch 1: Architecture (16)", count: 16 },
    { id: 2, label: "Ch 2: Types & E/S (17)", count: 17 },
    { id: 3, label: "Ch 3: Opérateurs (17)", count: 17 },
    { id: 4, label: "Ch 4: Conditions (16)", count: 16 },
    { id: 5, label: "Ch 5: Boucles (17)", count: 17 },
    { id: 6, label: "Ch 6: Séquences (17)", count: 17 }
  ];

  const filteredCards = (currentFlashcardFilter === "all" || !currentFlashcardFilter)
    ? FLASHCARDS
    : FLASHCARDS.filter(c => String(c.chapter) === String(currentFlashcardFilter));

  if (flashcardIndex >= filteredCards.length) {
    flashcardIndex = 0;
  }
  const card = filteredCards[flashcardIndex] || FLASHCARDS[0];

  return `
    <div class="space-y-8 animate-fade max-w-2xl mx-auto">
      <div class="text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
          <i data-lucide="layers" class="w-4 h-4"></i> Mémorisation Active • 100 Flashcards 3D
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Flashcards de Révision 3D</h1>
        <p class="text-xs text-slate-400 mt-1">Mémorisez rapidement les définitions, pièges et mécanismes clés du programme.</p>
      </div>

      <!-- Chapter Filter Pills -->
      <div class="flex items-center justify-center gap-1.5 flex-wrap">
        ${chapters.map(ch => `
          <button onclick="setFlashcardFilter('${ch.id}')" 
                  class="px-3 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1.5 ${String(currentFlashcardFilter) === String(ch.id) ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30' : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'}">
            <span>${ch.label}</span>
          </button>
        `).join("")}
      </div>

      <!-- Card Counter Indicator -->
      <div class="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
        <span>Filtre : ${currentFlashcardFilter === 'all' ? 'Tous les Chapitres' : ('Chapitre ' + currentFlashcardFilter)}</span>
        <span class="text-amber-400 font-bold">${flashcardIndex + 1} / ${filteredCards.length}</span>
      </div>

      <!-- 3D Flip Card Container -->
      <div class="perspective-1000 w-full min-h-[300px] h-80 cursor-pointer select-none" onclick="flipActiveCard()">
        <div id="activeCardInner" class="flashcard-inner relative w-full h-full transform-style-3d">
          <!-- Front Side -->
          <div class="absolute inset-0 backface-hidden figma-card p-8 rounded-3xl flex flex-col justify-between items-center text-center shadow-2xl border-indigo-500/30 bg-gradient-to-br from-[#0c1322] to-[#070a12]">
            <div class="flex items-center justify-between w-full">
              <span class="badge-tag bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">${card.chapterTitle ? card.chapterTitle.split(':')[0] : 'Ch ' + card.chapter}</span>
              <span class="badge-tech text-[10px]">${card.tag}</span>
            </div>
            <h3 class="text-base md:text-lg font-bold text-white leading-relaxed px-4">${card.front}</h3>
            <div class="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <i data-lucide="rotate-cw" class="w-3.5 h-3.5 text-indigo-400"></i> Cliquez pour voir la réponse
            </div>
          </div>

          <!-- Back Side -->
          <div class="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#081824] via-[#091520] to-[#060e18] p-8 rounded-3xl border border-emerald-500/40 flex flex-col justify-between items-center text-center shadow-2xl">
            <div class="flex items-center justify-between w-full">
              <span class="badge-tag bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Règle & Explication</span>
              <span class="text-[10px] font-mono text-slate-400">${card.tag}</span>
            </div>
            <p class="text-xs md:text-sm text-slate-200 leading-relaxed font-medium px-2 whitespace-pre-line">${card.back}</p>
            <div class="text-xs text-slate-400 font-mono flex items-center gap-1">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-emerald-400"></i> Cliquez pour retourner
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Controls -->
      <div class="flex items-center justify-between pt-2">
        <button onclick="flashcardIndex=(flashcardIndex-1+${filteredCards.length})%${filteredCards.length}; showView('flashcards')" 
                class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2 border border-slate-800 transition active:scale-95">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Précédente
        </button>
        <button onclick="flashcardIndex=Math.floor(Math.random()*${filteredCards.length}); showView('flashcards')" 
                class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-amber-400 flex items-center gap-1.5 border border-slate-800 transition active:scale-95">
          <i data-lucide="shuffle" class="w-4 h-4"></i> Aléatoire
        </button>
        <button onclick="flashcardIndex=(flashcardIndex+1)%${filteredCards.length}; showView('flashcards')" 
                class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-95">
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


// =========================================================================
// 6. GÉNÉRATEUR D'EXAMEN BLANC ALÉATOIRE (INFINI)
// =========================================================================
function generateAndStartRandomExam() {
  playAudioFeedback("click");
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  
  // 1. Piocher 10 questions aléatoires du QUIZ_BANK
  const selectedQuestions = [];
  for (let ch = 1; ch <= 6; ch++) {
    const chQuestions = QUIZ_BANK.filter(q => q.chapter === ch);
    const countToPick = (ch === 1 || ch === 2 || ch === 3 || ch === 4) ? 2 : 1;
    const shuffled = [...chQuestions].sort(() => Math.random() - 0.5);
    for (let i = 0; i < countToPick && i < shuffled.length; i++) {
      selectedQuestions.push(shuffled[i]);
    }
  }

  while (selectedQuestions.length < 10) {
    const remaining = QUIZ_BANK.filter(q => !selectedQuestions.some(sq => sq.id === q.id));
    if (remaining.length === 0) break;
    const randomPick = remaining[Math.floor(Math.random() * remaining.length)];
    selectedQuestions.push(randomPick);
  }

  const examQuestions = selectedQuestions.map((q, idx) => ({
    id: `rand_q_${idx + 1}`,
    q: `[QCM Chapitre ${q.chapter}] ${q.question}`,
    options: q.options,
    correct: q.correct,
    pts: 1,
    explain: q.explanation
  }));

  // 2. Ajouter 2 problèmes d'analyse de trace mémoire (2 pts chacun)
  const dryRunPool = [
    {
      q: "Trace Mémoire : Quelle est la valeur finale affichée par ce fragment de code ?\n\ns = 0\nfor i in range(1, 6):\n    if i % 2 == 0:\n        continue\n    s += i\nprint(s)",
      options: ["9 (car 1 + 3 + 5)", "6 (car 2 + 4)", "15 (car 1+2+3+4+5)", "10"],
      correct: 0,
      pts: 2,
      explain: "L'instruction continue ignore les itérations où i est pair (2 et 4). Seuls 1, 3 et 5 sont accumulés : 1 + 3 + 5 = 9."
    },
    {
      q: "Trace Mémoire : Quel est le contenu de la liste 'L2' après ces instructions ?\n\nL1 = [10, 20, 30]\nL2 = L1\nL2.append(40)\nL1[0] = 99",
      options: ["[99, 20, 30, 40] (Aliasing)", "[10, 20, 30, 40]", "[10, 20, 30]", "TypeError"],
      correct: 0,
      pts: 2,
      explain: "L'instruction L2 = L1 ne copie pas la liste mais crée un ALIAS pointant vers le même espace mémoire en RAM. Modifier L1 ou L2 modifie la même liste !"
    },
    {
      q: "Évaluation Logique : Quelle est la valeur retournée par l'expression suivante ?\n\nres = 0 or [] or 'Ibn Tofail' and 42\nprint(res)",
      options: ["42", "'Ibn Tofail'", "True", "0"],
      correct: 0,
      pts: 2,
      explain: "0 et [] sont Falsy. 'Ibn Tofail' est Truthy, donc l'opérateur 'and' évalue et retourne le second opérande qui est 42."
    },
    {
      q: "Slicing Négatif : Que produit l'instruction suivante sur la chaîne 'KENITRA' ?\n\ns = 'KENITRA'\nprint(s[-3::-1])",
      options: ["'TINEK'", "'ART'", "'AR'", "'INEK'"],
      correct: 0,
      pts: 2,
      explain: "s[-3] cible le caractère 'T'. Avec un pas négatif de -1, le parcours s'effectue vers la gauche : 'T', 'I', 'N', 'E', 'K' -> 'TINEK'."
    }
  ];
  const chosenDryRun = [...dryRunPool].sort(() => Math.random() - 0.5).slice(0, 2);
  chosenDryRun.forEach((dq, dIdx) => {
    examQuestions.push({
      id: `rand_trace_${dIdx + 1}`,
      q: `[Problème d'Analyse ${dIdx + 1}] ${dq.q}`,
      options: dq.options,
      correct: dq.correct,
      pts: 2,
      explain: dq.explain
    });
  });

  // 3. Ajouter 1 problème de synthèse algorithmique (6 pts)
  const algoPool = [
    {
      q: "[Synthèse Algorithmique - 6 Pts]\nSoit la fonction suivante :\ndef f(L):\n    d = {}\n    for x in L:\n        d[x] = d.get(x, 0) + 1\n    return max(d, key=d.get)\n\nQue retourne f(['a', 'b', 'a', 'c', 'a', 'b']) ?",
      options: [
        "'a' (l'élément le plus fréquent / le mode statistique)",
        "3 (le nombre d'occurrences)",
        "['a', 'b', 'c'] (les clés sans doublons)",
        "KeyError"
      ],
      correct: 0,
      pts: 6,
      explain: "Cette fonction construit l'histogramme des fréquences avec d.get(x, 0) + 1, puis max(d, key=d.get) extrait la clé possédant le nombre maximal d'occurrences ('a' apparaît 3 fois)."
    },
    {
      q: "[Synthèse Algorithmique - 6 Pts]\nOn souhaite filtrer et doubler les entiers impairs d'une liste L = [1, 2, 3, 4, 5, 6].\nQuelle liste en compréhension produit [2, 6, 10] ?",
      options: [
        "[x * 2 for x in L if x % 2 != 0]",
        "[x * 2 for x in L if x % 2 == 0]",
        "[x for x in L if x % 2 != 0 * 2]",
        "[x * 2 if x % 2 != 0 else x for x in L]"
      ],
      correct: 0,
      pts: 6,
      explain: "La syntaxe canonique est [expression for x in iterable if condition]. Pour isoler les impairs (x % 2 != 0) et doubler leur valeur : [1*2, 3*2, 5*2] = [2, 6, 10]."
    }
  ];
  const chosenAlgo = algoPool[Math.floor(Math.random() * algoPool.length)];
  examQuestions.push({
    id: `rand_algo_1`,
    q: chosenAlgo.q,
    options: chosenAlgo.options,
    correct: chosenAlgo.correct,
    pts: 6,
    explain: chosenAlgo.explain
  });

  const randomExam = {
    id: `exam_rand_${randomNum}`,
    sessionBadge: `BLANC #${randomNum}`,
    title: `Examen Blanc Aléatoire Inédit #${randomNum}`,
    desc: `Épreuve générée dynamiquement : 10 QCM du programme (10 pts) + 2 analyses de trace mémoire (4 pts) + 1 synthèse algorithmique (6 pts). Barème complet sur 20 points.`,
    duration: 45,
    totalPoints: 20,
    questions: examQuestions
  };

  startExam(randomExam);
}

// =========================================================================
// 7. PLAYGROUND & SANDBOX PYTHON LIBRE
// =========================================================================
function renderPlaygroundView() {
  return `
    <div class="space-y-8 animate-fade max-w-5xl mx-auto">
      <!-- Header -->
      <div class="figma-card p-6 md:p-8 rounded-3xl border-rose-500/20 bg-gradient-to-br from-[#120e24] via-[#090b16] to-[#060810]">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold mb-2 border border-rose-500/20">
              <i data-lucide="terminal" class="w-4 h-4"></i> Environnement Libre • Python 3.12
            </div>
            <h1 class="text-2xl md:text-3xl font-black text-white">Playground Python Universitaire</h1>
            <p class="text-xs text-slate-400 mt-1">Expérimentez librement votre code, testez vos algorithmes et chargez des modèles canoniques de Kénitra.</p>
          </div>

          <!-- Snippet Loader -->
          <div class="flex items-center gap-2">
            <select id="snippetSelector" onchange="loadSelectedSnippet()" class="bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-rose-500/50">
              <option value="">-- Charger un Algorithme Classique --</option>
              ${typeof PLAYGROUND_SNIPPETS !== 'undefined' ? PLAYGROUND_SNIPPETS.map(s => `
                <option value="${s.id}">${s.title} (${s.category})</option>
              `).join("") : ""}
            </select>
          </div>
        </div>
      </div>

      <!-- Playground Split Editor & Terminal Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <!-- Editor Side -->
        <div class="space-y-3 flex flex-col">
          <div class="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span class="flex items-center gap-1.5 text-slate-300 font-semibold">
              <i data-lucide="file-code" class="w-4 h-4 text-rose-400"></i> scratchpad.py (Éditeur)
            </span>
            <div class="flex items-center gap-3">
              <button onclick="copyPlaygroundCode()" class="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition" title="Copier le code">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copier
              </button>
              <button onclick="resetPlaygroundCode()" class="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition" title="Effacer le code">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Vierge
              </button>
            </div>
          </div>

          <div class="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#060a13] focus-within:border-rose-500/60 transition flex-1 flex flex-col min-h-[380px]">
            <div class="bg-slate-900/60 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span class="text-[10px] text-slate-500 font-mono ml-2">python 3.12 • bac à sable</span>
              </div>
              <span id="playgroundSnippetBadge" class="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20 hidden"></span>
            </div>
            <textarea id="playgroundEditor" rows="16" spellcheck="false" 
                      class="w-full flex-1 bg-transparent p-4 font-mono text-xs md:text-sm text-emerald-300 focus:outline-none resize-none leading-relaxed"># Bienvenue dans le Playground Python Libre (UIT Kénitra)
# Tapez votre propre code ou choisissez un algorithme dans le menu ci-dessus !

def salutation(nom):
    return f"Bonjour {nom}, bienvenue dans la plateforme Python !"

for i in range(1, 4):
    print(f"[{i}] {salutation('Étudiant SMI')}")
</textarea>
          </div>

          <!-- Run Buttons -->
          <div class="grid grid-cols-2 gap-3 pt-1">
            <button onclick="runPlaygroundCode()" 
                    class="py-3 px-5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition active:scale-[0.98]">
              <i data-lucide="play" class="w-4 h-4 fill-white"></i> Exécuter le code (F5)
            </button>
            <button onclick="clearPlaygroundTerminal()" 
                    class="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 transition active:scale-[0.98]">
              <i data-lucide="eraser" class="w-4 h-4"></i> Effacer la console
            </button>
          </div>
        </div>

        <!-- Terminal Side -->
        <div class="space-y-3 flex flex-col">
          <div class="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span class="flex items-center gap-1.5 text-slate-300 font-semibold">
              <i data-lucide="terminal" class="w-4 h-4 text-emerald-400"></i> Console / Sortie (Stdout & Stderr)
            </span>
            <span id="playgroundExecTimer" class="text-[10px] text-slate-500 font-mono">Prêt</span>
          </div>

          <div class="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#05070e] flex-1 flex flex-col min-h-[380px]">
            <div class="bg-slate-900/60 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
              <span class="text-[10px] text-slate-500 font-mono">bash / stdout</span>
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div id="playgroundTerminal" class="p-4 font-mono text-xs md:text-sm text-slate-300 overflow-y-auto flex-1 leading-relaxed whitespace-pre-wrap">
              <span class="text-slate-600 italic">Cliquez sur « Exécuter le code » pour lancer le script...</span>
            </div>
          </div>

          <!-- Academic Tip Card -->
          <div class="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2.5">
            <i data-lucide="lightbulb" class="w-4 h-4 text-indigo-400 shrink-0 mt-0.5"></i>
            <div>
              <strong>Astuce UIT Kénitra :</strong> Vous pouvez tester les fonctions intégrées comme <code class="text-cyan-300">len()</code>, <code class="text-cyan-300">sum()</code>, <code class="text-cyan-300">ord()</code>, <code class="text-cyan-300">chr()</code>, ainsi que les découpages par tranches <code class="text-cyan-300">L[::2]</code> et dictionnaires.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function loadSelectedSnippet() {
  const sel = document.getElementById("snippetSelector");
  if (!sel || !sel.value || typeof PLAYGROUND_SNIPPETS === 'undefined') return;
  const snippet = PLAYGROUND_SNIPPETS.find(s => s.id === sel.value);
  if (!snippet) return;

  const editor = document.getElementById("playgroundEditor");
  if (editor) editor.value = snippet.code;

  const badge = document.getElementById("playgroundSnippetBadge");
  if (badge) {
    badge.innerText = `${snippet.title} (${snippet.category})`;
    badge.classList.remove("hidden");
  }
  playAudioFeedback("click");
}

function copyPlaygroundCode() {
  const editor = document.getElementById("playgroundEditor");
  if (!editor) return;
  try {
    navigator.clipboard.writeText(editor.value);
    alert("Code copié dans le presse-papier !");
  } catch (e) {
    editor.select();
    document.execCommand("copy");
    alert("Code copié dans le presse-papier !");
  }
  playAudioFeedback("click");
}

function resetPlaygroundCode() {
  const editor = document.getElementById("playgroundEditor");
  if (editor) editor.value = "# Écrivez votre code Python libre ici :\n\n";
  const badge = document.getElementById("playgroundSnippetBadge");
  if (badge) badge.classList.add("hidden");
  const sel = document.getElementById("snippetSelector");
  if (sel) sel.value = "";
  playAudioFeedback("click");
}

function clearPlaygroundTerminal() {
  const term = document.getElementById("playgroundTerminal");
  if (term) term.innerHTML = `<span class="text-slate-600 italic">Console effacée. Prêt pour une nouvelle exécution.</span>`;
  const timer = document.getElementById("playgroundExecTimer");
  if (timer) timer.innerText = "Prêt";
  playAudioFeedback("click");
}

async function runPlaygroundCode() {
  const editor = document.getElementById("playgroundEditor");
  const terminal = document.getElementById("playgroundTerminal");
  const timer = document.getElementById("playgroundExecTimer");
  if (!editor || !terminal) return;

  const code = editor.value;
  terminal.innerHTML = `<span class="text-cyan-400 font-mono flex items-center gap-2"><i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i> Exécution en cours...</span>`;
  if (timer) timer.innerText = "Exécution...";
  if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();

  const startTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const res = await executePythonApiOrFallback(code);
  const endTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const duration = Math.round(endTime - startTime);

  if (timer) timer.innerText = `Temps: ${duration} ms`;

  let termHtml = "";
  if (res.output) {
    termHtml += `<div class="text-emerald-400 whitespace-pre-wrap">${escapeHtml(res.output)}</div>`;
  }
  if (res.error) {
    termHtml += `<div class="text-rose-400 whitespace-pre-wrap font-semibold">${escapeHtml(res.error)}</div>`;
  }
  if (!res.output && !res.error) {
    termHtml += `<div class="text-slate-500 italic">Code exécuté avec succès en ${duration} ms (aucune sortie console).</div>`;
  }

  terminal.innerHTML = termHtml;

  if (res.error) {
    playAudioFeedback("error");
  } else {
    playAudioFeedback("success");
  }
}
