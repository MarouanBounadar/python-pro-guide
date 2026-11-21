// Source de données officielle - Programmation Python 1 (SMI / IA - S1)
// Université Ibn Tofail (UIT) - Faculté des Sciences Kénitra
// Pr. Imane EL ALAOUI

const COURSE_METADATA = {
  title: "Programmation Python 1",
  filiere: "SMI / IA - Semestre 1",
  university: "Université Ibn Tofail (UIT) - Faculté des Sciences Kénitra",
  prof: "Pr. Imane EL ALAOUI",
  contact: "elalaoui.imane@uit.ac.ma",
  description: "Plateforme académique interactive pour la préparation complète au contrôle et à l'examen de Programmation Python 1."
};

const CHAPTERS = [
  {
    id: "ch1",
    num: "01",
    title: "Architecture des Ordinateurs & Fondements de Python",
    subtitle: "Du matériel à l'exécution : Von Neumann, CPU, PVM et Bytecode",
    duration: "45 min",
    icon: "cpu",
    summary: `
      1. <b>Système numérique vs Système informatique</b> : Tout système informatique est numérique, mais tout système numérique n'est pas informatique. L'ordinateur est <i>universellement programmable</i>.
      2. <b>Architecture de Von Neumann (1945)</b> : Les instructions du programme et les données partagent le même espace physique en mémoire RAM (Concept de <i>Programme Enregistré</i>).
      3. <b>Composants du CPU</b> :
         - <b>UC (Unité de Contrôle)</b> : Orchestre l'extraction (Fetch) et le décodage (Decode).
         - <b>UAL (Unité Arithmétique & Logique)</b> : Exécute les opérations mathématiques (+, -, *, /) et logiques (ET, OU, NON).
         - <b>Registres internes</b> : Mémoire ultra-rapide temporaire.
      4. <b>Cycle d'exécution</b> : <code>Fetch (Chargement) ➔ Decode (Décodage) ➔ Execute (Exécution)</code>.
      5. <b>Approche Hybride de Python</b> : Code source <code>.py</code> ➔ Précompilation en <b>Bytecode</b> indépendant du matériel ➔ Exécution par la <b>PVM (Python Virtual Machine)</b>.
      6. <b>Modes d'exécution</b> : Mode Interactif (REPL <code>>>></code>, éphémère) vs Mode Script (fichier persistant <code>.py</code>).
    `,
    content: `
      <div class="space-y-6">
        <div class="figma-card p-6 rounded-2xl">
          <div class="flex items-center gap-2 mb-3">
            <span class="badge-tag bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Concept Fondamental</span>
            <h3 class="text-xl font-bold text-white">1. Système Numérique vs Système Informatique</h3>
          </div>
          <p class="text-slate-300 leading-relaxed text-sm mb-4">
            Bien que souvent confondus dans le langage courant, le système numérique et le système informatique ne désignent pas la même échelle.
          </p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span class="badge-tech mb-2 inline-block">Système Numérique</span>
              <p class="text-xs text-slate-300 leading-relaxed mt-2">
                Tout dispositif électronique traitant des signaux discrets (0 et 1). Souvent <b>figé</b> dans un circuit logique dédié (ex: montre à quartz, feu de signalisation, boîtier ABS automobile).
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30">
              <span class="badge-tech mb-2 inline-block text-cyan-400 border-cyan-500/40">Système Informatique</span>
              <p class="text-xs text-slate-300 leading-relaxed mt-2">
                Sous-ensemble des systèmes numériques, <b>universellement programmable</b>. Capable d'exécuter des algorithmes arbitraires (scripts, logiciels, calculs scientifiques).
              </p>
            </div>
          </div>
          <div class="callout-prof text-sm text-slate-200">
            <b>Règle d'or de l'examen :</b> "Tout système informatique est numérique, mais tout système numérique n'est pas informatique." (Koulchi système informatique rah numérique, walakine machi ay appareil numérique rah pc programmable).
          </div>
        </div>

        <div class="figma-card p-6 rounded-2xl">
          <div class="flex items-center gap-2 mb-3">
            <span class="badge-tag bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Modèle de 1945</span>
            <h3 class="text-xl font-bold text-white">2. L'Architecture de Von Neumann</h3>
          </div>
          <p class="text-slate-300 text-sm leading-relaxed mb-4">
            Proposée par John von Neumann, cette architecture régit tous les ordinateurs modernes. Elle repose sur 4 blocs élémentaires interconnectés par un système de bus :
          </p>
          
          <div class="grid md:grid-cols-4 gap-3 text-center text-xs">
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div class="font-bold text-indigo-400 mb-1">1. Processeur (CPU)</div>
              <div class="text-slate-400 text-[11px]">UC (Chef d'orchestre) + UAL (Calculs) + Registres internes</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div class="font-bold text-emerald-400 mb-1">2. Mémoire Centrale (RAM)</div>
              <div class="text-slate-400 text-[11px]">Mémoire volatile adressable octet par octet (Zone Instructions & Zone Données)</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div class="font-bold text-amber-400 mb-1">3. Unités d'E/S</div>
              <div class="text-slate-400 text-[11px]">Échange externe (clavier, écran) et stockage secondaire (SSD/HDD)</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div class="font-bold text-cyan-400 mb-1">4. Système de Bus</div>
              <div class="text-slate-400 text-[11px]">Bus de Données (bidirectionnel), d'Adresses (unidirectionnel), de Contrôle</div>
            </div>
          </div>

          <div class="callout-trap text-sm text-slate-200">
            <b>Goulot d'étranglement de Von Neumann :</b> Le fait que les données et les instructions partagent les mêmes bus physiques limite la vitesse globale du transfert.
          </div>
        </div>

        <div class="figma-card p-6 rounded-2xl">
          <div class="flex items-center gap-2 mb-3">
            <span class="badge-tag bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Compilation & Interprétation</span>
            <h3 class="text-xl font-bold text-white">3. Comment Python exécute-t-il le code ?</h3>
          </div>
          <div class="space-y-3 text-sm text-slate-300">
            <p>• <b>Compilation pure (ex. C/C++) :</b> Traduction directe en langage machine binaire spécifique au processeur. Ultra-rapide mais dépend de l'OS/CPU.</p>
            <p>• <b>Interprétation pure (ex. Bash, Basic) :</b> Le moteur lit ligne par ligne et exécute. Souple mais lent lors des boucles.</p>
            <div class="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
              <span class="font-bold text-indigo-300 block mb-1">⚡ Approche Hybride / Mixte de Python :</span>
              <p class="text-xs text-slate-300">
                1. <b>Phase de précompilation :</b> Python compile le code source <code>.py</code> en un langage intermédiaire indépendant du processeur : le <b>Bytecode</b>.<br/>
                2. <b>Phase d'interprétation :</b> La machine virtuelle <b>PVM (Python Virtual Machine)</b> lit ce Bytecode et l'exécute sur le processeur physique.
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "ch2",
    num: "02",
    title: "Variables, Types de Données & Transtypage",
    subtitle: "Règles PEP 8, types primitifs et conversions explicites",
    duration: "55 min",
    icon: "database",
    summary: `
      1. <b>Identificateurs valides</b> : Lettres, chiffres, underscore (_). <i>Jamais de chiffre au début</i>, sensible à la casse, pas de mots-clés réservés (Keywords).
      2. <b>Typage Dynamique</b> : La variable n'a pas de type fixe prédéclaré ; c'est la valeur assignée qui détermine le type à l'exécution.
      3. <b>Types primitifs</b> : <code>int</code> (entiers relatifs illimités), <code>float</code> (décimaux IEEE 754), <code>complex</code> (partie imaginaire avec j), <code>bool</code> (True / False), <code>str</code> (texte immuable).
      4. <b>Transtypage (Casting)</b> :
         - <code>int(14.89) ➔ 14</code> (Troncature pure sans arrondi).
         - <code>int("3.14") ➔ ValueError</code> (Obligation de passer par <code>int(float("3.14"))</code>).
         - <code>bool("False") ➔ True</code> (Toute chaîne non vide vaut True).
         - <code>0.1 + 0.2 == 0.3 ➔ False</code> (Imprécision inhérente à la norme IEEE 754).
    `,
    content: `
      <div class="space-y-6">
        <div class="figma-card p-6 rounded-2xl">
          <h3 class="text-xl font-bold text-white mb-3">1. Règles de Nommage (PEP 8) & Identificateurs</h3>
          <p class="text-sm text-slate-300 mb-4">Un identificateur est le nom symbolique lié à une adresse mémoire. Il obéit à des règles strictes :</p>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left border border-slate-800">
              <thead class="bg-slate-900 text-indigo-400">
                <tr><th class="p-3">Identificateur</th><th class="p-3">Statut</th><th class="p-3">Justification Examen</th></tr>
              </thead>
              <tbody class="divide-y divide-slate-800 font-mono">
                <tr><td class="p-3 text-emerald-400">age_etudiant</td><td class="p-3 text-emerald-400 font-bold">Valide</td><td class="p-3 text-slate-300 font-sans">Lettres minuscules et tiret-bas (_)</td></tr>
                <tr><td class="p-3 text-emerald-400">_total2</td><td class="p-3 text-emerald-400 font-bold">Valide</td><td class="p-3 text-slate-300 font-sans">Peut commencer par un underscore</td></tr>
                <tr><td class="p-3 text-rose-400">2eme_note</td><td class="p-3 text-rose-400 font-bold">Invalide</td><td class="p-3 text-slate-300 font-sans"><b>Commence par un chiffre (interdit)</b></td></tr>
                <tr><td class="p-3 text-rose-400">prix-total</td><td class="p-3 text-rose-400 font-bold">Invalide</td><td class="p-3 text-slate-300 font-sans">Le tiret haut (-) est interprété comme une soustraction</td></tr>
                <tr><td class="p-3 text-rose-400">for</td><td class="p-3 text-rose-400 font-bold">Invalide</td><td class="p-3 text-slate-300 font-sans">Mot-clé réservé (Keyword) du langage</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="figma-card p-6 rounded-2xl">
          <h3 class="text-xl font-bold text-white mb-3">2. Les 4 Fonctions Clés de Transtypage & Pièges</h3>
          <div class="grid md:grid-cols-4 gap-3 text-xs font-mono">
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-indigo-400 font-bold block mb-1">int()</span>
              int(14.89) ➔ 14<br/>int("42") ➔ 42<br/><span class="text-slate-500 font-sans text-[11px]">Troncature stricte</span>
            </div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-cyan-400 font-bold block mb-1">float()</span>
              float(7) ➔ 7.0<br/>float("3.14") ➔ 3.14<br/><span class="text-slate-500 font-sans text-[11px]">Point décimal</span>
            </div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-emerald-400 font-bold block mb-1">str()</span>
              str(25) ➔ '25'<br/>str(3.14) ➔ '3.14'<br/><span class="text-slate-500 font-sans text-[11px]">Représentation texte</span>
            </div>
            <div class="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span class="text-amber-400 font-bold block mb-1">bool()</span>
              bool(0) ➔ False<br/>bool("") ➔ False<br/>bool("False") ➔ True
            </div>
          </div>
          <div class="callout-trap text-sm text-slate-200 mt-4">
            <b>Attention :</b> <code>int("3.14")</code> déclenche un crash <code>ValueError: invalid literal for int()</code> ! Pour convertir une chaîne décimale en entier, il faut impérativement faire : <code>int(float("3.14"))</code>.
          </div>
        </div>
      </div>
    `
  },
  {
    id: "ch3",
    num: "03",
    title: "Opérateurs, Expressions & Ordre de Priorité",
    subtitle: "Arithmétique, logique en court-circuit et hiérarchie",
    duration: "50 min",
    icon: "calculator",
    summary: `
      1. <b>Priorité absolue</b> : Parenthèses <code>( )</code> ➔ Puissance <code>**</code> (évaluée de droite à gauche !) ➔ Multiplications/Divisions (<code>*, /, //, %</code>) ➔ Additions/Soustractions (<code>+, -</code>) ➔ Comparaisons (<code>==, <, ></code>) & Appartenance (<code>in</code>) ➔ <code>not</code> ➔ <code>and</code> ➔ <code>or</code> ➔ Affectations (<code>=, +=</code>).
      2. <b>Évaluation en court-circuit (Short-circuit)</b> : Dans <code>A and B</code>, si A est False, B n'est jamais évalué. Dans <code>A or B</code>, si A est True, B n'est jamais évalué.
      3. <b>Affectation augmentée</b> : <code>A *= B + 2</code> équivaut strictement à <code>A = A * (B + 2)</code> et non <code>(A * B) + 2</code>.
    `,
    content: `
      <div class="figma-card p-6 rounded-2xl space-y-4">
        <h3 class="text-xl font-bold text-white">Hiérarchie Officielle des Opérateurs</h3>
        <ol class="list-decimal list-inside text-xs text-slate-200 space-y-2 font-mono bg-slate-900/90 p-4 rounded-xl border border-slate-800">
          <li><b>( )</b> : Parenthèses (Force l'ordre d'évaluation)</li>
          <li><b>**</b> : Puissance (Évaluée de droite à gauche : 2**3**2 = 2**9 = 512)</li>
          <li><b>+x, -x</b> : Signes unaires arithmétiques</li>
          <li><b>*, /, //, %</b> : Multiplication, division réelle, division entière, modulo</li>
          <li><b>+, -</b> : Addition et soustraction</li>
          <li><b>==, !=, &lt;, &lt;=, &gt;, &gt;=, in, not in, is</b> : Comparaisons et appartenance</li>
          <li><b>not</b> : Négation booléenne</li>
          <li><b>and</b> : Conjonction logique (prioritaire sur 'or')</li>
          <li><b>or</b> : Disjonction logique</li>
          <li><b>=, +=, -=, *=, /=...</b> : Opérateurs d'affectation</li>
        </ol>
      </div>
    `
  },
  {
    id: "ch4",
    num: "04",
    title: "Structures Conditionnelles & Décision",
    subtitle: "L'art de la décision : if, elif, else et conditions composées",
    duration: "60 min",
    icon: "git-branch",
    summary: `
      1. <b>Indentation</b> : En Python, 4 espaces et le deux-points (:) définissent les blocs. L'oubli provoque <code>IndentationError</code>.
      2. <b>Ordre des tests</b> : Dès qu'une condition if ou elif renvoie <code>True</code>, Python exécute son bloc et quitte immédiatement la structure complète.
      3. <b>Conditions composées</b> : Privilégier les opérateurs <code>and</code>, <code>or</code>, <code>not</code> au lieu d'imbriquer inutilement plusieurs if.
    `,
    content: `<div class="figma-card p-6 rounded-2xl text-slate-300 text-sm">Les structures conditionnelles permettent d'orienter l'algorithme selon les données fournies. Utilisez notre Laboratoire d'Algorithmes pour tester les exercices types de facturation et de vérification d'années bissextiles.</div>`
  },
  {
    id: "ch5",
    num: "05",
    title: "Boucles & Structures Itératives",
    subtitle: "Répétitions déterminées vs conditionnelles : for, while, break, continue et else",
    duration: "65 min",
    icon: "repeat",
    summary: `
      1. <b>for vs while</b> :
         - <code>for</code> est utilisé lorsque le nombre d'itérations est connu d'avance (avec <code>range(debut, fin_exclue, pas)</code>).
         - <code>while</code> est utilisé lorsque l'arrêt dépend d'un événement externe ou d'une condition dynamique.
      2. <b>break vs continue</b> :
         - <code>break</code> quitte définitivement la boucle.
         - <code>continue</code> interrompt le tour courant et saute au tour suivant.
      3. <b>Clause 'else' sur une boucle</b> : Spécificité majeure de Python, le bloc <code>else</code> s'exécute uniquement si la boucle se termine normalement <b>sans avoir été interrompue par un break</b> !
    `,
    content: `<div class="figma-card p-6 rounded-2xl text-slate-300 text-sm">Les boucles permettent d'exécuter un traitement de manière compacte et efficace. Retrouvez les exercices types du calcul de factorielle (n!) et du test de primalité dans nos sections interactives.</div>`
  },
  {
    id: "ch6",
    num: "06",
    title: "Séquences & Structures Fondamentales",
    subtitle: "Chaînes (str), Listes dynamiques vs C, Slicing, Tuples, Sets et Dicts",
    duration: "70 min",
    icon: "layers",
    summary: `
      1. <b>Mutabilité</b> :
         - <b>Immuables (non modifiables en place)</b> : <code>int, float, bool, str, tuple</code>.
         - <b>Mutables (modifiables en place)</b> : <code>list, set, dict</code>.
      2. <b>Piège de l'Aliasing</b> :
         - <code>L2 = L1</code> crée un alias pointant vers le même objet en RAM.
         - Pour une copie indépendante : <code>L2 = L1[:]</code> ou <code>L2 = L1.copy()</code>.
      3. <b>Slicing <code>L[debut:fin:pas]</code></b> : La borne de fin est toujours exclue. <code>L[::-1]</code> inverse la séquence.
      4. <b>Comparaison lexicographique</b> : Évaluée de gauche à droite, s'arrête au premier écart indépendamment de la taille.
    `,
    content: `<div class="figma-card p-6 rounded-2xl text-slate-300 text-sm">Les structures de données fondamentales constituent le cœur de Python. Observez leur comportement dans le Simulateur de RAM pour maîtriser la gestion de la mémoire.</div>`
  }
];

// Banque de 30 questions d'examen
const QUESTION_BANK = [
  {
    id: 1,
    q: "Dans l'architecture de Von Neumann, quel composant du processeur (CPU) est chargé de l'extraction (Fetch) et du décodage (Decode) des instructions ?",
    options: [
      "L'Unité Arithmétique et Logique (UAL)",
      "L'Unité de Contrôle (UC)",
      "Le Bus de données",
      "Le Disque Dur (SSD)"
    ],
    correct: 1,
    explain: "L'Unité de Contrôle (UC) est le chef d'orchestre matériel chargé du Fetch et du Decode."
  },
  {
    id: 2,
    q: "Que renvoie précisément l'instruction Python suivante : print(0.1 + 0.2 == 0.3) ?",
    options: ["True", "False", "None", "SyntaxError"],
    correct: 1,
    explain: "False ! En raison de la représentation binaire flottante IEEE 754, 0.1 + 0.2 vaut 0.30000000000000004."
  },
  {
    id: 3,
    q: "Déterminez la valeur et le type exact de la variable suivante : a = 15 // 4",
    options: [
      "3.75 de type float",
      "3 de type int",
      "4 de type int",
      "3.0 de type float"
    ],
    correct: 1,
    explain: "L'opérateur // effectue la division entière euclidienne et retourne l'entier 3."
  },
  {
    id: 4,
    q: "Parmi ces identificateurs, lequel est strictement invalide en Python selon PEP 8 ?",
    options: ["_valeur_1", "True_val", "2eme_choix", "MAX_SIZE"],
    correct: 2,
    explain: "2eme_choix commence par un chiffre, ce qui est strictement interdit en syntaxe Python."
  },
  {
    id: 5,
    q: "Que se passe-t-il si l'on exécute directement l'instruction : int('3.14') ?",
    options: [
      "Retourne l'entier 3",
      "Retourne le flottant 3.14",
      "Lève une exception ValueError",
      "Lève une exception TypeError"
    ],
    correct: 2,
    explain: "ValueError ! int() refuse le point décimal dans une chaîne. Il faut faire int(float('3.14'))."
  },
  {
    id: 6,
    q: "Quelle est la valeur retournée par : bool('False') ?",
    options: ["False", "True", "None", "SyntaxError"],
    correct: 1,
    explain: "True ! Toute chaîne de caractères non vide est évaluée à True par bool()."
  },
  {
    id: 7,
    q: "Quelle est la valeur de l'expression : 2 ** 3 ** 2 ?",
    options: ["64", "512", "36", "18"],
    correct: 1,
    explain: "L'opérateur puissance ** s'évalue de droite à gauche : 3² = 9, puis 2⁹ = 512."
  },
  {
    id: 8,
    q: "Que renvoie l'instruction suivante : print(False and (10 / 0 == 0)) ?",
    options: ["ZeroDivisionError", "False", "True", "None"],
    correct: 1,
    explain: "False ! Grâce à l'évaluation en court-circuit (Short-circuit), le côté droit n'est jamais lu."
  },
  {
    id: 9,
    q: "Quelle est la valeur exacte de l'expression : -7 // 2 ?",
    options: ["-3", "-3.5", "-4", "-3.0"],
    correct: 2,
    explain: "La division entière arrondit toujours vers le bas (vers moins l'infini), donc -3.5 devient -4."
  },
  {
    id: 10,
    q: "Que renvoie l'instruction : '1' in [1, 2, 3] ?",
    options: ["True", "False", "TypeError", "SyntaxError"],
    correct: 1,
    explain: "False ! L'opérateur in teste l'égalité de valeur et de type sans erreur : la chaîne '1' != l'entier 1."
  },
  {
    id: 11,
    q: "Combien d'éléments génère l'intervalle : range(1, 6) ?",
    options: ["6 éléments", "5 éléments", "7 éléments", "4 éléments"],
    correct: 1,
    explain: "5 éléments : 1, 2, 3, 4, 5 (la borne de fin 6 est toujours exclue)."
  },
  {
    id: 12,
    q: "Dans une boucle, quelle commande interrompt le tour courant et passe directement au suivant ?",
    options: ["break", "continue", "pass", "exit()"],
    correct: 1,
    explain: "continue saute au tour d'itération suivant, tandis que break termine la boucle."
  },
  {
    id: 13,
    q: "Quand le bloc 'else' d'une boucle for ou while est-il exécuté ?",
    options: [
      "À chaque tour de boucle",
      "Uniquement si la boucle se termine sans rencontrer de break",
      "Uniquement en cas d'erreur",
      "Dès qu'un break est exécuté"
    ],
    correct: 1,
    explain: "Le bloc else de boucle ne s'exécute que si la boucle termine toutes ses itérations normalement."
  },
  {
    id: 14,
    q: "Considérant : L1 = [10, 20] ; L2 = L1 ; L2.append(30). Que vaut len(L1) ?",
    options: ["2", "3", "Error", "1"],
    correct: 1,
    explain: "3 ! L2 = L1 crée un simple alias pointant vers le même objet liste en mémoire vive."
  },
  {
    id: 15,
    q: "Comment créer une copie réelle et indépendante d'une liste L1 dans L2 ?",
    options: ["L2 = L1", "L2 = L1[:]", "L2 = copy(L1)", "L2 = &L1"],
    correct: 1,
    explain: "L2 = L1[:] (slicing complet) ou L1.copy() crée un nouvel objet distinct en mémoire."
  },
  {
    id: 16,
    q: "Que renvoie la comparaison lexicographique : [2, 5, 1] > [2, 3, 4, 5, 6] ?",
    options: ["True", "False", "TypeError", "False car la 2ème est plus longue"],
    correct: 0,
    explain: "True ! À l'indice 1, 5 > 3. La comparaison s'arrête immédiatement et ignore la longueur."
  },
  {
    id: 17,
    q: "Quelle instruction crée un ensemble vide (Set vide) valide en Python ?",
    options: ["s = {}", "s = set()", "s = []", "s = ()"],
    correct: 1,
    explain: "set() crée un ensemble vide. {} crée un dictionnaire vide (dict vide)."
  },
  {
    id: 18,
    q: "Quel est le type de l'objet : t = (42) ?",
    options: ["tuple", "int", "list", "set"],
    correct: 1,
    explain: "int ! Pour définir un tuple à 1 élément, la virgule est obligatoire : (42,)."
  },
  {
    id: 19,
    q: "Que renvoie : True or False and False ?",
    options: ["True", "False", "None", "SyntaxError"],
    correct: 0,
    explain: "True ! and est prioritaire sur or : (False and False) = False, puis True or False = True."
  },
  {
    id: 20,
    q: "Si A = 5 et B = 3, quelle est la nouvelle valeur de A après : A *= B + 2 ?",
    options: ["17", "25", "30", "15"],
    correct: 1,
    explain: "A *= B + 2 équivaut à A = A * (B + 2) = 5 * 5 = 25."
  }
];

// Flashcards 3D en Français
const FLASHCARDS = [
  {
    id: 1,
    tag: "Architecture",
    front: "Quelle est l'innovation clé de l'Architecture de Von Neumann (1945) ?",
    back: "Le concept de Programme Enregistré : les données (variables) et les instructions (code) partagent le même espace physique dans la mémoire RAM."
  },
  {
    id: 2,
    tag: "Transtypage",
    front: "Pourquoi l'instruction int('3.14') déclenche-t-elle une exception ValueError ?",
    back: "La fonction int() refuse formellement un point décimal dans une chaîne de caractères. Solution : passer d'abord par float, soit int(float('3.14')) qui donne 3."
  },
  {
    id: 3,
    tag: "Booléens",
    front: "Pourquoi bool('False') renvoie-t-il True en Python ?",
    back: "En Python, toute chaîne de caractères non vide est évaluée comme vraie (Truthy). Seules la chaîne vide '' et le nombre 0 renvoient False."
  },
  {
    id: 4,
    tag: "Listes",
    front: "Quel est le danger de l'instruction L2 = L1 sur deux listes ?",
    back: "Le phénomène d'Aliasing : L2 = L1 ne copie pas la liste, elle crée un second nom vers le même objet en RAM. Modifier L2 modifie aussi L1 ! Solution : L2 = L1[:]."
  },
  {
    id: 5,
    tag: "Flottants",
    front: "Pourquoi l'expression 0.1 + 0.2 == 0.3 renvoie-t-elle False ?",
    back: "En raison de la norme IEEE 754 de représentation des nombres flottants en binaire : 0.1 et 0.2 produisent une fraction binaire périodique infinie (0.30000000000000004)."
  },
  {
    id: 6,
    tag: "Logique",
    front: "Qu'est-ce que l'évaluation en court-circuit (Short-circuit) ?",
    back: "Pour 'and', dès que le premier terme est False, Python s'arrête et renvoie False. Pour 'or', dès que le premier est True, il s'arrête. Le second terme n'est même pas lu !"
  },
  {
    id: 7,
    tag: "Boucles",
    front: "Quand la clause 'else' attachée à une boucle for ou while s'exécute-t-elle ?",
    back: "Uniquement si la boucle a terminé toutes ses itérations normalement SANS avoir rencontré d'instruction break."
  },
  {
    id: 8,
    tag: "Tuples",
    front: "Comment définit-on obligatoirement un tuple contenant un seul élément ?",
    back: "Avec une virgule finale obligatoire : t = (42,). Sans virgule, (42) est considéré comme un simple entier int entre parenthèses."
  }
];

// Glossaire Académique
const GLOSSARY = [
  {
    fr: "Architecture de Von Neumann",
    en: "Von Neumann Architecture",
    dar: "Modèle informatique universel unifiant stockage du code et des données en RAM.",
    code: "CPU + RAM + E/S + Bus"
  },
  {
    fr: "Typage Dynamique",
    en: "Dynamic Typing",
    dar: "Attribution automatique du type selon la valeur sans déclaration explicite de type.",
    code: "x = 42 # int automatique"
  },
  {
    fr: "Transtypage (Casting)",
    en: "Type Casting",
    dar: "Conversion explicite d'une valeur d'un type vers un autre compatible.",
    code: "n = int('20')"
  },
  {
    fr: "Short-circuit (Court-circuit)",
    en: "Short-circuit Evaluation",
    dar: "Arrêt immédiat de l'évaluation logique dès que le résultat final est déterminé.",
    code: "False and (1/0 == 0)"
  },
  {
    fr: "Aliasing",
    en: "Variable Aliasing",
    dar: "Liaison de deux identificateurs distincts vers un même objet mutable en mémoire.",
    code: "L2 = L1 # Danger"
  },
  {
    fr: "Immuabilité",
    en: "Immutability",
    dar: "Propriété d'un objet dont l'état ne peut être altéré après sa création (str, tuple).",
    code: "s = 'abc' ; s[0] = 'z' # Crash"
  },
  {
    fr: "Slicing",
    en: "Slicing",
    dar: "Technique d'extraction d'une sous-séquence via la syntaxe [début : fin : pas].",
    code: "L[1:4:2]"
  },
  {
    fr: "Bytecode & PVM",
    en: "Bytecode & Python VM",
    dar: "Code intermédiaire compilé exécuté par la machine virtuelle logicielle de Python.",
    code: ".py ➔ .pyc ➔ PVM"
  }
];

// Les 10 Pièges d'Examen
const EXAM_TRAPS = [
  {
    title: "1. Le piège de int() avec un point décimal",
    code: "int('3.14') # 💥 ValueError!",
    fix: "int(float('3.14')) # ✅ 3",
    note: "La fonction int() refuse les chaînes décimales. Il faut d'abord passer par float()."
  },
  {
    title: "2. Troncature et non arrondi",
    code: "int(14.89) # Ne donne PAS 15 !",
    fix: "int(14.89) ➔ 14",
    note: "Python supprime brutalement la partie décimale (troncature pure sans arrondi)."
  },
  {
    title: "3. La vérité de bool('False')",
    code: "bool('False') # Ne donne PAS False !",
    fix: "bool('False') ➔ True",
    note: "Toute chaîne non vide est True, quel que soit le texte à l'intérieur."
  },
  {
    title: "4. L'évaluation de droite à gauche de la puissance",
    code: "2 ** 3 ** 2 # Ne donne PAS (2**3)**2 = 64 !",
    fix: "2 ** (3 ** 2) = 2 ** 9 = 512",
    note: "L'opérateur ** est le seul opérateur évalué de droite à gauche."
  },
  {
    title: "5. L'Aliasing sur les listes",
    code: "L2 = L1 # Ne crée PAS une nouvelle liste !",
    fix: "L2 = L1[:] ou L2 = L1.copy()",
    note: "L'opérateur = crée une liaison vers le même objet en RAM. Modifier L2 modifie L1."
  },
  {
    title: "6. L'exclusion de la borne de fin",
    code: "range(1, 5) et L[1:5]",
    fix: "L'indice 5 est TOUJOURS exclu !",
    note: "range(1, 5) s'arrête à 4 inclus."
  },
  {
    title: "7. La division entière négative",
    code: "-7 // 2 # Ne donne PAS -3 !",
    fix: "-7 // 2 ➔ -4",
    note: "La division entière arrondit toujours vers le bas (vers -infini)."
  },
  {
    title: "8. Déclaration de l'ensemble vide",
    code: "s = {} # Ce n'est PAS un ensemble !",
    fix: "s = set() # ✅ Ensemble vide",
    note: "Les accolades {} sont réservées aux dictionnaires vides (dict)."
  },
  {
    title: "9. Le tuple à un seul élément",
    code: "t = (10) # C'est un simple entier int !",
    fix: "t = (10,) # ✅ Tuple avec virgule",
    note: "C'est la virgule qui crée le tuple, pas les parenthèses."
  },
  {
    title: "10. Le court-circuit qui évite le crash",
    code: "False and (10 / 0 == 0)",
    fix: "Résultat : False (aucun crash ZeroDivisionError)",
    note: "Dès que le premier terme de 'and' est False, Python n'évalue jamais le second terme."
  }
];

// Séries de TD officielles UIT Kénitra
const TD_SERIES = [
  {
    id: "serie1",
    title: "Série 1 : Variables, Types, Opérateurs, I/O",
    subtitle: "Faculté des Sciences Kénitra - SMI / IA S1",
    questions: [
      {
        num: "Exercice 1",
        title: "Identificateurs & Types fondamentaux",
        content: "Déterminez la validité des identificateurs et la valeur de : a = 15 // 4, b = 15 / 3, c = 2 ** 3 ** 2, d = -7 // 2.",
        solution: `
          <div class="space-y-2 text-xs">
            <p>• <b>2eme_choix</b> : Invalide (commence par un chiffre).</p>
            <p>• <b>for</b> : Invalide (mot-clé réservé).</p>
            <p>• <b>total$</b> : Invalide (caractère spécial interdit).</p>
            <p>• <b>x-max</b> : Invalide (tiret interprété comme soustraction).</p>
            <p>• <b>a</b> = 3 (int) | <b>b</b> = 5.0 (float) | <b>c</b> = 512 (int) | <b>d</b> = -4 (int).</p>
            <p>• <b>0.1 + 0.2 == 0.3</b> ➔ False en raison de la représentation IEEE 754.</p>
          </div>
        `
      },
      {
        num: "Exercice 2 & 3",
        title: "Transtypage & Évaluation logique",
        content: "v1 = bool(0), v2 = bool('False'), v3 = int(float('3.14')), print(0 and 'Python'), print(False and (10/0 == 0)).",
        solution: `
          <div class="space-y-2 text-xs">
            <p>• <b>v1</b> = False (bool) | <b>v2</b> = True (bool) | <b>v3</b> = 3 (int).</p>
            <p>• <b>int('3.14')</b> : Lève une exception ValueError.</p>
            <p>• <b>0 and 'Python'</b> : Renvoie 0 (dernière valeur évaluée).</p>
            <p>• <b>False and (10/0 == 0)</b> : Renvoie False sans erreur de division par zéro (court-circuit).</p>
          </div>
        `
      }
    ]
  },
  {
    id: "serie2",
    title: "Série 2 : Structures Conditionnelles",
    subtitle: "Faculté des Sciences Kénitra - SMI / IA S1",
    questions: [
      {
        num: "Exercice 5 : Mois de Février & Année Bissextile",
        title: "Vérification calendaire grégorienne",
        content: "Vérifier si une date est valide en février selon les règles bissextiles.",
        solution: `
<pre class="bg-slate-900 p-3 rounded text-[11px] font-mono text-slate-200">
jour = int(input("Jour: "))
mois = int(input("Mois: "))
annee = int(input("Année: "))

if mois != 2:
    print("Ce programme teste uniquement le mois de février.")
else:
    est_bissextile = (annee % 4 == 0 and annee % 100 != 0) or (annee % 400 == 0)
    max_jours = 29 if est_bissextile else 28
    if 1 <= jour <= max_jours:
        print("Date valide")
    else:
        print("Date invalide")
</pre>
        `
      },
      {
        num: "Exercice 6 : Facture d'eau par tranches progressives",
        title: "Tarification cumulative par tranches",
        content: "Calcul exact de la consommation découpée par tranches (0-20 m³ à 2.0 DH, 20-50 m³ à 4.0 DH, >50 m³ à 7.0 DH).",
        solution: `
<pre class="bg-slate-900 p-3 rounded text-[11px] font-mono text-slate-200">
conso = float(input("Consommation en m³: "))
if conso < 0:
    print("Erreur")
elif conso <= 20:
    facture = conso * 2.0
elif conso <= 50:
    facture = (20 * 2.0) + ((conso - 20) * 4.0)
else:
    facture = (20 * 2.0) + (30 * 4.0) + ((conso - 50) * 7.0)
print(f"Montant total : {facture:.2f} DH")
</pre>
        `
      }
    ]
  }
];

// Badges
const BADGES = [
  { id: "von_neumann", title: "Conquérant de Von Neumann", desc: "Maîtrise des composants CPU, bus et cycle Fetch-Decode-Execute.", icon: "cpu" },
  { id: "type_master", title: "Maître du Transtypage", desc: "Triomphe des pièges de int(), float() et bool().", icon: "database" },
  { id: "slicing_pro", title: "Expert du Slicing", desc: "Découpage et indexation des séquences sans erreur.", icon: "scissors" },
  { id: "trap_hunter", title: "Chasseur de Pièges", desc: "Découverte de tous les pièges éliminatoires d'examen.", icon: "shield-alert" },
  { id: "major", title: "Major de Promotion S1 🏆", desc: "Note supérieure ou égale à 18/20 à l'examen blanc.", icon: "trophy" }
];
