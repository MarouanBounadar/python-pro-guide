// Data source for Python Pro Guide - SMI/IA S1
// UIT Kénitra - Faculté des Sciences - Pr. Imane EL ALAOUI

const COURSE_METADATA = {
  title: "Programmation Python 1",
  filiere: "SMI / IA - Semestre 1",
  university: "Université Ibn Tofail (UIT) - Faculté des Sciences Kénitra",
  prof: "Pr. Imane EL ALAOUI",
  contact: "elalaoui.imane@uit.ac.ma",
  description: "المنصة الجامعية التفاعلية الشاملة: شرح بالدارجة والمصطلحات التقنية، محاكي الذاكرة، حاسبات الخوارزميات، بنك الامتحانات، بطاقات فلاش وقاموس المصطلحات."
};

const CHAPTERS = [
  {
    id: "ch1",
    num: "01",
    title: "Introduction & Architecture des Ordinateurs",
    subtitle: "المعمارية، الحاسوب كيفاش كيفكر، وموقع بايثون",
    icon: "cpu",
    duration: "45 min",
    topics: [
      "Système numérique vs Système informatique",
      "Architecture de Von Neumann (1945)",
      "Les 4 Blocs : CPU (UC, UAL, Registres), RAM, E/S, Bus",
      "Cycle d'instruction : Fetch - Decode - Execute",
      "Histoire & Caractéristiques de Python (Guido van Rossum)",
      "Compilation pure vs Interprétation pure vs Approche Hybride (Bytecode + PVM)",
      "Modes d'exécution : REPL (Console) vs Mode Script (.py)",
      "Syntaxe, Commentaires et PEP 8"
    ],
    summary: `
      1. <b>Système numérique vs Système informatique</b> : كل سيستيم أنفورماتيك هو سيستيم نيميريك، ولكن ماشي العكس! النظام المعلوماتي كيكون Universellement programmable.
      2. <b>Von Neumann (1945)</b> : البرامج (Instructions) والبيانات (Données) كيتشاركو نفس الذاكرة RAM.
      3. <b>CPU</b> : فيه Unité de Contrôle (كتقود وتجيب التعليمات)، UAL (كتحسب العمليات الحسابية والمنطقية)، و Registres (ميموار سريعة بزاف وسط البروسيسور).
      4. <b>Cycle</b> : Fetch (جيب) -> Decode (فهم) -> Execute (نفّذ).
      5. <b>Python Hybride</b> : الكود .py كيتحول لـ Bytecode (.pyc) عاد كيتنفذ فوق الآلة الافتراضية PVM (Python Virtual Machine). هادشي كيجمع بين سهولة الكتابة والسرعة.
      6. <b>Mode REPL</b> : تجارب سريعة ولكن كيمشي مع إغلاق النافذة. <b>Mode Script</b> : ملف .py دائم كيتنفذ فكل وقت.
    `,
    content: `
      <div class="space-y-6">
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">1. Système Numérique vs Système Informatique</h3>
          <p class="text-slate-300 leading-relaxed mb-3">
            فالبداية خاصنا نميزو بين جوج دالمفاهيم لي الناس كيخلطو بيناتهم بزاف:
          </p>
          <div class="grid md:grid-cols-2 gap-4 my-4">
            <div class="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
              <span class="badge-tech mb-2 inline-block">Système Numérique</span>
              <p class="text-sm text-slate-300 mt-2">أي جهاز كيتعامل مع إشارات رقمية (0 و 1)، ولكن غالباً كيكون الخدمة ديالو <b>Figée (مسدودة)</b>، بحال ساعة كوارتز (Montre à quartz) أو Feu rouge.</p>
            </div>
            <div class="bg-slate-900/80 p-4 rounded-lg border border-sky-600/40">
              <span class="badge-tech mb-2 inline-block">Système Informatique</span>
              <p class="text-sm text-slate-300 mt-2">جزء من الأنظمة الرقمية، ولكن كيكون <b>Universellement programmable</b>: يعني يقدر ينفذ أي خوارزمية (Algorithm) أو سكريبت، ويأتمت معالجة البيانات المعقدة.</p>
            </div>
          </div>
          <div class="prof-speech">
            القاعدة الذهبية لي كتحط فـ QCM: <b>"Tout système informatique est numérique, mais tout système numérique n'est pas informatique."</b> (كل نظام معلومياتي راه رقمي، ولكن ماشي أي جهاز رقمي راه حاسوب معلومياتي).
          </div>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">2. Architecture de Von Neumann (1945)</h3>
          <p class="text-slate-300 mb-4">
            عالم الرياضيات والفيزياء <b>John von Neumann</b> حط الموديل لي مبنيين عليه 99% من الحواسيب لي كنعرفو اليوم. الفكرة الثورية ديالو هي: <b>Programme Enregistré</b> — الكود والبيانات بجوج كيتخزنو فـ même mémoire physique (الرام RAM).
          </p>
          
          <div class="grid md:grid-cols-4 gap-3 my-4 text-center">
            <div class="bg-slate-900 p-4 rounded-lg border border-blue-500/30">
              <div class="text-sky-400 font-bold mb-1">1. CPU (Le Cerveau)</div>
              <div class="text-xs text-slate-400">فيه UC (Unité de Contrôle) + UAL (Unité Arithmétique & Logique) + Registres</div>
            </div>
            <div class="bg-slate-900 p-4 rounded-lg border border-emerald-500/30">
              <div class="text-emerald-400 font-bold mb-1">2. RAM (Mémoire)</div>
              <div class="text-xs text-slate-400">تخزين مؤقت (Volatile) كيمشي ملي كيطفى البيسي، مقسمة لـ Zone Instructions و Zone Données</div>
            </div>
            <div class="bg-slate-900 p-4 rounded-lg border border-amber-500/30">
              <div class="text-amber-400 font-bold mb-1">3. E/S (Entrées/Sorties)</div>
              <div class="text-xs text-slate-400">Clavier, Souris, Écran, Disque Dur (SSD/HDD) لي كيدير الـ Persistance</div>
            </div>
            <div class="bg-slate-900 p-4 rounded-lg border border-purple-500/30">
              <div class="text-purple-400 font-bold mb-1">4. Les Bus</div>
              <div class="text-xs text-slate-400">الخيوطا السريعة: Bus de données (Bidirectionnel), Bus d'adresses (Unidirectionnel), Bus de contrôle</div>
            </div>
          </div>

          <div class="prof-speech">
            <b>دورة حياة أي تعليمة (Instruction) فالبروسيسور كتدوز من 3 مراحل:</b><br/>
            1. <b>Fetch (Chargement)</b>: البروسيسور كيجيب الأمر من الـ RAM.<br/>
            2. <b>Decode (Décodage)</b>: الـ UC كتفكك الشفرة وتفهم شنو مطلوب واش جمع ولا طرح.<br/>
            3. <b>Execute (Exécution)</b>: الـ UAL كتحسب النتيجة وتبدّل الـ Registres.<br/>
            <span class="text-amber-300 font-medium">ملاحظة د الامتحان:</span> كاين ما يسمى بـ <b>Von Neumann bottleneck (goulot d'étranglement)</b> لأن نقل الأوامر والداتا فـ même bus كينقص السرعة القصوى.
          </div>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">3. كيفاش كيتنفذ كود بايثون؟ (Compilation vs Interprétation vs Hybride)</h3>
          <p class="text-slate-300 mb-3">
            فالإعلاميات كاينين جوج طرق تقليدية لتنفيذ البرامج:
          </p>
          <ul class="list-disc list-inside text-sm text-slate-300 space-y-2 mb-4">
            <li><b>Compilation Pure (C, C++)</b>: الكود كيترجم كلو دقة وحدة لـ Code Machine (0 و 1) خاص بذاك البروسيسور. سريع بزاف ولكن إلا بدلت النظام خاص تعاود Compile.</li>
            <li><b>Interprétation Pure (Bash, Basic قديم)</b>: المحرك كيقرا سطر بسطر وينفذ مباشرة. ساهل فالتطوير ولكن ثقيل فالإعادة خصوصاً فالـ Boucles.</li>
          </ul>

          <div class="bg-blue-950/40 p-4 rounded-xl border border-blue-500/40 my-3">
            <h4 class="font-bold text-sky-300 mb-1">🔥 طريقة بايثون العبقرية (Technique Mixte / Hybride):</h4>
            <p class="text-sm text-slate-200">
              بايثون كيجمع بيناتهم بجوج عبر مرحلتين:
            </p>
            <ol class="list-decimal list-inside text-sm text-slate-300 mt-2 space-y-1">
              <li><b>Précompilation</b>: كيحول الكود المكتوب <code class="text-amber-300">.py</code> لـ كود وسيط كيتسمى <b>Bytecode</b> (مستقل على الماترييل).</li>
              <li><b>Interprétation par la PVM</b>: آلة افتراضية كتسمى <b>PVM (Python Virtual Machine)</b> هي لي كتقرا داك الـ Bytecode وتنفذو فوق النظام ديالك.</li>
            </ol>
          </div>

          <div class="prof-speech">
            تاريخ بايثون لي كيطيح فـ QCM: تكريا فـ <b>1989</b> على يد الهولندي <b>Guido van Rossum</b>، وخرج للعلن فـ <b>1991</b>. وسماه على الفرقة الكوميدية Monty Python ماشي على الحنش! وفالكور ديالنا كنخدمو بـ <b>Python 3</b> لي خرج وهرس التوافق (compatibilité ascendante) مع Python 2 لي مات رسمياً فـ 2020.
          </div>
        </div>
      </div>
    `,
    exercises: [
      {
        title: "تمرين تطبيقي 1: الفرق بين الأجهزة",
        question: "حدد واش الأجهزة التالية هي Systèmes numériques فقط ولا Systèmes informatiques، وعلل:",
        items: [
          "1. ساعة يدوية رقمية عادية (Montre digitale simple)",
          "2. هاتف ذكي (Smartphone)",
          "3. ميكروكونترولور فسيارة كيتحكم فالفرامل ABS ومبرمج مسبقاً وماكيقبلش برامج خارجية",
          "4. حاسوب محمول (PC Portable)"
        ],
        solution: `
          <b>1. Montre digitale:</b> Système numérique فقط (Traitement de signaux discrets mais non universellement programmable).<br/>
          <b>2. Smartphone:</b> Système informatique (Universellement programmable, y exécute des applications diverses).<br/>
          <b>3. Boîtier ABS figé:</b> Système numérique embarqué dédié.<br/>
          <b>4. PC Portable:</b> Système informatique par excellence.
        `
      }
    ],
    qcm: [
      {
        q: "شكون هو العالم لي وضع أسس معمارية الحواسيب الحديثة (Programme enregistré) سنة 1945؟",
        options: ["Alan Turing", "John von Neumann", "Guido van Rossum", "Ada Lovelace"],
        correct: 1,
        explain: "John von Neumann هو صاحب معمارية 1945 لي وحّدت تخزين الأوامر والداتا فالذاكرة RAM."
      },
      {
        q: "شنو كيتسمى الكود الوسيط لي كينتجو بايثون قبل ما تنفذو الـ PVM؟",
        options: ["Code Machine", "Bytecode", "Assembleur", "Source C"],
        correct: 1,
        explain: "بايثون كيدير précompilation للكود سورس ويردو Bytecode مستقل على نظام التشغيل عاد كتنفذو الـ PVM."
      }
    ]
  },
  {
    id: "ch2",
    num: "02",
    title: "Variables, Types de Base & Transtypage",
    subtitle: "المتغيرات، التخزين فالميموار، والتحويل بين الأنواع",
    icon: "database",
    duration: "55 min",
    topics: [
      "Qu'est-ce qu'une variable (Nom symbolique vs Adresse mémoire)",
      "Règles de nommage (PEP 8) & Identificateurs valides/invalides",
      "Mots-clés réservés (Keywords)",
      "Déclaration, Initialisation et Typage Dynamique",
      "Affectation multiple : En chaîne vs Parallèle (Tuple Unpacking)",
      "Les Types scalaires : int, float (IEEE 754), complex, bool, str",
      "Transtypage (Casting) : int(), float(), str(), bool()",
      "Les Pièges d'Examen : int('3.14'), 0.1 + 0.2 == 0.3, bool('')"
    ],
    summary: `
      1. <b>Nommage</b> : حروف وأرقام و '_' فقط. ممنوع تبدا برقم! ممنوع الشرطة العادية '-' (حيت كيعتبرها طرح ناقص). Case-sensitive (\`age\` != \`Age\`).
      2. <b>Keywords</b> : كلمات محجوزة ممنوع تستعملها كأسماء بحال \`for, if, def, class, True, False, None, and, or\`.
      3. <b>Affectation</b> : من اليمين لليسار. دقة وحدة: \`a = b = c = 0\` (قيمة وحدة لعدة متغيرات)، أو \`x, y = 10, 20\` (parallèle).
      4. <b>Typage Dynamique</b> : نتا ما كتكتبش \`int x\` بحال C، بايثون كيشوف القيمة لي عتيتيه وهو كيحدد النوع تلقائياً.
      5. <b>Transtypage (Casting)</b> :
         - \`int(14.89)\` -> 14 (Troncature ماشي arrondi!).
         - \`int("3.14")\` -> 💥 <b>ValueError</b>! خاص تدوز من \`int(float("3.14"))\` لي كتعطي 3.
         - \`bool(0)\`, \`bool("")\` -> False. أي عدد آخر أو نص عامر -> True (حتى \`bool("False")\` راها True!).
      6. <b>الدقة العائمة</b> : \`0.1 + 0.2 == 0.3\` كتعطي <b>False</b> بسبب تمثيل IEEE 754 للفاصلة العائمة فالثنائي!
    `,
    content: `
      <div class="space-y-6">
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">1. شنو هي Variable فالذاكرة؟</h3>
          <p class="text-slate-300 leading-relaxed">
            المتغير (Variable) فالحقيقة هو مجرد <b>اسم رمزي (Nom symbolique)</b> كيعطيه المبرمج لواحد البلاصة فـ mémoire RAM لي عندها <b>عنوان فيزيائي (Adresse mémoire)</b>.
            فـ بايثون، التسمية كتخضع لمعايير <b>PEP 8</b>:
          </p>
          <div class="overflow-x-auto my-3">
            <table class="w-full text-sm text-left border border-slate-700">
              <thead class="bg-slate-900 text-sky-400">
                <tr><th class="p-3">Identificateur</th><th class="p-3">الحالة</th><th class="p-3">السبب / Explication</th></tr>
              </thead>
              <tbody class="divide-y divide-slate-700">
                <tr class="bg-slate-800/40"><td class="p-3 font-mono text-emerald-400">age_etudiant</td><td class="p-3 text-emerald-400">✅ Valide</td><td class="p-3">حروف و underscore</td></tr>
                <tr class="bg-slate-800/40"><td class="p-3 font-mono text-emerald-400">_total2</td><td class="p-3 text-emerald-400">✅ Valide</td><td class="p-3">ممكن يبدا بـ _ ومسموح الأرقام فالداخل</td></tr>
                <tr class="bg-slate-800/40"><td class="p-3 font-mono text-red-400">2eme_choix</td><td class="p-3 text-red-400">❌ Invalide</td><td class="p-3"><b>ممنوع يبدا برقم!</b></td></tr>
                <tr class="bg-slate-800/40"><td class="p-3 font-mono text-red-400">prix-total</td><td class="p-3 text-red-400">❌ Invalide</td><td class="p-3">الرمز '-' كيتعتبر Soustraction</td></tr>
                <tr class="bg-slate-800/40"><td class="p-3 font-mono text-red-400">total$</td><td class="p-3 text-red-400">❌ Invalide</td><td class="p-3">رمز خاص $ ممنوع</td></tr>
                <tr class="bg-slate-800/40"><td class="p-3 font-mono text-red-400">for</td><td class="p-3 text-red-400">❌ Invalide</td><td class="p-3"><b>Mot-clé réservé (Keyword)</b></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">2. Types de Données & Typage Dynamique</h3>
          <p class="text-slate-300">
            فـ بايثون ما كتحتاجش تديكلاري النوع مسبقاً (Typage dynamique). القيمة لي كتسندها هي لي كتحدد النوع:
          </p>
          <div class="grid md:grid-cols-2 gap-3 my-3 font-mono text-sm">
            <div class="bg-slate-900 p-3 rounded border border-slate-700">
              <span class="text-sky-400 font-bold">int</span> : أعداد صحيحة بدون فاصلة<br/>
              <code class="text-slate-300">age = 20</code><br/>
              <code class="text-slate-300">grand = 10**40</code>
            </div>
            <div class="bg-slate-900 p-3 rounded border border-slate-700">
              <span class="text-sky-400 font-bold">float</span> : أعداد حقيقية بفاصلة (نقطة .)<br/>
              <code class="text-slate-300">pi = 3.14</code><br/>
              <code class="text-slate-300">vitesse = 3e8</code> (3 × 10⁸)
            </div>
            <div class="bg-slate-900 p-3 rounded border border-slate-700">
              <span class="text-sky-400 font-bold">complex</span> : أعداد عقدية (j)<br/>
              <code class="text-slate-300">z = 3 + 4j</code>
            </div>
            <div class="bg-slate-900 p-3 rounded border border-slate-700">
              <span class="text-sky-400 font-bold">bool</span> : منطقي (True / False)<br/>
              <code class="text-slate-300">valide = True</code>
            </div>
          </div>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">3. Transtypage (Casting) & Pièges Classiques</h3>
          <div class="prof-piege">
            <b>فخاخ الامتحان:</b><br/>
            1. <code>int("3.14")</code> -> <b>ValueError</b>! والحل: <code>int(float("3.14"))</code> -> 3.<br/>
            2. <code>int(14.89)</code> -> <b>14</b> (حذف الفاصلة وليس تقريب).<br/>
            3. <code>bool("False")</code> -> <b>True</b>! لأن النص غير فارغ.<br/>
            4. <code>print(0.1 + 0.2 == 0.3)</code> -> <b>False</b> بسبب معيار IEEE 754.
          </div>
        </div>
      </div>
    `,
    exercises: [],
    qcm: []
  },
  {
    id: "ch3",
    num: "03",
    title: "Opérateurs, Expressions & Priorités",
    subtitle: "العمليات الحسابية والمنطقية، جدول الأولويات، و Short-circuit",
    icon: "calculator",
    duration: "50 min",
    topics: [
      "Opérateurs Arithmétiques : +, -, *, /, //, %, **",
      "Redéfinition des opérateurs sur les chaînes (+ et *)",
      "Opérateurs de Comparaison : ==, !=, >, <, >=, <=",
      "Opérateurs Logiques : and, or, not & Court-circuit",
      "Opérateurs d'adhésion : in, not in",
      "Tableau complet des priorités"
    ],
    summary: `
      1. <b>Priorités</b> : () -> ** (من اليمين لليسار) -> *, /, //, % -> +, - -> المقارنات و in -> not -> and -> or -> الإسناد =.
      2. <b>Short-circuit</b> : في \`False and (10/0 == 0)\`، بايثون يقف عند False ولا يمر لليمين فلا يحدث خطأ تقسيم!
      3. <b>Affectation</b> : \`A *= B + 2\` تعني \`A = A * (B + 2)\`.
    `,
    content: `
      <div class="space-y-4">
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">جدول الأولويات الرسمي</h3>
          <ol class="list-decimal list-inside text-sm text-slate-200 space-y-1.5 font-mono bg-slate-900 p-4 rounded-lg">
            <li>( ) الأقواس (Priorité absolue)</li>
            <li>** الأس (من اليمين لليسار: 2**3**2 = 2**9 = 512)</li>
            <li>*, /, //, % الضرب والقسمة وباقي القسمة</li>
            <li>+, - الجمع والطرح</li>
            <li>==, !=, <, <=, >, >= و in, not in المقارنات والانتماء</li>
            <li>not النفي المنطقي</li>
            <li>and 'و' المنطقية (أسبق من or!)</li>
            <li>or 'أو' المنطقية</li>
            <li>=, +=, -= الإسناد في الأخير</li>
          </ol>
        </div>
      </div>
    `,
    exercises: [],
    qcm: []
  },
  {
    id: "ch4",
    num: "04",
    title: "Structures Conditionnelles",
    subtitle: "اتخاذ القرارات: if, elif, else والشروط المركبة",
    icon: "git-branch",
    duration: "60 min",
    topics: [
      "Indentation (4 espaces, PEP 8)",
      "if simple, if...else, if...elif...else",
      "Conditions composées (and, or, not)",
      "Études de cas : Facture d'eau, Année bissextile, Code 4 chiffres"
    ],
    summary: `
      1. <b>Indentation</b> : النقطتان : و 4 مسافات تحدد الكتل البرمجية.
      2. <b>if/elif/else</b> : بايثون ينفذ أول شرط صائب ويخرج فوراً من الهيكل كاملاً!
    `,
    content: `<div class="p-6 bg-slate-800/60 rounded-xl border border-slate-700 text-slate-200">الشروط تمكن البرنامج من اختيار مسارات مختلفة بناءً على المتغيرات. تفقد حاسبات التمارين في القائمة الجانبية لتجربتها حياً!</div>`,
    exercises: [],
    qcm: []
  },
  {
    id: "ch5",
    num: "05",
    title: "Boucles & Itérations",
    subtitle: "التكرار الذكي: for, while, range, break, continue و else",
    icon: "repeat",
    duration: "65 min",
    topics: [
      "Boucle for & fonction range(start, stop, step)",
      "Boucle while (Compteur, condition, arrêt)",
      "Contrôle de flux : break vs continue",
      "La clause spéciale else sur une boucle",
      "Exercices d'examen : Factorielle n!, Nombres premiers"
    ],
    summary: `
      1. <b>range(a, b)</b> : الحد b دائماً خارج الحساب!
      2. <b>else sur boucle</b> : ينفذ فقط إذا أكملت الحلقة دوراتها كاملة دون مواجهة أمر break!
    `,
    content: `<div class="p-6 bg-slate-800/60 rounded-xl border border-slate-700 text-slate-200">الحلقات التكرارية (for و while) هي عصب البرمجة لمعالجة تكرار العمليات. تفقد قسم التمارين لتتبع تنفيذ break و continue خطوة بخطوة.</div>`,
    exercises: [],
    qcm: []
  },
  {
    id: "ch6",
    num: "06",
    title: "Séquences & Structures Fondamentales",
    subtitle: "السلاسل، القوائم، التقطيع (Slicing)، القواميس والمجموعات",
    icon: "layers",
    duration: "70 min",
    topics: [
      "Chaînes (str) & méthodes usuelles",
      "Listes (list) dynamiques vs tableaux C",
      "Indexation & Slicing L[start:stop:step]",
      "Mutabilité vs Immuabilité & فخ الـ Aliasing (L2 = L1)",
      "Tuples (), Sets {}, Dictionnaires {}"
    ],
    summary: `
      1. <b>Mutabilité</b> : القوائم والقواميس والمجموعات قابلة للتعديل (Mutables)، بينما النصوص والأعداد والـ Tuples غير قابلة للتعديل (Immuables).
      2. <b>فخ L2 = L1</b> : لا ينشئ قائمة جديدة بل يربط اسماً إضافياً لنفس الكائن! النسخ الصحيح هو L2 = L1[:] أو L2 = L1.copy().
      3. <b>المقارنة المعجمية</b> : تبدأ من أول عنصر وتتوقف عند أول اختلاف.
    `,
    content: `<div class="p-6 bg-slate-800/60 rounded-xl border border-slate-700 text-slate-200">الهياكل البيانية المتقدمة هي قلب بايثون. جرب محاكي الذاكرة (Memory Visualizer) لتشاهد كيف تتصرف القوائم والمؤشرات في الـ RAM.</div>`,
    exercises: [],
    qcm: []
  }
];

// Expanded Question Bank for Exam Simulator (50 Questions)
const QUESTION_BANK = [
  {
    id: 1,
    q: "شكون هو المسؤول المباشر داخل الـ CPU على فك شفرة التعليمات وجلبها من الذاكرة RAM؟",
    options: ["L'Unité Arithmétique et Logique (UAL)", "L'Unité de Contrôle (UC)", "Le Bus de données", "Le Disque Dur"],
    correct: 1,
    explain: "L'Unité de Contrôle (UC) هي chef d'orchestre لي كدير Fetch و Decode."
  },
  {
    id: 2,
    q: "ماذا يطبع البرنامج التالي بالضبط؟\\nprint(0.1 + 0.2 == 0.3)",
    options: ["True", "False", "None", "SyntaxError"],
    correct: 1,
    explain: "False! بسبب معيار IEEE 754 للأعداد العائمة، 0.1 + 0.2 = 0.30000000000000004."
  },
  {
    id: 3,
    q: "ما هي قيمة ونوع المتغير: a = 15 // 4 ؟",
    options: ["3.75 من نوع float", "3 من نوع int", "4 من نوع int", "3.0 من نوع float"],
    correct: 1,
    explain: "المعامل // هو القسمة الصحيحة الإقليدية وترجع int قيمته 3."
  },
  {
    id: 4,
    q: "أي من هؤلاء يعتبر اسماً غير صالح لمتغير (Identificateur Invalide) في بايثون؟",
    options: ["_valeur_1", "True_val", "2eme_choix", "MAX_SIZE"],
    correct: 2,
    explain: "2eme_choix غير صالح لأنه يبدأ برقم، وهذا ممنوع في قواعد التسمية."
  },
  {
    id: 5,
    q: "ما هي نتيجة تنفيذ: int('3.14') ؟",
    options: ["3", "3.14", "ValueError", "TypeError"],
    correct: 2,
    explain: "ValueError! دالة int لا تقبل سلسلة نصية بها فاصلة عشرية مباشرة."
  },
  {
    id: 6,
    q: "ما هي قيمة: bool('False') ؟",
    options: ["False", "True", "Error", "None"],
    correct: 1,
    explain: "True! لأن أي نص غير فارغ يُقيّم دائماً إلى True."
  },
  {
    id: 7,
    q: "ما هي نتيجة التعبير: 2 ** 3 ** 2 ؟",
    options: ["64", "512", "36", "18"],
    correct: 1,
    explain: "الأس يُحسب من اليمين إلى اليسار: 3² = 9، ثم 2⁹ = 512."
  },
  {
    id: 8,
    q: "ماذا يطبع: print(False and (10 / 0 == 0)) ؟",
    options: ["ZeroDivisionError", "False", "True", "None"],
    correct: 1,
    explain: "False! بفضل التقييم في دارة قصيرة (Short-circuit)، لا يتم فحص الطرف الأيمن بتاتاً."
  },
  {
    id: 9,
    q: "ما هي نتيجة العملية: -7 // 2 ؟",
    options: ["-3", "-3.5", "-4", "-3.0"],
    correct: 2,
    explain: "القسمة الصحيحة تأخذ أكبر عدد صحيح أصغر من النتيجة (-3.5 تصبح -4)."
  },
  {
    id: 10,
    q: "ماذا سينتج عن الكود التالي؟\\n\"1\" in [1, 2, 3]",
    options: ["True", "False", "TypeError", "SyntaxError"],
    correct: 1,
    explain: "False! المعامل in يقارن القيمة والنوع دون خطأ، و '1' النصي يختلف عن 1 العددي."
  },
  {
    id: 11,
    q: "كم عدداً تنتجه الدالة: range(1, 6) ؟",
    options: ["6 أعداد", "5 أعداد", "7 أعداد", "4 أعداد"],
    correct: 1,
    explain: "تنتج 5 أعداد: 1, 2, 3, 4, 5 (الحد 6 غير مشمول)."
  },
  {
    id: 12,
    q: "في حلقة تكرارية، ما هو الأمر الذي يقفز فوراً إلى الدورة التالية ويتجاهل بقية الكود الحالي؟",
    options: ["break", "continue", "pass", "exit"],
    correct: 1,
    explain: "continue تقفز للدورة التالية، بينما break توقف الحلقة نهائياً."
  },
  {
    id: 13,
    q: "متى يتم تنفيذ كتلة else المرفقة بحلقة for أو while؟",
    options: [
      "في كل دورة من دورات الحلقة",
      "فقط عندما تنتهي الحلقة طبيعياً دون تدخل break",
      "عند حدوث خطأ فقط",
      "عندما يتم كسر الحلقة بواسطة break"
    ],
    correct: 1,
    explain: "else تنفذ فقط إذا أكملت الحلقة دوراتها كاملة دون مواجهة أمر break."
  },
  {
    id: 14,
    q: "ما هو ناتج تنفيذ:\\nL1 = [10, 20]\\nL2 = L1\\nL2.append(30)\\nprint(len(L1))",
    options: ["2", "3", "Error", "1"],
    correct: 1,
    explain: "3! لأن L2 = L1 تنشئ اسماً مستعاراً (Alias) يشير لنفس الكائن في الذاكرة."
  },
  {
    id: 15,
    q: "كيف نقوم بنسخ حقيقي ومستقل لقائمة L1 في قائمة L2؟",
    options: ["L2 = L1", "L2 = L1[:]", "L2 = copy(L1)", "L2 = &L1"],
    correct: 1,
    explain: "باستخدام تقطيع كامل L1[:] أو دالة L1.copy()."
  },
  {
    id: 16,
    q: "ما هي نتيجة المقارنة: [2, 5, 1] > [2, 3, 4, 5, 6] ؟",
    options: ["True", "False", "TypeError", "False لأن الثانية أطول"],
    correct: 0,
    explain: "True! في المقارنة المعجمية، عند المؤشر 1 نجد 5 > 3، فيتوقف الاختبار وتكون الأولى أكبر بغض النظر عن الطول."
  },
  {
    id: 17,
    q: "أي من التعليمات التالية تنشئ مجموعة فارغة (Set vide) بشكل صحيح؟",
    options: ["s = {}", "s = set()", "s = []", "s = ()"],
    correct: 1,
    explain: "set() تنشئ مجموعة فارغة، بينما {} تنشئ قاموساً فارغاً (dictionnaire vide)."
  },
  {
    id: 18,
    q: "ماذا يطبع البرنامج التالي؟\\nprint('Licence', 'SMI', sep='-', end=' / ')\\nprint('IA', 'S1', sep=':')",
    options: [
      "Licence-SMI / IA:S1",
      "Licence SMI / IA S1",
      "Licence-SMI\\nIA:S1",
      "Licence-SMI / \\nIA:S1"
    ],
    correct: 0,
    explain: "بسبب end=' / ' لا يحدث سطر جديد ويلتصق السطر الثاني مباشرة مع فاصل :."
  },
  {
    id: 19,
    q: "ما هو نوع الكائن: t = (42) ؟",
    options: ["tuple", "int", "list", "set"],
    correct: 1,
    explain: "int! لأن تعريف tuple بعنصر واحد يتطلب فاصلة إجبارية مثل (42,)."
  },
  {
    id: 20,
    q: "في معمارية Von Neumann، ما الذي يميز Bus d'adresses؟",
    options: [
      "أنه ثنائي الاتجاه (Bidirectionnel)",
      "أنه أحادي الاتجاه (Unidirectionnel من المعالج للذاكرة)",
      "أنه ينقل نبضات الساعة فقط",
      "أنه ينقل البيانات الفعلية بين المعالج والشاشة"
    ],
    correct: 1,
    explain: "Bus d'adresses أحادي الاتجاه يحدد به المعالج مكان الخلية المستهدفة للقراءة أو الكتابة."
  },
  {
    id: 21,
    q: "ما هي نتيجة التعبير: True or False and False ؟",
    options: ["True", "False", "None", "Error"],
    correct: 0,
    explain: "True! لأن and أسبق من or: (False and False) = False، ثم True or False = True."
  },
  {
    id: 22,
    q: "إذا كانت A = 5 و B = 3، فإن العملية A *= B + 2 تجعل A تساوي:",
    options: ["17", "25", "30", "15"],
    correct: 1,
    explain: "A *= B + 2 تعادل A = A * (B + 2) = 5 * 5 = 25."
  },
  {
    id: 23,
    q: "ماذا ترجع الدالة input() نواتياً في بايثون 3؟",
    options: ["int", "float", "str", "حسب ما يكتبه المستخدم"],
    correct: 2,
    explain: "input() تُرجع دائماً نصاً str مهما كتب المستخدم حتى لو كان أرقاماً."
  },
  {
    id: 24,
    q: "ما هي مخرجات الكود:\\ns = 'Python'\\nprint(s[1:4]) ؟",
    options: ["Pyt", "yth", "ytho", "y"],
    correct: 1,
    explain: "المؤشرات 1, 2, 3 تقابل 'y', 't', 'h' (المؤشر 4 'o' غير داخل)."
  },
  {
    id: 25,
    q: "ماذا يحدث عند تنفيذ: s = 'Hello'; s[0] = 'M' ؟",
    options: ["تصبح s مساوية لـ 'Mello'", "TypeError: 'str' object does not support item assignment", "IndexError", "لا شيء"],
    correct: 1,
    explain: "النصوص في بايثون كائنات ثابتة غير قابلة للتعديل في نفس المكان (Immuables)."
  },
  {
    id: 26,
    q: "سنة 1900 في التقويم الغريغوري هل هي سنة كبيسة (Bissextile)؟",
    options: ["نعم، لأنها تقبل القسمة على 4", "لا، لأنها تقبل القسمة على 100 ولا تقبل على 400", "نعم، لأنها تقبل على 100", "لا يوجد قاعدة للقرون"],
    correct: 1,
    explain: "1900 ليست كبيسة لأنها مضاعف لـ 100 وليست مضاعفاً لـ 400."
  },
  {
    id: 27,
    q: "كم دورة تنفذ الحلقة: for i in range(10, 0, -2) ؟",
    options: ["5 دورات", "4 دورات", "6 دورات", "حلقة لا نهائية"],
    correct: 0,
    explain: "تولد: 10, 8, 6, 4, 2 (العدد 0 غير داخل). المجموع 5 دورات."
  },
  {
    id: 28,
    q: "ما هي قيمة: bool('') (سلسلة نصية فارغة)؟",
    options: ["True", "False", "None", "Error"],
    correct: 1,
    explain: "False! السلسلة الفارغة والعدد 0 هما فقط اللذان يرجعان False في القيم الأساسية."
  },
  {
    id: 29,
    q: "أي معامل في بايثون يحسب الأس؟",
    options: ["^", "**", "exp()", "^^"],
    correct: 1,
    explain: "** هو معامل الأس، بينما ^ هو معامل XOR الثنائي."
  },
  {
    id: 30,
    q: "ماذا يطبع البرنامج: print('2' + '2') ؟",
    options: ["4", "22", "Error", "'4'"],
    correct: 1,
    explain: "معامل الجمع + مع السلاسل النصية يقوم بعملية الربط (Concaténation) وينتج '22'."
  }
];

// Interactive 3D Flashcards Deck
const FLASHCARDS = [
  {
    id: 1,
    front: "ما هو الفرق بين Von Neumann و الحواسيب القديمة؟",
    back: "الحواسيب القديمة كانت تتطلب إعادة تركيب الأسلاك يدوياً (Câblage manuel). معمارية فون نيومان (1945) وحدت الذاكرة (RAM) لتخزين كل من الأوامر والبيانات معاً (Programme Enregistré).",
    tag: "Architecture"
  },
  {
    id: 2,
    front: "لماذا int('3.14') يعطي خطأ ValueError؟",
    back: "لأن دالة int() ترفض وجود الرمز '.' داخل النص! الحل هو تحويله إلى float أولاً ثم إلى int: int(float('3.14')) وتعطي 3.",
    tag: "Transtypage"
  },
  {
    id: 3,
    front: "ما هي نتيجة bool('False') ولماذا؟",
    back: "تعطي True! لأن أي نص غير فارغ في بايثون يعتبر صائباً (Truthy) بغض النظر عما كُتب بداخله.",
    tag: "Booléens"
  },
  {
    id: 4,
    front: "ما هو فخ L2 = L1 في القوائم (Aliasing)؟",
    back: "L2 = L1 لا تنشئ نسخة جديدة، بل تربط اسماً ثانياً لنفس المكان في الذاكرة. أي تغيير في L2 يغير L1 فوراً! للنسخ الحقيقي: L2 = L1[:] أو L2 = L1.copy().",
    tag: "Listes"
  },
  {
    id: 5,
    front: "لماذا 0.1 + 0.2 == 0.3 تعطي False؟",
    back: "بسبب معيار IEEE 754 لتمثيل الأعداد بالفاصلة العائمة في المعالج. الأعداد 0.1 و 0.2 تصبح كسوراً ثنائية دورية غير منتهية وينتج عنها 0.30000000000000004.",
    tag: "Flottants"
  },
  {
    id: 6,
    front: "ما هو التقييم في دارة قصيرة (Short-circuit)؟",
    back: "في A and B، إذا كان A خاطئاً يتوقف بايثون فوراً ولا يقيم B. وفي A or B، إذا كان A صائباً يتوقف فوراً. هذا يمنع أخطاء مثل القسمة على صفر: False and (10/0 == 0).",
    tag: "Logique"
  },
  {
    id: 7,
    front: "متى تنفذ كتلة else المرفقة بـ for أو while؟",
    back: "تنفذ فقط إذا انتهت الحلقة بسلام وأكملت جميع دوراتها دون أن يقاطعها أمر break!",
    tag: "Boucles"
  },
  {
    id: 8,
    front: "كيف تنشئ Tuple بعنصر واحد؟",
    back: "بكتابة فاصلة إجبارية بعد العنصر: t = (42,). بدون الفاصلة t = (42) يعتبره بايثون مجرد عدد صحيح int داخل أقواس عادية.",
    tag: "Tuples"
  },
  {
    id: 9,
    front: "كيف تقارن بايثون القوائم معجمياً؟",
    back: "عنصراً بعنصر من اليسار إلى اليمين. عند أول اختلاف بين عنصرين يتحدد الأكبر ويتوقف الفحص فوراً متجاهلاً طول القائمتين!",
    tag: "Listes"
  },
  {
    id: 10,
    front: "ما هو اتجاه تقييم الأس **؟",
    back: "الأس هو المعامل الوحيد الذي يقيم من اليمين إلى اليسار (de droite à gauche): 2**3**2 تحسب 3² = 9 ثم 2⁹ = 512.",
    tag: "Priorités"
  }
];

// Academic Tri-lingual Glossary (Français - English - الدارجة)
const GLOSSARY = [
  {
    fr: "Architecture de Von Neumann",
    en: "Von Neumann Architecture",
    dar: "معمارية الحاسوب الحديثة لي حطها فون نيومان فـ 1945، وفيها كيتخزن الكود والداتا فنفس الذاكرة RAM.",
    code: "CPU + RAM + E/S + Bus"
  },
  {
    fr: "Typage Dynamique",
    en: "Dynamic Typing",
    dar: "بايثون كيعرف نوع المتغير تلقائياً من القيمة المسندة بلا ما تكتب ليه النوع بيدك (عكس C لي كتكتب فيه int x).",
    code: "x = 10 # int تلقائياً"
  },
  {
    fr: "Transtypage (Casting)",
    en: "Type Casting",
    dar: "تحويل قيمة متغير من نوع إلى نوع آخر باستعمال دوال التحويل int(), float(), str(), bool().",
    code: "age = int('20')"
  },
  {
    fr: "Short-circuit (Court-circuit)",
    en: "Short-circuit Evaluation",
    dar: "التقييم الذكي: بايثون كيوقف فحص الشرط المنطقي بمجرد ما يعرف النتيجة الحتمية بلا ما يكمل الحساب للطرف الثاني.",
    code: "False and (1/0 == 0) # Pas d'erreur!"
  },
  {
    fr: "Aliasing (Alias)",
    en: "Variable Aliasing",
    dar: "إعطاء اسمين مختلفين لنفس الكائن فالميموار عبر الإسناد = مع كائنات قابلة للتعديل مثل القوائم.",
    code: "L2 = L1 # خطر!"
  },
  {
    fr: "Immuabilité (Immutability)",
    en: "Immutability",
    dar: "كائن ما كيقبلش التعديل فبلاصتو فالميموار (بحال str و tuple و int). أي تعديل كيكريي كائن جديد.",
    code: "s = 'abc'; s[0] = 'z' # TypeError"
  },
  {
    fr: "Slicing (Découpage)",
    en: "Slicing",
    dar: "استخراج جزء من سلسلة أو قائمة باستعمال الصيغة [début : fin_exclue : pas].",
    code: "L[1:4:2]"
  },
  {
    fr: "Bytecode & PVM",
    en: "Bytecode & Python VM",
    dar: "الكود الوسيط المحايد لي كينتجو بايثون قبل ما تنفذو الآلة الافتراضية PVM فوق البروسيسور.",
    code: "script.py -> .pyc (PVM)"
  },
  {
    fr: "Troncature",
    en: "Truncation",
    dar: "حذف الجزء العشري نهائياً دون تقريب (مثلاً int(9.99) تصبح 9 وليس 10).",
    code: "int(14.89) -> 14"
  },
  {
    fr: "Tuple Unpacking",
    en: "Tuple Unpacking",
    dar: "توزيع عناصر عدة قيم على عدة متغيرات في سطر واحد بالتوازي وبكل أناقة.",
    code: "a, b = 10, 20"
  }
];

// Badges system for Gamification
const BADGES = [
  { id: "von_neumann", title: "قاهر فون نيومان", desc: "إتمام دراسة معماريات الحواسيب ومفاهيم CPU والذاكرة.", icon: "cpu" },
  { id: "type_master", title: "ماستر الأنواع والتحويلات", desc: "تجاوز فخاخ int و float و bool بنجاح.", icon: "database" },
  { id: "slicing_pro", title: "محترف التقطيع (Slicing Pro)", desc: "إتقان مؤشرات القوائم والسلاسل المعكوسة.", icon: "scissors" },
  { id: "trap_hunter", title: "صائد الفخاخ (Trap Hunter)", desc: "مراجعة جميع الفخاخ الكلاسيكية للامتحان.", icon: "shield-alert" },
  { id: "exam_major", title: "Major de Promotion 🏆", desc: "الحصول على نقطة 18 أو أكثر في الامتحان التجريبي.", icon: "trophy" }
];

// University TD Series (Série 1 & Série 2)
const TD_SERIES = [
  {
    id: "serie1",
    title: "Série 1 : Variables, Types, Opérateurs, I/O",
    subtitle: "كل تمارين السلسلة الأولى لجامعة ابن طفيل مع الحل والتفصيل",
    questions: [
      {
        num: "Exercice 1 - Q1",
        title: "Les identificateurs valides et invalides",
        content: "Parmi les identificateurs suivants, déterminez ceux qui sont invalides en Python et précisez la raison exacte :<br/><code>_valeur_1</code>, <code>2eme_choix</code>, <code>for</code>, <code>total$</code>, <code>True_val</code>, <code>x-max</code>",
        solution: `
          <div class="space-y-2 text-sm">
            <p>• <b>_valeur_1</b> : <span class="text-emerald-400 font-bold">Valide</span> (يبدأ بـ underscore ويحتوي على حروف وأرقام).</p>
            <p>• <b>2eme_choix</b> : <span class="text-red-400 font-bold">Invalide</span> (<b>السبب:</b> يبدأ برقم 2، وقواعد بايثون تفرض البدء بحرف أو _).</p>
            <p>• <b>for</b> : <span class="text-red-400 font-bold">Invalide</span> (<b>السبب:</b> كلمة محجوزة Mot-clé réservé للغة مخصصة للحلقات التكرارية).</p>
            <p>• <b>total$</b> : <span class="text-red-400 font-bold">Invalide</span> (<b>السبب:</b> يحتوي على رمز خاص $ غير مسموح به).</p>
            <p>• <b>True_val</b> : <span class="text-emerald-400 font-bold">Valide</span> (رغم أنه يبدأ بـ True ولكن بوجود _val أصبح معرفاً مركباً عادياً).</p>
            <p>• <b>x-max</b> : <span class="text-red-400 font-bold">Invalide</span> (<b>السبب:</b> علامة - يفسرها بايثون كعملية طرح soustraction).</p>
          </div>
        `
      },
      {
        num: "Exercice 1 - Q2 & Q3",
        title: "Calcul des types et précision machine",
        content: "Déterminez la valeur et le type exact (int ou float) :<br/>• a = 15 // 4<br/>• b = 15 / 3<br/>• c = 2 ** 3 ** 2<br/>• d = -7 // 2<br/>+ Que renvoie <code>print(0.1 + 0.2 == 0.3)</code> et pourquoi ?",
        solution: `
          <div class="space-y-2 text-sm">
            <p>• <b>a = 15 // 4</b> : القيمة = <b>3</b>، النوع = <b>int</b> (قسمة إقليدية).</p>
            <p>• <b>b = 15 / 3</b> : القيمة = <b>5.0</b>، النوع = <b>float</b> (القسمة / ترجع float دائماً).</p>
            <p>• <b>c = 2 ** 3 ** 2</b> : الأسبقية من اليمين 3² = 9، 2⁹ = <b>512</b>، النوع = <b>int</b>.</p>
            <p>• <b>d = -7 // 2</b> : القيمة = <b>-4</b>، النوع = <b>int</b> (التقريب للأسفل نحو اللانهاية السالبة).</p>
            <div class="prof-speech mt-2">
              <b>print(0.1 + 0.2 == 0.3) -> False</b><br/>
              <b>السبب الأساسي في الآلة:</b> تمثيل الأعداد بالفاصلة العائمة (Flottants) في المعالج يعتمد معيار IEEE 754 بالنظام الثنائي (Binaire). بعض الكسور مثل 0.1 و 0.2 تصبح أعداداً دورية غير منتهية في النظام الثنائي وتفقد جزءاً طفيفاً من الدقة (0.1 + 0.2 يعطي 0.30000000000000004).
            </div>
          </div>
        `
      },
      {
        num: "Exercice 2 & 3",
        title: "Transtypage, Short-circuit & Entrées/Sorties",
        content: "1. v1 = bool(0), v2 = bool('False'), v3 = int(float('3.14'))<br/>2. Que donne int('3.14') ?<br/>3. print(0 and 'Python'), print(False and (10/0 == 0))<br/>4. '1' in [1, 2, 3] ?",
        solution: `
          <div class="space-y-2 text-sm">
            <p>• <b>v1</b> = False (bool), <b>v2</b> = True (bool - أي نص غير فارغ صائب!), <b>v3</b> = 3 (int).</p>
            <p>• <b>int('3.14')</b> : يُحدث خطأ فادحاً <b>ValueError</b> لأن دالة int() لا تقبل تحويل نص يحتوي فاصلة مباشرة، والحل هو المرور بـ float أولاً.</p>
            <p>• <b>0 and 'Python'</b> : يطبع <b>0</b> لأن بايثون يرجع آخر قيمة تم تقييمها عند التوقف.</p>
            <p>• <b>False and (10/0 == 0)</b> : يطبع <b>False</b> ولا يحدث خطأ القسمة على صفر بسبب التقييم في دارة قصيرة (Court-circuit).</p>
            <p>• <b>'1' in [1, 2, 3]</b> : يُرجع <b>False</b> دون أي خطأ نوع، لأن بايثون يفحص التساوي بين النص '1' والأعداد الصحيحة وينتهي بأنهم غير متطابقين.</p>
          </div>
        `
      }
    ]
  },
  {
    id: "serie2",
    title: "Série 2 : Structures Conditionnelles",
    subtitle: "حلول مفصلة لتمارين الشروط (Supermarché, Feu tricolore, Permis, Février, Eau)",
    questions: [
      {
        num: "Exercice 5: Validité du mois de Février",
        title: "السنة الكبيسة والتحقق من تاريخ فبراير",
        content: "التحقق من صحة اليوم 28 أو 29 حسب كون السنة كبيسة.",
        solution: `
<pre class="bg-slate-900 p-4 rounded text-xs font-mono text-slate-200">
jour = int(input("Jour: "))
mois = int(input("Mois: "))
annee = int(input("Année: "))

if mois != 2:
    print("Ce programme teste uniquement le mois de février.")
else:
    est_bissextile = (annee % 4 == 0 and annee % 100 != 0) or (annee % 400 == 0)
    max_jours = 29 if est_bissextile else 28
    
    if 1 <= jour <= max_jours:
        print(f"Date valide (Février {annee} compte {max_jours} jours).")
    else:
        print(f"Date invalide pour février {annee} (doit être entre 1 et {max_jours}).")
</pre>
        `
      },
      {
        num: "Exercice 6: Facture d'eau par tranches cumulatives",
        title: "حساب تسعيرة الماء التصاعدية بالشطور",
        content: "Tranche 1 (0-20 m³: 2.0 DH), Tranche 2 (20-50 m³: 4.0 DH), Tranche 3 (>50 m³: 7.0 DH).",
        solution: `
<pre class="bg-slate-900 p-4 rounded text-xs font-mono text-slate-200">
conso = float(input("Consommation en m³: "))

if conso < 0:
    print("Valeur impossible")
elif conso <= 20:
    facture = conso * 2.0
elif conso <= 50:
    facture = (20 * 2.0) + ((conso - 20) * 4.0)
else:
    facture = (20 * 2.0) + (30 * 4.0) + ((conso - 50) * 7.0)

print(f"Montant total de la facture: {facture:.2f} DH")
</pre>
        `
      }
    ]
  }
];

// 10 Golden exam traps to memorize
const EXAM_TRAPS = [
  {
    title: "1. النقطة داخل int()",
    code: "int('3.14') # 💥 ValueError!",
    fix: "int(float('3.14')) # ✅ 3",
    note: "الدالة int لا تحول نصاً يحتوي على فاصلة مباشرة، يجب تحويله إلى float أولاً ثم إلى int."
  },
  {
    title: "2. خطأ تقريب int()",
    code: "int(14.89) # النتيجة ليست 15!",
    fix: "int(14.89) -> 14",
    note: "بايثون يقوم بـ Troncature (حذف الجزء العشري نهائياً) ولا يقوم بعملية تقريب (Arrondi)."
  },
  {
    title: "3. خديعة bool('False')",
    code: "bool('False') # ليست False!",
    fix: "bool('False') -> True",
    note: "أي نص غير فارغ يحتوي على حروف يعتبر صائباً True دائماً، فقط النص الفارغ bool('') هو False."
  },
  {
    title: "4. الأسبقية في الأس المزدوج",
    code: "2 ** 3 ** 2 # ليس (2**3)**2 = 64!",
    fix: "2 ** (3 ** 2) = 2 ** 9 = 512",
    note: "الأس هو المعامل الوحيد الذي يُحسب من اليمين إلى اليسار (de droite à gauche)."
  },
  {
    title: "5. فخ النسخ السطحي للقوائم (Aliasing)",
    code: "L2 = L1 # لا ينشئ قائمة جديدة!",
    fix: "L2 = L1[:] أو L2 = L1.copy()",
    note: "المعامل = يربط نفس العنوان في الذاكرة، وأي تعديل على L2 سيغير L1 تلقائياً."
  },
  {
    title: "6. حدود range و Slicing",
    code: "range(1, 5) و L[1:5]",
    fix: "الحد الأخير 5 دائماً مستثنى (Exclu)!",
    note: "range(1, 5) تولد: 1, 2, 3, 4 فقط."
  },
  {
    title: "7. التقسيم الصحيح للأعداد السالبة",
    code: "-7 // 2 # ليس -3!",
    fix: "-7 // 2 -> -4",
    note: "القسمة // تأخذ أصغر عدد صحيح: -3.5 تصبح -4."
  },
  {
    title: "8. إنشاء المجموعة الفارغة",
    code: "s = {} # هذا ليس Set!",
    fix: "s = set() # ✅ هذا هو Set الفارغ",
    note: "الأقواس {} مخصصة للقاموس الفارغ dict."
  },
  {
    title: "9. الـ Tuple بعنصر وحيد",
    code: "t = (10) # هذا int عادي!",
    fix: "t = (10,) # ✅ بوجود الفاصلة أصبح Tuple",
    note: "الفاصلة هي التي تصنع الـ Tuple وليس الأقواس."
  },
  {
    title: "10. عدم حدوث خطأ بسبب Short-Circuit",
    code: "False and (1/0 == 1)",
    fix: "النتيجة False دون ZeroDivisionError",
    note: "إذا كان الطرف الأول في and خاطئاً، يتوقف بايثون فوراً ولا ينفذ الطرف الثاني."
  }
];
