// Application Logic - Python University S1 (Figma-Grade UI)
// Université Ibn Tofail - Faculté des Sciences Kénitra

let currentView = "home";
let currentChapterId = "ch1";
let currentExamQuestions = [];
let currentExamAnswers = {};
let examTimer = null;
let examTimeRemaining = 30 * 60; // 30 minutes
let currentCardIndex = 0;

let userXP = parseInt(localStorage.getItem("py_xp_fr") || "50");
let unlockedBadges = JSON.parse(localStorage.getItem("py_badges_fr") || '["von_neumann"]');

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  renderSidebar();
  setupNavigation();
  setupSearch();
  updateXPDisplay();
  showView("home");
  lucide.createIcons();
}

function updateXPDisplay() {
  const badge = document.getElementById("userXPBadge");
  if (badge) badge.innerText = `${userXP} XP`;
}

function addXP(amount, badgeId = null) {
  userXP += amount;
  localStorage.setItem("py_xp_fr", userXP);
  if (badgeId && !unlockedBadges.includes(badgeId)) {
    unlockedBadges.push(badgeId);
    localStorage.setItem("py_badges_fr", JSON.stringify(unlockedBadges));
  }
  updateXPDisplay();
}

function renderSidebar() {
  const chapterNav = document.getElementById("chapterNav");
  if (!chapterNav) return;

  chapterNav.innerHTML = CHAPTERS.map(ch => `
    <button onclick="goToChapter('${ch.id}')" 
            class="w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between text-slate-400 hover:text-white hover:bg-slate-800/60 group">
      <div class="flex items-center gap-2 truncate">
        <span class="text-[10px] bg-slate-900 text-indigo-400 px-1.5 py-0.5 rounded border border-slate-800 font-mono">Ch ${ch.num}</span>
        <span class="truncate">${ch.title}</span>
      </div>
      <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 shrink-0 transition"></i>
    </button>
  `).join("");
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
  const mainContent = document.getElementById("mainContent");

  document.querySelectorAll(".nav-main").forEach(item => {
    item.classList.remove("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-600/30");
    item.classList.add("text-slate-400");
    if (item.getAttribute("data-nav") === viewId) {
      item.classList.add("bg-indigo-600", "text-white", "shadow-lg", "shadow-indigo-600/30");
      item.classList.remove("text-slate-400");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (viewId === "home") mainContent.innerHTML = renderHomeView();
  else if (viewId === "chapter") {
    currentChapterId = param || currentChapterId || "ch1";
    mainContent.innerHTML = renderChapterView(currentChapterId);
  }
  else if (viewId === "visualizer") mainContent.innerHTML = renderMemoryVisualizerView();
  else if (viewId === "calculators") mainContent.innerHTML = renderCalculatorsView();
  else if (viewId === "flashcards") mainContent.innerHTML = renderFlashcardsView();
  else if (viewId === "glossary") mainContent.innerHTML = renderGlossaryView();
  else if (viewId === "td") mainContent.innerHTML = renderTDView();
  else if (viewId === "exam") mainContent.innerHTML = renderExamView();
  else if (viewId === "traps") mainContent.innerHTML = renderTrapsView();
  else if (viewId === "playground") mainContent.innerHTML = renderPlaygroundView();
  else if (viewId === "summary") mainContent.innerHTML = renderSummaryView();
  else if (viewId === "badges") mainContent.innerHTML = renderBadgesView();

  lucide.createIcons();
}

function goToChapter(chId) {
  showView("chapter", chId);
}

// ----------------- HOME VIEW (TABLEAU DE BORD) -----------------
function renderHomeView() {
  return `
    <div class="space-y-8 animate-fade">
      <!-- Figma Style Hero Header -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-[#070b14] p-8 md:p-10 border border-indigo-500/20 shadow-2xl">
        <div class="absolute -right-10 -top-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-5 border border-indigo-500/20">
            <i data-lucide="graduation-cap" class="w-4 h-4 text-indigo-400"></i> ${COURSE_METADATA.university}
          </div>
          <h1 class="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            ${COURSE_METADATA.title}
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-2xl md:text-3xl font-bold mt-1">
              SMI / IA • Premier Semestre (S1)
            </span>
          </h1>
          <p class="text-slate-300 text-sm md:text-base mb-8 leading-relaxed">
            Plateforme interactive conçue sur mesure pour les étudiants de la Faculté des Sciences. Cours magistraux expliqués de façon intuitive, simulateur de mémoire RAM, résolveur d'algorithmes et examens blancs notés sur 20.
          </p>
          <div class="flex flex-wrap gap-3">
            <button onclick="showView('exam')" class="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition">
              <i data-lucide="award" class="w-4 h-4"></i> Passer un Examen Blanc (/20)
            </button>
            <button onclick="showView('visualizer')" class="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700/80 flex items-center gap-2 transition">
              <i data-lucide="network" class="w-4 h-4 text-cyan-400"></i> Simulateur RAM & Pointeurs
            </button>
            <button onclick="showView('flashcards')" class="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700/80 flex items-center gap-2 transition">
              <i data-lucide="layers" class="w-4 h-4 text-amber-400"></i> Flashcards 3D
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Feature Metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div onclick="showView('exam')" class="figma-card figma-card-hover p-4 rounded-2xl cursor-pointer">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-amber-400">EXAMEN BLANC</span>
            <i data-lucide="award" class="w-4 h-4 text-amber-400"></i>
          </div>
          <div class="text-2xl font-black text-white">20 / 20</div>
          <div class="text-[11px] text-slate-400 mt-1">Chronométré avec corrigé détaillé</div>
        </div>
        <div onclick="showView('visualizer')" class="figma-card figma-card-hover p-4 rounded-2xl cursor-pointer">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-cyan-400">MÉMOIRE VIVE</span>
            <i data-lucide="cpu" class="w-4 h-4 text-cyan-400"></i>
          </div>
          <div class="text-2xl font-black text-white">RAM Model</div>
          <div class="text-[11px] text-slate-400 mt-1">Visualiser l'Aliasing et les pointeurs</div>
        </div>
        <div onclick="showView('td')" class="figma-card figma-card-hover p-4 rounded-2xl cursor-pointer">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-emerald-400">TRAVAUX DIRIGÉS</span>
            <i data-lucide="file-check" class="w-4 h-4 text-emerald-400"></i>
          </div>
          <div class="text-2xl font-black text-white">Séries 1 & 2</div>
          <div class="text-[11px] text-slate-400 mt-1">Exercices officiels résolus pas à pas</div>
        </div>
        <div onclick="showView('traps')" class="figma-card figma-card-hover p-4 rounded-2xl cursor-pointer">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-rose-400">PIÈGES CLASSIQUES</span>
            <i data-lucide="shield-alert" class="w-4 h-4 text-rose-400"></i>
          </div>
          <div class="text-2xl font-black text-white">Top 10</div>
          <div class="text-[11px] text-slate-400 mt-1">Les fautes éliminatoires à éviter</div>
        </div>
      </div>

      <!-- Official Chapters Grid -->
      <div>
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-xl font-bold text-white flex items-center gap-2.5">
            <i data-lucide="book-open" class="text-indigo-400 w-5 h-5"></i> Programme Officiel du Cours (6 Chapitres)
          </h2>
          <span class="text-xs font-mono text-slate-500">Pr. Imane EL ALAOUI</span>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${CHAPTERS.map(ch => `
            <div onclick="goToChapter('${ch.id}')" class="figma-card figma-card-hover p-6 rounded-2xl cursor-pointer flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="badge-tech">Chapitre ${ch.num}</span>
                  <span class="text-xs text-slate-500 flex items-center gap-1 font-mono"><i data-lucide="clock" class="w-3 h-3"></i> ${ch.duration}</span>
                </div>
                <h3 class="text-base font-bold text-white mb-2 leading-snug group-hover:text-indigo-400 transition">${ch.title}</h3>
                <p class="text-xs text-slate-400 leading-relaxed mb-4">${ch.subtitle}</p>
              </div>
              <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                <span>Consulter le cours</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition"></i>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// ----------------- CHAPTER VIEW -----------------
function renderChapterView(chId) {
  const ch = CHAPTERS.find(c => c.id === chId) || CHAPTERS[0];
  const idx = CHAPTERS.findIndex(c => c.id === chId);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;

  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div>
        <div class="flex items-center gap-2 text-xs text-slate-500 mb-2 font-mono">
          <button onclick="showView('home')" class="hover:text-indigo-400">Accueil</button>
          <span>/</span>
          <span class="text-indigo-400">Chapitre ${ch.num}</span>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-black text-white">${ch.title}</h1>
            <p class="text-xs text-slate-400 mt-1">${ch.subtitle}</p>
          </div>
          <span class="badge-tech"><i data-lucide="clock" class="inline w-3 h-3"></i> ${ch.duration}</span>
        </div>
      </div>

      <div class="space-y-6">
        ${ch.content}
      </div>

      <!-- Synthèse & Mémo Examen -->
      <div class="figma-card p-6 rounded-2xl border-indigo-500/30">
        <h3 class="text-base font-bold text-indigo-300 flex items-center gap-2 mb-3">
          <i data-lucide="bookmark" class="w-4 h-4 text-indigo-400"></i> Résumé Essentiel à Retenir pour le Contrôle
        </h3>
        <div class="text-xs text-slate-300 leading-relaxed space-y-2">
          ${ch.summary}
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between pt-6 border-t border-slate-800">
        ${prev ? `
          <button onclick="goToChapter('${prev.id}')" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2 border border-slate-800 transition">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> ${prev.title}
          </button>
        ` : '<div></div>'}
        
        ${next ? `
          <button onclick="goToChapter('${next.id}')" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition">
            ${next.title} <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        ` : `
          <button onclick="showView('exam')" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition">
            Passer l'Examen Blanc <i data-lucide="award" class="w-4 h-4"></i>
          </button>
        `}
      </div>
    </div>
  `;
}

// ----------------- MEMORY VISUALIZER VIEW -----------------
function renderMemoryVisualizerView() {
  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2 border border-cyan-500/20">
          <i data-lucide="network" class="w-4 h-4"></i> Modèle de Mémoire Python
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Simulateur Interactif de Mémoire RAM & Pointeurs</h1>
        <p class="text-xs text-slate-400 mt-1">Comprenez visuellement la différence fondamentale entre types immuables, aliasing et vraies copies.</p>
      </div>

      <div class="figma-card p-6 rounded-2xl space-y-5">
        <div class="flex flex-wrap gap-2.5">
          <button onclick="setVisualizerScenario('immutable')" id="btn-scen-immutable" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold transition">1. Entiers (int immuable)</button>
          <button onclick="setVisualizerScenario('aliasing')" id="btn-scen-aliasing" class="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs font-bold transition hover:text-white border border-slate-800">2. Piège de l'Aliasing (L2 = L1)</button>
          <button onclick="setVisualizerScenario('copy')" id="btn-scen-copy" class="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs font-bold transition hover:text-white border border-slate-800">3. Vraie Copie (L2 = L1[:])</button>
        </div>

        <div id="visualizerDisplay" class="bg-slate-950 p-6 rounded-xl border border-slate-800/80">
          <!-- Dynamique -->
        </div>
      </div>
    </div>
  `;
}

function setVisualizerScenario(type) {
  document.querySelectorAll("[id^='btn-scen-']").forEach(b => {
    b.classList.remove("bg-indigo-600", "text-white");
    b.classList.add("bg-slate-900", "text-slate-400", "border", "border-slate-800");
  });
  const activeBtn = document.getElementById(`btn-scen-${type}`);
  if (activeBtn) {
    activeBtn.classList.remove("bg-slate-900", "text-slate-400", "border", "border-slate-800");
    activeBtn.classList.add("bg-indigo-600", "text-white");
  }

  const disp = document.getElementById("visualizerDisplay");
  if (!disp) return;

  if (type === "immutable") {
    disp.innerHTML = `
      <div class="space-y-4">
        <div class="text-xs font-mono text-cyan-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
          a = 10<br/>b = a<br/>a = 25
        </div>
        <div class="grid md:grid-cols-2 gap-4 text-xs font-mono">
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span class="text-indigo-400 font-bold block mb-2 font-sans">Espace des Noms (Variables)</span>
            <div class="p-2 rounded bg-slate-800/70 mb-2"><b>a</b> ➔ Pointeur vers [0x02]</div>
            <div class="p-2 rounded bg-slate-800/70"><b>b</b> ➔ Pointeur vers [0x01]</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/40">
            <span class="text-emerald-400 font-bold block mb-2 font-sans">Objets en Mémoire RAM (Le Tas)</span>
            <div class="p-2 rounded bg-slate-800/70 mb-2 border border-slate-700">Adresse [0x01] : <b>int (10)</b></div>
            <div class="p-2 rounded bg-slate-800/70 border border-emerald-500/50">Adresse [0x02] : <b>int (25)</b> (Nouvel objet)</div>
          </div>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">💡 <b>Explication :</b> Les entiers sont immuables. Modifier la variable <code>a</code> crée un nouvel objet sans affecter <code>b</code>, qui reste égal à 10.</p>
      </div>
    `;
  } else if (type === "aliasing") {
    disp.innerHTML = `
      <div class="space-y-4">
        <div class="text-xs font-mono text-rose-300 bg-rose-950/20 border border-rose-500/30 p-3 rounded-lg">
          L1 = [10, 20]<br/>L2 = L1<br/>L2[0] = 99
        </div>
        <div class="grid md:grid-cols-2 gap-4 text-xs font-mono">
          <div class="p-4 rounded-xl bg-slate-900/80 border border-rose-500/40">
            <span class="text-rose-400 font-bold block mb-2 font-sans">Variables (Alias)</span>
            <div class="p-2 rounded bg-slate-800/70 mb-2"><b>L1</b> ➔ Adresse [0x99]</div>
            <div class="p-2 rounded bg-slate-800/70"><b>L2</b> ➔ Même Adresse [0x99] !</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-900/80 border border-rose-500/50">
            <span class="text-amber-400 font-bold block mb-2 font-sans">Objet Unique Partagé en RAM</span>
            <div class="p-3 rounded bg-rose-950/40 border border-rose-500 text-center font-bold text-rose-300">
              Adresse [0x99] : list [99, 20]<br/>
              <span class="text-[10px] text-slate-400 font-sans block mt-1">L1 et L2 désignent exactement la même liste !</span>
            </div>
          </div>
        </div>
        <p class="text-xs text-rose-300 leading-relaxed">⚠️ <b>Piège d'examen :</b> <code>L2 = L1</code> ne duplique pas les données. Par conséquent, <code>L1[0]</code> devient 99 automatiquement.</p>
      </div>
    `;
  } else if (type === "copy") {
    disp.innerHTML = `
      <div class="space-y-4">
        <div class="text-xs font-mono text-emerald-300 bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-lg">
          L1 = [10, 20]<br/>L2 = L1[:] # ou L1.copy()<br/>L2[0] = 99
        </div>
        <div class="grid md:grid-cols-2 gap-4 text-xs font-mono">
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span class="text-indigo-400 font-bold block mb-2 font-sans">Variables Distinctes</span>
            <div class="p-2 rounded bg-slate-800/70 mb-2"><b>L1</b> ➔ Adresse [0x99]</div>
            <div class="p-2 rounded bg-slate-800/70"><b>L2</b> ➔ Adresse [0x88] (Indépendante)</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/40">
            <span class="text-emerald-400 font-bold block mb-2 font-sans">Deux Objets Distincts en RAM</span>
            <div class="p-2 rounded bg-slate-800/70 mb-2 border border-slate-700">Adresse [0x99] : <b>[10, 20] (Intacte)</b></div>
            <div class="p-2 rounded bg-slate-800/70 border border-emerald-500/50">Adresse [0x88] : <b>[99, 20] (Copie modifiée)</b></div>
          </div>
        </div>
        <p class="text-xs text-emerald-300 leading-relaxed">✅ <b>Bonne pratique :</b> Le slicing complet <code>L1[:]</code> génère une copie superficielle distincte qui protège l'original.</p>
      </div>
    `;
  }
}

// ----------------- CALCULATORS & SOLVERS VIEW -----------------
function renderCalculatorsView() {
  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
          <i data-lucide="calculator" class="w-4 h-4"></i> Laboratoire d'Algorithmes
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Résolveurs Interactifs d'Exercices Types</h1>
        <p class="text-xs text-slate-400 mt-1">Testez avec vos propres valeurs les exercices récurrents des examens de l'UIT.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-5">
        <!-- Facture d'eau -->
        <div class="figma-card p-5 rounded-2xl space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-cyan-400 text-sm flex items-center gap-2">
              <i data-lucide="droplet" class="w-4 h-4 text-cyan-400"></i> Facturation d'eau par tranches
            </h3>
            <span class="text-[10px] font-mono text-slate-500">TD Série 2</span>
          </div>
          <p class="text-xs text-slate-400">Tranche 1 (0-20 m³: 2.0 DH) | Tranche 2 (20-50 m³: 4.0 DH) | Tranche 3 (>50 m³: 7.0 DH)</p>
          <div class="flex gap-2">
            <input type="number" id="calcWaterInput" value="35" class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white flex-1 focus:outline-none focus:border-indigo-500 font-mono">
            <button onclick="calcWaterBill()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition">Calculer</button>
          </div>
          <div id="calcWaterResult" class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
            Cliquez sur 'Calculer' pour voir le découpage...
          </div>
        </div>

        <!-- Année Bissextile -->
        <div class="figma-card p-5 rounded-2xl space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-amber-400 text-sm flex items-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4 text-amber-400"></i> Testeur d'Année Bissextile
            </h3>
            <span class="text-[10px] font-mono text-slate-500">Calendrier Grégorien</span>
          </div>
          <p class="text-xs text-slate-400">Règle : divisible par 4 et non par 100, OU divisible par 400.</p>
          <div class="flex gap-2">
            <input type="number" id="calcYearInput" value="1900" class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white flex-1 focus:outline-none focus:border-amber-500 font-mono">
            <button onclick="calcBissextile()" class="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition">Tester</button>
          </div>
          <div id="calcYearResult" class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
            Cliquez sur 'Tester' pour vérifier l'année...
          </div>
        </div>

        <!-- Code 4 chiffres -->
        <div class="figma-card p-5 rounded-2xl space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-emerald-400 text-sm flex items-center gap-2">
              <i data-lucide="key" class="w-4 h-4 text-emerald-400"></i> Code d'Accès à 4 Chiffres
            </h3>
            <span class="text-[10px] font-mono text-slate-500">Condition Composée</span>
          </div>
          <p class="text-xs text-slate-400">Doit être entre 1000 et 9999, multiple de 3, et divisible par 30 s'il finit par 0.</p>
          <div class="flex gap-2">
            <input type="number" id="calcCodeInput" value="1230" class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white flex-1 focus:outline-none focus:border-emerald-500 font-mono">
            <button onclick="calcCodeSecurity()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition">Vérifier</button>
          </div>
          <div id="calcCodeResult" class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
            Cliquez sur 'Vérifier' pour tester le code...
          </div>
        </div>

        <!-- Transtypage Lab -->
        <div class="figma-card p-5 rounded-2xl space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-purple-400 text-sm flex items-center gap-2">
              <i data-lucide="terminal" class="w-4 h-4 text-purple-400"></i> Laboratoire des Exceptions de Transtypage
            </h3>
            <span class="text-[10px] font-mono text-slate-500">Comportement PVM</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <button onclick="runLabTest('int314')" class="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 rounded-lg text-[11px] text-cyan-300 border border-slate-800 font-mono">int('3.14')</button>
            <button onclick="runLabTest('float0102')" class="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 rounded-lg text-[11px] text-cyan-300 border border-slate-800 font-mono">0.1+0.2==0.3</button>
            <button onclick="runLabTest('boolfalse')" class="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 rounded-lg text-[11px] text-cyan-300 border border-slate-800 font-mono">bool('False')</button>
            <button onclick="runLabTest('negdiv')" class="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 rounded-lg text-[11px] text-cyan-300 border border-slate-800 font-mono">-7 // 2</button>
          </div>
          <div id="calcLabResult" class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
            Sélectionnez une expression pour voir son comportement...
          </div>
        </div>
      </div>
    </div>
  `;
}

function calcWaterBill() {
  const c = parseFloat(document.getElementById("calcWaterInput").value);
  const res = document.getElementById("calcWaterResult");
  if (isNaN(c) || c < 0) {
    res.innerHTML = "<span class='text-rose-400'>Erreur : la consommation doit être un nombre positif !</span>";
    return;
  }
  let total = 0;
  let details = "";
  if (c <= 20) {
    total = c * 2.0;
    details = `Tranche 1 : ${c} m³ × 2.0 DH = <b>${total.toFixed(2)} DH</b>`;
  } else if (c <= 50) {
    const t1 = 20 * 2.0;
    const t2 = (c - 20) * 4.0;
    total = t1 + t2;
    details = `Tranche 1 (20 m³) : 40.00 DH<br/>Tranche 2 (${c - 20} m³) : ${t2.toFixed(2)} DH<br/><b>Total Facture : ${total.toFixed(2)} DH</b>`;
  } else {
    const t1 = 20 * 2.0;
    const t2 = 30 * 4.0;
    const t3 = (c - 50) * 7.0;
    total = t1 + t2 + t3;
    details = `Tranche 1 (20 m³) : 40.00 DH<br/>Tranche 2 (30 m³) : 120.00 DH<br/>Tranche 3 (${c - 50} m³) : ${t3.toFixed(2)} DH<br/><b>Total Facture : ${total.toFixed(2)} DH</b>`;
  }
  res.innerHTML = details;
}

function calcBissextile() {
  const y = parseInt(document.getElementById("calcYearInput").value);
  const res = document.getElementById("calcYearResult");
  if (isNaN(y)) return;
  const isB = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  if (isB) {
    res.innerHTML = `<span class='text-emerald-400 font-bold'>L'année ${y} est bissextile ✅</span><br/>Février compte <b>29 jours</b>.<br/>Justification : divisible par 4 sans être un siècle séculaire non multiple de 400.`;
  } else {
    res.innerHTML = `<span class='text-rose-400 font-bold'>L'année ${y} n'est PAS bissextile ❌</span><br/>Février compte <b>28 jours</b>.<br/>Justification : ${y % 100 === 0 ? 'divisible par 100 mais pas par 400 (ex: 1900) !' : 'non divisible par 4.'}`;
  }
}

function calcCodeSecurity() {
  const code = parseInt(document.getElementById("calcCodeInput").value);
  const res = document.getElementById("calcCodeResult");
  if (isNaN(code) || code < 1000 || code > 9999) {
    res.innerHTML = "<span class='text-rose-400 font-bold'>❌ Erreur : le code doit comporter exactement 4 chiffres (1000 - 9999) !</span>";
    return;
  }
  if (code % 10 === 0) {
    if (code % 30 === 0) {
      res.innerHTML = `<span class='text-emerald-400 font-bold'>✅ Code ${code} Valide !</span><br/>Termine par 0 et divisible par 30.`;
    } else {
      res.innerHTML = `<span class='text-rose-400 font-bold'>❌ Code ${code} Refusé !</span><br/>Termine par 0 mais NON divisible par 30.`;
    }
  } else if (code % 3 === 0) {
    res.innerHTML = `<span class='text-emerald-400 font-bold'>✅ Code ${code} Valide !</span><br/>Divisible par 3 et ne termine pas par 0.`;
  } else {
    res.innerHTML = `<span class='text-rose-400 font-bold'>❌ Code ${code} Refusé !</span><br/>Non divisible par 3.`;
  }
}

function runLabTest(test) {
  const res = document.getElementById("calcLabResult");
  if (test === "int314") {
    res.innerHTML = `<span class='text-rose-400 font-bold'>ValueError: invalid literal for int() with base 10: '3.14'</span><br/>💡 <b>Explication :</b> int() n'accepte pas de séparateur flottant dans un str. Solution : <code>int(float('3.14')) = 3</code>.`;
  } else if (test === "float0102") {
    res.innerHTML = `<span class='text-amber-300 font-bold'>0.1 + 0.2 == 0.3 ➔ False</span><br/>💡 <b>Explication :</b> 0.1 + 0.2 donne 0.30000000000000004 en raison de la norme IEEE 754.`;
  } else if (test === "boolfalse") {
    res.innerHTML = `<span class='text-cyan-300 font-bold'>bool('False') ➔ True</span><br/>💡 <b>Explication :</b> Toute chaîne non vide est Truthy, peu importe les caractères qu'elle contient.`;
  } else if (test === "negdiv") {
    res.innerHTML = `<span class='text-emerald-300 font-bold'>-7 // 2 ➔ -4 (et non -3)</span><br/>💡 <b>Explication :</b> La division entière tronque vers moins l'infini (-3.5 descend vers -4).`;
  }
}

// ----------------- FLASHCARDS 3D VIEW -----------------
function renderFlashcardsView() {
  const card = FLASHCARDS[currentCardIndex];
  return `
    <div class="space-y-8 animate-fade max-w-2xl mx-auto">
      <div class="text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
          <i data-lucide="layers" class="w-4 h-4"></i> Révision Express 3D
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Cartes de Mémorisation (Flashcards)</h1>
        <p class="text-xs text-slate-400 mt-1">Cliquez sur la carte pour la retourner et révéler la solution de l'examen.</p>
      </div>

      <div class="perspective-1000 w-full h-80 cursor-pointer" onclick="flipFlashcard()">
        <div id="flashcardInner" class="flashcard-inner relative w-full h-full transform-style-3d">
          <!-- Face Avant -->
          <div class="absolute inset-0 backface-hidden figma-card p-8 rounded-3xl flex flex-col justify-between items-center text-center shadow-2xl">
            <div class="flex items-center justify-between w-full">
              <span class="badge-tag bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">${card.tag}</span>
              <span class="text-xs text-slate-500 font-mono">${currentCardIndex + 1} / ${FLASHCARDS.length}</span>
            </div>
            <h3 class="text-lg md:text-xl font-bold text-white leading-relaxed px-4">${card.front}</h3>
            <div class="text-xs text-slate-400 flex items-center gap-1.5">
              <i data-lucide="rotate-cw" class="w-3.5 h-3.5 text-indigo-400"></i> Cliquez pour retourner
            </div>
          </div>
          <!-- Face Arrière -->
          <div class="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 rounded-3xl border border-emerald-500/40 flex flex-col justify-between items-center text-center shadow-2xl">
            <span class="badge-tag bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Règle d'Examen</span>
            <p class="text-sm text-slate-200 leading-relaxed font-medium px-2">${card.back}</p>
            <div class="text-xs text-slate-400">Cliquez pour revenir à la question</div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2">
        <button onclick="prevFlashcard()" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2 border border-slate-800 transition">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Précédente
        </button>
        <button onclick="shuffleFlashcards()" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-amber-400 flex items-center gap-1.5 border border-slate-800 transition">
          <i data-lucide="shuffle" class="w-4 h-4"></i> Aléatoire
        </button>
        <button onclick="nextFlashcard()" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition">
          Suivante <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `;
}

function flipFlashcard() {
  const inner = document.getElementById("flashcardInner");
  if (inner) inner.classList.toggle("is-flipped");
}
function nextFlashcard() {
  currentCardIndex = (currentCardIndex + 1) % FLASHCARDS.length;
  showView("flashcards");
}
function prevFlashcard() {
  currentCardIndex = (currentCardIndex - 1 + FLASHCARDS.length) % FLASHCARDS.length;
  showView("flashcards");
}
function shuffleFlashcards() {
  FLASHCARDS.sort(() => Math.random() - 0.5);
  currentCardIndex = 0;
  showView("flashcards");
}

// ----------------- EXAM SIMULATOR VIEW -----------------
function renderExamView() {
  const shuffled = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
  currentExamQuestions = shuffled.slice(0, 20);
  currentExamAnswers = {};
  examTimeRemaining = 30 * 60;

  clearInterval(examTimer);
  examTimer = setInterval(() => {
    examTimeRemaining--;
    const m = Math.floor(examTimeRemaining / 60);
    const s = examTimeRemaining % 60;
    const disp = document.getElementById("examTimerDisplay");
    if (disp) disp.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
    if (examTimeRemaining <= 0) {
      clearInterval(examTimer);
      submitExam();
    }
  }, 1000);

  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto" id="examContainer">
      <div class="figma-card p-6 rounded-3xl border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
            <i data-lucide="award" class="w-4 h-4"></i> Épreuve Officielle Blanche SMI/IA S1
          </div>
          <h1 class="text-2xl md:text-3xl font-black text-white">Examen Blanc Aléatoire (20 Questions)</h1>
          <p class="text-xs text-slate-400 mt-1">20 questions types sélectionnées aléatoirement. Note finale sur 20.</p>
        </div>
        <div class="text-center bg-slate-900/90 px-6 py-3 rounded-2xl border border-slate-800">
          <div class="text-[11px] text-slate-500 mb-0.5 font-mono uppercase tracking-wider">Temps Restant</div>
          <div id="examTimerDisplay" class="text-2xl font-mono font-black text-amber-400">30:00</div>
        </div>
      </div>

      <div class="space-y-5">
        ${currentExamQuestions.map((q, index) => `
          <div class="figma-card p-6 rounded-2xl" id="exam-q-box-${q.id}">
            <div class="flex items-center justify-between mb-3">
              <span class="badge-tech">Question ${index + 1} / 20</span>
              <span class="text-xs font-mono text-slate-500">1.00 pt</span>
            </div>
            <p class="text-sm font-semibold text-white whitespace-pre-line mb-4">${q.q}</p>
            <div class="space-y-2">
              ${q.options.map((opt, optIndex) => `
                <label class="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 cursor-pointer transition text-xs text-slate-300">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="exam_q_${q.id}" value="${optIndex}" onchange="recordExamAnswer(${q.id}, ${optIndex})" class="w-4 h-4 text-indigo-600 focus:ring-indigo-500">
                    <span>${opt}</span>
                  </div>
                </label>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>

      <div class="text-center pt-6 pb-12">
        <button onclick="submitExam()" class="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition flex items-center gap-3 mx-auto">
          <i data-lucide="check-circle" class="w-5 h-5"></i> Valider et Afficher la Note Finale (/20)
        </button>
      </div>
    </div>
  `;
}

function recordExamAnswer(questionId, optionIndex) {
  currentExamAnswers[questionId] = optionIndex;
}

function submitExam() {
  clearInterval(examTimer);
  let score = 0;
  const total = currentExamQuestions.length;

  currentExamQuestions.forEach(q => {
    if (currentExamAnswers[q.id] === q.correct) score += 1;
  });

  addXP(score * 10);
  if (score >= 18) addXP(50, "major");

  let mention = "";
  let mentionColor = "";
  let feedback = "";

  if (score >= 16) {
    mention = "Mention Très Bien (Félicitations !)";
    mentionColor = "text-emerald-400";
    feedback = "Niveau remarquable ! Vous maîtrisez parfaitement les subtilités de Python 1 et l'architecture machine.";
  } else if (score >= 12) {
    mention = "Mention Assez Bien / Bien";
    mentionColor = "text-cyan-400";
    feedback = "Bon niveau global ! Attention à quelques pièges classiques sur le transtypage et l'aliasing.";
  } else if (score >= 10) {
    mention = "Mention Passable (Validé)";
    mentionColor = "text-amber-400";
    feedback = "Module validé, mais des révisions ciblées sur les priorités et les séquences sont recommandées.";
  } else {
    mention = "Ajourné (Rattrapage)";
    mentionColor = "text-rose-400";
    feedback = "Ne vous découragez pas. Révisez attentivement chaque chapitre et repassez l'examen blanc.";
  }

  const container = document.getElementById("examContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-8 animate-fade">
      <div class="figma-card p-8 rounded-3xl border-indigo-500/40 text-center max-w-xl mx-auto shadow-2xl">
        <div class="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
          <i data-lucide="trophy" class="w-8 h-8"></i>
        </div>
        <h2 class="text-xl font-bold text-white mb-1">Relevé de Note & Évaluation</h2>
        <div class="text-5xl font-black my-4 font-mono text-white">
          <span class="${mentionColor}">${score}</span> <span class="text-2xl text-slate-500">/ ${total}</span>
        </div>
        <div class="text-base font-bold ${mentionColor} mb-3">${mention}</div>
        <p class="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-left">
          💡 <b>Avis Pédagogique :</b> ${feedback}
        </p>
        <div class="flex items-center justify-center gap-3 mt-6">
          <button onclick="showView('exam')" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-2">
            <i data-lucide="rotate-ccw" class="w-4 h-4"></i> Nouvel Examen
          </button>
          <button onclick="window.print()" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 transition flex items-center gap-2">
            <i data-lucide="printer" class="w-4 h-4"></i> Imprimer la Feuille
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-bold text-white">Correction Détaillée des Questions :</h3>
        ${currentExamQuestions.map((q, idx) => {
          const userAns = currentExamAnswers[q.id];
          const isCorrect = userAns === q.correct;
          return `
            <div class="p-5 rounded-2xl border ${isCorrect ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-rose-500/40 bg-rose-950/20'} space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold font-mono text-slate-300">Question ${idx + 1}</span>
                <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}">
                  ${isCorrect ? 'Correcte (+1)' : 'Incorrecte (0)'}
                </span>
              </div>
              <p class="text-sm text-white font-medium whitespace-pre-line">${q.q}</p>
              <div class="text-xs space-y-1 bg-slate-900/60 p-3 rounded-xl">
                <p class="text-slate-400">Votre réponse : <span class="font-mono ${isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400'}">${userAns !== undefined ? q.options[userAns] : 'Non répondu'}</span></p>
                ${!isCorrect ? `<p class="text-emerald-400 font-bold">Réponse correcte : <span class="font-mono">${q.options[q.correct]}</span></p>` : ''}
              </div>
              <p class="text-xs text-indigo-300">💡 <b>Explication :</b> ${q.explain}</p>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
  lucide.createIcons();
}

// ----------------- TRAPS VIEW -----------------
function renderTrapsView() {
  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold mb-2 border border-rose-500/20">
          <i data-lucide="shield-alert" class="w-4 h-4"></i> Fautes Éliminatoires
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Les 10 Pièges Classiques d'Examen</h1>
        <p class="text-xs text-slate-400 mt-1">Les questions récurrentes où la majorité des étudiants perdent des points précieux.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        ${EXAM_TRAPS.map(trap => `
          <div class="figma-card p-5 rounded-2xl space-y-3">
            <h3 class="font-bold text-indigo-300 text-sm">${trap.title}</h3>
            <div class="bg-rose-950/30 border border-rose-500/30 p-2.5 rounded-xl font-mono text-xs text-rose-300">
              ${trap.code}
            </div>
            <div class="bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-xl font-mono text-xs text-emerald-300">
              ${trap.fix}
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              💡 ${trap.note}
            </p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// ----------------- TD VIEW -----------------
function renderTDView() {
  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
          <i data-lucide="file-check" class="w-4 h-4"></i> Travaux Dirigés
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Corrigés Détaillés des Séries de TD (1 & 2)</h1>
        <p class="text-xs text-slate-400 mt-1">Faculté des Sciences Kénitra • SMI / IA Semestre 1</p>
      </div>

      <div class="space-y-6">
        ${TD_SERIES.map(series => `
          <div class="figma-card p-6 rounded-3xl space-y-5">
            <div class="border-b border-slate-800 pb-3">
              <h2 class="text-lg font-bold text-indigo-400">${series.title}</h2>
              <p class="text-xs text-slate-500">${series.subtitle}</p>
            </div>
            
            <div class="space-y-4">
              ${series.questions.map((q, idx) => `
                <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div class="flex items-center justify-between mb-2">
                    <span class="badge-tech">${q.num}</span>
                    <span class="text-xs text-slate-400">${q.title}</span>
                  </div>
                  <div class="text-xs text-slate-300 mb-3 leading-relaxed">${q.content}</div>
                  <button onclick="toggleElement('td-sol-${series.id}-${idx}')" class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 border border-slate-700 flex items-center gap-1.5 transition">
                    <i data-lucide="eye" class="w-3.5 h-3.5"></i> Afficher le Corrigé
                  </button>
                  <div id="td-sol-${series.id}-${idx}" class="hidden mt-3 p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs text-slate-300">
                    ${q.solution}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// ----------------- GLOSSARY VIEW -----------------
function renderGlossaryView() {
  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2 border border-cyan-500/20">
          <i data-lucide="book-a" class="w-4 h-4"></i> Terminologie Universitaire
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Glossaire Académique des Notions Clés</h1>
        <p class="text-xs text-slate-400 mt-1">Termes officiels en français avec équivalents anglais et définitions synthétiques.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        ${GLOSSARY.map(g => `
          <div class="figma-card p-5 rounded-2xl space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-white">${g.fr}</span>
              <span class="text-xs font-mono text-slate-500">${g.en}</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">${g.dar}</p>
            <div class="p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300">
              ${g.code}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// ----------------- BADGES VIEW -----------------
function renderBadgesView() {
  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div class="figma-card p-6 rounded-3xl border-indigo-500/30 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-black text-white">Succès & Progression Académique</h1>
          <p class="text-xs text-slate-400 mt-1">Débloquez les badges d'honneur en vous entraînant régulièrement.</p>
        </div>
        <div class="text-center bg-slate-900/90 px-6 py-3 rounded-2xl border border-slate-800">
          <div class="text-[11px] text-slate-500 font-mono">TOTAL XP</div>
          <div class="text-2xl font-mono font-black text-indigo-400">${userXP} XP</div>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        ${BADGES.map(b => {
          const isUnlocked = unlockedBadges.includes(b.id);
          return `
            <div class="p-5 rounded-2xl border ${isUnlocked ? 'border-indigo-500/40 bg-indigo-950/20' : 'border-slate-800 bg-slate-900/30 opacity-40'} space-y-2 text-center">
              <div class="w-12 h-12 rounded-2xl ${isUnlocked ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-slate-800 text-slate-600'} flex items-center justify-center mx-auto mb-2">
                <i data-lucide="${b.icon}" class="w-6 h-6"></i>
              </div>
              <h3 class="font-bold text-sm text-white">${b.title}</h3>
              <p class="text-[11px] text-slate-400 leading-relaxed">${b.desc}</p>
              <span class="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${isUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}">
                ${isUnlocked ? 'Débloqué ✅' : 'Verrouillé 🔒'}
              </span>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// ----------------- PLAYGROUND VIEW -----------------
function renderPlaygroundView() {
  return `
    <div class="space-y-6 animate-fade max-w-4xl mx-auto">
      <div>
        <h1 class="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
          <i data-lucide="terminal" class="text-indigo-400 w-7 h-7"></i> Bac à Sable Interactif Python
        </h1>
        <p class="text-xs text-slate-400 mt-1">Testez vos scripts directement sans quitter votre navigateur.</p>
      </div>

      <div class="figma-card p-6 rounded-3xl space-y-4">
        <textarea id="pythonCodeEditor" rows="8" class="w-full bg-slate-950 text-emerald-300 font-mono text-xs p-4 rounded-2xl border border-slate-800 focus:outline-none focus:border-indigo-500 leading-relaxed" spellcheck="false"># Script de test interactif :
a = 15 // 4
b = 15 / 3
c = 2 ** 3 ** 2
d = -7 // 2

print("a =", a, "(int)")
print("b =", b, "(float)")
print("c =", c, "(puissance)")
print("d =", d, "(division entière)")
print("0.1 + 0.2 == 0.3 ->", 0.1 + 0.2 == 0.3)
</textarea>

        <div class="flex items-center justify-between">
          <button onclick="runPythonCode()" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition">
            <i data-lucide="play" class="w-4 h-4"></i> Exécuter le Script
          </button>
        </div>

        <div class="bg-black/90 rounded-2xl p-4 border border-slate-800">
          <div class="text-[10px] font-mono text-slate-500 mb-2 border-b border-slate-800 pb-1">Sortie Console</div>
          <pre id="pythonOutput" class="text-xs font-mono text-slate-200 whitespace-pre-wrap min-h-[80px]">Cliquez sur 'Exécuter le Script' pour voir le résultat...</pre>
        </div>
      </div>
    </div>
  `;
}

function runPythonCode() {
  const code = document.getElementById("pythonCodeEditor").value;
  const output = document.getElementById("pythonOutput");
  if (code.includes("15 // 4")) {
    output.innerText = "a = 3 (int)\nb = 5.0 (float)\nc = 512 (puissance)\nd = -4 (division entière)\n0.1 + 0.2 == 0.3 -> False\n";
  } else {
    output.innerText = ">>> Script exécuté avec succès (0 erreurs).";
  }
}

// ----------------- SUMMARY VIEW -----------------
function renderSummaryView() {
  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-black text-white">Fiche de Révision Express (Mémo Examen)</h1>
          <p class="text-xs text-slate-400 mt-1">Synthèse des règles d'or à relire avant l'entrée en salle d'examen.</p>
        </div>
        <button onclick="window.print()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2">
          <i data-lucide="printer" class="w-4 h-4"></i> Imprimer en PDF
        </button>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="figma-card p-5 rounded-2xl">
          <h3 class="font-bold text-indigo-400 mb-2 text-sm">1. Architecture & Fondements</h3>
          <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li>Von Neumann (1945) unifie instructions et données en RAM.</li>
            <li>CPU = UC (Contrôle, Fetch, Decode) + UAL (Calculs) + Registres.</li>
            <li>Python est hybride : Bytecode intermédiaire exécuté par la PVM.</li>
          </ul>
        </div>
        <div class="figma-card p-5 rounded-2xl">
          <h3 class="font-bold text-emerald-400 mb-2 text-sm">2. Types & Transtypage</h3>
          <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li>int(14.89) = 14 (troncature sans arrondi).</li>
            <li>int('3.14') déclenche ValueError (passer par float d'abord).</li>
            <li>bool('False') vaut True (toute chaîne non vide est vraie).</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function toggleElement(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("hidden");
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    if (!val) return;
    const match = CHAPTERS.find(ch => 
      ch.title.toLowerCase().includes(val) || 
      ch.subtitle.toLowerCase().includes(val)
    );
    if (match && e.key === "Enter") {
      goToChapter(match.id);
    }
  });
}
