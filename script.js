// Éléments du DOM
const gameBoard = document.getElementById('game-board');
const startModal = document.getElementById('start-modal');
const endModal = document.getElementById('end-modal');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const newGameBtn = document.getElementById('new-game-btn');
const startGameBtn = document.getElementById('start-game-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const player1Input = document.getElementById('player1-input');
const player2Input = document.getElementById('player2-input');

// Éléments d'affichage des joueurs
const player1NameElem = document.getElementById('player1-name');
const player2NameElem = document.getElementById('player2-name');
const player1ScoreElem = document.getElementById('player1-score');
const player2ScoreElem = document.getElementById('player2-score');
const player1Card = document.getElementById('player1-card');
const player2Card = document.getElementById('player2-card');

// Éléments de statistiques
const gamesPlayedElem = document.getElementById('games-played');
const drawsCountElem = document.getElementById('draws-count');

// Éléments du modal de fin
const endTitleElem = document.getElementById('end-title');
const endMessageElem = document.getElementById('end-message');
const endIconElem = document.getElementById('end-icon');

// Variables du jeu
let players = {
    player1: { name: 'Joueur 1', symbol: 'X', score: 0, isActive: true },
    player2: { name: 'Joueur 2', symbol: 'O', score: 0, isActive: false }
};

let gameState = {
    board: Array(16).fill(''),
    currentPlayer: 'player1',
    gameActive: false,
    movesCount: 0,
    gamesPlayed: 0,
    draws: 0
};

// Patterns de victoire pour un plateau 4x4
const winningPatterns = [
    // Lignes horizontales
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    // Lignes verticales
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    // Diagonales
    [0, 5, 10, 15],
    [3, 6, 9, 12]
];

// Initialisation du jeu
function initGame() {
    createGameBoard();
    updateUI();
    attachEventListeners();
}

// Création du plateau de jeu
function createGameBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('button');
        cell.className = 'game-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoard.appendChild(cell);
    }
}

// Gestion des événements
function attachEventListeners() {
    startBtn.addEventListener('click', showStartModal);
    resetBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', newGame);
    startGameBtn.addEventListener('click', startGame);
    playAgainBtn.addEventListener('click', playAgain);
    closeModalBtn.addEventListener('click', closeEndModal);
}

// Afficher le modal de démarrage
function showStartModal() {
    startModal.classList.add('active');
}

// Démarrer le jeu
function startGame() {
    const name1 = player1Input.value.trim() || 'Joueur 1';
    const name2 = player2Input.value.trim() || 'Joueur 2';
    
    if (name1 === name2) {
        alert('Les noms des joueurs doivent être différents!');
        return;
    }
    
    players.player1.name = name1;
    players.player2.name = name2;
    
    startModal.classList.remove('active');
    resetGame();
    
    gameState.gameActive = true;
    updateUI();
}

// Gestion du clic sur une cellule
function handleCellClick(index) {
    if (!gameState.gameActive || gameState.board[index] !== '') return;
    
    // Mettre à jour le plateau
    gameState.board[index] = players[gameState.currentPlayer].symbol;
    gameState.movesCount++;
    
    // Mettre à jour l'interface
    const cell = document.querySelector(`.game-cell[data-index="${index}"]`);
    cell.textContent = players[gameState.currentPlayer].symbol;
    cell.classList.add(gameState.currentPlayer === 'player1' ? 'x-move' : 'o-move');
    cell.disabled = true;
    
    // Vérifier s'il y a un gagnant
    if (checkWinner()) {
        endGame(players[gameState.currentPlayer].name);
        return;
    }
    
    // Vérifier s'il y a match nul
    if (gameState.movesCount === 16) {
        endGame('draw');
        return;
    }
    
    // Changer de joueur
    gameState.currentPlayer = gameState.currentPlayer === 'player1' ? 'player2' : 'player1';
    updateActivePlayer();
}

// Vérifier s'il y a un gagnant
function checkWinner() {
    for (const pattern of winningPatterns) {
        const [a, b, c, d] = pattern;
        if (
            gameState.board[a] !== '' &&
            gameState.board[a] === gameState.board[b] &&
            gameState.board[a] === gameState.board[c] &&
            gameState.board[a] === gameState.board[d]
        ) {
            // Marquer les cellules gagnantes
            pattern.forEach(index => {
                document.querySelector(`.game-cell[data-index="${index}"]`).classList.add('winning-cell');
            });
            return true;
        }
    }
    return false;
}

// Fin de partie
function endGame(result) {
    gameState.gameActive = false;
    gameState.gamesPlayed++;
    
    if (result === 'draw') {
        gameState.draws++;
        showEndModal('Match nul!', 'Aucun joueur n\'a gagné.', 'fas fa-handshake');
    } else {
        players[gameState.currentPlayer].score++;
        showEndModal(`${result} a gagné!`, 'Félicitations pour cette victoire!', 'fas fa-trophy');
    }
    
    updateUI();
}

// Afficher le modal de fin
function showEndModal(title, message, icon) {
    endTitleElem.textContent = title;
    endMessageElem.textContent = message;
    endIconElem.className = icon;
    endModal.classList.add('active');
}

// Fermer le modal de fin
function closeEndModal() {
    endModal.classList.remove('active');
}

// Rejouer
function playAgain() {
    closeEndModal();
    newGame();
}

// Nouvelle partie
function newGame() {
    gameState.board = Array(16).fill('');
    gameState.currentPlayer = 'player1';
    gameState.movesCount = 0;
    gameState.gameActive = true;
    
    // Réinitialiser l'interface
    document.querySelectorAll('.game-cell').forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('x-move', 'o-move', 'winning-cell');
    });
    
    updateActivePlayer();
    updateUI();
}

// Réinitialiser le jeu
function resetGame() {
    players.player1.score = 0;
    players.player2.score = 0;
    gameState.gamesPlayed = 0;
    gameState.draws = 0;
    newGame();
}

// Mettre à jour le joueur actif
function updateActivePlayer() {
    player1Card.classList.toggle('active', gameState.currentPlayer === 'player1');
    player2Card.classList.toggle('active', gameState.currentPlayer === 'player2');
}

// Mettre à jour l'interface utilisateur
function updateUI() {
    // Mettre à jour les noms et scores des joueurs
    player1NameElem.textContent = players.player1.name;
    player2NameElem.textContent = players.player2.name;
    player1ScoreElem.textContent = players.player1.score;
    player2ScoreElem.textContent = players.player2.score;
    
    // Mettre à jour les statistiques
    gamesPlayedElem.textContent = gameState.gamesPlayed;
    drawsCountElem.textContent = gameState.draws;
    
    // Activer/désactiver les boutons
    resetBtn.disabled = !gameState.gameActive && gameState.gamesPlayed === 0;
    newGameBtn.disabled = !gameState.gameActive && gameState.gamesPlayed === 0;
    
    // Mettre à jour le joueur actif
    updateActivePlayer();
}

// Initialiser le jeu au chargement
document.addEventListener('DOMContentLoaded', initGame);