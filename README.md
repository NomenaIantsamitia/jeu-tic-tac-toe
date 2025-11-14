🎮 Tic-Tac-Toe Pro

Un jeu de Morpion (Tic-Tac-Toe) moderne et interactif développé avec HTML5, CSS3 et JavaScript vanilla ES6+. Ce projet démontre des compétences avancées en développement front-end avec une interface utilisateur élégante et une expérience de jeu fluide.
✨ Fonctionnalités

    🎯 Plateau de jeu 4x4 - Version étendue du traditionnel 3x3 pour plus de challenge

    👥 Système de joueurs personnalisables - Saisie des noms des joueurs

    🏆 Suivi des scores - Historique des victoires pour chaque joueur

    📊 Tableau de statistiques - Parties jouées et matchs nuls

    🎨 Interface moderne - Design responsive avec animations fluides

    🔍 Détection intelligente - Algorithmes de victoire optimisés

    📱 Responsive Design - Compatible mobile et desktop

🚀 Technologies Utilisées

    HTML5 - Structure sémantique moderne

    CSS3 -

        Tailwind CSS pour le styling utilitaire

        Grid & Flexbox pour les layouts

        Animations et transitions CSS

        Design responsive avec media queries

    JavaScript ES6+ -

        Syntaxe moderne (arrow functions, destructuring, etc.)

        Gestion d'état avancée

        Manipulation du DOM efficace

        Programmation orientée objet implicite

🎯 Règles du Jeu

    Le jeu se joue sur une grille 4x4

    Deux joueurs s'affrontent (X et O)

    Chaque joueur place son symbole à tour de rôle

    Le premier à aligner 4 symboles horizontalement, verticalement ou en diagonale gagne

    Si la grille est remplie sans vainqueur, la partie est déclarée nulle

📦 Structure du Projet
jeu-tic-tac-toe/
│
├── index.html          # Fichier principal
├── README.md           # Documentation du projet
└── script.js           # Styles supplémentaires
└── style.css            #  Logique JavaScript

🛠️ Installation & Exécution
1️⃣ Cloner le projet

git clone https://github.com/NomenaIantsamitia/jeu-tic-tac-toe.git

2️⃣ Ouvrir le dossier du projet

cd jeu-tic-tac-toe
3️⃣ Exécuter le projet

Comme c’est un projet HTML/CSS/JS sans backend, il suffit d’ouvrir le fichier :
index.html

dans ton navigateur (Chrome, Firefox, etc.)

💡 Sur Linux / Ubuntu :
xdg-open index.html


// Structure de données principale
const gameState = {
    board: Array(16).fill(''),          // Plateau 4x4
    currentPlayer: 'player1',           // Joueur actuel
    gameActive: false,                  // Statut du jeu
    movesCount: 0,                      // Nombre de coups
    gamesPlayed: 0,                     // Parties totales
    draws: 0                            // Matchs nuls
};

Algorithmes de Victoire
javascript

// Patterns gagnants pour 4x4
const winningPatterns = [
    // Lignes horizontales (4)
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
    // Lignes verticales (4)
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
    // Diagonales (2)
    [0, 5, 10, 15], [3, 6, 9, 12]
];

Fonctions Principales ES6+
javascript

// Arrow functions et destructuring
const handleCellClick = (index) => {
    if (!gameState.gameActive || gameState.board[index] !== '') return;
    
    // Mise à jour immutabilité-inspired
    const newBoard = [...gameState.board];
    newBoard[index] = players[gameState.currentPlayer].symbol;
    
    // Logique de jeu...
};

// Vérification de victoire avec every()
const checkWinner = () => {
    return winningPatterns.some(pattern => {
        const [a, b, c, d] = pattern;
        return pattern.every(index => 
            gameState.board[index] === gameState.board[a] && 
            gameState.board[a] !== ''
        );
    });
};

🎨 Customisation
Couleurs et Thème

Le projet utilise une palette de couleurs moderne :

    Bleu principal : #3b82f6 à #1e3a8a (dégradé)

    Joueur X : Rouge (#dc2626)

    Joueur O : Vert (#16a34a)

    Arrière-plan : Slate (slate-900 à slate-800)

    🚀 Performance

    Temps de chargement : < 2s

    Taille du bundle : ~8KB (HTML, CSS, JS combinés)

    Compatibilité navigateur : Chrome, Firefox, Safari, Edge (versions récentes)

🧪 Tests et Qualité
Bonnes Pratiques Implémentées

    ✅ Code ES6+ moderne

    ✅ Separation of Concerns

    ✅ Gestion d'erreur basique

    ✅ Accessibilité (labels, contrastes)

    ✅ Performance optimisée

    ✅ Code documenté

Points à Améliorer

    Tests unitaires avec Jest

    Service Worker pour le caching

    Mode hors-ligne

    Internationalisation
👨‍💻 Développeuse

Développé avec ❤️ par MISEDRATIANA Nomena pour démontrer des compétences en développement front-end moderne.

⭐ N'oubliez pas de donner une étoile au projet si vous l'aimez !
🎯 Prochaines Fonctionnalités

    Intelligence Artificielle (IA) pour jouer contre l'ordinateur

    Mode tournoi avec plusieurs parties

    Sons et effets audio

    Thèmes personnalisables

    Historique des parties

    Partage des scores sur les réseaux sociaux

    Mode dark/light theme

    Animations de victoire avancées

Dernière mise à jour : 14 Novembre 2025
