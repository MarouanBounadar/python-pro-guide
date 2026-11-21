# 🐍 Python Pro Guide | Programmation Python 1 (SMI / IA - S1)

منصة وتطبيق تفاعلي متكامل مخصص لطلبة **جامعة ابن طفيل (UIT) - كلية العلوم بالقنيطرة (Faculté des Sciences Kénitra)**، لمسلكي **SMI / IA - السداسي الأول (Semestre 1)** لمادة **Programmation Python 1** تحت إشراف **الأستاذة إيمان العلوي (Pr. Imane EL ALAOUI)**.

---

## 🌟 مميزات المنصة (Core Features)

1. **أوراش برمجية تفاعلية على طريقة DataCamp (Ateliers Pratiques DataCamp)**:
   - كل فصل دراسي يحتوي في نهايته على مختبر تطبيقي مباشر (Instructions + Éditeur de Code + Console interactive Stdout).
   - زر **Exécuter le code** لتشغيل الكود ورؤية النتيجة فوراً في التيرمينال.
   - زر **Vérifier ma solution** للتحقق التلقائي من صحة الحل ومنح نقاط الخبرة (+50 XP).
   - زر **Indice** لتلميحات التفكير وزر **Solution** للحصول على الحل النموذجي الموثق.

2. **دروس مفصلة ومركزة (6 Chapitres Complets)**:
   - **Chapitre 01** : Introduction & Architecture des Ordinateurs (Von Neumann, CPU, RAM, Bus, Fetch-Decode-Execute, Compilateur vs Interpréteur vs PVM).
   - **Chapitre 02** : Variables, Types de base & Transtypage (int, float, complex, bool, str, PEP 8, Typage dynamique, Pièges de conversion).
   - **Chapitre 03** : Opérateurs, Expressions & Priorités (Arithmétique, Logique, Comparaison, Priorités, Évaluation court-circuit).
   - **Chapitre 04** : Structures Conditionnelles (if, elif, else, Facture d'eau progressive, Année bissextile, Code PIN 4 chiffres).
   - **Chapitre 05** : Boucles & Itérations (for, while, range, break, continue, boucle-else, Factorielle n!, Test de primalité).
   - **Chapitre 06** : Séquences & Structures Fondamentales (Listes dynamiques vs C, Slicing, Mutabilité vs Immuabilité, Aliasing L2=L1, Tuples, Sets, Dictionnaires).

3. **بنك تمارين ضخم محلول مع ميزة التجربة المباشرة (24 Exercices Corrigés)**:
   - 4 تمارين متدرجة لكل فصل من الفصول الستة.
   - مساحة مخصصة للطالب لكتابة الكود مع زر **Tester ce code** لتشغيل الكود والتأكد منه قبل الاطلاع على التصحيح النموذجي المفصل.

4. **محاكي امتحانات وفروض الكلية مع التوقيت والتنقيط (/20 Points)**:
   - مواضيع امتحانات كاملة مصممة وفق نمط امتحانات كلية العلوم بالقنيطرة.
   - مؤقت زمني (30 دقيقة)، حساب فوري للنقطة مع ميزة تصحيح الأخطاء وتقديم التبرير العلمي لكل سؤال.

5. **فلاش كارد ثلاثية الأبعاد (Flashcards 3D) وبنك QCM**:
   - بطاقات تفاعلية بتقنية 3D Flip للمراجعة السريعة وحفظ التعاريف الأساسية.
   - بنك أسئلة QCM سريعة للتدريب الذاتي مع تفسير فوري لكل خيار.

6. **نظام تتبع التقدم التلقائي (Persistent Progress Tracking)**:
   - حفظ تلقائي للتقدم عبر `localStorage` مع شريط تقدم شامل يعكس الفصول المقروءة، التمارين المنجزة، والامتحانات المجتازة.

---

## 🚀 طرق التشغيل (How to Run)

### 1. عبر التطبيق التنفيذي المباشر (Fichier Exécutable .exe):
التطبيق متوفر كملف تنفيذي جاهز لا يحتاج تثبيت بايثون:
- ستجده في المجلد: `dist/PythonProGuide.exe`
- فقط اضغط عليه نقرتين وسيفتح التطبيق كنافذة سطح مكتب احترافية (Native Desktop App) مع سيرفر بايثون حقيقي مدمج لتنفيذ الأكواد!

### 2. عبر المتصفح مباشرة (Navigateur Web):
- اضغط نقرتين على ملف `index.html` وسيفتح مباشرة في أي متصفح ويب، مع محاكي بايثون مدمج بدون إنترنت.

### 3. عبر سطر الأوامر (Python Local Server):
```bash
python main.py
```

---

## 📤 طريقة رفع المشروع إلى GitHub لمشاركته مع أصدقائك

لكي يتمكن أصدقاؤك من تحميل الملف التنفيذي `.exe` أو تصفح المشروع:

```bash
# 1. إضافة الملفات المعدلة
git add .

# 2. تسجيل التغييرات (Commit)
git commit -m "Add DataCamp interactive labs, real Python executor and complete exams"

# 3. التأكد من اسم الفرع الرئيسي
git branch -M main

# 4. ربط المستودع بحسابك على GitHub (استبدل الرابط برابط مستودعك الخاص)
git remote add origin https://github.com/YOUR_USERNAME/python-pro-guide.git

# 5. رفع الكود
git push -u origin main
```

> **ملاحظة:** تم تضمين ملف `release.yml` في `.github/workflows/`، مما يعني أن GitHub سيقوم تلقائياً ببناء ونشر ملف `PythonProGuide.exe` كـ Release جاهز للتحميل بمجرد رفعك للمشروع!
