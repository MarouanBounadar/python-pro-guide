# 🐍 Python Pro Guide | Programmation Python 1 (SMI / IA - S1)

منصة تعليمية تفاعلية شاملة مخصصة لطلبة **جامعة ابن طفيل (UIT) - كلية العلوم بالقنيطرة (Faculté des Sciences Kénitra)**، لمسلكي **SMI / IA - السداسي الأول (Semestre 1)** لمادة **Programmation Python 1** تحت إشراف **الأستاذة إيمان العلوي (Pr. Imane EL ALAOUI)**.

---

## 🌟 مميزات المنصة (Features)

1. **شرح مبسط بالدارجة المغربية والمصطلحات الأكاديمية**:
   - تبسيط المفاهيم الصعبة (Architecture de Von Neumann, PVM, Bytecode, Typage dynamique, Slicing, Aliasing...).
2. **برنامج دراسي متكامل (6 فصول شاملة)**:
   - **Chapitre 01** : Introduction & Architecture des Ordinateurs (Von Neumann, CPU, RAM, Bus, Fetch-Decode-Execute, Compilateur vs Interpréteur vs PVM).
   - **Chapitre 02** : Variables, Types de base & Transtypage (int, float, complex, bool, str, PEP 8, Typage dynamique).
   - **Chapitre 03** : Opérateurs, Expressions & Priorités (Arithmétique, Logique, Comparaison, Short-circuit evaluation).
   - **Chapitre 04** : Structures Conditionnelles (if, elif, else, Facture d'eau par tranches, Année bissextile, Code 4 chiffres).
   - **Chapitre 05** : Boucles & Itérations (for, while, range, break, continue, boucle-else, Factorielle n!, Nombre premier).
   - **Chapitre 06** : Séquences & Structures Fondamentales (Listes dynamiques vs C, Slicing, Mutabilité vs Immuabilité, Tuples, Sets, Dictionnaires).
3. **محاكي امتحانات حقيقي (Exam Simulator Note /20)**:
   - 20 سؤال QCM وأسئلة تتبع الكود من امتحانات وفروض الكلية.
   - مؤقت زمني وتصحيح فوري مع احتساب النتيجة على 20 وتقديم تقييم وملاحظات الأستاذ.
4. **حلول سلاسل التمارين الرسمية (TD Corrigés)**:
   - حل السلسلة الأولى (Série 1) بالتفصيل خطوة بخطوة.
   - حل السلسلة الثانية (Série 2) الخاصة بالشروط والتمارين الكلاسيكية.
5. **أشهر 10 فخاخ في الامتحانات (Les 10 Pièges d'Examen)**:
   - فخ `int("3.14")`، فخ `0.1 + 0.2 == 0.3`، فخ `bool("False")`، فخ `2 ** 3 ** 2`، فخ `L2 = L1` (Aliasing)...
6. **محاكي أكواد تفاعلي (Playground)**:
   - بيئة لتجربة الأكواد ومعرفة النتيجة فوراً بدون الحاجة لتثبيت برامج.
7. **بطاقة مراجعة مركزة (Fiche de Révision Express)**:
   - قابلة للطباعة PDF للمراجعة السريعة قبل الدخول لقاعة الامتحان.

---

## 🚀 طريقة التشغيل المباشر (Quick Start)

التطبيق عبارة عن **Single Page Application (SPA)** جاهز وخفيف، لا يحتاج أي تثبيت!

- **الطريقة 1 (الأسهل)**:
  فقط اضغط نقرتين (Double-Click) على ملف `index.html` وسيفتح مباشرة في أي متصفح (Chrome, Edge, Firefox, Safari).

- **الطريقة 2 (عبر خادم محلي)**:
  إذا أردت تشغيله عبر سيرفر محلي:
  ```bash
  # بواسطة بايثون:
  python -m http.server 8000
  ```
  ثم افتح في المتصفح: `http://localhost:8000`

---

## 📤 طريقة رفع المشروع إلى GitHub الخاص بك ومشاركته مع زملائك

لكي يتمكن أصدقاؤك من تحميل المشروع أو فتحه عبر الإنترنت من حسابك على GitHub، اتبع الخطوات التالية في موجه الأوامر (Terminal):

1. أنشئ مستودعاً جديداً (New Repository) فارغاً على موقع GitHub وسمّه مثلاً: `python-pro-guide`
2. في مجلد المشروع، نفذ الأوامر التالية (استبدل الرابط برابط مستودعك):

```bash
# 1. إضافة جميع الملفات
git add .

# 2. تسجيل التغييرات (Commit)
git commit -m "Initial release: Complete Python course & exam simulator"

# 3. تغيير اسم الفرع للرئيسي
git branch -M main

# 4. ربطه بمستودعك على GitHub
git remote add origin https://github.com/YOUR_USERNAME/python-pro-guide.git

# 5. رفع الملفات
git push -u origin main
```

### 🌐 تفعيل GitHub Pages ليعمل التطبيق كموقع مباشر على الإنترنت مجاناً:
1. ادخل إلى مستودعك على GitHub.
2. اذهب إلى **Settings** -> **Pages**.
3. في قسم **Branch**، اختر `main` واضغط **Save**.
4. خلال دقيقة سيعطيك GitHub رابطاً مباشراً يمكنك إرساله لأصدقائك في الواتساب أو تيليجرام ليتصفحوه من هواتفهم وحواسيبهم مباشرة!

---
> أعد هذا التطبيق لدعم طلبة الإعلاميات والذكاء الاصطناعي (SMI / IA S1) بكلية العلوم القنيطرة. بالتوفيق والنجاح للجميع! 🎓
