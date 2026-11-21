// Base de Données Universitaire & Défis Pratiques DataCamp
// SMI / IA - Semestre 1 • Faculté des Sciences Kénitra (UIT) • Pr. Imane EL ALAOUI

const APP_CONFIG = {
  title: "Python University S1",
  filiere: "SMI / IA - S1",
  university: "Université Ibn Tofail (UIT) - Faculté des Sciences Kénitra",
  prof: "Pr. Imane EL ALAOUI"
};

const DETAILED_COURSES = [
  {
    id: "ch1",
    num: "01",
    title: "Architecture des Ordinateurs & Fondements de Python",
    duration: "45 min",
    readTime: "15 min de lecture",
    sections: [
      {
        heading: "1. Système Numérique vs Système Informatique",
        content: `
          <p class="mb-3">En informatique fondamentale, il est primordial de distinguer l'échelle d'un système numérique de celle d'un système informatique :</p>
          <div class="grid md:grid-cols-2 gap-4 my-3 text-xs">
            <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span class="text-cyan-400 font-bold text-sm block mb-1">Système Numérique</span>
              <p class="text-slate-300">Tout dispositif traitant des signaux discrets (0 et 1). Le comportement est généralement <b>figé</b> dans un circuit matériel dédié (ex. montre à quartz, feux de signalisation basiques, microcontrôleur d'ABS automobile non reprogrammable).</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-indigo-500/30">
              <span class="text-indigo-400 font-bold text-sm block mb-1">Système Informatique</span>
              <p class="text-slate-300">Sous-ensemble des systèmes numériques, caractérisé par sa nature <b>universellement programmable</b>. Il est capable d'exécuter des algorithmes arbitraires (scripts, logiciels, simulations complexes).</p>
            </div>
          </div>
          <div class="p-3 bg-indigo-950/40 border-l-4 border-indigo-500 rounded-r-xl text-xs text-indigo-200 my-2">
            <b>Règle d'or de l'examen :</b> Tout système informatique est numérique, mais tout système numérique n'est pas informatique.
          </div>
        `
      },
      {
        heading: "2. L'Architecture de Von Neumann (1945)",
        content: `
          <p class="mb-3">Avant 1945, reprogrammer une machine (comme l'ENIAC) imposait de modifier manuellement le câblage physique. John von Neumann a introduit le concept révolutionnaire de <b>Programme Enregistré</b> :</p>
          <ul class="list-disc list-inside space-y-2 text-xs text-slate-300 mb-3">
            <li><b>Espace mémoire unifié :</b> Les instructions du programme et les données (variables) partagent le même espace physique dans la mémoire RAM.</li>
            <li><b>Le Processeur (CPU) :</b> Composé de :
              <ul class="pl-6 list-circle space-y-1 mt-1 text-slate-400">
                <li><b>Unité de Contrôle (UC) :</b> Chef d'orchestre matériel chargé de l'extraction (Fetch) et du décodage (Decode).</li>
                <li><b>Unité Arithmétique et Logique (UAL) :</b> Moteur de calcul (+, -, *, /, comparaisons et algèbre booléenne).</li>
                <li><b>Registres internes :</b> Mémoires ultra-rapides stockant les opérandes et résultats intermédiaires.</li>
              </ul>
            </li>
            <li><b>Mémoire Centrale (RAM) :</b> Volatile, découpée en Zone Instructions (code binaire compilé) et Zone Données (valeurs des variables).</li>
            <li><b>Système de Bus :</b>
              <ul class="pl-6 list-circle space-y-1 mt-1 text-slate-400">
                <li><b>Bus de Données :</b> Bidirectionnel, transfère les valeurs numériques effectives entre CPU, RAM et périphériques.</li>
                <li><b>Bus d'Adresses :</b> Unidirectionnel, définit l'emplacement exact en mémoire cible pour l'opération.</li>
                <li><b>Bus de Contrôle :</b> Transmet les impulsions d'horloge, signaux de commande et interruptions matérielles.</li>
              </ul>
            </li>
          </ul>
          <div class="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300">
            Cycle d'une instruction séquentielle : Étape 1 : Chargement (Fetch) ➔ Étape 2 : Décodage (Decode) ➔ Étape 3 : Exécution (Execute).
          </div>
        `
      },
      {
        heading: "3. Technique d'Exécution Hybride de Python",
        content: `
          <p class="mb-2 text-xs text-slate-300">Contrairement aux langages purement compilés (C, C++) ou purement interprétés (Bash), Python adopte une approche mixte à deux niveaux :</p>
          <ol class="list-decimal list-inside space-y-2 text-xs text-slate-300">
            <li><b>Précompilation transparente :</b> Le fichier source <code>.py</code> est transformé en un code intermédiaire appelé <b>Bytecode</b> (enregistré dans <code>__pycache__</code> sous extension <code>.pyc</code>). Ce Bytecode est indépendant du matériel.</li>
            <li><b>Interprétation par la PVM :</b> La <b>Python Virtual Machine</b> lit les instructions de ce Bytecode et les traduit pour le processeur de la machine hôte.</li>
          </ol>
          <div class="p-3 bg-rose-950/30 border-l-4 border-rose-500 rounded-r-xl text-xs text-rose-200 mt-3">
            <b>Repères historiques officiels :</b> Langage créé en 1989 par Guido van Rossum aux Pays-Bas. Première version publique publiée en 1991. Python 3 a cassé la compatibilité ascendante avec Python 2 (qui a cessé d'être maintenu en 2020).
          </div>
        `
      }
    ],
    datacamp: {
      title: "Atelier Pratique DataCamp : Découverte du Moteur Python",
      consigne: "Dans cet atelier pratique, vous allez vérifier les versions et afficher les 3 composants clés du processeur.\\n1. Créez une variable <code>processeur</code> contenant la chaîne 'CPU'.\\n2. Créez une variable <code>annee_creation</code> égale à 1989.\\n3. Affichez ces deux variables à l'aide de <code>print()</code>.",
      initialCode: "# Atelier Chapitre 1 - Écrivez votre code ici :\nprocesseur = 'CPU'\nannee_creation = 1989\n\n# Affichez les variables :\nprint(processeur, annee_creation)\n",
      hint: "Utilisez la fonction print(processeur, annee_creation).",
      solution: "processeur = 'CPU'\nannee_creation = 1989\nprint(processeur, annee_creation)",
      expectedOutputKeyword: "1989"
    },
    memo: [
      "Système informatique = programmable arbitrairement ; Système numérique = signaux discrets.",
      "Von Neumann (1945) : données et instructions partagent la même mémoire RAM physique.",
      "CPU = Unité de Contrôle (Fetch/Decode) + UAL (Calculs/Execute) + Registres.",
      "Cycle d'instruction séquentiel : Fetch ➔ Decode ➔ Execute.",
      "Exécution Python = Code source .py ➔ Bytecode (.pyc) ➔ PVM (Machine Virtuelle).",
      "Mode REPL (interactif, invite >>>, éphémère) vs Mode Script (.py, persistant)."
    ]
  },
  {
    id: "ch2",
    num: "02",
    title: "Variables, Types Primitifs & Transtypage",
    duration: "55 min",
    readTime: "20 min de lecture",
    sections: [
      {
        heading: "1. Variables & Conventions PEP 8",
        content: `
          <p class="mb-2 text-xs text-slate-300">Une variable est une zone nommée en mémoire RAM. Pour le programmeur, c'est un nom symbolique ; pour la machine, c'est une adresse mémoire.</p>
          <ul class="list-disc list-inside space-y-1 text-xs text-slate-300 mb-3">
            <li><b>Caractères autorisés :</b> Lettres [a-zA-Z], chiffres [0-9] et tiret-bas (_).</li>
            <li><b>Premier caractère :</b> Obligatoirement une lettre ou un tiret-bas. <b>JAMAIS de chiffre au début !</b></li>
            <li><b>Sensibilité à la casse :</b> <code>age</code>, <code>Age</code> et <code>AGE</code> sont 3 variables distinctes.</li>
            <li><b>Mots réservés interdits :</b> <code>for, while, if, def, class, True, False, None, and, or, in, is...</code></li>
          </ul>
        `
      },
      {
        heading: "2. Typage Dynamique & Types Scalaires",
        content: `
          <p class="mb-2 text-xs text-slate-300">En Python, la déclaration et l'initialisation sont simultanées. Le type est déterminé automatiquement à l'exécution :</p>
          <div class="grid md:grid-cols-2 gap-3 text-xs font-mono my-2">
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-indigo-400 font-bold block mb-1">int (Entiers)</span>
              age = 20<br/>val = 10**40 (précision illimitée)
            </div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-cyan-400 font-bold block mb-1">float (Flottants IEEE 754)</span>
              pi = 3.14<br/>vitesse = 3e8 (3 × 10⁸)
            </div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-emerald-400 font-bold block mb-1">complex (Complexes)</span>
              z = 3 + 4j<br/>z.real -> 3.0, z.imag -> 4.0
            </div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-amber-400 font-bold block mb-1">bool (Booléens)</span>
              est_admis = True<br/>valide = False (Majuscule obligatoire)
            </div>
          </div>
        `
      },
      {
        heading: "3. Le Transtypage (Type Casting) & Ses Pièges",
        content: `
          <p class="mb-2 text-xs text-slate-300">Conversion explicite d'un type vers un autre : <code>variable_cible = type_voulu(variable_source)</code>.</p>
          <div class="space-y-2 text-xs">
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <p>• <b>int(14.89) ➔ 14 :</b> Troncature pure de la partie décimale, sans aucun arrondi.</p>
              <p>• <b>int("3.14") ➔ ValueError :</b> Échec immédiat ! Python refuse un point décimal dans une chaîne passée à int(). La correction obligatoire est : <code>int(float("3.14"))</code> qui donne 3.</p>
              <p>• <b>bool("False") ➔ True :</b> Toute chaîne non vide est évaluée à True. Seules <code>bool("")</code> et <code>bool(0)</code> donnent False.</p>
              <p>• <b>0.1 + 0.2 == 0.3 ➔ False :</b> En binaire IEEE 754, 0.1 et 0.2 n'ont pas de représentation exacte finie. Leur somme vaut 0.30000000000000004.</p>
            </div>
          </div>
        `
      }
    ],
    datacamp: {
      title: "Atelier Pratique DataCamp : Maîtrise du Transtypage & Pièges",
      consigne: "Vous recevez la chaîne de caractères <code>s = '14.89'</code>.\\n1. Convertissez-la en float dans une variable <code>prix_float</code>.\\n2. Convertissez ce float en entier dans <code>prix_int</code> pour obtenir la troncature pure.\\n3. Affichez la valeur de <code>prix_int</code>.",
      initialCode: "# Atelier Chapitre 2 - Écrivez votre code ici :\ns = '14.89'\n\n# 1. Convertir en float :\nprix_float = float(s)\n\n# 2. Tronquer en int :\nprix_int = int(prix_float)\n\n# 3. Afficher :\nprint(prix_int)\n",
      hint: "Utilisez int(float(s)) pour éviter l'erreur ValueError.",
      solution: "s = '14.89'\nprix_float = float(s)\nprix_int = int(prix_float)\nprint(prix_int)",
      expectedOutputKeyword: "14"
    },
    memo: [
      "Identificateurs : lettres, chiffres, underscore ; jamais de chiffre au début ; sensible à la casse.",
      "Affectation en chaîne : a = b = c = 0 ; Affectation parallèle : a, b, c = 10, 15.5, 'Test'.",
      "int() effectue une troncature pure (int(9.99) = 9).",
      "int('3.14') déclenche ValueError ➔ utiliser int(float('3.14')).",
      "bool() renvoie True pour toute chaîne non vide, y compris bool('False') !",
      "input() renvoie TOUJOURS une chaîne de caractères str."
    ]
  },
  {
    id: "ch3",
    num: "03",
    title: "Opérateurs, Expressions & Ordre de Priorité",
    duration: "50 min",
    readTime: "18 min de lecture",
    sections: [
      {
        heading: "1. Opérateurs Arithmétiques & Redéfinition",
        content: `
          <ul class="list-disc list-inside space-y-1.5 text-xs text-slate-300 mb-3 font-mono">
            <li><b>/ (Division réelle) :</b> Retourne TOUJOURS un float (ex. <code>15 / 3 ➔ 5.0</code>).</li>
            <li><b>// (Division entière) :</b> Quotient euclidien arrondi vers moins l'infini (ex. <code>15 // 4 ➔ 3</code> et <code>-7 // 2 ➔ -4</code>).</li>
            <li><b>% (Modulo) :</b> Reste de la division euclidienne (ex. <code>14 % 4 ➔ 2</code> car 14 = 4×3 + 2).</li>
            <li><b>** (Puissance) :</b> Associatif de DROITE À GAUCHE (ex. <code>2**3**2 = 2**(9) = 512</code>).</li>
            <li><b>Polymorphisme sur les chaînes :</b> <code>"2" + "2" = "22"</code> (Concaténation) et <code>"ab" * 3 = "ababab"</code> (Duplication).</li>
          </ul>
        `
      },
      {
        heading: "2. Évaluation en Court-Circuit (Short-Circuit)",
        content: `
          <p class="text-xs text-slate-300 mb-2">Les opérateurs <code>and</code> et <code>or</code> évaluent de gauche à droite et s'arrêtent dès que le résultat final est certain :</p>
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
            <p>• <b>False and (10 / 0 == 0) :</b> Le 1er terme étant False, le 2ème terme n'est JAMAIS évalué. Aucun crash ZeroDivisionError !</p>
            <p>• <b>True or (10 / 0 == 0) :</b> Le 1er terme étant True, le résultat est immédiatement True.</p>
          </div>
        `
      },
      {
        heading: "3. Tableau Officiel des Priorités d'Évaluation",
        content: `
          <ol class="list-decimal list-inside space-y-1 text-xs font-mono bg-slate-900 p-4 rounded-xl border border-slate-800 text-slate-200">
            <li>1. Parenthèses <code>( )</code> (Priorité absolue)</li>
            <li>2. Puissance <code>**</code> (Évaluée de droite à gauche)</li>
            <li>3. Signes unaires <code>+x, -x</code></li>
            <li>4. Multiplication, division réelle, entière, modulo <code>*, /, //, %</code></li>
            <li>5. Addition et soustraction <code>+, -</code></li>
            <li>6. Comparaisons & Appartenance <code>==, !=, <, <=, >, >=, in, not in</code></li>
            <li>7. Négation booléenne <code>not</code></li>
            <li>8. Conjonction <code>and</code> (Prioritaire sur or)</li>
            <li>9. Disjonction <code>or</code></li>
            <li>10. Affectations <code>=, +=, -=, *=, //=...</code></li>
          </ol>
        `
      }
    ],
    datacamp: {
      title: "Atelier Pratique DataCamp : Hiérarchie & Court-Circuit",
      consigne: "Dans cet atelier, calculez l'expression mathématique exacte :\\n1. Calculez <code>x = 2 + 3 * 4 ** 2</code>.\\n2. Calculez le résultat du court-circuit : <code>test = True or False and False</code>.\\n3. Affichez x et test.",
      initialCode: "# Atelier Chapitre 3 - Écrivez votre code ici :\nx = 2 + 3 * 4 ** 2\ntest = True or False and False\n\nprint('x =', x)\nprint('test =', test)\n",
      hint: "La puissance s'évalue avant la multiplication. and est prioritaire sur or.",
      solution: "x = 2 + 3 * 4 ** 2\ntest = True or False and False\nprint('x =', x)\nprint('test =', test)",
      expectedOutputKeyword: "50"
    },
    memo: [
      "/ donne toujours un float ; // arrondit vers le bas (-7 // 2 = -4).",
      "Puissance ** s'évalue de droite à gauche (2 ** 3 ** 2 = 512).",
      "and est prioritaire sur or (True or False and False = True).",
      "A *= B + 2 équivaut à A = A * (B + 2).",
      "Short-circuit : False and (...) évite l'exécution du second membre."
    ]
  },
  {
    id: "ch4",
    num: "04",
    title: "Structures Conditionnelles & Branchements",
    duration: "60 min",
    readTime: "20 min de lecture",
    sections: [
      {
        heading: "1. Indentation & Syntaxe de Bloc",
        content: `
          <p class="text-xs text-slate-300 mb-2">En Python, il n'y a pas d'accolades <code>{ }</code>. Le décalage vers la droite (4 espaces) et les deux-points <code>:</code> délimitent le bloc d'instructions. Tout oubli déclenche une <code>IndentationError</code>.</p>
        `
      },
      {
        heading: "2. Structure if / elif / else",
        content: `
          <p class="text-xs text-slate-300 mb-2">Dès qu'une condition renvoie <code>True</code>, Python exécute son bloc et <b>quitte immédiatement</b> toute la structure. L'ordre des tests (du plus restrictif au plus général) est donc capital.</p>
        `
      }
    ],
    datacamp: {
      title: "Atelier Pratique DataCamp : Tarif Cinéma Conditionnel",
      consigne: "Écrivez un programme qui détermine le prix d'un ticket selon la variable <code>age = 15</code> :\\n• Moins de 10 ans : 20 DH\\n• Moins de 18 ans : 35 DH\\n• Autres âges : 50 DH\\nStockez le résultat dans la variable <code>prix</code> et affichez-la.",
      initialCode: "# Atelier Chapitre 4 - Écrivez votre code ici :\nage = 15\n\nif age < 10:\n    prix = 20\nelif age < 18:\n    prix = 35\nelse:\n    prix = 50\n\nprint('Prix :', prix)\n",
      hint: "Utilisez if age < 10 suivi de elif age < 18.",
      solution: "age = 15\nif age < 10:\n    prix = 20\nelif age < 18:\n    prix = 35\nelse:\n    prix = 50\nprint('Prix :', prix)",
      expectedOutputKeyword: "35"
    },
    memo: [
      "4 espaces standard pour l'indentation de bloc.",
      "Sortie immédiate de la structure dès le premier elif vérifié.",
      "else ne prend jamais de condition."
    ]
  },
  {
    id: "ch5",
    num: "05",
    title: "Boucles & Structures Itératives",
    duration: "65 min",
    readTime: "22 min de lecture",
    sections: [
      {
        heading: "1. Boucle for & Fonction range()",
        content: `
          <p class="text-xs text-slate-300 mb-2">La boucle <code>for</code> est privilégiée lorsque le nombre d'itérations est connu d'avance :</p>
          <ul class="list-disc list-inside space-y-1 text-xs font-mono text-slate-300 mb-3">
            <li><code>range(n)</code> ➔ entiers de 0 à n-1.</li>
            <li><code>range(debut, fin)</code> ➔ entiers de debut à fin-1 (fin exclue).</li>
            <li><code>range(debut, fin, pas)</code> ➔ incrémentation selon le pas spécifié.</li>
          </ul>
        `
      },
      {
        heading: "2. Contrôle de Flux : break, continue et boucle-else",
        content: `
          <div class="grid md:grid-cols-2 gap-3 text-xs mb-3">
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-rose-400 font-bold block mb-1">break</span>
              Interrompt définitivement la boucle et passe aux instructions suivantes en dehors de la boucle.
            </div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-amber-400 font-bold block mb-1">continue</span>
              Interrompt l'itération en cours et saute directement au tour suivant de la boucle.
            </div>
          </div>
          <div class="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs text-indigo-200">
            <b>La clause else sur une boucle :</b> Le bloc <code>else</code> d'un for ou while ne s'exécute que si la boucle s'est terminée naturellement <b>sans avoir été interrompue par un break</b> ! Idéal pour la recherche d'éléments ou les tests de primalité.
          </div>
        `
      }
    ],
    datacamp: {
      title: "Atelier Pratique DataCamp : Calcul de Factorielle (n!)",
      consigne: "Calculez la factorielle de <code>n = 5</code> (5! = 1 × 2 × 3 × 4 × 5 = 120) à l'aide d'une boucle <code>for</code> et de <code>range()</code>.\\nStockez le résultat dans la variable <code>fact</code> et affichez-la.",
      initialCode: "# Atelier Chapitre 5 - Écrivez votre code ici :\nn = 5\nfact = 1\n\nfor i in range(1, n + 1):\n    fact *= i\n\nprint('Factorielle =', fact)\n",
      hint: "Faites itérer i de 1 à n + 1 pour inclure n.",
      solution: "n = 5\nfact = 1\nfor i in range(1, n + 1):\n    fact *= i\nprint('Factorielle =', fact)",
      expectedOutputKeyword: "120"
    },
    memo: [
      "for = nombre de tours connu d'avance ; while = condition dynamique.",
      "La borne de fin de range() est toujours exclue.",
      "break quitte la boucle ; continue saute au tour suivant.",
      "else sur une boucle s'exécute uniquement s'il n'y a eu aucun break."
    ]
  },
  {
    id: "ch6",
    num: "06",
    title: "Séquences & Structures Fondamentales",
    duration: "70 min",
    readTime: "25 min de lecture",
    sections: [
      {
        heading: "1. Mutabilité vs Immuabilité & Piège de l'Aliasing",
        content: `
          <ul class="list-disc list-inside space-y-1 text-xs text-slate-300 mb-3">
            <li><b>Immuables :</b> <code>int, float, bool, str, tuple</code> (Impossible de modifier en place).</li>
            <li><b>Mutables :</b> <code>list, set, dict</code> (Modifiables en mémoire).</li>
            <li><b>Piège de l'affectation :</b> <code>L2 = L1</code> crée un alias vers le même objet en RAM. Pour copier indépendamment : <code>L2 = L1[:]</code> ou <code>L2 = L1.copy()</code>.</li>
          </ul>
        `
      },
      {
        heading: "2. Le Slicing & La Comparaison Lexicographique",
        content: `
          <p class="text-xs text-slate-300 mb-2">Syntaxe générale : <code>sequence[debut : fin_exclue : pas]</code>. <code>s[::-1]</code> inverse la séquence.</p>
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
            Comparaison lexicographique : élément par élément de gauche à droite, s'arrête au 1er écart !<br/>
            [2, 5, 1] > [2, 3, 4, 5, 6] ➔ True (car à l'indice 1, 5 > 3).
          </div>
        `
      }
    ],
    datacamp: {
      title: "Atelier Pratique DataCamp : Slicing & Copie Sécurisée",
      consigne: "Soit la liste <code>animaux = ['girafe', 'tigre', 'singe', 'souris']</code>.\\n1. Extrayez les éléments d'indice 1 à 2 inclus dans <code>sous_liste</code> à l'aide du slicing.\\n2. Inversez complètement la liste dans <code>inverse</code>.\\n3. Affichez sous_liste et inverse.",
      initialCode: "# Atelier Chapitre 6 - Écrivez votre code ici :\nanimaux = ['girafe', 'tigre', 'singe', 'souris']\n\nsous_liste = animaux[1:3]\ninverse = animaux[::-1]\n\nprint('Sous-liste :', sous_liste)\nprint('Inversé :', inverse)\n",
      hint: "Pour inverser, utilisez le pas négatif animaux[::-1].",
      solution: "animaux = ['girafe', 'tigre', 'singe', 'souris']\nsous_liste = animaux[1:3]\ninverse = animaux[::-1]\nprint('Sous-liste :', sous_liste)\nprint('Inversé :', inverse)",
      expectedOutputKeyword: "souris"
    },
    memo: [
      "str et tuple sont immuables ; list, set et dict sont mutables.",
      "L2 = L1 crée un alias ; utiliser L2 = L1[:] pour une copie indépendante.",
      "Comparaison lexicographique : s'arrête au premier écart sans tenir compte de la longueur.",
      "Un tuple à un élément s'écrit (42,) avec une virgule obligatoire."
    ]
  }
];

// BANQUE MASSIVE D'EXERCICES CORRIGÉS PAR CHAPITRE (24 Exercices Complets)
const CHAPTER_EXERCISES = {
  ch1: [
    {
      id: "exo-1-1",
      title: "Exercice 1.1 : Classification des Systèmes",
      enonce: "Pour chacun des dispositifs suivants, indiquez s'il s'agit d'un système numérique uniquement ou d'un système informatique, en justifiant :\\n1. Une montre digitale simple\\n2. Un smartphone moderne\\n3. Un boîtier ABS de freinage automobile dédié\\n4. Un PC portable",
      correction: `
        <b>1. Montre digitale simple :</b> Système numérique uniquement (traite des signaux discrets mais sa fonction est figée et non universellement programmable).<br/>
        <b>2. Smartphone :</b> Système informatique (universellement programmable, exécute des applications arbitraires).<br/>
        <b>3. Boîtier ABS :</b> Système numérique embarqué dédié (non reprogrammable par l'utilisateur).<br/>
        <b>4. PC portable :</b> Système informatique universel.
      `
    },
    {
      id: "exo-1-2",
      title: "Exercice 1.2 : Traçage du Cycle Processeur (CPU)",
      enonce: "Détaillez le cycle complet d'instruction (Fetch, Decode, Execute) pour l'opération : <code>c = a + b</code> en précisant le rôle de l'Unité de Contrôle (UC) et de l'Unité Arithmétique et Logique (UAL).",
      correction: `
        • <b>Étape 1 (Fetch) :</b> L'Unité de Contrôle (UC) extrait l'instruction située à l'adresse mémoire pointée dans la RAM via le bus d'adresses et le bus de données.<br/>
        • <b>Étape 2 (Decode) :</b> L'UC décode le code opération et identifie qu'il s'agit d'une addition nécessitant les valeurs de a et b.<br/>
        • <b>Étape 3 (Execute) :</b> L'UAL réalise le calcul arithmétique de l'addition et dépose le résultat dans un registre avant son écriture en RAM.
      `
    },
    {
      id: "exo-1-3",
      title: "Exercice 1.3 : La PVM et le Bytecode",
      enonce: "Expliquez pourquoi un script Python démarre plus lentement qu'un binaire C compilé, mais s'exécute beaucoup plus vite qu'un script Bash purement interprété.",
      correction: `
        Python utilise une approche <b>hybride</b> :<br/>
        1. Comparé au C : Python doit d'abord précompiler le code source en Bytecode puis l'exécuter via une machine virtuelle logicielle (PVM), ce qui crée un surcoût.<br/>
        2. Comparé à Bash : Le Bytecode précompilé évite à Python de devoir réanalyser la syntaxe textuelle à chaque tour de boucle, rendant l'exécution considérablement plus rapide qu'en interprétation pure ligne par ligne.
      `
    },
    {
      id: "exo-1-4",
      title: "Exercice 1.4 : Mode REPL vs Mode Script",
      enonce: "Citez 2 avantages et 2 limites du mode interactif (REPL) par rapport au mode script (.py).",
      correction: `
        • <b>Avantages du REPL :</b> Prototypage instantané d'expressions et retour immédiat d'erreurs pour l'apprentissage.<br/>
        • <b>Limites du REPL :</b> Éphémère (le code est perdu dès la fermeture de la session) et inadapté à l'automatisation de projets de plusieurs lignes.
      `
    }
  ],
  ch2: [
    {
      id: "exo-2-1",
      title: "Exercice 2.1 : Validation des Identificateurs (PEP 8)",
      enonce: "Déterminez la validité des identificateurs suivants en justifiant précisément pour chaque cas invalide :\\n• _valeur_1\\n• 2eme_choix\\n• for\\n• total$\\n• True_val\\n• x-max",
      correction: `
        • <b>_valeur_1 :</b> Valide (lettres, chiffres, underscore au début autorisé).<br/>
        • <b>2eme_choix :</b> Invalide (commence par un chiffre).<br/>
        • <b>for :</b> Invalide (mot-clé réservé du langage).<br/>
        • <b>total$ :</b> Invalide (caractère spécial interdit $).<br/>
        • <b>True_val :</b> Valide (commence par une lettre et ne coïncide pas avec le mot réservé True).<br/>
        • <b>x-max :</b> Invalide (le tiret '-' est l'opérateur de soustraction).
      `
    },
    {
      id: "exo-2-2",
      title: "Exercice 2.2 : Transtypage & Pièges Classiques",
      enonce: "Déterminez la valeur et le type exact résultant de :\\n1. v1 = bool(0)\\n2. v2 = bool('False')\\n3. v3 = int(float('3.14'))\\n4. Que produit int('3.14') et pourquoi ?",
      correction: `
        1. <b>v1 = False</b> (type bool) : zéro numérique vaut toujours False.<br/>
        2. <b>v2 = True</b> (type bool) : toute chaîne non vide est True en Python, même 'False' !<br/>
        3. <b>v3 = 3</b> (type int) : float('3.14') donne 3.14, puis int(3.14) effectue la troncature entière.<br/>
        4. <b>int('3.14') :</b> Déclenche une <b>ValueError</b> car int() n'accepte pas de séparateur flottant dans une chaîne littérale.
      `
    },
    {
      id: "exo-2-3",
      title: "Exercice 2.3 : Précision Flottante IEEE 754",
      enonce: "Que renvoie l'instruction : <code>print(0.1 + 0.2 == 0.3)</code> ? Expliquez la cause fondamentale au niveau matériel.",
      correction: `
        Renvoie <b>False</b>.<br/>
        <b>Cause machine :</b> Les microprocesseurs utilisent la norme binaire IEEE 754. Les fractions décimales 0.1 (1/10) et 0.2 (1/5) ne possèdent pas de développement binaire fini (nombres périodiques infinis en base 2). La somme 0.1 + 0.2 produit <code>0.30000000000000004</code>, ce qui est strictement différent de 0.3.
      `
    },
    {
      id: "exo-2-4",
      title: "Exercice 2.4 : Déclaration et Tracé Mémoire (Exercice Slide 43)",
      enonce: "Décrivez ce qui se passe à chacune des lignes suivantes :\\n>>> largeur = 20\\n>>> hauteur = 4 * 9.3\\n>>> largeur * hauteur",
      correction: `
        • <b>Ligne 1 :</b> Affectation. Création de l'objet entier 20 en mémoire et liaison du nom 'largeur'. Affichage console : Aucun.<br/>
        • <b>Ligne 2 :</b> Calcul + Affectation. Multiplication mixte (int × float) créant un float 37.2 lié à 'hauteur'. Affichage console : Aucun.<br/>
        • <b>Ligne 3 :</b> Expression simple. Évaluation du produit sans stockage. Affichage console en mode interactif : <b>744.0</b> (type float).
      `
    }
  ],
  ch3: [
    {
      id: "exo-3-1",
      title: "Exercice 3.1 : Évaluation d'Expressions Complexes (Slide 55)",
      enonce: "Soit les variables : a, b, c, d = 10, 5.5, 0, True.\\nDéterminez le résultat pas à pas de :\\n1. c = a % b + c > a\\n2. d = c == (a < 3) or d",
      correction: `
        <b>1. Évaluation de c = a % b + c > a :</b><br/>
        - Modulo (%) : 10 % 5.5 = 4.5<br/>
        - Addition (+) : 4.5 + 0 = 4.5<br/>
        - Comparaison (>) : 4.5 > 10 renvoie False.<br/>
        - Affectation : c prend la valeur <b>False</b>.<br/><br/>
        <b>2. Évaluation de d = c == (a < 3) or d :</b><br/>
        - Parenthèse : (10 < 3) donne False.<br/>
        - Égalité (==) : c == False ➔ False == False donne True.<br/>
        - Opérateur or : True or d donne immédiatement <b>True</b> (court-circuit).<br/>
        - d conserve la valeur <b>True</b>.
      `
    },
    {
      id: "exo-3-2",
      title: "Exercice 3.2 : Puissances et Associativité",
      enonce: "Calculez la valeur des expressions suivantes en justifiant l'ordre des opérations :\\n1. x = 2 + 3 * 4 ** 2\\n2. y = 2 ** 3 ** 2",
      correction: `
        1. <b>x = 2 + 3 * 4 ** 2 :</b><br/>
        - Puissance prioritaire : 4 ** 2 = 16.<br/>
        - Multiplication : 3 * 16 = 48.<br/>
        - Addition : 2 + 48 = <b>50</b>.<br/><br/>
        2. <b>y = 2 ** 3 ** 2 :</b><br/>
        - La puissance s'évalue de droite à gauche : 3 ** 2 = 9.<br/>
        - Puis : 2 ** 9 = <b>512</b> (et non 64).
      `
    },
    {
      id: "exo-3-3",
      title: "Exercice 3.3 : Évaluation en Court-Circuit",
      enonce: "Prédisez la valeur affichée par les instructions suivantes sans exécuter :\\n1. print(0 and 'Python')\\n2. print(False and (10 / 0 == 0))\\n3. print('A' or 'B')",
      correction: `
        1. <b>print(0 and 'Python') :</b> 0 étant False, Python renvoie immédiatement la valeur <b>0</b>.<br/>
        2. <b>print(False and (10 / 0 == 0)) :</b> Le 1er membre étant False, l'expression s'arrête et affiche <b>False</b> sans provoquer de ZeroDivisionError.<br/>
        3. <b>print('A' or 'B') :</b> 'A' étant Truthy, Python s'arrête et renvoie <b>'A'</b>.
      `
    },
    {
      id: "exo-3-4",
      title: "Exercice 3.4 : Affectation Composée",
      enonce: "Soit A = 5 et B = 3. Que vaut A après l'instruction : <code>A *= B + 2</code> ? Justifiez rigoureusement.",
      correction: `
        L'affectation composée <code>A *= expression</code> équivaut à <code>A = A * (expression)</code>.<br/>
        Ainsi : A = 5 * (3 + 2) = 5 * 5 = <b>25</b> (et non (5 * 3) + 2 = 17).
      `
    }
  ],
  ch4: [
    {
      id: "exo-4-1",
      title: "Exercice 4.1 : Facture d'Eau par Tranches Cumulatives",
      enonce: "Écrire un programme Python qui demande la consommation d'eau en m³ et calcule la facture selon :\\n• 0 à 20 m³ : 2.0 DH/m³\\n• 20 à 50 m³ : 4.0 DH/m³\\n• au-delà de 50 m³ : 7.0 DH/m³\\nExemple pour 35 m³ : 20×2.0 + 15×4.0 = 100 DH.",
      correction: `
<pre class="bg-slate-900 p-3 rounded font-mono text-xs text-slate-200">
conso = float(input("Consommation en m³ : "))
if conso < 0:
    print("Valeur invalide")
elif conso <= 20:
    facture = conso * 2.0
elif conso <= 50:
    facture = (20 * 2.0) + ((conso - 20) * 4.0)
else:
    facture = (20 * 2.0) + (30 * 4.0) + ((conso - 50) * 7.0)
print(f"Montant total à payer : {facture:.2f} DH")
</pre>
      `
    },
    {
      id: "exo-4-2",
      title: "Exercice 4.2 : Vérification du Mois de Février Bissextile",
      enonce: "Écrire un programme qui lit le jour J, le mois M et l'année A. Si M == 2, déterminer si l'année est bissextile (divisible par 4 et non par 100, ou divisible par 400) et valider le jour (1 à 28 ou 1 à 29).",
      correction: `
<pre class="bg-slate-900 p-3 rounded font-mono text-xs text-slate-200">
j = int(input("Jour : "))
m = int(input("Mois : "))
a = int(input("Année : "))

if m != 2:
    print("Ce programme teste uniquement le mois de février.")
else:
    bissextile = (a % 4 == 0 and a % 100 != 0) or (a % 400 == 0)
    max_j = 29 if bissextile else 28
    if 1 <= j <= max_j:
        print(f"Date valide (Février {a} compte {max_j} jours).")
    else:
        print("Date invalide.")
</pre>
      `
    },
    {
      id: "exo-4-3",
      title: "Exercice 4.3 : Code d'Accès de Sécurité (4 Chiffres)",
      enonce: "Un code d'accès à 4 chiffres (1000 à 9999) est valide s'il est multiple de 3. S'il se termine par 0, il doit aussi être multiple de 30. Écrire le programme de vérification.",
      correction: `
<pre class="bg-slate-900 p-3 rounded font-mono text-xs text-slate-200">
code = int(input("Code (4 chiffres) : "))
if code < 1000 or code > 9999:
    print("Erreur : le code doit avoir 4 chiffres !")
elif code % 10 == 0:
    if code % 30 == 0:
        print("Code Valide (multiple de 30)")
    else:
        print("Code Refusé (finit par 0 mais non multiple de 30)")
elif code % 3 == 0:
    print("Code Valide (multiple de 3)")
else:
    print("Code Refusé")
</pre>
      `
    },
    {
      id: "exo-4-4",
      title: "Exercice 4.4 : Éligibilité à l'Examen du Permis",
      enonce: "Pour passer le permis, le candidat doit avoir au moins 18 ans, avoir réussi le code ('oui'), ET (avoir au moins 20h de conduite OU avoir fait la conduite accompagnée 'oui'). Écrire le script de décision.",
      correction: `
<pre class="bg-slate-900 p-3 rounded font-mono text-xs text-slate-200">
age = int(input("Âge : "))
code = input("Code réussi (oui/non) : ").lower()
heures = int(input("Heures de conduite : "))
accompagnee = input("Conduite accompagnée (oui/non) : ").lower()

cond_conduite = (heures >= 20) or (accompagnee == "oui")

if age >= 18 and code == "oui" and cond_conduite:
    print("Candidat autorisé à l'examen")
else:
    print("Candidat non éligible")
</pre>
      `
    }
  ],
  ch5: [
    {
      id: "exo-5-1",
      title: "Exercice 5.1 : Calcul de Factorielle (for et while)",
      enonce: "Écrire deux programmes distincts permettant de calculer n! (1 × 2 × ... × n) pour un entier positif saisi au clavier : l'un avec la boucle for, l'autre avec while.",
      correction: `
<pre class="bg-slate-900 p-3 rounded font-mono text-xs text-slate-200">
# Version avec boucle FOR
n = int(input("Entier n : "))
if n < 0:
    print("Non définie")
else:
    f = 1
    for i in range(1, n + 1):
        f *= i
    print(f"{n}! = {f}")

# Version avec boucle WHILE
i = 1
f = 1
while i <= n:
    f *= i
    i += 1
</pre>
      `
    },
    {
      id: "exo-5-2",
      title: "Exercice 5.2 : Test de Primalité avec boucle else",
      enonce: "Écrire un programme qui détermine si un nombre n > 1 est premier en utilisant une boucle for et sa clause spécifique else.",
      correction: `
<pre class="bg-slate-900 p-3 rounded font-mono text-xs text-slate-200">
n = int(input("Entier n : "))
if n <= 1:
    print("Non premier")
else:
    for d in range(2, n):
        if n % d == 0:
            print(f"{n} n'est pas premier (divisible par {d})")
            break
    else:
        print(f"{n} est un NOMBRE PREMIER !")
</pre>
      `
    },
    {
      id: "exo-5-3",
      title: "Exercice 5.3 : Traçage de Boucle et Contrôle de Flux",
      enonce: "Donnez la sortie console exacte du script suivant :\\n<pre>for i in range(1, 6):\\n    if i == 3: continue\\n    if i == 5: break\\n    print(i, end=' ')</pre>",
      correction: `
        • i=1 ➔ print(1)<br/>
        • i=2 ➔ print(2)<br/>
        • i=3 ➔ continue (saute le print)<br/>
        • i=4 ➔ print(4)<br/>
        • i=5 ➔ break (interrompt définitivement la boucle)<br/>
        <b>Sortie console :</b> <code>1 2 4 </code>
      `
    },
    {
      id: "exo-5-4",
      title: "Exercice 5.4 : Boucles Imbriquées (Table de Multiplication)",
      enonce: "Écrire un script Python utilisant deux boucles imbriquées pour afficher les tables de multiplication de 1 à 5 sous forme de grille compacte.",
      correction: `
<pre class="bg-slate-900 p-3 rounded font-mono text-xs text-slate-200">
for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i * j:3d}", end=" ")
    print()
</pre>
      `
    }
  ],
  ch6: [
    {
      id: "exo-6-1",
      title: "Exercice 6.1 : Slicing Expert sur Listes (Slide 14 & 15)",
      enonce: "Soit : <code>animaux = ['girafe', 'tigre', 'singe', 'souris']</code>.\\nDonnez le résultat des tranches suivantes :\\n1. animaux[1:3]\\n2. animaux[:2]\\n3. animaux[::2]\\n4. animaux[::-1]",
      correction: `
        1. <b>animaux[1:3] :</b> <code>['tigre', 'singe']</code> (indices 1 et 2, 3 exclu).<br/>
        2. <b>animaux[:2] :</b> <code>['girafe', 'tigre']</code> (du début à l'indice 1).<br/>
        3. <b>animaux[::2] :</b> <code>['girafe', 'singe']</code> (un élément sur deux).<br/>
        4. <b>animaux[::-1] :</b> <code>['souris', 'singe', 'tigre', 'girafe']</code> (liste inversée).
      `
    },
    {
      id: "exo-6-2",
      title: "Exercice 6.2 : Résolution du Piège d'Aliasing (Slide 15)",
      enonce: "Expliquez la différence en mémoire entre les deux blocs de code suivants :\\nBloc A : L1 = [1, 2] ; L2 = L1 ; L2[0] = 99\\nBloc B : L1 = [1, 2] ; L2 = L1[:] ; L2[0] = 99",
      correction: `
        • <b>Bloc A (Aliasing) :</b> L2 = L1 ne copie pas la liste. L1 et L2 pointent vers le même PyObject en RAM. Modifier L2[0] modifie aussi L1[0] qui devient 99.<br/>
        • <b>Bloc B (Vraie Copie) :</b> Le slicing complet L1[:] crée un nouvel objet liste indépendant en mémoire. L2[0] devient 99, mais L1 reste intacte : [1, 2].
      `
    },
    {
      id: "exo-6-3",
      title: "Exercice 6.3 : Comparaison Lexicographique (Slide 16)",
      enonce: "Déterminez la valeur booléenne des comparaisons suivantes en justifiant :\\n1. [5, 10] < [5, 10, 15]\\n2. [2, 5, 1] > [2, 3, 4, 5, 6]\\n3. ['Ali', 'sanae'] < ['Ali', 'Sanae']",
      correction: `
        1. <b>[5, 10] < [5, 10, 15] ➔ True :</b> Préfixe identique, la liste la plus courte est strictement inférieure.<br/>
        2. <b>[2, 5, 1] > [2, 3, 4, 5, 6] ➔ True :</b> À l'indice 1, 5 > 3. L'évaluation s'arrête immédiatement et ignore la longueur.<br/>
        3. <b>['Ali', 'sanae'] < ['Ali', 'Sanae'] ➔ False :</b> 's' minuscule (code ASCII 115) est supérieur à 'S' majuscule (code ASCII 83).
      `
    },
    {
      id: "exo-6-4",
      title: "Exercice 6.4 : Manipulation de Dictionnaires",
      enonce: "Soit le dictionnaire : <code>notes = {'Ali': 14.5, 'Sara': 17.0, 'Amine': 12.0}</code>. Écrire le code pour calculer et afficher la moyenne générale des notes.",
      correction: `
<pre class="bg-slate-900 p-3 rounded font-mono text-xs text-slate-200">
notes = {'Ali': 14.5, 'Sara': 17.0, 'Amine': 12.0}
total = sum(notes.values())
moyenne = total / len(notes)
print(f"Moyenne générale : {moyenne:.2f}/20")
</pre>
      `
    }
  ]
};

// SUJETS D'EXAMENS COMPLETS
const EXAM_SUBJECTS = [
  {
    "id": "exam-normale-2025",
    "title": "Examen Final Blanc • SMI / IA S1 (Session Normale 2024/2025)",
    "sessionBadge": "Session Normale 2025",
    "duration": 30,
    "totalPoints": 20,
    "desc": "Épreuve officielle de synthèse couvrant l'architecture de Von Neumann, le typage, les opérateurs, les boucles et les séquences.",
    "questions": [
      {
        "id": 101,
        "text": "Dans l'architecture de Von Neumann, quel bus est strictement UNIDIRECTIONNEL ?",
        "options": [
          "Bus de données",
          "Bus d'adresses",
          "Bus de contrôle",
          "Bus mémoire interne"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "Le bus d'adresses est strictement unidirectionnel : il transporte les adresses mémoire émises par le processeur (CPU) vers la mémoire vive (RAM) et jamais l'inverse."
      },
      {
        "id": 102,
        "text": "Quelle exception précise est levée par l'instruction : int('3.14') ?",
        "options": [
          "TypeError",
          "ValueError",
          "ZeroDivisionError",
          "SyntaxError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "ValueError ! La fonction int() refuse tout séparateur décimal lorsqu'elle convertit une chaîne de caractères. Il faut d'abord convertir en float : int(float('3.14'))."
      },
      {
        "id": 103,
        "text": "Que vaut l'expression mathématique : 2 ** 3 ** 2 ?",
        "options": [
          "64",
          "512",
          "18",
          "36"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "L'opérateur puissance ** possède une associativité de droite à gauche : 3 ** 2 = 9, puis 2 ** 9 = 512."
      },
      {
        "id": 104,
        "text": "Que renvoie l'instruction : print(0.1 + 0.2 == 0.3) ?",
        "options": [
          "True",
          "False",
          "None",
          "FloatingPointError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "False ! En raison de la représentation binaire en virgule flottante (norme IEEE 754), 0.1 + 0.2 vaut 0.30000000000000004, ce qui n'est pas rigoureusement égal à 0.3."
      },
      {
        "id": 105,
        "text": "Que vaut l'évaluation de la division entière : -7 // 2 ?",
        "options": [
          "-3",
          "-3.5",
          "-4",
          "-3.0"
        ],
        "correct": 2,
        "pts": 1,
        "justification": "L'opérateur // effectue un arrondi vers le bas (vers moins l'infini). La valeur réelle étant -3.5, l'entier inférieur est -4."
      },
      {
        "id": 106,
        "text": "Que renvoie : bool('False') ?",
        "options": [
          "False",
          "True",
          "None",
          "ValueError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "True ! En Python, toute chaîne de caractères non vide est évaluée comme vraie (Truthy), même si son contenu textuel est 'False'."
      },
      {
        "id": 107,
        "text": "Dans une boucle itérative, quel est l'effet de l'instruction continue ?",
        "options": [
          "Quitte définitivement la boucle",
          "Interrompt l'itération courante et passe à la suivante",
          "Réinitialise le compteur de boucle",
          "Met en pause le programme"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "continue arrête immédiatement l'exécution des instructions restantes du tour actuel et saute au tour de boucle suivant."
      },
      {
        "id": 108,
        "text": "Quand le bloc else associé à une boucle for ou while s'exécute-t-il ?",
        "options": [
          "À chaque passage de boucle",
          "Uniquement si la boucle se termine sans avoir rencontré de break",
          "En cas d'erreur de syntaxe",
          "Jamais en Python 3"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "Le bloc else d'une boucle s'exécute si et seulement si la boucle a épuisé normalement sa séquence ou condition sans avoir été interrompue prématurément par un break."
      },
      {
        "id": 109,
        "text": "Considérant : L1 = [1, 2] ; L2 = L1 ; L2.append(3). Que renvoie len(L1) ?",
        "options": [
          "2",
          "3",
          "Error",
          "1"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "3 ! L'instruction L2 = L1 crée un simple alias (référence vers le même objet en RAM). Modifier L2 affecte directement L1."
      },
      {
        "id": 110,
        "text": "Que renvoie la comparaison de listes : [2, 5, 1] > [2, 3, 9] ?",
        "options": [
          "True",
          "False",
          "TypeError",
          "SyntaxError"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "True ! La comparaison est lexicographique élément par élément. À l'indice 0 (2 == 2), on passe à l'indice 1 où 5 > 3 : la comparaison est résolue immédiatement sans évaluer la suite."
      },
      {
        "id": 111,
        "text": "Comment déclare-t-on syntaxiquement un ensemble vide (Set vide) ?",
        "options": [
          "s = {}",
          "s = set()",
          "s = []",
          "s = ()"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "s = set() ! La notation s = {} est réservée à la création d'un dictionnaire vide (dict)."
      },
      {
        "id": 112,
        "text": "Quel est le type de la variable : t = (42) ?",
        "options": [
          "tuple",
          "int",
          "list",
          "set"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "int ! En Python, les parenthèses sans virgule servent uniquement de regroupement arithmétique. Pour déclarer un tuple à un seul élément, la virgule est obligatoire : (42,)."
      },
      {
        "id": 113,
        "text": "Que renvoie l'expression booléenne : True or False and False ?",
        "options": [
          "True",
          "False",
          "None",
          "Error"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "True ! L'opérateur and est strictement prioritaire sur or. L'expression s'évalue comme : True or (False and False) => True or False => True."
      },
      {
        "id": 114,
        "text": "Si A = 5 et B = 3, quelle est la valeur finale de A après : A *= B + 2 ?",
        "options": [
          "17",
          "25",
          "30",
          "15"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "25 ! Dans une affectation augmentée, l'expression de droite est évaluée entièrement en premier avec parenthèses implicites : A = A * (B + 2) = 5 * 5 = 25."
      },
      {
        "id": 115,
        "text": "Que renvoie nativement la fonction input() sous Python 3 ?",
        "options": [
          "int",
          "float",
          "str",
          "Dépend de la saisie utilisateur"
        ],
        "correct": 2,
        "pts": 1,
        "justification": "input() renvoie impérativement une chaîne de caractères (str). Un transtypage explicite int(input()) ou float(input()) est nécessaire pour les calculs."
      },
      {
        "id": 116,
        "text": "Soit la chaîne s = 'Python'. Que vaut le slicing s[1:4] ?",
        "options": [
          "'Pyt'",
          "'yth'",
          "'ytho'",
          "'y'"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "'yth' ! Les indices extraits sont 1, 2 et 3 ('y', 't', 'h'). La borne supérieure 4 est toujours exclue."
      },
      {
        "id": 117,
        "text": "D'après la règle grégorienne officielle, l'année 1900 est-elle bissextile ?",
        "options": [
          "Oui, car multiple de 4",
          "Non, car multiple de 100 mais pas de 400",
          "Oui, car multiple de 100",
          "Non définie en Python"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "Non bissextile ! Une année séculaire (multiple de 100) n'est bissextile que si elle est également divisible par 400 (ex: 2000 l'était, mais 1900 ne l'est pas)."
      },
      {
        "id": 118,
        "text": "Quel type parmi les suivants est rigoureusement IMMUABLE (non modifiable sur place) ?",
        "options": [
          "list",
          "set",
          "dict",
          "str"
        ],
        "correct": 3,
        "pts": 1,
        "justification": "str est un type immuable. Les listes, ensembles et dictionnaires sont des structures mutables."
      },
      {
        "id": 119,
        "text": "Combien d'itérations produit la fonction : range(3, 15, 3) ?",
        "options": [
          "3",
          "4",
          "5",
          "12"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "4 itérations : 3, 6, 9, et 12. La borne de fin 15 est exclue."
      },
      {
        "id": 120,
        "text": "Que produit l'expression : '1' in [1, 2, 3] ?",
        "options": [
          "True",
          "False",
          "TypeError",
          "IndexError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "False ! Python est fortement typé : la chaîne de caractères '1' n'est pas égale à l'entier 1."
      }
    ]
  },
  {
    "id": "exam-rattrapage-2025",
    "title": "Examen Session de Rattrapage • SMI / IA S1 (Session 2024/2025)",
    "sessionBadge": "Rattrapage 2025",
    "duration": 30,
    "totalPoints": 20,
    "desc": "Épreuve de rattrapage approfondie axée sur le traçage d'exécution de code, les pièges de mutabilité et l'algorithmique.",
    "questions": [
      {
        "id": 201,
        "text": "Soit le code : a = [10, 20] ; b = a[:] ; b.append(30). Que vaut len(a) ?",
        "options": [
          "2",
          "3",
          "1",
          "Erreur d'aliasing"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "2 ! L'expression b = a[:] effectue un découpage complet créant une nouvelle liste indépendante en mémoire. Modifier b n'a aucun impact sur a."
      },
      {
        "id": 202,
        "text": "Que renvoie l'expression d'égalité : bool([]) == bool('') ?",
        "options": [
          "True",
          "False",
          "TypeError",
          "None"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "True ! Une liste vide [] et une chaîne vide '' sont toutes deux évaluées à False par bool(). L'expression devient False == False, ce qui vaut True !"
      },
      {
        "id": 203,
        "text": "Soit x = 10 et y = 0. Que produit : res = (y != 0) and (x / y > 2) ?",
        "options": [
          "ZeroDivisionError",
          "False",
          "True",
          "None"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "False ! Grâce à l'évaluation en court-circuit (short-circuit), le premier terme (y != 0) étant False, le second membre n'est jamais exécuté, évitant l'erreur de division par zéro."
      },
      {
        "id": 204,
        "text": "Soit t = (1, 2, [3, 4]) ; t[2].append(5). Que renvoie len(t[2]) ?",
        "options": [
          "TypeError (tuple immuable)",
          "2",
          "3",
          "5"
        ],
        "correct": 2,
        "pts": 1,
        "justification": "3 ! Le tuple t contient une référence vers une liste. Le tuple est immuable (ses références ne peuvent changer), mais la liste sous-jacente reste mutable !"
      },
      {
        "id": 205,
        "text": "Quelle est la sortie de ce code :\nfor i in range(3):\n    if i == 1:\n        break\nelse:\n    print('Fin')",
        "options": [
          "Affiche 'Fin'",
          "N'affiche rien",
          "Affiche 0 1 'Fin'",
          "SyntaxError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "N'affiche rien ! Le break interrompt la boucle au tour i = 1, ce qui désactive immédiatement l'exécution de la clause else."
      },
      {
        "id": 206,
        "text": "Soit la chaîne s = 'Kenitra'. Que vaut le slicing avec pas négatif : s[::-2] ?",
        "options": [
          "'ainK'",
          "'art'",
          "'etiK'",
          "'arineK'"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "'ainK' ! Le slicing parcourt de droite à gauche avec un pas de 2 : indice 6 ('a'), indice 4 ('i'), indice 2 ('n'), indice 0 ('K')."
      },
      {
        "id": 207,
        "text": "Soit d = {'a': 1, 'b': 2}. Que produit : print(d.get('c', 99)) ?",
        "options": [
          "KeyError",
          "None",
          "99",
          "0"
        ],
        "correct": 2,
        "pts": 1,
        "justification": "99 ! La méthode dict.get(cle, defaut) renvoie la valeur par défaut fournie si la clé est absente, sans jamais lever d'exception KeyError."
      },
      {
        "id": 208,
        "text": "Que renvoie l'expression avec chaînage de comparaisons : 1 < 2 < 3 > 2 ?",
        "options": [
          "True",
          "False",
          "SyntaxError",
          "TypeError"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "True ! En Python, les comparaisons se chaînent automatiquement : (1 < 2) and (2 < 3) and (3 > 2). Les trois conditions étant vraies, le résultat est True."
      },
      {
        "id": 209,
        "text": "Soit x = [1, 2] et y = [1, 2]. Que renvoie : (x == y, x is y) ?",
        "options": [
          "(True, True)",
          "(True, False)",
          "(False, True)",
          "(False, False)"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "(True, False) ! L'opérateur == compare les valeurs (contenus identiques), tandis que is compare les identifiants d'adresses mémoire (deux objets list distincts en RAM)."
      },
      {
        "id": 210,
        "text": "Soit L = [10, 20, 30, 40, 50]. Que renvoie le slicing L[::2] ?",
        "options": [
          "[10, 20]",
          "[10, 30, 50]",
          "[20, 40]",
          "[10, 50]"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "[10, 30, 50] ! Début et fin par défaut parcourent toute la liste, avec un pas de 2 (indices 0, 2, 4)."
      },
      {
        "id": 211,
        "text": "Soit l'ensemble a = {1, 2, 2, 3}. Quelle est la valeur de len(a) ?",
        "options": [
          "4",
          "3",
          "2",
          "TypeError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "3 ! Un ensemble (set) ne stocke que des valeurs uniques. Les éléments dupliqués sont automatiquement éliminés à la construction."
      },
      {
        "id": 212,
        "text": "Que produit l'instruction : s = 'abc' ; s[0] = 'z' ?",
        "options": [
          "s devient 'zbc'",
          "TypeError",
          "ValueError",
          "AttributeError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "TypeError: 'str' object does not support item assignment. Les chaînes de caractères sont strictement immuables."
      },
      {
        "id": 213,
        "text": "Que renvoie l'opération modulo avec un diviseur négatif : 10 % -3 ?",
        "options": [
          "1",
          "-2",
          "-1",
          "2"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "-2 ! En Python, le signe du résultat modulo r prend toujours le signe du diviseur b : 10 = -3 * (-4) + (-2)."
      },
      {
        "id": 214,
        "text": "Quelle est la valeur de : [x * 2 for x in range(3)] ?",
        "options": [
          "[0, 2, 4]",
          "[2, 4, 6]",
          "[0, 1, 2]",
          "[2, 4]"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "[0, 2, 4] ! Pour x valant 0, 1 et 2, x * 2 produit 0, 2 et 4."
      },
      {
        "id": 215,
        "text": "Soit val = '10'. Que produit : print(val * 2) ?",
        "options": [
          "20",
          "'1010'",
          "100",
          "TypeError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "'1010' ! L'opérateur * appliqué à une chaîne str et un entier int effectue une répétition (duplication) textuelle."
      },
      {
        "id": 216,
        "text": "Que renvoie l'évaluation de : not 0 ?",
        "options": [
          "True",
          "False",
          "-1",
          "1"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "True ! L'entier 0 est considéré comme Falsy en contexte booléen. Sa négation logique not 0 produit True."
      },
      {
        "id": 217,
        "text": "Quelle instruction parmi les suivantes provoque une exception IndexError ?",
        "options": [
          "[1, 2, 3][3]",
          "'abc'[0]",
          "{1: 'a'}[2]",
          "int('test')"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "[1, 2, 3][3] provoque IndexError car les indices valides pour une liste de taille 3 sont 0, 1 et 2."
      },
      {
        "id": 218,
        "text": "Que vaut l'expression de transtypage composé : int(float('12.75')) ?",
        "options": [
          "12",
          "13",
          "12.75",
          "ValueError"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "12 ! float('12.75') convertit la chaîne en 12.75, puis int() applique une troncature stricte de la partie décimale pour donner 12."
      },
      {
        "id": 219,
        "text": "Soit d = {'x': 1} ; del d['x']. Que renvoie : 'x' in d ?",
        "options": [
          "True",
          "False",
          "KeyError",
          "None"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "False ! L'instruction del a définitivement supprimé la clé 'x' de la table de hachage du dictionnaire."
      },
      {
        "id": 220,
        "text": "Soit L = [1, 2]. Quelle est la valeur de : print(L.reverse()) ?",
        "options": [
          "[2, 1]",
          "None",
          "[1, 2]",
          "Error"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "None ! La méthode reverse() modifie la liste en place et ne renvoie rien (None). C'est un piège d'examen ultra-classique !"
      }
    ]
  },
  {
    "id": "exam-normale-2024",
    "title": "Examen Final Blanc • SMI / IA S1 (Session Normale 2023/2024)",
    "sessionBadge": "Session Normale 2024",
    "duration": 30,
    "totalPoints": 20,
    "desc": "Sujet officiel axé sur les opérations fondamentales, la gestion des chaînes, les boucles while et la représentation mémoire.",
    "questions": [
      {
        "id": 301,
        "text": "Soit a = 5 et b = 2. Que renvoie : print(a // b, a % b, a / b) ?",
        "options": [
          "2 1 2.5",
          "2.5 1 2",
          "2 1 2",
          "2.0 1 2.5"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "2 1 2.5 ! La division entière 5 // 2 donne 2, le reste 5 % 2 donne 1, et la division réelle 5 / 2 donne le float 2.5."
      },
      {
        "id": 302,
        "text": "Soit ch = 'FSK UIT'. Que renvoie l'instruction : print(ch[4:]) ?",
        "options": [
          "'UIT'",
          "' UIT'",
          "'SK U'",
          "'FSK'"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "'UIT' ! L'indice 4 correspond à la lettre 'U'. En omettant la fin, on extrait jusqu'à la fin de la chaîne."
      },
      {
        "id": 303,
        "text": "Soit L = [10, 20, 30, 40] ; del L[1]. Que vaut L ?",
        "options": [
          "[10, 30, 40]",
          "[20, 30, 40]",
          "[10, 20, 40]",
          "[10, 40]"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "[10, 30, 40] ! L'instruction del L[1] supprime l'élément à l'indice 1 (la valeur 20)."
      },
      {
        "id": 304,
        "text": "Quelle est la valeur de cpt après ce code :\ncpt = 0\nwhile cpt < 5:\n    cpt += 2",
        "options": [
          "4",
          "5",
          "6",
          "Boucle infinie"
        ],
        "correct": 2,
        "pts": 1,
        "justification": "6 ! Tours successifs : 0 -> 2 -> 4 -> 6. À 6, la condition 6 < 5 devient fausse et la boucle s'arrête."
      },
      {
        "id": 305,
        "text": "Soit la matrice m = [[1, 2], [3, 4]]. Que vaut l'expression : m[1][0] ?",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correct": 2,
        "pts": 1,
        "justification": "3 ! m[1] sélectionne la deuxième sous-liste [3, 4], et [0] sélectionne son premier élément, soit 3."
      },
      {
        "id": 306,
        "text": "Quel mot-clé est réservé en Python pour déclarer une clause 'sinon si' ?",
        "options": [
          "else if",
          "elseif",
          "elif",
          "elsif"
        ],
        "correct": 2,
        "pts": 1,
        "justification": "elif est la contraction syntaxique exclusive imposée par Python."
      },
      {
        "id": 307,
        "text": "Dans le processeur de Von Neumann, quel registre mémorise l'ADRESSE de la prochaine instruction ?",
        "options": [
          "Le Registre d'Instruction (RI)",
          "Le Compteur Ordinal / Compteur de Programme (CO / PC)",
          "L'Accumulateur (ACC)",
          "Le Registre d'État (PSW)"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "Le Compteur de Programme (PC / Program Counter ou CO / Compteur Ordinal) pointe toujours sur l'adresse de la prochaine instruction en mémoire vive."
      },
      {
        "id": 308,
        "text": "Quelle est la complexité algorithmique d'accès à un élément par son indice L[i] dans une liste Python ?",
        "options": [
          "O(1) temps constant",
          "O(n) temps linéaire",
          "O(log n)",
          "O(n²)"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "O(1) ! Une liste Python est implémentée en C sous forme de tableau dynamique de pointeurs contigus en RAM, permettant un accès instantané par calcul direct d'adresse."
      },
      {
        "id": 309,
        "text": "Que renvoie l'instruction : print('Python'.find('th')) ?",
        "options": [
          "2",
          "3",
          "True",
          "-1"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "2 ! La sous-chaîne 'th' débute à l'indice 2 ('P'=0, 'y'=1, 't'=2)."
      },
      {
        "id": 310,
        "text": "Soit t = (1,) ; t += (2, 3). Que vaut t après cette opération ?",
        "options": [
          "TypeError",
          "(1, 2, 3)",
          "(1, (2, 3))",
          "(6)"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "(1, 2, 3) ! Bien que les tuples soient immuables, l'opérateur += crée un NOUVEAU tuple issu de la concaténation et réaffecte la variable t."
      },
      {
        "id": 311,
        "text": "Que vaut l'expression : bool('0') ?",
        "options": [
          "False",
          "True",
          "0",
          "TypeError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "True ! '0' est une chaîne de caractères de longueur 1 (non vide), elle est donc Truthy."
      },
      {
        "id": 312,
        "text": "Soit s = {1, 2, 3} ; s.add(2). Quelle est la taille de s ?",
        "options": [
          "4",
          "3",
          "2",
          "KeyError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "3 ! L'élément 2 est déjà présent dans le set s. La méthode add() ignore silencieusement les doublons."
      },
      {
        "id": 313,
        "text": "Que vaut l'expression : 10 // -3 ?",
        "options": [
          "-3",
          "-4",
          "-3.33",
          "-3.0"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "-4 ! 10 / -3 vaut -3.333... La division entière arrondit à l'entier inférieur le plus proche, soit -4."
      },
      {
        "id": 314,
        "text": "Que renvoie l'instruction chaînée : print('hello'.upper().startswith('H')) ?",
        "options": [
          "True",
          "False",
          "'HELLO'",
          "TypeError"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "True ! 'hello'.upper() produit 'HELLO', qui commence bien par la lettre majuscule 'H'."
      },
      {
        "id": 315,
        "text": "Soit x = 4 et y = 5. Après x, y = y, x + y, que valent x et y ?",
        "options": [
          "5 et 9",
          "5 et 5",
          "9 et 9",
          "4 et 9"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "5 et 9 ! Python évalue d'abord simultanément le tuple de droite (y, x + y) = (5, 4 + 5) = (5, 9), puis affecte x = 5 et y = 9."
      },
      {
        "id": 316,
        "text": "Quel bus achemine l'instruction lue depuis la mémoire RAM jusqu'au processeur ?",
        "options": [
          "Le bus de données",
          "Le bus d'adresses",
          "Le bus système",
          "Le bus d'alimentation"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "Le bus de données ! C'est le bus bidirectionnel qui transporte les données et le code des instructions entre la RAM et le CPU."
      },
      {
        "id": 317,
        "text": "Quelle est la liste produite par : list(range(5, 0, -2)) ?",
        "options": [
          "[5, 3, 1]",
          "[5, 3, 1, -1]",
          "[5, 4, 3, 2, 1]",
          "[3, 1]"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "[5, 3, 1] ! Début à 5, pas de -2 (5 -> 3 -> 1). Le prochain serait -1 qui dépasse la borne d'arrêt 0 (exclue)."
      },
      {
        "id": 318,
        "text": "Dans un dictionnaire d = {'Ali': 18, 'Sara': 19}, comment vérifier si 'Sara' fait partie des clés ?",
        "options": [
          "'Sara' in d",
          "d.has_key('Sara')",
          "'Sara' in d.values()",
          "d['Sara'] == True"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "'Sara' in d est la syntaxe moderne et optimale (complexité O(1) par table de hachage)."
      },
      {
        "id": 319,
        "text": "Que renvoie l'addition arithmétique : int(True) + int(False) ?",
        "options": [
          "1",
          "2",
          "0",
          "TypeError"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "1 ! En Python, le type bool hérite de int : int(True) vaut 1 et int(False) vaut 0. 1 + 0 = 1."
      },
      {
        "id": 320,
        "text": "Quel type parmi les suivants NE PEUT PAS être utilisé comme clé d'un dictionnaire ?",
        "options": [
          "int",
          "str",
          "tuple",
          "list"
        ],
        "correct": 3,
        "pts": 1,
        "justification": "list ! Les clés d'un dictionnaire doivent impérativement être hashables (immuables). Les listes étant mutables, elles ne peuvent servir de clés (TypeError: unhashable type: 'list')."
      }
    ]
  },
  {
    "id": "exam-rattrapage-2024",
    "title": "Examen Session de Rattrapage • SMI / IA S1 (Session 2023/2024)",
    "sessionBadge": "Rattrapage 2024",
    "duration": 30,
    "totalPoints": 20,
    "desc": "Épreuve d'évaluation technique portant sur la logique combinée, le cycle d'instruction matériel et la manipulation de structures avancées.",
    "questions": [
      {
        "id": 401,
        "text": "Soit a = 0, b = 1, c = 2. Que renvoie : print(a and b or c) ?",
        "options": [
          "0",
          "1",
          "2",
          "True"
        ],
        "correct": 2,
        "pts": 1,
        "justification": "2 ! (a and b) s'évalue d'abord. a valant 0 (Falsy), (0 and 1) renvoie 0. Puis (0 or 2) renvoie le premier terme Truthy, soit 2 !"
      },
      {
        "id": 402,
        "text": "Quel composant interne du CPU est chargé de décoder les instructions machines lues en RAM ?",
        "options": [
          "L'Unité de Contrôle (UC)",
          "L'Unité Arithmétique et Logique (UAL)",
          "Le Bus d'adresses",
          "L'horloge système"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "L'Unité de Contrôle (UC) extrait le code opération (OpCode) contenu dans le Registre d'Instruction (RI) et pilote les signaux d'exécution."
      },
      {
        "id": 403,
        "text": "Quel est le type de la donnée résultante de : 3 + 4j ?",
        "options": [
          "float",
          "complex",
          "tuple",
          "ValueError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "complex ! Python gère nativement les nombres complexes où la lettre 'j' désigne l'unité imaginaire."
      },
      {
        "id": 404,
        "text": "Soit s = 'Informatique'. Que vaut l'expression : s[-4:] ?",
        "options": [
          "'ique'",
          "'tique'",
          "'form'",
          "'Info'"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "'ique' ! L'indice négatif -4 correspond à la 4ème lettre en partant de la fin ('i'), jusqu'à la fin de la chaîne."
      },
      {
        "id": 405,
        "text": "Que produit la conversion : list('UIT') ?",
        "options": [
          "['UIT']",
          "['U', 'I', 'T']",
          "('U', 'I', 'T')",
          "TypeError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "['U', 'I', 'T'] ! La fonction list() itère sur chaque caractère de la chaîne et crée une liste d'éléments individuels."
      },
      {
        "id": 406,
        "text": "Soit L = [1, 2] ; L.extend([3, 4]). Que vaut len(L) ?",
        "options": [
          "3",
          "4",
          "2",
          "TypeError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "4 ! extend() ajoute individuellement chaque élément de la séquence passée en argument, contrairement à append() qui aurait ajouté la sous-liste comme un bloc unique (donnant une taille 3)."
      },
      {
        "id": 407,
        "text": "Soit d = {'nom': 'Imane', 'age': 30}. Que renvoie l'instruction : print('Imane' in d) ?",
        "options": [
          "True",
          "False",
          "KeyError",
          "None"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "False ! L'opérateur 'in' sur un dictionnaire vérifie uniquement la présence des CLÉS ('nom', 'age'), et non des valeurs. Pour tester les valeurs : 'Imane' in d.values()."
      },
      {
        "id": 408,
        "text": "Que renvoie l'expression : 10 != 10 or 20 == 20 and not 5 > 2 ?",
        "options": [
          "True",
          "False",
          "None",
          "Error"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "False ! 10 != 10 est False. 5 > 2 est True donc not 5 > 2 est False. L'expression devient : False or (True and False) => False or False => False."
      },
      {
        "id": 409,
        "text": "Quel type de signaux transporte le bus de contrôle d'un ordinateur ?",
        "options": [
          "Les bits des adresses mémoire",
          "Les données calculées",
          "Les signaux d'horloge, de lecture/écriture (Read/Write) et de synchronisation",
          "Les caractères ASCII"
        ],
        "correct": 2,
        "pts": 1,
        "justification": "Le bus de contrôle transporte les signaux de commande, de synchronisation et de statut (horloge, lecture/écriture RAM, interruptions)."
      },
      {
        "id": 410,
        "text": "Quelle expression simple permet de retourner une chaîne de caractères s ?",
        "options": [
          "s.reverse()",
          "s[::-1]",
          "reversed(s)",
          "s[-1:0]"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "s[::-1] ! C'est le slicing canonique en Python pour inverser instantanément toute chaîne ou liste."
      },
      {
        "id": 411,
        "text": "Que renvoie la fonction booléenne : bool(None) ?",
        "options": [
          "True",
          "False",
          "None",
          "Null"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "False ! L'objet spécial None est considéré comme Falsy par définition en Python."
      },
      {
        "id": 412,
        "text": "Quelle syntaxe permet d'instancier un tuple vide ?",
        "options": [
          "t = ()",
          "t = tuple()",
          "Les deux options précédentes",
          "t = (,)"
        ],
        "correct": 2,
        "pts": 1,
        "justification": "Les deux notations t = () et t = tuple() sont valides pour créer un tuple vide."
      },
      {
        "id": 413,
        "text": "Soit la déclaration : L = [0] * 3. Quelle est la valeur de L ?",
        "options": [
          "[0, 0, 0]",
          "[0]",
          "[3]",
          "TypeError"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "[0, 0, 0] ! L'opérateur * duplique les références de la liste 3 fois."
      },
      {
        "id": 414,
        "text": "Soit s = 'banana'. Que produit : print(s.replace('a', 'o', 2)) ?",
        "options": [
          "'bonona'",
          "'bonana'",
          "'bonono'",
          "'banana'"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "'bonona' ! Le troisième argument optionnel (count=2) limite le remplacement aux 2 premières occurrences de 'a'."
      },
      {
        "id": 415,
        "text": "Quelle est la différence fondamentale entre s.remove(x) et s.discard(x) sur un ensemble set ?",
        "options": [
          "discard() est plus rapide",
          "remove() lève une exception KeyError si x est absent, alors que discard() ne fait rien",
          "discard() supprime tous les éléments",
          "Il n'y a aucune différence"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "s.remove(x) déclenche impérativement une erreur KeyError si x n'existe pas, tandis que s.discard(x) l'ignore de manière sécurisée sans lever d'erreur."
      },
      {
        "id": 416,
        "text": "Soit a = b = [0] ; a.append(1). Que contient la variable b ?",
        "options": [
          "[0]",
          "[0, 1]",
          "[1]",
          "TypeError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "[0, 1] ! a et b pointent vers le même objet liste en mémoire vive (aliasing direct)."
      },
      {
        "id": 417,
        "text": "Quel est l'ordre chronologique exact du cycle d'instruction matériel d'un processeur ?",
        "options": [
          "Execute -> Fetch -> Decode",
          "Decode -> Execute -> Fetch",
          "Fetch (Recherche) -> Decode (Décodage) -> Execute (Exécution)",
          "Store -> Load -> Execute"
        ],
        "correct": 2,
        "pts": 1,
        "justification": "Fetch (charger l'instruction de la RAM dans le RI) -> Decode (l'UC analyse l'OpCode) -> Execute (l'UAL ou l'UC réalise le traitement)."
      },
      {
        "id": 418,
        "text": "Que renvoie l'instruction : print(2 * '3' + '4') ?",
        "options": [
          "'10'",
          "'334'",
          "'64'",
          "TypeError"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "'334' ! 2 * '3' produit '33' (duplication), puis '33' + '4' produit '334' (concaténation)."
      },
      {
        "id": 419,
        "text": "Quelle méthode de liste supprime ET renvoie l'élément situé à un indice donné (ou le dernier par défaut) ?",
        "options": [
          "remove()",
          "pop()",
          "delete()",
          "drop()"
        ],
        "correct": 1,
        "pts": 1,
        "justification": "pop() extrait et renvoie l'élément (par défaut le dernier à l'indice -1)."
      },
      {
        "id": 420,
        "text": "Que retourne l'appel : list(enumerate(['a', 'b'])) ?",
        "options": [
          "[(0, 'a'), (1, 'b')]",
          "['0a', '1b']",
          "[('a', 0), ('b', 1)]",
          "{0: 'a', 1: 'b'}"
        ],
        "correct": 0,
        "pts": 1,
        "justification": "[(0, 'a'), (1, 'b')] ! enumerate() associe à chaque élément son indice sous forme de tuple (indice, valeur)."
      }
    ]
  },
  {
    "id": "controle-1",
    "title": "Contrôle Continu 1 • Fondements, Types & Opérateurs (Ch 1 à 3)",
    "sessionBadge": "Contrôle 1 (Mi-Semestre)",
    "duration": 20,
    "totalPoints": 20,
    "desc": "Épreuve de contrôle continu (10 questions à 2 points) sur l'architecture de Von Neumann, PEP 8, types primitifs et priorités arithmétiques.",
    "questions": [
      {
        "id": 501,
        "text": "Qui a formulé le modèle fondamental de machine à programme enregistré en 1945 ?",
        "options": [
          "Alan Turing",
          "John von Neumann",
          "Guido van Rossum",
          "Dennis Ritchie"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "John von Neumann a formalisé l'architecture où les données et le programme partagent le même espace physique en mémoire centrale."
      },
      {
        "id": 502,
        "text": "Quel composant interne du CPU réalise les opérations arithmétiques (+, -, *, /) et les tests logiques (AND, OR, NOT) ?",
        "options": [
          "L'Unité de Contrôle (UC)",
          "L'Unité Arithmétique et Logique (UAL)",
          "La mémoire RAM",
          "Le Bus d'adresses"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "L'Unité Arithmétique et Logique (UAL) est l'organe de calcul pur du microprocesseur."
      },
      {
        "id": 503,
        "text": "Quel est le nom et le format du code intermédiaire exécuté par la Machine Virtuelle Python (PVM) ?",
        "options": [
          "Le Code Machine natif",
          "Le Bytecode (.pyc)",
          "Le Langage Assembleur",
          "Le Script source brut"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "Le Bytecode (.pyc) est le format intermédiaire portable produit par le compilateur Python pour être interprété par la PVM."
      },
      {
        "id": 504,
        "text": "Parmi ces propositions, quel identificateur de variable est strictement VALIDE selon la norme PEP 8 ?",
        "options": [
          "2eme_note",
          "total$",
          "_compteur",
          "class"
        ],
        "correct": 2,
        "pts": 2,
        "justification": "_compteur est valide. '2eme_note' commence par un chiffre (interdit), 'total$' contient un symbole spécial (interdit), et 'class' est un mot-clé réservé."
      },
      {
        "id": 505,
        "text": "Que vaut le résultat de l'opération 15 / 3 en Python 3 ?",
        "options": [
          "5",
          "5.0",
          "5.00",
          "ZeroDivisionError"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "5.0 ! En Python 3, la division simple / renvoie TOUJOURS un flottant (float), même si la division tombe juste."
      },
      {
        "id": 506,
        "text": "Que vaut l'opération modulo : 14 % 4 ?",
        "options": [
          "3",
          "2",
          "3.5",
          "0"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "2 ! 14 divisé par 4 donne 3 avec un reste de 2 (14 = 4 * 3 + 2)."
      },
      {
        "id": 507,
        "text": "Quelle fonction convertit le nombre 14.89 en 14 par troncature stricte de la partie décimale ?",
        "options": [
          "round(14.89)",
          "int(14.89)",
          "floor(14.89)",
          "str(14.89)"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "int(14.89) supprime purement les décimales sans effectuer d'arrondi (donne 14)."
      },
      {
        "id": 508,
        "text": "Que produit l'expression avec court-circuit : False and (10 / 0 == 0) ?",
        "options": [
          "ZeroDivisionError",
          "False",
          "True",
          "None"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "False ! Grâce à la règle du court-circuit logique, le premier terme étant False, le second terme contenant la division par zéro n'est jamais exécuté."
      },
      {
        "id": 509,
        "text": "Que produit l'instruction : '2' + '2' ?",
        "options": [
          "4",
          "'22'",
          "22",
          "TypeError"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "'22' ! L'opérateur + entre deux chaînes str effectue une concaténation textuelle."
      },
      {
        "id": 510,
        "text": "Que produit l'expression : 'ab' * 3 ?",
        "options": [
          "'ababab'",
          "'ab3'",
          "'aabb'",
          "TypeError"
        ],
        "correct": 0,
        "pts": 2,
        "justification": "'ababab' ! La multiplication d'une chaîne par un entier répète la séquence 3 fois."
      }
    ]
  },
  {
    "id": "controle-2",
    "title": "Contrôle Continu 2 • Conditionnelles, Boucles & Séquences (Ch 4 à 6)",
    "sessionBadge": "Contrôle 2 (Fin de Semestre)",
    "duration": 25,
    "totalPoints": 20,
    "desc": "Épreuve de contrôle continu (10 questions à 2 points) sur if/elif/else, boucles imbriquées, slicing, aliasing et immuabilité.",
    "questions": [
      {
        "id": 601,
        "text": "Soit x = 12. Quelle est la valeur finale de r après ce bloc :\nif x > 15:\n    r = 1\nelif x > 10:\n    r = 2\nelse:\n    r = 3",
        "options": [
          "1",
          "2",
          "3",
          "None"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "2 ! 12 n'étant pas > 15, on teste le premier elif : 12 > 10 est True, donc r prend la valeur 2 et la structure conditionnelle se termine immédiatement."
      },
      {
        "id": 602,
        "text": "Quel est le DERNIER nombre généré par l'itérateur : range(1, 10, 2) ?",
        "options": [
          "10",
          "9",
          "11",
          "7"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "9 ! Les valeurs générées sont 1, 3, 5, 7, 9. La valeur 11 dépasse la borne supérieure 10 qui est toujours exclue."
      },
      {
        "id": 603,
        "text": "Quelle est la sortie de ce code :\nfor i in [1, 2, 3]:\n    pass\nelse:\n    print('Succès')",
        "options": [
          "Affiche 'Succès'",
          "N'affiche rien",
          "Affiche 1 2 3",
          "SyntaxError"
        ],
        "correct": 0,
        "pts": 2,
        "justification": "Affiche 'Succès' ! La boucle a parcouru tous ses éléments sans rencontrer d'instruction break, donc le bloc else s'exécute normalement."
      },
      {
        "id": 604,
        "text": "Quelle instruction provoque à coup sûr une boucle infinie ?",
        "options": [
          "while False: pass",
          "while True: pass",
          "for i in range(1000): pass",
          "while 0: pass"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "while True: pass maintient une condition toujours vraie sans instruction d'arrêt (break)."
      },
      {
        "id": 605,
        "text": "Soit la liste L = [1, 2, 3, 4, 5]. Que vaut le slicing inverse : L[3:1:-1] ?",
        "options": [
          "[4, 3]",
          "[4, 3, 2]",
          "[3, 2]",
          "[5, 4]"
        ],
        "correct": 0,
        "pts": 2,
        "justification": "[4, 3] ! Début à l'indice 3 (valeur 4), pas de -1, s'arrête avant l'indice 1 (valeur 3 comprise, indice 1 exclu)."
      },
      {
        "id": 606,
        "text": "Soit L1 = [10] ; L2 = L1 ; L2[0] = 99. Que vaut L1[0] ?",
        "options": [
          "10",
          "99",
          "IndexError",
          "None"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "99 ! L2 = L1 crée un alias vers le même espace mémoire en RAM. Modifier un élément via L2 modifie instantanément L1."
      },
      {
        "id": 607,
        "text": "Que provoque l'instruction : t = (1, 2) ; t[0] = 5 ?",
        "options": [
          "t devient (5, 2)",
          "TypeError",
          "ValueError",
          "IndexError"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "TypeError: 'tuple' object does not support item assignment. Les tuples sont strictement immuables."
      },
      {
        "id": 608,
        "text": "Soit l'ensemble s = {1, 2, 3}. Que vaut : s.union({3, 4}) ?",
        "options": [
          "{1, 2, 3, 3, 4}",
          "{1, 2, 3, 4}",
          "{3}",
          "{1, 2}"
        ],
        "correct": 1,
        "pts": 2,
        "justification": "{1, 2, 3, 4} ! L'union mathématique fusionne les éléments tout en garantissant l'unicité de chaque valeur."
      },
      {
        "id": 609,
        "text": "Soit d = {'nom': 'SMI', 'note': 17}. Comment accéder à la note de manière sécurisée ?",
        "options": [
          "d.get('note')",
          "d['note']",
          "Les deux options",
          "d.note"
        ],
        "correct": 2,
        "pts": 2,
        "justification": "Les deux méthodes d['note'] et d.get('note') accèdent à la valeur. d.get() a l'avantage de ne pas planter si la clé manque."
      },
      {
        "id": 610,
        "text": "Que renvoie l'instruction d'appartenance : 3 in (1, 2, 3) ?",
        "options": [
          "True",
          "False",
          "TypeError",
          "IndexError"
        ],
        "correct": 0,
        "pts": 2,
        "justification": "True ! L'opérateur in fonctionne sur toutes les séquences Python (listes, chaînes, tuples, sets)."
      }
    ]
  }
];

// DECK FLASHCARDS 3D
const FLASHCARDS = [
  { id: 1, tag: "Architecture", front: "Quel est le principe fondamental de l'Architecture de Von Neumann (1945) ?", back: "Le Programme Enregistré : les instructions (code) et les données (variables) partagent le même espace physique en mémoire RAM." },
  { id: 2, tag: "Transtypage", front: "Pourquoi int('3.14') déclenche-t-il une exception ValueError ?", back: "int() refuse tout séparateur décimal dans une chaîne littérale. Solution obligatoire : int(float('3.14')) qui donne 3." },
  { id: 3, tag: "Booléens", front: "Pourquoi bool('False') renvoie-t-il True ?", back: "En Python, toute chaîne non vide est évaluée comme vraie (Truthy). Seules bool('') et bool(0) valent False." },
  { id: 4, tag: "Listes", front: "Quel est le danger de l'instruction L2 = L1 sur les listes ?", back: "L'Aliasing : L2 = L1 ne copie pas la liste mais crée un second nom pointant vers le même objet en RAM. Modifier L2 modifie L1 ! Solution : L2 = L1[:]." },
  { id: 5, tag: "Flottants", front: "Pourquoi 0.1 + 0.2 == 0.3 renvoie-t-il False ?", back: "À cause de la norme IEEE 754 de représentation des flottants en binaire : 0.1 et 0.2 produisent 0.30000000000000004." },
  { id: 6, tag: "Logique", front: "Qu'est-ce que l'évaluation en court-circuit (Short-circuit) ?", back: "Dans A and B, si A est False, B n'est jamais lu. Dans A or B, si A est True, B n'est jamais lu." },
  { id: 7, tag: "Boucles", front: "Quand la clause else d'une boucle s'exécute-t-elle ?", back: "Uniquement si la boucle a terminé toutes ses itérations normalement SANS avoir rencontré d'instruction break." },
  { id: 8, tag: "Tuples", front: "Comment écrit-on obligatoirement un tuple contenant un seul élément ?", back: "Avec une virgule finale obligatoire : t = (42,). Sans virgule, (42) est un simple entier int entre parenthèses." },
  { id: 9, tag: "Slicing", front: "Que produit l'expression L[::-1] sur une liste ou une chaîne ?", back: "Elle produit une copie inversée complète de la séquence, parcourue de droite à gauche avec un pas de -1." },
  { id: 10, tag: "Arithmétique", front: "Dans quel sens s'évalue l'opérateur de puissance ** ?", back: "De droite à gauche ! Ainsi 2 ** 3 ** 2 = 2 ** (3 ** 2) = 2 ** 9 = 512." }
];
