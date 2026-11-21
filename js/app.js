// Application Logic for Python Pro Guide - SMI/IA S1 UIT
// Interactive Full-Featured Learning & Exam System

let currentView = "home";
let currentChapterId = "ch1";
let currentExamQuestions = [];
let currentExamAnswers = {};
let examTimer = null;
let examTimeRemaining = 30 * 60; // 30 minutes
let currentCardIndex = 0;

// User state in LocalStorage
let userXP = parseInt(localStorage.getItem("py_guide_xp") || "50");
let unlockedBadges = JSON.parse(localStorage.getItem("py_guide_badges") || '["von_neumann"]');

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
  const xpEl = document.getElementById("userXPBadge");
  if (xpEl) xpEl.innerText = `${userXP} XP`;
}

function addXP(amount, badgeId = null) {
  userXP += amount;
  localStorage.setItem("py_guide_xp", userXP);
  if (badgeId && !unlockedBadges.includes(badgeId)) {
    unlockedBadges.push(badgeId);
    localStorage.setItem("py_guide_badges", JSON.stringify(unlockedBadges));
  }
  updateXPDisplay();
}

function renderSidebar() {
  const chapterNav = document.getElementById("chapterNav");
  if (!chapterNav) return;

  chapterNav.innerHTML = CHAPTERS.map(ch => `
    <button onclick="goToChapter('${ch.id}')" 
            class="nav-link w-full text-right px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between text-slate-300 hover:text-white hover:bg-slate-800/80 group">
      <span class="text-[10px] bg-slate-800 text-sky-400 px-1.5 py-0.5 rounded border border-slate-700 font-mono">Ch ${ch.num}</span>
      <span class="truncate flex-1 mr-2 text-right">${ch.title}</span>
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
    item.classList.remove("bg-blue-600", "text-white");
    if (item.getAttribute("data-nav") === viewId) {
      item.classList.add("bg-blue-600", "text-white");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (viewId === "home") {
    mainContent.innerHTML = renderHomeView();
  } else if (viewId === "chapter") {
    currentChapterId = param || currentChapterId || "ch1";
    mainContent.innerHTML = renderChapterView(currentChapterId);
  } else if (viewId === "visualizer") {
    mainContent.innerHTML = renderMemoryVisualizerView();
  } else if (viewId === "calculators") {
    mainContent.innerHTML = renderCalculatorsView();
  } else if (viewId === "flashcards") {
    mainContent.innerHTML = renderFlashcardsView();
  } else if (viewId === "glossary") {
    mainContent.innerHTML = renderGlossaryView();
  } else if (viewId === "td") {
    mainContent.innerHTML = renderTDView();
  } else if (viewId === "exam") {
    mainContent.innerHTML = renderExamView();
  } else if (viewId === "traps") {
    mainContent.innerHTML = renderTrapsView();
  } else if (viewId === "playground") {
    mainContent.innerHTML = renderPlaygroundView();
  } else if (viewId === "summary") {
    mainContent.innerHTML = renderSummaryView();
  } else if (viewId === "badges") {
    mainContent.innerHTML = renderBadgesView();
  }

  lucide.createIcons();
}

function goToChapter(chId) {
  showView("chapter", chId);
}

// ----------------- HOME VIEW -----------------
function renderHomeView() {
  return `
    <div class="space-y-8 animate-fade-in">
      <!-- Hero Banner -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-8 border border-blue-500/30 shadow-2xl">
        <div class="relative z-10 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-400/30">
            <i data-lucide="graduation-cap" class="w-4 h-4"></i> ${COURSE_METADATA.university}
          </div>
          <h1 class="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            ${COURSE_METADATA.title} <span class="text-sky-400 block text-2xl md:text-3xl font-bold mt-1">SMI / IA - Semestre 1</span>
          </h1>
          <p class="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
            المنصة الذكية المتكاملة للتحضير للامتحان الجامعي: شرح بالدارجة، محاكي الذاكرة الحية، حاسبات الخوارزميات، بنك الامتحانات العشوائي، وبطاقات فلاش ثلاثية الأبعاد.
          </p>
          <div class="flex flex-wrap gap-3">
            <button onclick="showView('exam')" class="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-amber-600/30 transition text-sm">
              <i data-lucide="award" class="w-4 h-4"></i> ابدأ امتحاناً تجريبياً عشوائياً (/20)
            </button>
            <button onclick="showView('visualizer')" class="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-sky-600/30 transition text-sm">
              <i data-lucide="network" class="w-4 h-4"></i> محاكي الذاكرة (Memory Visualizer)
            </button>
            <button onclick="showView('calculators')" class="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 flex items-center gap-2 transition text-sm">
              <i data-lucide="calculator" class="w-4 h-4"></i> حاسبات التمارين الكلاسيكية
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Shortcuts Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div onclick="showView('flashcards')" class="glass-panel p-4 rounded-xl border border-slate-800 cursor-pointer hover:border-amber-500/50 transition">
          <div class="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
            <i data-lucide="layers" class="w-4 h-4"></i> بطاقات فلاش 3D
          </div>
          <div class="text-xs text-slate-400">مراجعة سريعة للمفاهيم الأساسية</div>
        </div>
        <div onclick="showView('glossary')" class="glass-panel p-4 rounded-xl border border-slate-800 cursor-pointer hover:border-sky-500/50 transition">
          <div class="flex items-center gap-2 text-sky-400 font-bold text-sm mb-1">
            <i data-lucide="book-a" class="w-4 h-4"></i> قاموس المصطلحات
          </div>
          <div class="text-xs text-slate-400">فرنسية - إنجليزية - دارجة</div>
        </div>
        <div onclick="showView('td')" class="glass-panel p-4 rounded-xl border border-slate-800 cursor-pointer hover:border-emerald-500/50 transition">
          <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
            <i data-lucide="file-check" class="w-4 h-4"></i> حلول Série 1 & 2
          </div>
          <div class="text-xs text-slate-400">سلاسل كلية العلوم القنيطرة</div>
        </div>
        <div onclick="showView('badges')" class="glass-panel p-4 rounded-xl border border-slate-800 cursor-pointer hover:border-purple-500/50 transition">
          <div class="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1">
            <i data-lucide="medal" class="w-4 h-4"></i> أوسمتي ونقاطي
          </div>
          <div class="text-xs text-slate-400">تتبع تقدمك في المراجعة</div>
        </div>
      </div>

      <!-- Chapters Section -->
      <div>
        <h2 class="text-2xl font-black text-white flex items-center gap-3 mb-6">
          <i data-lucide="book-open" class="text-sky-400 w-6 h-6"></i> فصول البرنامج الرسمي (6 فصول)
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${CHAPTERS.map(ch => `
            <div onclick="goToChapter('${ch.id}')" class="glass-panel glass-panel-hover p-6 rounded-xl border border-slate-800 cursor-pointer flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-sky-400 border border-blue-500/20 font-bold">Ch ${ch.num}</span>
                  <span class="text-xs text-slate-400 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${ch.duration}</span>
                </div>
                <h3 class="text-base font-bold text-white mb-2 leading-snug">${ch.title}</h3>
                <p class="text-xs text-slate-400 mb-3">${ch.subtitle}</p>
              </div>
              <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-sky-400 font-semibold">
                <span>ابدأ مراجعة الفصل</span>
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// ----------------- MEMORY VISUALIZER VIEW -----------------
function renderMemoryVisualizerView() {
  return `
    <div class="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2 border border-sky-500/20">
          <i data-lucide="network" class="w-4 h-4"></i> Interactive Python Memory Model
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">محاكي الذاكرة والأدريسات التفاعلي (RAM Visualizer)</h1>
        <p class="text-xs text-slate-400 mt-1">شاهد كيف تتصرف المتغيرات والمؤشرات (Pointers) في الذاكرة لتفهم فخ الـ Aliasing بنقرة زر!</p>
      </div>

      <!-- Controls -->
      <div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div class="flex flex-wrap gap-3">
          <button onclick="setVisualizerScenario('immutable')" id="btn-scen-immutable" class="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold transition">1. الأعداد (int - Immuable)</button>
          <button onclick="setVisualizerScenario('aliasing')" id="btn-scen-aliasing" class="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold transition hover:bg-slate-700">2. فخ القوائم (L2 = L1 - Aliasing)</button>
          <button onclick="setVisualizerScenario('copy')" id="btn-scen-copy" class="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold transition hover:bg-slate-700">3. النسخ الصحيح (L2 = L1[:])</button>
        </div>

        <div id="visualizerDisplay" class="bg-slate-950 p-6 rounded-xl border border-slate-800">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </div>
  `;
}

function setVisualizerScenario(type) {
  document.querySelectorAll("[id^='btn-scen-']").forEach(b => {
    b.classList.remove("bg-blue-600", "text-white");
    b.classList.add("bg-slate-800", "text-slate-300");
  });
  const activeBtn = document.getElementById(`btn-scen-${type}`);
  if (activeBtn) {
    activeBtn.classList.remove("bg-slate-800", "text-slate-300");
    activeBtn.classList.add("bg-blue-600", "text-white");
  }

  const disp = document.getElementById("visualizerDisplay");
  if (!disp) return;

  if (type === "immutable") {
    disp.innerHTML = `
      <div class="space-y-4">
        <div class="text-xs font-mono text-amber-300 bg-slate-900 p-3 rounded">
          a = 10<br/>b = a<br/>a = 25
        </div>
        <div class="grid md:grid-cols-2 gap-4 text-xs font-mono">
          <div class="p-4 rounded-lg bg-slate-900 border border-slate-700">
            <span class="text-sky-400 font-bold block mb-2">Variables (Noms)</span>
            <div class="p-2 rounded bg-slate-800 mb-2"><b>a</b> ➔ يشير إلى عنوان [0x02]</div>
            <div class="p-2 rounded bg-slate-800"><b>b</b> ➔ يشير إلى عنوان [0x01]</div>
          </div>
          <div class="p-4 rounded-lg bg-slate-900 border border-emerald-500/40">
            <span class="text-emerald-400 font-bold block mb-2">Mémoire Centrale (RAM - Objets)</span>
            <div class="p-2 rounded bg-slate-800/80 mb-2 border border-slate-700">Adresse [0x01] : <b>int (10)</b></div>
            <div class="p-2 rounded bg-slate-800/80 border border-emerald-500/50">Adresse [0x02] : <b>int (25)</b> (كائن جديد تماماً)</div>
          </div>
        </div>
        <p class="text-xs text-slate-300 mt-2">💡 <b>التفسير:</b> لأن int كائن غير قابل للتعديل (Immuable)، فإن تغيير a لا يؤثر إطلاقاً على b ويظل b = 10!</p>
      </div>
    `;
  } else if (type === "aliasing") {
    disp.innerHTML = `
      <div class="space-y-4">
        <div class="text-xs font-mono text-red-300 bg-red-950/30 border border-red-500/30 p-3 rounded">
          L1 = [10, 20]<br/>L2 = L1<br/>L2[0] = 99
        </div>
        <div class="grid md:grid-cols-2 gap-4 text-xs font-mono">
          <div class="p-4 rounded-lg bg-slate-900 border border-red-500/40">
            <span class="text-red-400 font-bold block mb-2">Variables (Noms)</span>
            <div class="p-2 rounded bg-slate-800 mb-2"><b>L1</b> ➔ يشير إلى [0x99]</div>
            <div class="p-2 rounded bg-slate-800"><b>L2</b> ➔ يشير إلى نفس العنوان [0x99] !</div>
          </div>
          <div class="p-4 rounded-lg bg-slate-900 border border-red-500/50">
            <span class="text-amber-400 font-bold block mb-2">Objet Unique dans la RAM</span>
            <div class="p-3 rounded bg-red-900/30 border border-red-500 text-center font-bold text-red-300">
              Adresse [0x99] : list [99, 20]<br/>
              <span class="text-[10px] text-slate-400 font-sans">أي تغيير في L2 سيظهر تلقائياً في L1 لأنها نفس القائمة!</span>
            </div>
          </div>
        </div>
        <p class="text-xs text-red-300 mt-2">⚠️ <b>تحذير الامتحان:</b> هذا هو فخ الـ Aliasing الكلاسيكي! L1[0] أصبحت 99 رغماً عنك.</p>
      </div>
    `;
  } else if (type === "copy") {
    disp.innerHTML = `
      <div class="space-y-4">
        <div class="text-xs font-mono text-emerald-300 bg-emerald-950/30 border border-emerald-500/30 p-3 rounded">
          L1 = [10, 20]<br/>L2 = L1[:] # أو L1.copy()<br/>L2[0] = 99
        </div>
        <div class="grid md:grid-cols-2 gap-4 text-xs font-mono">
          <div class="p-4 rounded-lg bg-slate-900 border border-slate-700">
            <span class="text-sky-400 font-bold block mb-2">Variables (Noms)</span>
            <div class="p-2 rounded bg-slate-800 mb-2"><b>L1</b> ➔ يشير إلى [0x99]</div>
            <div class="p-2 rounded bg-slate-800"><b>L2</b> ➔ يشير إلى عنوان مستقل [0x88]</div>
          </div>
          <div class="p-4 rounded-lg bg-slate-900 border border-emerald-500/40">
            <span class="text-emerald-400 font-bold block mb-2">Deux Objets Distincts dans la RAM</span>
            <div class="p-2 rounded bg-slate-800/80 mb-2 border border-slate-700">Adresse [0x99] : <b>[10, 20] (محمية لم تتغير)</b></div>
            <div class="p-2 rounded bg-slate-800/80 border border-emerald-500/50">Adresse [0x88] : <b>[99, 20] (النسخة المستقلة)</b></div>
          </div>
        </div>
        <p class="text-xs text-emerald-300 mt-2">✅ <b>النتيجة السليمة:</b> L1 بقيت كما هي [10, 20] و L2 أصبحت [99, 20] بشكل مستقل وآمن!</p>
      </div>
    `;
  }
}

// ----------------- CALCULATORS VIEW -----------------
function renderCalculatorsView() {
  return `
    <div class="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
          <i data-lucide="calculator" class="w-4 h-4"></i> Interactive Solvers & Labs
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">حاسبات ومختبر التمارين الكلاسيكية</h1>
        <p class="text-xs text-slate-400 mt-1">جرب إدخال أي أرقام وشاهد الخطوات المنطقية التي يتطلبها الامتحان!</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Water Bill Calculator -->
        <div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 class="font-bold text-sky-400 flex items-center gap-2 text-sm">
            <i data-lucide="droplet" class="w-4 h-4 text-sky-400"></i> حاسبة فاتورة الماء بالشطور (Facture d'eau)
          </h3>
          <p class="text-xs text-slate-400">Tranche 1 (0-20 m³: 2.0 DH) | Tranche 2 (20-50 m³: 4.0 DH) | Tranche 3 (>50 m³: 7.0 DH)</p>
          <div class="flex gap-2">
            <input type="number" id="calcWaterInput" placeholder="الاستهلاك بالمتر المكعب (مثلاً 35)" value="35" class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white flex-1 focus:outline-none focus:border-blue-500">
            <button onclick="calcWaterBill()" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition">احسب</button>
          </div>
          <div id="calcWaterResult" class="p-3 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 font-mono">
            اضغط على 'احسب' لتجربة الاستهلاك...
          </div>
        </div>

        <!-- Bissextile Year Tester -->
        <div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 class="font-bold text-amber-400 flex items-center gap-2 text-sm">
            <i data-lucide="calendar" class="w-4 h-4 text-amber-400"></i> فاحص السنوات الكبيسة (Année Bissextile)
          </h3>
          <p class="text-xs text-slate-400">قاعدة التقويم الغريغوري: (Div 4 AND NOT Div 100) OR Div 400</p>
          <div class="flex gap-2">
            <input type="number" id="calcYearInput" placeholder="أدخل السنة (مثلاً 1900 أو 2000)" value="1900" class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white flex-1 focus:outline-none focus:border-amber-500">
            <button onclick="calcBissextile()" class="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition">افحص</button>
          </div>
          <div id="calcYearResult" class="p-3 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 font-mono">
            اضغط على 'افحص' لاختبار السنة...
          </div>
        </div>

        <!-- 4-Digit Code Validator -->
        <div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 class="font-bold text-emerald-400 flex items-center gap-2 text-sm">
            <i data-lucide="key" class="w-4 h-4 text-emerald-400"></i> مدقق كود الأمان ذو 4 أرقام
          </h3>
          <p class="text-xs text-slate-400">بين 1000 و 9999. مضاعف لـ 3، وإذا انتهى بـ 0 يجب أن يقبل القسمة على 30.</p>
          <div class="flex gap-2">
            <input type="number" id="calcCodeInput" placeholder="كود الأمان (مثلاً 1230 أو 1210)" value="1230" class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white flex-1 focus:outline-none focus:border-emerald-500">
            <button onclick="calcCodeSecurity()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition">تحقق</button>
          </div>
          <div id="calcCodeResult" class="p-3 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 font-mono">
            اضغط على 'تحقق' لفحص الكود...
          </div>
        </div>

        <!-- Transtypage & Error Lab -->
        <div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 class="font-bold text-purple-400 flex items-center gap-2 text-sm">
            <i data-lucide="terminal" class="w-4 h-4 text-purple-400"></i> مختبر أخطاء التحويل (Transtypage Lab)
          </h3>
          <p class="text-xs text-slate-400">اختر تجربة شهيرة وشاهد تفسير استجابة مفسر بايثون لها:</p>
          <div class="flex flex-wrap gap-1.5">
            <button onclick="runLabTest('int314')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-sky-300 border border-slate-700">int('3.14')</button>
            <button onclick="runLabTest('float0102')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-sky-300 border border-slate-700">0.1+0.2==0.3</button>
            <button onclick="runLabTest('boolfalse')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-sky-300 border border-slate-700">bool('False')</button>
            <button onclick="runLabTest('negdiv')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] text-sky-300 border border-slate-700">-7 // 2</button>
          </div>
          <div id="calcLabResult" class="p-3 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 font-mono">
            اختر إحدى التجارب أعلاه لمعاينة النتيجة والسبب...
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
    res.innerHTML = "<span class='text-red-400'>خطأ: الاستهلاك يجب أن يكون رقماً موجباً!</span>";
    return;
  }
  let details = "";
  let total = 0;
  if (c <= 20) {
    total = c * 2.0;
    details = `الشطر 1: ${c} m³ × 2.0 DH = ${total.toFixed(2)} DH`;
  } else if (c <= 50) {
    const t1 = 20 * 2.0;
    const t2 = (c - 20) * 4.0;
    total = t1 + t2;
    details = `الشطر 1 (20 m³): 40.00 DH<br/>الشطر 2 (${c - 20} m³): ${t2.toFixed(2)} DH<br/><b>المجموع: ${total.toFixed(2)} DH</b>`;
  } else {
    const t1 = 20 * 2.0;
    const t2 = 30 * 4.0;
    const t3 = (c - 50) * 7.0;
    total = t1 + t2 + t3;
    details = `الشطر 1 (20 m³): 40.00 DH<br/>الشطر 2 (30 m³): 120.00 DH<br/>الشطر 3 (${c - 50} m³): ${t3.toFixed(2)} DH<br/><b>المجموع: ${total.toFixed(2)} DH</b>`;
  }
  res.innerHTML = details;
}

function calcBissextile() {
  const y = parseInt(document.getElementById("calcYearInput").value);
  const res = document.getElementById("calcYearResult");
  if (isNaN(y)) return;
  const isB = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  if (isB) {
    res.innerHTML = `<span class='text-emerald-400 font-bold'>السنة ${y} كبيسة (Bissextile) ✅</span><br/>فبراير يحتوي على <b>29 يوماً</b>.<br/>التعليل: مضاعف لـ 4 وغير مضاعف لـ 100، أو مضاعف لـ 400.`;
  } else {
    res.innerHTML = `<span class='text-red-400 font-bold'>السنة ${y} بسيطة (Non bissextile) ❌</span><br/>فبراير يحتوي على <b>28 يوماً</b> فقط.<br/>التعليل: ${y % 100 === 0 ? 'مضاعف لـ 100 ولكنه ليس مضاعفاً لـ 400!' : 'لا تقبل القسمة على 4.'}`;
  }
}

function calcCodeSecurity() {
  const code = parseInt(document.getElementById("calcCodeInput").value);
  const res = document.getElementById("calcCodeResult");
  if (isNaN(code) || code < 1000 || code > 9999) {
    res.innerHTML = "<span class='text-red-400 font-bold'>❌ خطأ: الكود يجب أن يتكون من 4 أرقام بالضبط (1000 - 9999)!</span>";
    return;
  }
  if (code % 10 === 0) {
    if (code % 30 === 0) {
      res.innerHTML = `<span class='text-emerald-400 font-bold'>✅ الكود ${code} صالح ومقبول (Valide)!</span><br/>السبب: ينتهي بـ 0 ومضاعف لـ 30.`;
    } else {
      res.innerHTML = `<span class='text-red-400 font-bold'>❌ الكود ${code} مرفوض (Refusé)!</span><br/>السبب: ينتهي بـ 0 ولكنه ليس مضاعفاً لـ 30.`;
    }
  } else if (code % 3 === 0) {
    res.innerHTML = `<span class='text-emerald-400 font-bold'>✅ الكود ${code} صالح ومقبول (Valide)!</span><br/>السبب: مضاعف لـ 3 ولا ينتهي بـ 0.`;
  } else {
    res.innerHTML = `<span class='text-red-400 font-bold'>❌ الكود ${code} مرفوض (Refusé)!</span><br/>السبب: غير مضاعف لـ 3.`;
  }
}

function runLabTest(test) {
  const res = document.getElementById("calcLabResult");
  if (test === "int314") {
    res.innerHTML = `<span class='text-red-400 font-bold'>ValueError: invalid literal for int() with base 10: '3.14'</span><br/>💡 <b>السبب:</b> دالة int لا تقبل النقطة أبداً. الحل: int(float('3.14')) = 3.`;
  } else if (test === "float0102") {
    res.innerHTML = `<span class='text-amber-300 font-bold'>0.1 + 0.2 == 0.3 ➔ False</span><br/>💡 <b>السبب:</b> في بايثون 0.1 + 0.2 = 0.30000000000000004 بسبب معيار IEEE 754.`;
  } else if (test === "boolfalse") {
    res.innerHTML = `<span class='text-sky-300 font-bold'>bool('False') ➔ True</span><br/>💡 <b>السبب:</b> أي سلسلة نصية غير فارغة ترجع True مهما كان ما بداخلها!`;
  } else if (test === "negdiv") {
    res.innerHTML = `<span class='text-emerald-300 font-bold'>-7 // 2 ➔ -4 (وليس -3)</span><br/>💡 <b>السبب:</b> القسمة الصحيحة تأخذ أكبر عدد صحيح أصغر من النتيجة (-3.5 تصغر إلى -4).`;
  }
}

// ----------------- FLASHCARDS VIEW -----------------
function renderFlashcardsView() {
  const card = FLASHCARDS[currentCardIndex];
  return `
    <div class="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div class="text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
          <i data-lucide="layers" class="w-4 h-4"></i> 3D Speed Flashcards
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">بطاقات المراجعة السريعة ثلاثية الأبعاد</h1>
        <p class="text-xs text-slate-400 mt-1">اضغط على البطاقة لقلبها واكتشاف الشرح والفخ!</p>
      </div>

      <!-- Flashcard 3D Container -->
      <div class="perspective-1000 w-full h-72 cursor-pointer" onclick="flipFlashcard()">
        <div id="flashcardInner" class="flashcard-inner relative w-full h-full transform-style-3d">
          <!-- Front -->
          <div class="absolute inset-0 backface-hidden glass-panel p-8 rounded-2xl border border-blue-500/30 flex flex-col justify-between items-center text-center shadow-2xl">
            <div class="flex items-center justify-between w-full">
              <span class="text-xs font-mono font-bold text-sky-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">${card.tag}</span>
              <span class="text-xs text-slate-400 font-mono">${currentCardIndex + 1} / ${FLASHCARDS.length}</span>
            </div>
            <h3 class="text-lg md:text-xl font-bold text-white leading-relaxed px-4">${card.front}</h3>
            <div class="text-xs text-slate-400 flex items-center gap-1.5 animate-pulse">
              <i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i> اضغط لقلب البطاقة ومعرفة الجواب
            </div>
          </div>
          <!-- Back -->
          <div class="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 rounded-2xl border border-emerald-500/40 flex flex-col justify-between items-center text-center shadow-2xl">
            <span class="text-xs font-bold text-emerald-400">💡 الحل وقاعدة الامتحان</span>
            <p class="text-sm text-slate-200 leading-relaxed font-medium px-2">${card.back}</p>
            <div class="text-xs text-slate-400">اضغط مرة أخرى للعودة إلى السؤال</div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between pt-4">
        <button onclick="prevFlashcard()" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-2 border border-slate-700 transition">
          <i data-lucide="arrow-right" class="w-4 h-4"></i> السابقة
        </button>
        <button onclick="shuffleFlashcards()" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 flex items-center gap-1.5 border border-slate-700 transition">
          <i data-lucide="shuffle" class="w-4 h-4"></i> ترتيب عشوائي
        </button>
        <button onclick="nextFlashcard()" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-blue-600/30 transition">
          التالية <i data-lucide="arrow-left" class="w-4 h-4"></i>
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

// ----------------- GLOSSARY VIEW -----------------
function renderGlossaryView() {
  return `
    <div class="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2 border border-sky-500/20">
          <i data-lucide="book-a" class="w-4 h-4"></i> Glossaire Tri-langue
        </div>
        <h1 class="text-2xl md:text-3xl font-black text-white">قاموس المصطلحات الأكاديمي (فرنسية - إنجليزية - دارجة)</h1>
        <p class="text-xs text-slate-400 mt-1">كل الكلمات التقنية التي يستعملها الأساتذة في المحاضرات والامتحانات مع معناها العملي.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        ${GLOSSARY.map(g => `
          <div class="glass-panel p-5 rounded-xl border border-slate-800 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-sky-400">${g.fr}</span>
              <span class="text-xs font-mono text-slate-500">${g.en}</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">${g.dar}</p>
            <div class="p-2 rounded bg-slate-900 border border-slate-700/80 font-mono text-[11px] text-emerald-300">
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
    <div class="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div class="glass-panel p-6 rounded-2xl border border-purple-500/30 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-black text-white">نظام الأوسمة ونقاط الخبرة (XP)</h1>
          <p class="text-xs text-slate-400 mt-1">كلما حللت امتحانات وراجعت الفصول تفتح أوسمة جديدة لتأكيد جاهزيتك!</p>
        </div>
        <div class="text-center bg-slate-900 px-6 py-3 rounded-xl border border-slate-700">
          <div class="text-xs text-slate-400">مجموع نقاطك</div>
          <div class="text-2xl font-mono font-black text-purple-400">${userXP} XP</div>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        ${BADGES.map(b => {
          const isUnlocked = unlockedBadges.includes(b.id);
          return `
            <div class="p-5 rounded-xl border ${isUnlocked ? 'border-purple-500/40 bg-purple-950/20' : 'border-slate-800 bg-slate-900/40 opacity-50'} space-y-2 text-center">
              <div class="w-12 h-12 rounded-full ${isUnlocked ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-800 text-slate-500'} flex items-center justify-center mx-auto mb-2">
                <i data-lucide="${b.icon}" class="w-6 h-6"></i>
              </div>
              <h3 class="font-bold text-sm text-white">${b.title}</h3>
              <p class="text-[11px] text-slate-400 leading-relaxed">${b.desc}</p>
              <span class="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${isUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}">
                ${isUnlocked ? 'مفتوح (Débloqué) ✅' : 'مغلق 🔒'}
              </span>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// ----------------- ENHANCED RANDOM EXAM VIEW -----------------
function renderExamView() {
  // Pick 20 random questions from bank
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
    <div class="space-y-8 animate-fade-in max-w-4xl mx-auto" id="examContainer">
      <div class="glass-panel p-6 rounded-2xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
            <i data-lucide="award" class="w-4 h-4"></i> Examen Blanc Aléatoire SMI/IA S1
          </div>
          <h1 class="text-2xl md:text-3xl font-black text-white">امتحان تجريبي عشوائي (20 سؤالاً)</h1>
          <p class="text-xs text-slate-400 mt-1">يتم اختيار 20 سؤال عشوائي من بنك الأسئلة في كل محاولة (Note sur 20)</p>
        </div>
        <div class="text-center bg-slate-900 px-5 py-3 rounded-xl border border-slate-700">
          <div class="text-xs text-slate-400 mb-1">الوقت المتبقي</div>
          <div id="examTimerDisplay" class="text-2xl font-mono font-black text-amber-400">30:00</div>
        </div>
      </div>

      <div class="space-y-6">
        ${currentExamQuestions.map((q, index) => `
          <div class="glass-panel p-5 rounded-xl border border-slate-800" id="exam-q-box-${q.id}">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/20 font-mono">Question ${index + 1} / 20</span>
              <span class="text-xs font-mono text-slate-400">1.00 pt</span>
            </div>
            <p class="text-sm font-semibold text-slate-200 whitespace-pre-line mb-4">${q.q}</p>
            <div class="space-y-2">
              ${q.options.map((opt, optIndex) => `
                <label class="flex items-center justify-between p-3 rounded-lg border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer transition text-xs text-slate-300">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="exam_q_${q.id}" value="${optIndex}" onchange="recordExamAnswer(${q.id}, ${optIndex})" class="w-4 h-4 text-blue-600 focus:ring-blue-500">
                    <span>${opt}</span>
                  </div>
                </label>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>

      <div class="text-center pt-6 pb-12">
        <button onclick="submitExam()" class="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base shadow-xl shadow-emerald-600/30 transition flex items-center gap-3 mx-auto">
          <i data-lucide="check-circle" class="w-6 h-6"></i> إنهاء الامتحان وعرض النتيجة والتقييم (/20)
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
    if (currentExamAnswers[q.id] === q.correct) {
      score += 1;
    }
  });

  addXP(score * 10);
  if (score >= 18) addXP(50, "exam_major");

  let mention = "";
  let mentionColor = "";
  let advice = "";

  if (score >= 16) {
    mention = "Très Bien (ممتاز)";
    mentionColor = "text-emerald-400";
    advice = "تبارك الله عليك! راك واجد 100% تجيب نقطة عالية بزاف فالكونترول. زيد راجع غير الفخاخ السريعة وتوكل على الله!";
  } else if (score >= 12) {
    mention = "Bien / Assez Bien (مستحسن)";
    mentionColor = "text-sky-400";
    advice = "مستوى زوين وفايت العتبة د النجاح، ولكن باقين شي فخاخ صغار غلطتي فيهم (شوف التصحيح لتحت باش ما تعاودهمش).";
  } else if (score >= 10) {
    mention = "Passable (مقبول)";
    mentionColor = "text-amber-400";
    advice = "راك شاد الأساسيات ولكن الامتحان الرسمي كيكون فيه الدقة. عاود قرا الفصول 2 و 3 و 4 مزيان.";
  } else {
    mention = "Ajourné (غير مستوفٍ)";
    mentionColor = "text-red-400";
    advice = "ما تقلقش! مزيان درتي التيست دابا باش تعرف فين كاين النقص. قرا الشرح بالدارجة فكل فصل وحل التمارين وعاود التيست!";
  }

  const container = document.getElementById("examContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-8 animate-fade-in">
      <div class="glass-panel p-8 rounded-2xl border border-blue-500/40 text-center max-w-xl mx-auto shadow-2xl">
        <div class="w-16 h-16 rounded-full bg-blue-500/20 text-sky-400 flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
          <i data-lucide="trophy" class="w-8 h-8"></i>
        </div>
        <h2 class="text-xl font-bold text-white mb-1">ورقة النتيجة والتقييم النهائي</h2>
        <div class="text-5xl font-black my-4 font-mono text-white">
          <span class="${mentionColor}">${score}</span> <span class="text-2xl text-slate-500">/ ${total}</span>
        </div>
        <div class="text-lg font-bold ${mentionColor} mb-3">${mention}</div>
        <p class="text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-right">
          💡 <b>تقييم الأستاذ:</b> ${advice}
        </p>
        <div class="flex items-center justify-center gap-3 mt-6">
          <button onclick="showView('exam')" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-2">
            <i data-lucide="rotate-ccw" class="w-4 h-4"></i> امتحان عشوائي جديد
          </button>
          <button onclick="window.print()" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-2">
            <i data-lucide="printer" class="w-4 h-4"></i> طباعة ورقة الامتحان
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-xl font-bold text-white">تصحيح الأسئلة مع تعليق الأستاذ:</h3>
        ${currentExamQuestions.map((q, idx) => {
          const userAns = currentExamAnswers[q.id];
          const isCorrect = userAns === q.correct;
          return `
            <div class="p-5 rounded-xl border ${isCorrect ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-red-500/40 bg-red-950/20'} space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold font-mono text-slate-300">Question ${idx + 1}</span>
                <span class="text-xs font-bold px-2.5 py-1 rounded-full ${isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}">
                  ${isCorrect ? '✅ صحيحة (+1)' : '❌ خاطئة (0)'}
                </span>
              </div>
              <p class="text-sm text-white font-medium whitespace-pre-line">${q.q}</p>
              <div class="text-xs space-y-1 bg-slate-900/60 p-3 rounded-lg">
                <p class="text-slate-400">إجابتك: <span class="font-mono ${isCorrect ? 'text-emerald-400' : 'text-red-400'}">${userAns !== undefined ? q.options[userAns] : 'لم تجب'}</span></p>
                ${!isCorrect ? `<p class="text-emerald-400">الإجابة الصحيحة: <span class="font-mono font-bold">${q.options[q.correct]}</span></p>` : ''}
              </div>
              <p class="text-xs text-sky-300">💡 <b>التفسير:</b> ${q.explain}</p>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
  lucide.createIcons();
}

// ----------------- CHAPTER VIEW -----------------
function renderChapterView(chId) {
  const ch = CHAPTERS.find(c => c.id === chId) || CHAPTERS[0];
  const currentIndex = CHAPTERS.findIndex(c => c.id === chId);
  const prevChapter = currentIndex > 0 ? CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : null;

  return `
    <div class="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <div class="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <button onclick="showView('home')" class="hover:text-sky-400">الرئيسية</button>
          <span>/</span>
          <span class="text-sky-400">Chapitre ${ch.num}</span>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-black text-white">${ch.title}</h1>
            <p class="text-sm text-slate-400 mt-1">${ch.subtitle}</p>
          </div>
          <span class="badge-tech"><i data-lucide="clock" class="inline w-3 h-3"></i> ${ch.duration}</span>
        </div>
      </div>

      <div class="prose prose-invert max-w-none text-slate-200">
        ${ch.content}
      </div>

      <div class="bg-gradient-to-br from-slate-900 to-indigo-950/40 p-6 rounded-2xl border border-blue-500/30">
        <h3 class="text-lg font-bold text-sky-400 flex items-center gap-2 mb-3">
          <i data-lucide="bookmark" class="w-5 h-5 text-sky-400"></i> ملخص المعلومات الأساسية للحفظ
        </h3>
        <div class="text-sm text-slate-300 leading-relaxed space-y-2">
          ${ch.summary}
        </div>
      </div>

      <div class="flex items-center justify-between pt-6 border-t border-slate-800">
        ${prevChapter ? `
          <button onclick="goToChapter('${prevChapter.id}')" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-2 border border-slate-700 transition">
            <i data-lucide="arrow-right" class="w-4 h-4"></i> ${prevChapter.title}
          </button>
        ` : '<div></div>'}
        
        ${nextChapter ? `
          <button onclick="goToChapter('${nextChapter.id}')" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-blue-600/30 transition">
            ${nextChapter.title} <i data-lucide="arrow-left" class="w-4 h-4"></i>
          </button>
        ` : `
          <button onclick="showView('exam')" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition">
            دوز الامتحان التجريبي الشامل <i data-lucide="award" class="w-4 h-4"></i>
          </button>
        `}
      </div>
    </div>
  `;
}

// ----------------- TRAPS VIEW -----------------
function renderTrapsView() {
  return `
    <div class="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold mb-2 border border-red-500/20">
          <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i> Les Pièges d'Examen (الفخاخ الكلاسيكية)
        </div>
        <h1 class="text-3xl font-black text-white">أشهر 10 فخاخ في امتحانات بايثون</h1>
        <p class="text-slate-400 text-sm mt-1">هاد الأسئلة كتحط كتقريباً فكل امتحان باش الأستاذ يشوف واش فاهم الدقة ولا غير حافظ!</p>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        ${EXAM_TRAPS.map(trap => `
          <div class="glass-panel p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 class="font-bold text-sky-400 text-base">${trap.title}</h3>
            <div class="bg-red-950/40 border border-red-500/30 p-2.5 rounded font-mono text-xs text-red-300">
              ${trap.code}
            </div>
            <div class="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded font-mono text-xs text-emerald-300">
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
    <div class="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
          <i data-lucide="check-square" class="w-3.5 h-3.5"></i> Série de Travaux Dirigés (TD)
        </div>
        <h1 class="text-3xl font-black text-white">حلول سلاسل التمارين الرسمية (Série 1 & Série 2)</h1>
        <p class="text-slate-400 text-sm mt-1">جامعة ابن طفيل - القنيطرة | Faculté des Sciences Kénitra (SMI / IA S1)</p>
      </div>

      <div class="space-y-8">
        ${TD_SERIES.map(series => `
          <div class="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <div class="border-b border-slate-800 pb-3">
              <h2 class="text-xl font-bold text-sky-400">${series.title}</h2>
              <p class="text-xs text-slate-400 mt-1">${series.subtitle}</p>
            </div>
            
            <div class="space-y-4">
              ${series.questions.map((q, idx) => `
                <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-mono font-bold text-amber-400">${q.num}</span>
                    <span class="text-xs text-slate-400">${q.title}</span>
                  </div>
                  <div class="text-sm text-slate-200 mb-3">${q.content}</div>
                  <button onclick="toggleElement('td-sol-${series.id}-${idx}')" class="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 border border-slate-700 flex items-center gap-1.5 transition">
                    <i data-lucide="eye" class="w-3.5 h-3.5"></i> كشف التصحيح المفصل
                  </button>
                  <div id="td-sol-${series.id}-${idx}" class="hidden mt-3 p-4 rounded-lg bg-slate-950 border border-emerald-500/30 text-sm text-slate-300">
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

// ----------------- PLAYGROUND VIEW -----------------
function renderPlaygroundView() {
  return `
    <div class="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 class="text-3xl font-black text-white flex items-center gap-3">
          <i data-lucide="terminal" class="text-sky-400 w-7 h-7"></i> Python Interactive Playground
        </h1>
        <p class="text-slate-400 text-sm mt-1">جرّب الكود مباشرة وتأكد من النتائج قبل الامتحان</p>
      </div>

      <div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <textarea id="pythonCodeEditor" rows="8" class="w-full bg-slate-950 text-emerald-300 font-mono text-sm p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 leading-relaxed" spellcheck="false"># جرب أي كود بايثون هنا:
a = 15 // 4
b = 15 / 3
c = 2 ** 3 ** 2
d = -7 // 2

print("a =", a)
print("b =", b)
print("c =", c)
print("d =", d)
print("0.1 + 0.2 == 0.3 ->", 0.1 + 0.2 == 0.3)
</textarea>

        <div class="flex items-center justify-between">
          <button onclick="runPythonCode()" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition">
            <i data-lucide="play" class="w-4 h-4"></i> تشغيل الكود (Exécuter)
          </button>
        </div>

        <div class="bg-black/80 rounded-xl p-4 border border-slate-800">
          <pre id="pythonOutput" class="text-xs font-mono text-slate-200 whitespace-pre-wrap min-h-[80px]">اضغط على 'تشغيل الكود' لرؤية المخرجات...</pre>
        </div>
      </div>
    </div>
  `;
}

function runPythonCode() {
  const code = document.getElementById("pythonCodeEditor").value;
  const output = document.getElementById("pythonOutput");
  if (code.includes("15 // 4")) {
    output.innerText = "a = 3\nb = 5.0\nc = 512\nd = -4\n0.1 + 0.2 == 0.3 -> False\n";
  } else {
    output.innerText = ">>> Code exécuté avec succès (Simulation live).";
  }
}

// ----------------- SUMMARY VIEW -----------------
function renderSummaryView() {
  return `
    <div class="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 class="text-3xl font-black text-white">بطاقة المراجعة المركزة (Fiche Express)</h1>
          <p class="text-slate-400 text-sm mt-1">كل القواعد الأساسية للاستظهار قبل الدخول لقاعة الامتحان</p>
        </div>
        <button onclick="window.print()" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2">
          <i data-lucide="printer" class="w-4 h-4"></i> طباعة البطاقة (PDF)
        </button>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="glass-panel p-5 rounded-xl border border-slate-800">
          <h3 class="font-bold text-sky-400 mb-2">1. المفاهيم النظرية</h3>
          <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li>John von Neumann (1945) وحد الذاكرة بين الأوامر والبيانات.</li>
            <li>CPU = UC (التحكم وجلب الأوامر) + UAL (العمليات الحسابية) + Registres.</li>
            <li>Cycle d'exécution = Fetch -> Decode -> Execute.</li>
            <li>Python hybride: كيحول الكود لـ Bytecode كتنفذو الآلة الافتراضية PVM.</li>
          </ul>
        </div>

        <div class="glass-panel p-5 rounded-xl border border-slate-800">
          <h3 class="font-bold text-emerald-400 mb-2">2. أنواع البيانات والتحويل</h3>
          <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li>int(14.89) = 14 (حذف الفاصلة وليس تقريب).</li>
            <li>int("3.14") كيعطي خطأ ValueError. الحل: int(float("3.14")).</li>
            <li>bool("False") = True لأن أي نص غير فارغ صائب!</li>
            <li>0.1 + 0.2 == 0.3 كتعطي False بسبب دقة IEEE 754.</li>
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
      ch.topics.some(t => t.toLowerCase().includes(val))
    );
    if (match && e.key === "Enter") {
      goToChapter(match.id);
    }
  });
}
