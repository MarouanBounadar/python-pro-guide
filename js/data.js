// Data source for Python Pro Guide - SMI/IA S1
// UIT Kénitra - Faculté des Sciences - Pr. Imane EL ALAOUI

const COURSE_METADATA = {
  title: "Programmation Python 1",
  filiere: "SMI / IA - Semestre 1",
  university: "Université Ibn Tofail (UIT) - Faculté des Sciences Kénitra",
  prof: "Pr. Imane EL ALAOUI",
  contact: "elalaoui.imane@uit.ac.ma",
  description: "دورة جامعية تفاعلية شاملة من الصفر حتى الاحتراف مع محاكي الامتحانات وتمارين TD والحلول النموذجية بالدارجة المغربية والمصطلحات التقنية."
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
      1. **Système numérique vs Système informatique** : كل سيستيم أنفورماتيك هو سيستيم نيميريك، ولكن ماشي العكس! النظام المعلوماتي كيكون Universellement programmable.
      2. **Von Neumann (1945)** : البرامج (Instructions) والبيانات (Données) كيتشاركو نفس الذاكرة RAM.
      3. **CPU** : فيه Unité de Contrôle (كتقود وتجيب التعليمات)، UAL (كتحسب العمليات الحسابية والمنطقية)، و Registres (ميموار سريعة بزاف وسط البروسيسور).
      4. **Cycle** : Fetch (جيب) -> Decode (فهم) -> Execute (نفّذ).
      5. **Python Hybride** : الكود .py كيتحول لـ Bytecode (.pyc) عاد كيتنفذ فوق الآلة الافتراضية PVM (Python Virtual Machine). هادشي كيجمع بين سهولة الكتابة والسرعة.
      6. **Mode REPL** : تجارب سريعة ولكن كيمشي مع إغلاق النافذة. **Mode Script** : ملف .py دائم كيتنفذ فكل وقت.
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
      },
      {
        title: "تمرين تطبيقي 2: دورة الـ CPU",
        question: "رتّب المراحل الثلاث ديال معالجة تعليمة بسيطة 'c = a + b' واذكر شكون المكون المسؤول على كل مرحلة.",
        solution: `
          <b>المرحلة 1 - Fetch:</b> الـ Unité de Contrôle كتجيب التعليمة من الـ RAM عبر Bus d'adresses و Bus de données.<br/>
          <b>المرحلة 2 - Decode:</b> الـ Unité de Contrôle كتفكك شفرة التعليمة وتعرف بلي العملية هي جمع (+) وأنها كتحتاج قيم المتغيرين a و b.<br/>
          <b>المرحلة 3 - Execute:</b> الـ UAL (Unité Arithmétique et Logique) هي لي كتحسب الجمع الفعلي وتوضع النتيجة فـ Registre قبل ما تترسل للذاكرة.
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
      },
      {
        q: "أما من هاد الجمل صحيحة 100%؟",
        options: [
          "Tout système informatique est numérique, mais tout système numérique n'est pas informatique.",
          "Tout système numérique est obligatoirement un système informatique.",
          "Python est un langage purement compilé comme le C++.",
          "Python 2 et Python 3 sont 100% compatibles."
        ],
        correct: 0,
        explain: "هادي هي القاعدة الذهبية الرسمية فـ Cours SMI S1!"
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
      1. **Nommage** : حروف وأرقام و '_' فقط. ممنوع تبدا برقم! ممنوع الشرطة العادية '-' (حيت كيعتبرها طرح ناقص). Case-sensitive (\`age\` != \`Age\`).
      2. **Keywords** : كلمات محجوزة ممنوع تستعملها كأسماء بحال \`for, if, def, class, True, False, None, and, or\`.
      3. **Affectation** : من اليمين لليسار. دقة وحدة: \`a = b = c = 0\` (قيمة وحدة لعدة متغيرات)، أو \`x, y = 10, 20\` (parallèle).
      4. **Typage Dynamique** : نتا ما كتكتبش \`int x\` بحال C، بايثون كيشوف القيمة لي عتيتيه وهو كيحدد النوع تلقائياً.
      5. **Transtypage (Casting)** :
         - \`int(14.89)\` -> 14 (Troncature ماشي arrondi!).
         - \`int("3.14")\` -> 💥 **ValueError**! خاص تدوز من \`int(float("3.14"))\` لي كتعطي 3.
         - \`bool(0)\`, \`bool("")\` -> False. أي عدد آخر أو نص عامر -> True (حتى \`bool("False")\` راها True!).
      6. **الدقة العائمة** : \`0.1 + 0.2 == 0.3\` كتعطي **False** بسبب تمثيل IEEE 754 للفاصلة العائمة فالثنائي!
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
              <code class="text-slate-300">grand = 10**40</code> (لا يوجد حد أقصى للذاكرة)
            </div>
            <div class="bg-slate-900 p-3 rounded border border-slate-700">
              <span class="text-sky-400 font-bold">float</span> : أعداد حقيقية بفاصلة (نقطة .)<br/>
              <code class="text-slate-300">pi = 3.14</code><br/>
              <code class="text-slate-300">vitesse = 3e8</code> (3 × 10⁸)
            </div>
            <div class="bg-slate-900 p-3 rounded border border-slate-700">
              <span class="text-sky-400 font-bold">complex</span> : أعداد عقدية (j)<br/>
              <code class="text-slate-300">z = 3 + 4j</code><br/>
              <code class="text-slate-400">z.real -> 3.0, z.imag -> 4.0</code>
            </div>
            <div class="bg-slate-900 p-3 rounded border border-slate-700">
              <span class="text-sky-400 font-bold">bool</span> : منطقي (قيمة صواب/خطأ)<br/>
              <code class="text-slate-300">valide = True</code> (حرف كبير T!)<br/>
              <code class="text-slate-300">echec = False</code>
            </div>
          </div>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">3. Transtypage (Casting) & Pièges Classiques</h3>
          <p class="text-slate-300 mb-2">
            التحويل الصريح بين الأنواع (Conversion explicite) كيدار بهاد الدوال: <code class="text-amber-300">int(), float(), str(), bool()</code>.
          </p>
          <div class="prof-piege">
            <b>3 د الفخاخ لي مستحيل ميعطيهمش ليك فالامتحان:</b><br/>
            1. <code>int("3.14")</code> كيعطي <b>ValueError</b>! لأن الدالة int() كترفض وجود النقطة وسط الـ string. والحل الصحيح باش تدوز هو: <code>int(float("3.14"))</code> وكيعطي 3.<br/>
            2. <code>int(14.89)</code> كيعطي <b>14</b> وماشي 15! بايثون كيدير <b>Troncature (قطع)</b> ماشي Arrondi.<br/>
            3. <code>bool("False")</code> كتعطي <b>True</b>! حيت أي chaîne de caractères عامرة (غير فارغة) كتعطي دائماً True! فقط <code>bool("")</code> و <code>bool(0)</code> هما لي كيعطيو False.<br/>
            4. <code>print(0.1 + 0.2 == 0.3)</code> كيعطي <b>False</b>! السبب هو معيار IEEE 754؛ بعض الأعداد العشرية ما كتمثلش بدقة تامة فالثنائي (0.1 + 0.2 = 0.30000000000000004).
          </div>
        </div>
      </div>
    `,
    exercises: [
      {
        title: "تمرين TD 1 (من Série 1 - UIT): حساب وتحويل الأنواع",
        question: "حدد القيمة والنوع الدقيق (int أو float) لكل تعبير بدون استعمال البيسي:",
        items: [
          "a = 15 // 4",
          "b = 15 / 3",
          "c = 2 ** 3 ** 2",
          "d = -7 // 2"
        ],
        solution: `
          • <b>a = 15 // 4</b> -> القيمة: <b>3</b> | النوع: <b>int</b> (قسمة صحيحة Euclienne).<br/>
          • <b>b = 15 / 3</b> -> القيمة: <b>5.0</b> | النوع: <b>float</b> (القسمة العادية / كترجع ديما float حتى لو كانت النتيجة مضاعف!).<br/>
          • <b>c = 2 ** 3 ** 2</b> -> الأولوية للأس من اليمين لليسار: 3² = 9، ثم 2⁹ = <b>512</b> | النوع: <b>int</b>.<br/>
          • <b>d = -7 // 2</b> -> القيمة: <b>-4</b> | النوع: <b>int</b> (القسمة الصحيحة كتاخد دائماً أصغر أو يساوي: -3.5 كتهبط لـ -4 ماشي -3!).
        `
      },
      {
        title: "تمرين TD 2: تفكيك التعليمات (Exercice Slide 43)",
        question: "شرح شنو كيوقع فالذاكرة وعلى الشاشة فهاد السطور الثلاثة:<br/><code>>>> largeur = 20</code><br/><code>>>> hauteur = 4 * 9.3</code><br/><code>>>> largeur * hauteur</code>",
        solution: `
          1. <b>largeur = 20</b> : Affectation -> إنشاء كائن int قيمتو 20 وربط الاسم معه. إخراج الشاشة: لا شيء.<br/>
          2. <b>hauteur = 4 * 9.3</b> : Calcul + Affectation -> ضرب int x float كيعطي float قيمتو 37.2 وربط الاسم معه. إخراج الشاشة: لا شيء.<br/>
          3. <b>largeur * hauteur</b> : Évaluation d'une expression simple -> حساب 20 * 37.2 = 744.0 (float) بدون تخزين فمتغير. إخراج الشاشة فالمود التفاعلي: <b>744.0</b>.
        `
      }
    ],
    qcm: [
      {
        q: "شنو هي النتيجة ديال: int(float('12.8'))؟",
        options: ["13", "12", "12.8", "ValueError"],
        correct: 1,
        explain: "float('12.8') كترجع 12.8، ثم int(12.8) كتقطع الجزء العشري وترجع 12."
      },
      {
        q: "ما هي قيمة التعبير: bool('False')؟",
        options: ["False", "True", "None", "Error"],
        correct: 1,
        explain: "أي نص غير فارغ كيعطي True مهما كان محتواه!"
      },
      {
        q: "علاش 15 / 3 كتعطي 5.0 ماشي 5؟",
        options: [
          "لأن بايثون فيه خطأ حسابي",
          "لأن المعامل / يرجع دائماً float",
          "لأن 3 عدد حقيقي",
          "لأن النتيجة عدد أولي"
        ],
        correct: 1,
        explain: "القسمة البسيطة / فـ Python 3 كترجع دائماً float."
      }
    ]
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
      "Opérateurs d'Affectation augmentée : +=, -=, *=, //=, %=",
      "Opérateurs Logiques : and, or, not & Tables de vérité",
      "Opérateurs d'adhésion : in, not in",
      "Tableau complet des priorités (de la puissance aux affectations)",
      "Évaluation en court-circuit (Short-circuit evaluation)"
    ],
    summary: `
      1. **Priorités (الأسبقية)** :
         - ( ) الأقواس كتحكم فكلشي.
         - \`**\` الأس كيتحسب من **اليمين لليسار** (Droite à gauche).
         - \`*\`, \`/\`, \`//\`, \`%\` كيجيو قبل من \`+\` و \`-\`.
         - المقارنات (\`==\`, \`<\`, ...) و \`in\` كيجيو من بعد الحساب.
         - المنطق : \`not\` كيسرع \`and\`، و \`and\` كيسرع \`or\`!
         - التأثير \`=\`, \`+=\` هو الأخير فكلشي.
      2. **السلاسل النصية** : \`"a" + "b"\` = "ab" (Concaténation)، و \`"a" * 3\` = "aaa" (Duplication).
      3. **Short-circuit (التقطيع الذكي)** :
         - فـ \`A and B\` : إلا كان A هو False، بايثون مكيشوفش B كاع! (داكشي علاش \`False and (10/0 == 0)\` مكتعطيش خطأ ZeroDivisionError).
         - فـ \`A or B\` : إلا كان A هو True، كيرجع A ومكيشوفش B.
      4. **Affectation piège** : \`A *= B + 2\` راه كتعني \`A = A * (B + 2)\` ماشي \`(A * B) + 2\`!
    `,
    content: `
      <div class="space-y-6">
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">1. Opérateurs Arithmétiques & Redéfinition</h3>
          <p class="text-slate-300">
            فـ بايثون المعاملات الحسابية عندها معنى كيتغير حسب نوع البيانات (Polymorphisme / Redéfinition):
          </p>
          <div class="grid md:grid-cols-2 gap-4 my-3 text-sm">
            <div class="bg-slate-900 p-4 rounded-lg border border-slate-700">
              <span class="text-sky-400 font-bold block mb-2">مع الأعداد:</span>
              <ul class="space-y-1 text-slate-300 font-mono">
                <li>14 / 4  -> 3.5 (Division réelle)</li>
                <li>14 // 4 -> 3 (Division entière)</li>
                <li>14 % 4  -> 2 (Modulo: Reste de 14 = 4×3 + 2)</li>
                <li>2 ** 3  -> 8 (Puissance)</li>
              </ul>
            </div>
            <div class="bg-slate-900 p-4 rounded-lg border border-slate-700">
              <span class="text-emerald-400 font-bold block mb-2">مع النصوص (Chaînes):</span>
              <ul class="space-y-1 text-slate-300 font-mono">
                <li>"Salut" + " " + "Python" -> "Salut Python" (Concaténation)</li>
                <li>"Python" * 3 -> "PythonPythonPython" (Duplication)</li>
                <li>"2" + "2" -> "22" (ماشي 4!)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">2. جدول أسبقية العمليات (Ordre de Priorité)</h3>
          <p class="text-slate-300 mb-2">
            هاد الترتيب رسمي من الكور وخاصك تحفظو عن ظهر قلب للامتحان:
          </p>
          <ol class="list-decimal list-inside text-sm text-slate-200 space-y-1 bg-slate-900/80 p-4 rounded-lg font-mono">
            <li><b>( )</b> : Parenthèses (الأولوية القصوى)</li>
            <li><b>**</b> : Puissance (كتتحسب من اليمين لليسار: 2**3**2 = 2**(9) = 512)</li>
            <li><b>+x, -x</b> : Signes unaires (إشارات الأعداد)</li>
            <li><b>*, /, //, %</b> : الضرب، القسمة، باقي القسمة</li>
            <li><b>+, -</b> : الجمع والطرح</li>
            <li><b>==, !=, &lt;, &lt;=, &gt;, &gt;=</b> و <b>in, not in</b> : المقارنات والانتماء</li>
            <li><b>not</b> : النفي المنطقي</li>
            <li><b>and</b> : 'و' المنطقية (أسبق من or!)</li>
            <li><b>or</b> : 'أو' المنطقية</li>
            <li><b>=, +=, -=, *=, ...</b> : الإسناد (أضعف أسبقية)</li>
          </ol>

          <div class="prof-speech">
            <b>مثال كلاسيكي فالامتحان:</b><br/>
            <code>True or False and False</code><br/>
            بما أن <b>and</b> أسبق من <b>or</b>، بايثون كيحسب أولاً: <code>(False and False)</code> لي كتعطي <code>False</code>.<br/>
            ثم كيحسب: <code>True or False</code> لي كتعطي <b>True</b>!
          </div>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">3. السر الخطير: Évaluation en Court-Circuit (Short-Circuit)</h3>
          <p class="text-slate-300 leading-relaxed">
            فـ بايثون، <code>and</code> و <code>or</code> ماشي غير كيحسبو المنطق، بل كيرجعو آخر قيمة تم تقييمها:
          </p>
          <div class="prof-piege">
            <b>سؤال من Série 1 UIT:</b><br/>
            <code>print(False and (10 / 0 == 0))</code><br/>
            علاش هاد الكود مكيخرجش الخطأ القاتل <b>ZeroDivisionError</b>؟<br/>
            <b>الجواب:</b> لأن المعامل هو <code>and</code>، والطرف الأيسر هو <code>False</code>. بايثون عارف بلي النتيجة غتكون قطعا False بلا ما يكمل، فـ <b>كيوقف فوراً وما كيقربش للطرف الأيمن!</b> (Court-circuit).
          </div>
        </div>
      </div>
    `,
    exercises: [
      {
        title: "تمرين السلايد 55 (Exemple Cours UIT)",
        question: "علماً أن المتغيرات هي: a, b, c, d = 10, 5.5, 0, True. حسب نتيجة التعبيرين التاليين بالتفصيل:<br/>1. <code>c = a % b + c > a</code><br/>2. <code>d = c == (a < 3) or d</code>",
        solution: `
          <b>1. تحليل c = a % b + c > a :</b><br/>
          - أولاً Modulo (%) : a % b = 10 % 5.5 = 4.5<br/>
          - ثانياً Addition (+) : 4.5 + c = 4.5 + 0 = 4.5<br/>
          - ثالثاً Comparaison (>) : 4.5 > 10 كتعطي False<br/>
          - رابعاً Affectation : إذن c تاخد القيمة <b>False</b>.<br/><br/>
          <b>2. تحليل d = c == (a < 3) or d :</b><br/>
          - أولاً الأقواس : (a < 3) = (10 < 3) = False<br/>
          - ثانياً المقارنة (==) : c == False تعني False == False وهادي كتعطي True<br/>
          - ثالثاً المنطق (or) : True or d كتعطي مباشرة <b>True</b> (بسبب short-circuit)<br/>
          - إذن d تاخد القيمة <b>True</b>.
        `
      }
    ],
    qcm: [
      {
        q: "ما هي نتيجة حساب التعبير: 2 + 3 * 4 ** 2 ؟",
        options: ["80", "50", "400", "98"],
        correct: 1,
        explain: "الأسبقية للأس: 4**2 = 16. ثم الضرب: 3 * 16 = 48. ثم الجمع: 2 + 48 = 50."
      },
      {
        q: "إذا كانت A = 5 و B = 3، فإن العملية A *= B + 2 تجعل A تساوي:",
        options: ["17", "25", "30", "15"],
        correct: 1,
        explain: "A *= B + 2 تعادل A = A * (B + 2) = 5 * (3 + 2) = 5 * 5 = 25 (أو إذا كان B=3 و B+2=5 فإن 5*5=25، وفي السلايد كان A=5, B=3 فإذا كانت A *= B+3 تصبح 30)."
      }
    ]
  },
  {
    id: "ch4",
    num: "04",
    title: "Structures Conditionnelles",
    subtitle: "اتخاذ القرارات: if, elif, else والشروط المركبة",
    icon: "git-branch",
    duration: "60 min",
    topics: [
      "Notion de bloc d'instructions & Indentation (4 espaces, PEP 8)",
      "Condition simple : if",
      "Alternative binaire : if ... else",
      "Arborescence multiple : if ... elif ... else",
      "Conditions composées (and, or, not)",
      "L'importance critique de l'ordre des tests",
      "Études de cas : Facture d'eau par tranches, Année bissextile, Code 4 chiffres"
    ],
    summary: `
      1. **Indentation** : فـ بايثون ما كاينينش الأقواس \`{ }\`. المحاذاة (4 espaces) والنقطتان \`:\` هما لي كيحددو البلوك! نسيان الفراغ كيعطي \`IndentationError\`.
      2. **if / elif / else** : بايثون كيفحص من الفوق لتحت؛ غير كيلقى أول شرط \`True\` كينفذ البلوك ديالو و **كيخرج فحالو من الهيكل كامل**! داكشي علاش ترتيب الشروط حاسم جداً.
      3. **else** : كتنفذ فقط إلا فشلو جميع الشروط لي قبل منها، وما كتحتاجش شرط قدامها.
      4. **Conditions composées** : أحسن من أنك دير \`if\` وسط \`if\`. استعمل \`and\`، \`or\`، \`not\` باش يكون الكود نقي وقابل للقراءة.
    `,
    content: `
      <div class="space-y-6">
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">1. الإزاحة (Indentation) هي روح بايثون</h3>
          <p class="text-slate-300 leading-relaxed">
            فلغات أخرى بحال C أو Java كنستعملو المعقوفات <code>{ ... }</code> باش نحددو بداية ونهاية البلوك. فـ بايثون: <b>La mise en page fait la syntaxe</b>.
            الرمز <code>:</code> كيعلن على بداية البلوك، و <b>4 مساحات (espaces)</b> كتدل على أن الأسطر تابعة ليه!
          </p>
          <pre class="bg-slate-900 p-4 rounded-lg text-sm text-slate-200 font-mono mt-3">
# مثال صحيح:
if note >= 10:
    print("مبروك النجاح!")    # 4 espaces
    print("أنت مؤهل للمستوى القادم")
else:
    print("للأسف رتّب راسك للاستدراكية")
print("نهاية البرنامج")      # désindentation: كيتنفذ فكل الحالات</pre>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">2. تمرين الامتحان الكلاسيكي: Facture d'eau</h3>
          <p class="text-slate-300">
            رد بالك مزيان فهاد النوع د التمارين: كاين فرق بين <b>Tarif Global</b> و <b>Tarif par tranches progressives</b>:
          </p>
          <div class="grid md:grid-cols-2 gap-4 my-3 text-sm">
            <div class="bg-slate-900 p-4 rounded-lg border border-red-500/30">
              <span class="text-red-400 font-bold block mb-1">❌ الخطأ القاتل:</span>
              استهلاك 35m³ تضربها كاملة فـ 4.0 = 140 DH. هادا كيتسمى خطأ فالمفهوم!
            </div>
            <div class="bg-slate-900 p-4 rounded-lg border border-emerald-500/30">
              <span class="text-emerald-400 font-bold block mb-1">✅ الحساب الصحيح (Tranches):</span>
              الـ 20 الأولى بـ 2.0 DH = 40 DH.<br/>
              ما تبقى (35 - 20 = 15m³) بـ 4.0 DH = 60 DH.<br/>
              المجموع: 40 + 60 = <b>100 DH</b>.
            </div>
          </div>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">3. تمرين السنة الكبيسة (Année Bissextile)</h3>
          <p class="text-slate-300 mb-2">
            القاعدة الفلكية للتقويم الغريغوري لي كتعطيها Pr. El Alaoui:
          </p>
          <div class="bg-slate-900 p-4 rounded-lg font-mono text-sm text-sky-300">
            est_bissextile = (annee % 4 == 0 and annee % 100 != 0) or (annee % 400 == 0)
          </div>
          <div class="prof-speech">
            فخ كلاسيكي: سنة 1900 كتقسم على 4 ولكن كتقسم على 100 وما كتقسمش على 400، إذن <b>ليست كبيسة (28 يوماً)</b>. بينما سنة 2000 كتقسم على 400، إذن <b>كبيسة (29 يوماً)</b>.
          </div>
        </div>
      </div>
    `,
    exercises: [
      {
        title: "تمرين TD Série 2: كود الأمان ذو 4 أرقام",
        question: "كتب برنامج كيطلب كود سري من 4 أرقام (بين 1000 و 9999). الكود كيكون صالح إذا كان مضاعفاً لـ 3، إلا إذا كان كيسالي بـ 0 (مضاعف لـ 10) فخاصو يكون مضاعف لـ 30 أيضاً.",
        solution: `
<pre class="bg-slate-900 p-4 rounded-lg text-sm font-mono text-slate-200">
code = int(input("أدخل كود الأمان (4 أرقام): "))

if code < 1000 or code > 9999:
    print("خطأ: الكود يجب أن يتكون من 4 أرقام بالضبط!")
elif code % 10 == 0:
    if code % 30 == 0:
        print("الكود مقبول (Valide - مضاعف لـ 30)")
    else:
        print("الكود مرفوض (Refusé - ينتهي بـ 0 وغير مضاعف لـ 30)")
elif code % 3 == 0:
    print("الكود مقبول (Valide - مضاعف لـ 3)")
else:
    print("الكود مرفوض (Refusé)")
</pre>
        `
      }
    ],
    qcm: [
      {
        q: "إيلا درنا: if note >= 10: ... elif note >= 12: ... شنو غيوقع لطالب عندو 14؟",
        options: [
          "غيتنفذ بلوك note >= 12 فقط",
          "غيتنفذ بلوك note >= 10 فقط ويخرج",
          "غيتنفذو بجوج",
          "SyntaxError"
        ],
        correct: 1,
        explain: "بايثون كينفذ أول شرط صحيح ويخرج من الهيكل فوراً، داكشي علاش الترتيب من الأكبر للأصغر ضروري!"
      }
    ]
  },
  {
    id: "ch5",
    num: "05",
    title: "Boucles & Itérations",
    subtitle: "التكرار الذكي: for, while, range, break, continue و else",
    icon: "repeat",
    duration: "65 min",
    topics: [
      "Boucle for (Boucle bornée) & Fonction range(start, stop, step)",
      "Boucle while (Boucle conditionnelle) : Initialisation, Test, Mise à jour",
      "Le piège de la boucle infinie & Ctrl-C",
      "Contrôle de flux : continue (saute) vs break (quitte)",
      "La clause spéciale 'else' sur une boucle (Exécution sans break)",
      "Boucles imbriquées (Tables de multiplication, matrices)",
      "Exercices d'examen : Factorielle n! et Test de Primalité (Nombre premier)"
    ],
    summary: `
      1. **for vs while** :
         - كنستعملو **for** ملي كنعرفو عدد المرات مسبقاً (Compteur connu).
         - كنستعملو **while** ملي التكرار مرتبط بشرط أو حدث خارجي ما عارفينش وقتاش غيوقع.
      2. **range(a, b, step)** :
         - دايماً **الحد الأخير b غير داخل (exclu)**! \`range(1, 6)\` كتعطي: 1, 2, 3, 4, 5.
      3. **break vs continue** :
         - \`break\` كيهرس البوكل كاملة ويخرج فحالو.
         - \`continue\` كينقز غير الدورة الحالية ويمشي للدورة الموالية.
      4. **else على البوكل** :
         - هادي ميزة خاصة ببايثون: البلوك \`else\` كيتنفذ فقط إلا سالات البوكل طبيعياً **بلا ما يقاطعها break**!
    `,
    content: `
      <div class="space-y-6">
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">1. الدالة range() وأسرارها</h3>
          <p class="text-slate-300">
            الدالة <code>range()</code> هي المولد الأساسي للأرقام فالحلقات التكرارية:
          </p>
          <div class="grid md:grid-cols-3 gap-3 my-3 text-sm font-mono">
            <div class="bg-slate-900 p-3 rounded border border-slate-700">
              <span class="text-sky-400 font-bold">range(5)</span><br/>
              0, 1, 2, 3, 4<br/>
              <span class="text-xs text-slate-400">(من 0 إلى 4، 5 خارجة)</span>
            </div>
            <div class="bg-slate-900 p-3 rounded border border-slate-700">
              <span class="text-sky-400 font-bold">range(2, 7)</span><br/>
              2, 3, 4, 5, 6<br/>
              <span class="text-xs text-slate-400">(من 2 إلى 6، 7 خارجة)</span>
            </div>
            <div class="bg-slate-900 p-3 rounded border border-slate-700">
              <span class="text-sky-400 font-bold">range(10, 0, -2)</span><br/>
              10, 8, 6, 4, 2<br/>
              <span class="text-xs text-slate-400">(العد التنازلي بخطوة -2)</span>
            </div>
          </div>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">2. تمرين الامتحان 1: حساب العاملي (Factorielle n!)</h3>
          <p class="text-slate-300 mb-2">
            العاملي كيتعرف رياضياً بـ : n! = 1 × 2 × ... × n مع 0! = 1.
          </p>
          <pre class="bg-slate-900 p-4 rounded-lg text-sm font-mono text-slate-200">
n = int(input("أدخل عدداً صحيحاً موجباً: "))
if n < 0:
    print("العاملي غير معرف للأعداد السالبة!")
else:
    f = 1
    for i in range(1, n + 1):
        f *= i
    print(f"{n}! = {f}")</pre>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">3. تمرين الامتحان 2: فحص العدد الأولي مع else على for</h3>
          <p class="text-slate-300 mb-2">
            العدد الأولي (Nombre premier) هو عدد كبر من 1 وما كيقبل القسمة إلا على 1 وعلى راسو:
          </p>
          <pre class="bg-slate-900 p-4 rounded-lg text-sm font-mono text-slate-200">
n = int(input("Entrez n: "))
if n <= 1:
    print(f"{n} ليس عدداً أولياً")
else:
    for d in range(2, n):
        if n % d == 0:
            print(f"{n} ليس أولياً، يقبل القسمة على {d}")
            break
    else:
        # تتنفذ فقط إذا انتهت الحلقة بدون أي break!
        print(f"{n} عدد أولي ممتاز!")</pre>
        </div>
      </div>
    `,
    exercises: [
      {
        title: "تمرين تتبع الكود (Trace d'exécution)",
        question: "ما هو الإخراج الدقيق لهذا البرنامج في الكونسول؟<br/><pre class='font-mono text-sm bg-slate-900 p-3 rounded'>for i in range(1, 6):\n    if i == 3:\n        continue\n    if i == 5:\n        break\n    print(i, end=' ')</pre>",
        solution: `
          <b>التتبع خطوة بخطوة:</b><br/>
          - i = 1: طباعة 1<br/>
          - i = 2: طباعة 2<br/>
          - i = 3: شرط i == 3 محقق -> continue كتنقز الطباعة وتمشي للدورة الموالية.<br/>
          - i = 4: طباعة 4<br/>
          - i = 5: شرط i == 5 محقق -> break كتقطع الحلقة نهائياً!<br/>
          <b>النتيجة المعروضة:</b> <code>1 2 4 </code>
        `
      }
    ],
    qcm: [
      {
        q: "كم عدد الدورات التي ستنفذها الحلقة: for x in range(3, 15, 3) ؟",
        options: ["3 دورات", "4 دورات", "5 دورات", "12 دورة"],
        correct: 1,
        explain: "القيم هي: 3, 6, 9, 12 (15 خارجة). المجموع هو 4 دورات."
      }
    ]
  },
  {
    id: "ch6",
    num: "06",
    title: "Séquences & Structures Fondamentales",
    subtitle: "السلاسل، القوائم، التقطيع (Slicing)، القواميس والمجموعات",
    icon: "layers",
    duration: "70 min",
    topics: [
      "Les Séquences en Python : Propriétés communes (len, indices, in, slicing)",
      "Chaînes (str) : Immuabilité, Méthodes (.upper, .lower, .strip, .replace, .find, .split)",
      "Listes (list) : Tableaux dynamiques vs Tableaux C (pointeurs PyObject, hétérogénéité)",
      "Indexation & Slicing : L[start:end:step], indices négatifs",
      "Mutabilité vs Immuabilité & Le piège de l'aliasing (L2 = L1 vs L2 = L1[:])",
      "Méthodes des listes : append(), insert(), remove(), del, sort()",
      "Comparaison lexicographique des listes",
      "Tuples (n-uplets), Sets (ensembles) & Dictionnaires (dict)"
    ],
    summary: `
      1. **Mutabilité** :
         - **Immuables (غير قابلة للتعديل)** : \`int, float, bool, str, tuple\`. أي تعديل كيكريي كائن جديد فالميموار.
         - **Mutables (قابلة للتعديل في نفس المكان)** : \`list, set, dict\`.
      2. **فخ الـ Aliasing (النسخ المزيف)** :
         - \`L2 = L1\` ما كديرش نسخة! غير كتعطي اسم ثاني لنفس البلاصة فالميموار. إلا بدلت L2 كتبدل حتى L1!
         - باش دير نسخة حقيقية ومستقلة: استعمل \`L2 = L1[:]\` أو \`L2 = L1.copy()\`.
      3. **Slicing \`L[start:stop:step]\`** :
         - \`L[::-1]\` كتقلب القائمة من اللخر للول.
         - \`L[1:4]\` كتاخد العناصر من الإنديكس 1 لـ 3 (4 خارجة).
      4. **Comparaison lexicographique** : المقارنة بين القوائم كتدار عنصر بعنصر من اليسار لليمين وكتوقف عند أول اختلاف!
      5. **Structures** :
         - **Tuple** : بحال الليستة ولكن مسدودة بأقواس \`()\` وما كتبدلش، وتكتب \`(42,)\` بفاصلة إلا كان عنصر وحيد.
         - **Set** : مجموعة \`{ }\` بدون ترتيب وبلا دوبلونات (Doublons interdits).
         - **Dict** : أزواج Clé / Valeur بحال \`dico["nom"]\`.
    `,
    content: `
      <div class="space-y-6">
        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">1. الفرق الجوهري بين Listes في Python ومصفوفات C</h3>
          <p class="text-slate-300 leading-relaxed">
            فـ C، الطابلو كيكون متجانس (Homogène: كلهم int مثلاً) وملاصق فالميموار وحجمو تابت.
            أما فـ بايثون: الليستة هي <b>Tableau dynamique de pointeurs</b> كتشير لكائنات PyObject فالميموار، وهادشي كيعطيها مرونة خارقة: كتقبل أنواع مختلفة وكتكبر وتصغر تلقائياً!
          </p>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">2. فخ الـ Aliasing (سؤال مضمون فالامتحان)</h3>
          <div class="prof-piege">
            شوف معايا هاد الكود وتفكرني فنهار الامتحان:<br/>
            <pre class="bg-slate-900 p-3 rounded font-mono text-sm text-amber-300">
L1 = [1, 2, 3]
L2 = L1
L2[0] = 99
print(L1) # شنو غيطبع؟</pre>
            <b>الجواب:</b> غيطبع <code>[99, 2, 3]</code>! لأن <code>L2 = L1</code> كتدير <b>Liaison vers le même objet</b>.
            باش تحمي الكود ديالك خاصك دير Vraie Copie بـ: <code>L2 = L1[:]</code> أو <code>L2 = L1.copy()</code>.
          </div>
        </div>

        <div class="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
          <h3 class="text-xl font-bold text-sky-400 mb-2">3. المقارنة المعجمية (Comparaison Lexicographique)</h3>
          <p class="text-slate-300 mb-3">
            من السلايدات الرسمية (Slide 16): كيفاش بايثون كيقارن بين جوج ديال الليستات؟
          </p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left border border-slate-700">
              <thead class="bg-slate-900 text-sky-400">
                <tr><th class="p-2">العملية</th><th class="p-2">النتيجة</th><th class="p-2">التعليل التقني</th></tr>
              </thead>
              <tbody class="divide-y divide-slate-700 font-mono text-xs">
                <tr><td class="p-2">[5, 10] &lt; [5, 10, 15]</td><td class="p-2 text-emerald-400">True</td><td class="p-2 text-slate-300 font-sans">préfixe : القائمة الأقصر أصغر</td></tr>
                <tr><td class="p-2">[2, 5, 1] &gt; [2, 3, 4, 5, 6]</td><td class="p-2 text-emerald-400">True</td><td class="p-2 text-slate-300 font-sans">فـ index 1: 5 &gt; 3 كنتوقفو فوراً وكنتجاهلو الطول!</td></tr>
                <tr><td class="p-2">["Ali", "sanae"] &lt; ["Ali", "Sanae"]</td><td class="p-2 text-red-400">False</td><td class="p-2 text-slate-300 font-sans">'s' (115) كبر من 'S' (83) فجدول ASCII</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,
    exercises: [
      {
        title: "تمرين Slicing دقيق (Exercice Slide)",
        question: "علماً أن: <code>animaux = ['girafe', 'tigre', 'singe', 'souris']</code>. حدد مخرجات التعليمات التالية:<br/>1. animaux[1:3]<br/>2. animaux[:2]<br/>3. animaux[::-1]",
        solution: `
          1. <b>animaux[1:3]</b> -> من إنديكس 1 حتى 2: <code>['tigre', 'singe']</code><br/>
          2. <b>animaux[:2]</b> -> من البداية حتى إنديكس 1: <code>['girafe', 'tigre']</code><br/>
          3. <b>animaux[::-1]</b> -> القائمة مقلوبة: <code>['souris', 'singe', 'tigre', 'girafe']</code>
        `
      }
    ],
    qcm: [
      {
        q: "أي من هذه الهياكل غير قابل للتعديل (Immuable)؟",
        options: ["list", "dict", "tuple", "set"],
        correct: 2,
        explain: "الـ tuple كائن ثابت غير قابل للتعديل بعد إنشائه."
      },
      {
        q: "ما هو ناتج: [] < [0] ؟",
        options: ["False", "True", "TypeError", "None"],
        correct: 1,
        explain: "القائمة الفارغة هي بادئة (préfixe) لأي قائمة، وبالتالي هي الأصغر دائماً."
      }
    ]
  }
];

// Full Exam Questions for Exam Simulator (Note /20)
const EXAM_QUESTIONS = [
  {
    id: 1,
    points: 1,
    question: "شكون هو المسؤول المباشر داخل الـ CPU على فك شفرة التعليمات وجلبها من الذاكرة RAM؟",
    options: [
      "L'Unité Arithmétique et Logique (UAL)",
      "L'Unité de Contrôle (UC)",
      "Le Bus de données",
      "Le Disque Dur"
    ],
    correct: 1,
    explain: "L'Unité de Contrôle (UC) هي chef d'orchestre لي كدير Fetch و Decode."
  },
  {
    id: 2,
    points: 1,
    question: "ماذا يطبع البرنامج التالي بالضبط؟\nprint(0.1 + 0.2 == 0.3)",
    options: ["True", "False", "None", "SyntaxError"],
    correct: 1,
    explain: "False! بسبب معيار IEEE 754 للأعداد العائمة، 0.1 + 0.2 = 0.30000000000000004."
  },
  {
    id: 3,
    points: 1,
    question: "ما هي قيمة ونوع المتغير: a = 15 // 4 ؟",
    options: [
      "3.75 من نوع float",
      "3 من نوع int",
      "4 من نوع int",
      "3.0 من نوع float"
    ],
    correct: 1,
    explain: "المعامل // هو القسمة الصحيحة الإقليدية وترجع int قيمته 3."
  },
  {
    id: 4,
    points: 1,
    question: "أي من هؤلاء يعتبر اسماً غير صالح لمتغير (Identificateur Invalide) في بايثون؟",
    options: ["_valeur_1", "True_val", "2eme_choix", "MAX_SIZE"],
    correct: 2,
    explain: "2eme_choix غير صالح لأنه يبدأ برقم، وهذا ممنوع في قواعد التسمية."
  },
  {
    id: 5,
    points: 1,
    question: "ما هي نتيجة تنفيذ: int('3.14') ؟",
    options: ["3", "3.14", "ValueError", "TypeError"],
    correct: 2,
    explain: "ValueError! دالة int لا تقبل سلسلة نصية بها فاصلة عشرية مباشرة."
  },
  {
    id: 6,
    points: 1,
    question: "ما هي قيمة: bool('False') ؟",
    options: ["False", "True", "Error", "None"],
    correct: 1,
    explain: "True! لأن أي نص غير فارغ يُقيّم دائماً إلى True."
  },
  {
    id: 7,
    points: 1,
    question: "ما هي نتيجة التعبير: 2 ** 3 ** 2 ؟",
    options: ["64", "512", "36", "18"],
    correct: 1,
    explain: "الأس يُحسب من اليمين إلى اليسار: 3² = 9، ثم 2⁹ = 512."
  },
  {
    id: 8,
    points: 1,
    question: "ماذا يطبع: print(False and (10 / 0 == 0)) ؟",
    options: ["ZeroDivisionError", "False", "True", "None"],
    correct: 1,
    explain: "False! بفضل التقييم في دارة قصيرة (Short-circuit)، لا يتم فحص الطرف الأيمن بتاتاً."
  },
  {
    id: 9,
    points: 1,
    question: "ما هي نتيجة العملية: -7 // 2 ؟",
    options: ["-3", "-3.5", "-4", "-3.0"],
    correct: 2,
    explain: "القسمة الصحيحة تأخذ أكبر عدد صحيح أصغر من النتيجة (-3.5 تصبح -4)."
  },
  {
    id: 10,
    points: 1,
    question: "ماذا سينتج عن الكود التالي؟\n\"1\" in [1, 2, 3]",
    options: ["True", "False", "TypeError", "SyntaxError"],
    correct: 1,
    explain: "False! المعامل in يقارن القيمة والنوع دون خطأ، و '1' النصي يختلف عن 1 العددي."
  },
  {
    id: 11,
    points: 1,
    question: "كم عدداً تنتجه الدالة: range(1, 6) ؟",
    options: ["6 أعداد", "5 أعداد", "7 أعداد", "4 أعداد"],
    correct: 1,
    explain: "تنتج 5 أعداد: 1, 2, 3, 4, 5 (الحد 6 غير مشمول)."
  },
  {
    id: 12,
    points: 1,
    question: "في حلقة تكرارية، ما هو الأمر الذي يقفز فوراً إلى الدورة التالية ويتجاهل بقية الكود الحالي؟",
    options: ["break", "continue", "pass", "exit"],
    correct: 1,
    explain: "continue تقفز للدورة التالية، بينما break توقف الحلقة نهائياً."
  },
  {
    id: 13,
    points: 1,
    question: "متى يتم تنفيذ كتلة else المرفقة بحلقة for أو while؟",
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
    points: 1,
    question: "ما هو ناتج تنفيذ:\nL1 = [10, 20]\nL2 = L1\nL2.append(30)\nprint(len(L1))",
    options: ["2", "3", "Error", "1"],
    correct: 1,
    explain: "3! لأن L2 = L1 تنشئ اسماً مستعاراً (Alias) يشير لنفس الكائن في الذاكرة."
  },
  {
    id: 15,
    points: 1,
    question: "كيف نقوم بنسخ حقيقي ومستقل لقائمة L1 في قائمة L2؟",
    options: ["L2 = L1", "L2 = L1[:]", "L2 = copy(L1)", "L2 = &L1"],
    correct: 1,
    explain: "باستخدام تقطيع كامل L1[:] أو دالة L1.copy()."
  },
  {
    id: 16,
    points: 1,
    question: "ما هي نتيجة المقارنة: [2, 5, 1] > [2, 3, 4, 5, 6] ؟",
    options: ["True", "False", "TypeError", "False لأن الثانية أطول"],
    correct: 0,
    explain: "True! في المقارنة المعجمية، عند المؤشر 1 نجد 5 > 3، فيتوقف الاختبار وتكون الأولى أكبر بغض النظر عن الطول."
  },
  {
    id: 17,
    points: 1,
    question: "أي من التعليمات التالية تنشئ مجموعة فارغة (Set vide) بشكل صحيح؟",
    options: ["s = {}", "s = set()", "s = []", "s = ()"],
    correct: 1,
    explain: "set() تنشئ مجموعة فارغة، بينما {} تنشئ قاموساً فارغاً (dictionnaire vide)."
  },
  {
    id: 18,
    points: 1,
    question: "ماذا يطبع البرنامج التالي؟\nprint('Licence', 'SMI', sep='-', end=' / ')\nprint('IA', 'S1', sep=':')",
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
    points: 1,
    question: "ما هو نوع الكائن: t = (42) ؟",
    options: ["tuple", "int", "list", "set"],
    correct: 1,
    explain: "int! لأن تعريف tuple بعنصر واحد يتطلب فاصلة إجبارية مثل (42,)."
  },
  {
    id: 20,
    points: 1,
    question: "في معمارية Von Neumann، ما الذي يميز Bus d'adresses؟",
    options: [
      "أنه ثنائي الاتجاه (Bidirectionnel)",
      "أنه أحادي الاتجاه (Unidirectionnel من المعالج للذاكرة)",
      "أنه ينقل نبضات الساعة فقط",
      "أنه ينقل البيانات الفعلية بين المعالج والشاشة"
    ],
    correct: 1,
    explain: "Bus d'adresses أحادي الاتجاه يحدد به المعالج مكان الخلية المستهدفة للقراءة أو الكتابة."
  }
];

// University TD Sheets & Detailed Solutions
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
      },
      {
        num: "Exercice 4, 5 & 6",
        title: "برامج تفاعلية متكاملة (I/O, Rectangle, Âge)",
        content: "كتابة البرامج التفاعلية لطلب الاسم والسن وحساب المساحة والمحيط.",
        solution: `
<pre class="bg-slate-900 p-4 rounded text-xs font-mono text-slate-200">
# Exercice 4: Formatage I/O
nom = input("Entrez votre nom: ")
age = int(input("Entrez votre âge: "))
# الطريقة 1: Multi-arguments
print("Bonjour", nom, ", tu as", age, "ans et bienvenue à l'université")
# الطريقة 2: f-string الحديثة والموصى بها
print(f"Bonjour {nom}, tu as {age} ans et bienvenue à l'université")

# Exercice 6: Rectangle
largeur = float(input("Largeur: "))
longueur = float(input("Longueur: "))
perimetre = 2 * (largeur + longueur)
surface = largeur * longueur
print(f"Périmètre = {perimetre:.2f} m | Surface = {surface:.2f} m²")
</pre>
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
        num: "Exercice 1 & 2",
        title: "Caisse Supermarché & Capteur Feu Tricolore",
        content: "التحقق من الرصيد البنكي وحالة إشارة المرور.",
        solution: `
<pre class="bg-slate-900 p-4 rounded text-xs font-mono text-slate-200">
# Exercice 1: Caisse
solde = float(input("Solde bancaire: "))
panier = float(input("Montant panier: "))
if solde >= panier:
    nouveau_solde = solde - panier
    print(f"Paiement accepté ! Nouveau solde: {nouveau_solde:.2f} DH")
else:
    manque = panier - solde
    print(f"Paiement refusé : solde insuffisant. Somme manquante: {manque:.2f} DH")

# Exercice 2: Feu
couleur = input("Couleur (vert/orange/rouge): ").strip().lower()
if couleur == "vert":
    print("Passez")
elif couleur == "orange":
    print("Ralentissez")
elif couleur == "rouge":
    print("Arrêt absolu")
else:
    print("Erreur de capteur")
</pre>
        `
      },
      {
        num: "Exercice 4: Auto-école & Permis",
        title: "الشروط المركبة لأهلية امتحان السياقة",
        content: "السنة >= 18 ونجح في الكود وأجرى 20 ساعة أو قيادة مصاحبة.",
        solution: `
<pre class="bg-slate-900 p-4 rounded text-xs font-mono text-slate-200">
age = int(input("Âge: "))
code = input("Examen du code réussi (oui/non): ").strip().lower()
heures = int(input("Heures de conduite: "))
accompagnee = input("Conduite accompagnée (oui/non): ").strip().lower()

condition_apprentissage = (heures >= 20) or (accompagnee == "oui")

if (age >= 18) and (code == "oui") and condition_apprentissage:
    print("Candidat autorisé à l'examen")
else:
    print("Candidat non éligible")
</pre>
        `
      },
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
