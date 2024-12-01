const words = ['JAVA', 'HTML', 'CSS', 'WEB', 'SCRIPT', 'DESENVOLVIMENTO', 'APRENDER', 'ALGORITMO', 'JAVASCRIPT', 'PROGRAMAR'];
const gridSize = 10;
let grid = [];
let foundWords = [];

document.addEventListener('DOMContentLoaded', () => {
    generateGrid();
    displayWordsList();
});

function generateGrid() {
    grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    const wordList = [...words]; // Copiar a lista de palavras

    // Colocar as palavras no grid
    wordList.forEach(word => placeWord(word));

    // Preencher o restante das células com letras aleatórias
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') {
                grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Letras aleatórias
            }
        }
    }

    renderGrid();
}

function placeWord(word) {
    const direction = Math.random() < 0.5 ? 'H' : 'V'; // Horizontal ou Vertical
    let placed = false;

    while (!placed) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);

        if (canPlaceWord(word, row, col, direction)) {
            for (let i = 0; i < word.length; i++) {
                if (direction === 'H') {
                    grid[row][col + i] = word[i];
                } else {
                    grid[row + i][col] = word[i];
                }
            }
            placed = true;
        }
    }
}

function canPlaceWord(word, row, col, direction) {
    if (direction === 'H' && col + word.length <= gridSize) {
        for (let i = 0; i < word.length; i++) {
            if (grid[row][col + i] !== '') return false;
        }
        return true;
    }
    if (direction === 'V' && row + word.length <= gridSize) {
        for (let i = 0; i < word.length; i++) {
            if (grid[row + i][col] !== '') return false;
        }
        return true;
    }
    return false;
}

function renderGrid() {
    const gridContainer = document.getElementById('word-search');
    gridContainer.innerHTML = ''; // Limpar grid anterior

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const div = document.createElement('div');
            div.textContent = cell;
            div.dataset.row = rowIndex;
            div.dataset.col = colIndex;
            div.addEventListener('click', () => handleCellClick(rowIndex, colIndex));
            gridContainer.appendChild(div);
        });
    });
}

function handleCellClick(row, col) {
    const cell = grid[row][col];
    const word = getSelectedWord();

    if (word && word.includes(cell)) {
        markWord(word);
    }
}

function getSelectedWord() {
    // Função de seleção de palavras, que pode ser estendida conforme a necessidade
    return '';
}

function markWord(word) {
    foundWords.push(word);
    alert('Palavra encontrada: ' + word);
    updateWordList();
    if (foundWords.length === words.length) {
        alert('Você venceu!');
    }
}

function displayWordsList() {
    const wordsList = document.getElementById('words-list');
    words
