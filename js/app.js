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
  doneExercises: [],
  passedExams: {},
  passedQuizzes: []
}));

function saveProgress() {
  localStorage.setItem("py_progress_v2", JSON.stringify(userProgress));
  updateProgressBar();
}

function calculateProgress() {
  const totalChapters = DETAILED_COURSES.length; // 6
  let totalExos = 0;
  Object.keys(CHAPTER_EXERCISES).forEach(k => totalExos += CHAPTER_EXERCISES[k].length); // 24
  const totalExams = EXAM_SUBJECTS.length; // 2
  const totalItems = totalChapters + totalExos + totalExams;

  const doneChapters = userProgress.readChapters.length;
  const doneExos = userProgress.doneExercises.length;
  const doneExams = Object.keys(userProgress.passedExams).length;
  const totalDone = doneChapters + doneExos + doneExams;

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
    subtext.innerText = `${userProgress.readChapters.length}/6 Cours • ${userProgress.doneExercises.length}/${totalExos} Exercices • ${Object.keys(userProgress.passedExams).length}/2 Examens`;
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

// ----------------- 1. COURS DÉTAILLÉS & RÉSUMÉS -----------------
function renderCoursesView(chapterId) {
  const ch = DETAILED_COURSES.find(c => c.id === chapterId) || DETAILED_COURSES[0];
  const isRead = userProgress.readChapters.includes(ch.id);

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
        <p class="text-xs text-slate-400 mt-1">Espace dédié pour résoudre chaque exercice avec zone de code et corrigé détaillé pas à pas.</p>
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

              <!-- Zone de Résolution / Brouillon Étudiant -->
              <div class="space-y-2">
                <span class="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Votre Espace de Résolution (Brouillon & Code) :</span>
                <textarea rows="4" placeholder="Écrivez votre raisonnement ou votre code Python ici avant de vérifier..." 
                          class="w-full bg-[#0a0f1d] border border-slate-800 rounded-2xl p-4 text-xs font-mono text-emerald-300 focus:outline-none focus:border-indigo-500"></textarea>
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

function toggleExerciseDone(exoId) {
  if (userProgress.doneExercises.includes(exoId)) {
    userProgress.doneExercises = userProgress.doneExercises.filter(id => id !== exoId);
  } else {
    userProgress.doneExercises.push(exoId);
  }
  saveProgress();
  showView("exercises", currentExerciseChapter);
}

// ----------------- 3. EXAMENS COMPLETS & CONTRÔLES -----------------
function renderExamsView() {
  if (activeExam) {
    return renderActiveExamView();
  }

  return `
    <div class="space-y-8 animate-fade max-w-5xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
          <i data-lucide="award" class="w-4 h-4"></i> Épreuves Universitaires Officielles
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Centre des Examens & Contrôles</h1>
        <p class="text-xs text-slate-400 mt-1">Épreuves complètes chronométrées avec calcul automatique de la note sur 20 et corrigé exhaustif.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        ${EXAM_SUBJECTS.map(subj => {
          const pastScore = userProgress.passedExams[subj.id];
          return `
            <div class="figma-card p-6 md:p-8 rounded-3xl space-y-4 border-slate-800 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="badge-tech text-amber-400 bg-amber-500/10 border-amber-500/30">${subj.duration} Minutes</span>
                  <span class="text-xs font-mono text-slate-500">${subj.questions.length} Questions (Note /20)</span>
                </div>
                <h3 class="text-lg font-bold text-white mb-2">${subj.title}</h3>
                <p class="text-xs text-slate-400 leading-relaxed mb-4">Épreuve complète couvrant les concepts fondamentaux, les règles PEP 8, le cycle processeur et l'analyse de code.</p>
                
                ${pastScore !== undefined ? `
                  <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex items-center justify-between font-mono">
                    <span class="text-slate-400">Dernière Note :</span>
                    <span class="font-bold text-amber-400 text-sm">${pastScore} / 20</span>
                  </div>
                ` : ''}
              </div>

              <button onclick="startExam('${subj.id}')" 
                      class="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 transition">
                <i data-lucide="play" class="w-4 h-4"></i> Démarrer l'Épreuve Maintenant
              </button>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function startExam(examId) {
  activeExam = EXAM_SUBJECTS.find(s => s.id === examId);
  examAnswers = {};
  examSeconds = activeExam.duration * 60;

  clearInterval(examTimer);
  examTimer = setInterval(() => {
    examSeconds--;
    const m = Math.floor(examSeconds / 60);
    const s = examSeconds % 60;
    const disp = document.getElementById("examTimerBox");
    if (disp) disp.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
    if (examSeconds <= 0) {
      clearInterval(examTimer);
      finishExam();
    }
  }, 1000);

  showView("exams");
}

function renderActiveExamView() {
  const subj = activeExam;
  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto" id="activeExamWrapper">
      <!-- Exam Control Bar -->
      <div class="figma-card p-6 rounded-3xl border-amber-500/30 flex flex-wrap items-center justify-between gap-4 sticky top-20 z-30 backdrop-blur-xl">
        <div>
          <span class="badge-tech text-amber-400 mb-1 inline-block">Épreuve en Cours</span>
          <h2 class="text-xl font-bold text-white">${subj.title}</h2>
        </div>
        <div class="text-center bg-slate-900 px-6 py-2.5 rounded-2xl border border-slate-800">
          <div class="text-[10px] font-mono text-slate-500 uppercase">Temps Restant</div>
          <div id="examTimerBox" class="text-2xl font-mono font-black text-amber-400">30:00</div>
        </div>
      </div>

      <!-- Question List -->
      <div class="space-y-6">
        ${subj.questions.map((q, idx) => `
          <div class="figma-card p-6 rounded-2xl space-y-4">
            <div class="flex items-center justify-between">
              <span class="badge-tech">Question ${idx + 1} / ${subj.questions.length}</span>
              <span class="text-xs font-mono text-slate-500">1.00 pt</span>
            </div>
            <p class="text-sm font-semibold text-white whitespace-pre-line leading-relaxed">${q.q}</p>
            <div class="space-y-2">
              ${q.options.map((opt, oIdx) => `
                <label class="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer transition text-xs text-slate-300">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="exam_ans_${q.id}" value="${oIdx}" onchange="recordExamAnswer(${q.id}, ${oIdx})" class="w-4 h-4 text-indigo-600 focus:ring-indigo-500">
                    <span>${opt}</span>
                  </div>
                </label>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>

      <div class="text-center pt-6 pb-12">
        <button onclick="finishExam()" class="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition flex items-center gap-2 mx-auto">
          <i data-lucide="check-circle" class="w-5 h-5"></i> Rendre la Copie & Voir la Note (/20)
        </button>
      </div>
    </div>
  `;
}

function recordExamAnswer(qId, oIdx) {
  examAnswers[qId] = oIdx;
}

function finishExam() {
  clearInterval(examTimer);
  const subj = activeExam;
  let score = 0;
  subj.questions.forEach(q => {
    if (examAnswers[q.id] === q.correct) score += 1;
  });

  userProgress.passedExams[subj.id] = score;
  saveProgress();

  const wrap = document.getElementById("activeExamWrapper");
  if (!wrap) return;

  let mention = score >= 16 ? "Mention Très Bien 🌟" : score >= 14 ? "Mention Bien ✅" : score >= 10 ? "Mention Passable (Validé) 👍" : "Ajourné (Rattrapage) ⚠️";
  let color = score >= 14 ? "text-emerald-400" : score >= 10 ? "text-amber-400" : "text-rose-400";

  wrap.innerHTML = `
    <div class="space-y-8 animate-fade">
      <div class="figma-card p-8 rounded-3xl text-center max-w-xl mx-auto border-indigo-500/40 shadow-2xl">
        <div class="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
          <i data-lucide="trophy" class="w-8 h-8"></i>
        </div>
        <h2 class="text-xl font-bold text-white mb-1">Relevé de Note Officiel</h2>
        <div class="text-5xl font-black font-mono my-3 ${color}">${score} <span class="text-2xl text-slate-600">/ 20</span></div>
        <div class="text-base font-bold ${color} mb-6">${mention}</div>
        <div class="flex items-center justify-center gap-3">
          <button onclick="activeExam=null; showView('exams')" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition">
            Retour aux Examens
          </button>
          <button onclick="window.print()" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition">
            Imprimer la Copie (PDF)
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-bold text-white">Correction Intégrale :</h3>
        ${subj.questions.map((q, idx) => {
          const userAns = examAnswers[q.id];
          const isCorrect = userAns === q.correct;
          return `
            <div class="p-5 rounded-2xl border ${isCorrect ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-rose-500/40 bg-rose-950/20'} space-y-2">
              <div class="flex items-center justify-between text-xs font-mono">
                <span class="text-slate-400">Question ${idx + 1}</span>
                <span class="${isCorrect ? 'text-emerald-400' : 'text-rose-400'} font-bold">${isCorrect ? 'Exact (+1 pt)' : 'Faux (0 pt)'}</span>
              </div>
              <p class="text-sm font-semibold text-white">${q.q}</p>
              <div class="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl space-y-1">
                <p>Votre choix : <span class="font-mono ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}">${userAns !== undefined ? q.options[userAns] : 'Non répondu'}</span></p>
                ${!isCorrect ? `<p class="text-emerald-400">Bonne réponse : <span class="font-mono font-bold">${q.options[q.correct]}</span></p>` : ''}
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

// ----------------- 4. QUIZ RAPIDE D'AUTO-ÉVALUATION -----------------
function renderQuizView() {
  const allQs = EXAM_SUBJECTS[0].questions;
  return `
    <div class="space-y-8 animate-fade max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2 border border-cyan-500/20">
          <i data-lucide="help-circle" class="w-4 h-4"></i> Auto-évaluation Directe
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">Quiz d'Auto-Évaluation Immédiate</h1>
        <p class="text-xs text-slate-400 mt-1">Testez vos connaissances question par question avec validation instantanée.</p>
      </div>

      <div class="space-y-5">
        ${allQs.map((q, qIdx) => `
          <div class="figma-card p-6 rounded-2xl space-y-3" id="quiz-box-${q.id}">
            <div class="flex items-center justify-between">
              <span class="badge-tech">QCM ${qIdx + 1}</span>
            </div>
            <p class="text-sm font-semibold text-white">${q.q}</p>
            <div class="space-y-2">
              ${q.options.map((opt, oIdx) => `
                <button onclick="checkQuizItem(${q.id}, ${oIdx}, ${q.correct})" 
                        class="quiz-btn-${q.id} w-full text-left p-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-xs text-slate-300 transition">
                  ${opt}
                </button>
              `).join("")}
            </div>
            <div id="quiz-exp-${q.id}" class="hidden p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300">
              💡 <b>Explication :</b> ${q.explain}
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
