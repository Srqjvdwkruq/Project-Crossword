// DOM Elements
const elements = {
    container: document.getElementById('container'),
    startBtn: document.getElementById('startBtn'),
    selectMode: document.getElementById('selectMode'),
    menuBtn: document.getElementById('menuBtn'),
    quitBtn: document.getElementById('quitBtn'),
    resumeBtn: document.getElementById('resumeBtn'),
    backBtn: document.getElementById('backBtn'),
    backBtn2: document.getElementById('backBtn2'),
    title: document.querySelector('.title'),
    description: document.querySelector('.description'),
    modeButtons: document.querySelectorAll('.mode-btn'),
    categoryButtons: document.querySelectorAll('[data-category]')
};

// Game Configuration
const GRID_SIZE = 15; // ตาราง Scrabble 15x15
const RACK_SIZE = 7; // จำนวนตัวอักษรใน Rack ที่ผู้เล่นมีได้
const LETTER_SCORES = { // จำนวนคะแนนของแต่ละตัวอักษร
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1,
    'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1,
    'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
};

// แอนิเมชั่นตัวอักษรหน้าหลัก
function addAnimation(element, animationClass) {
    if (!element) return;
    element.classList.remove('fade-in', 'slide-in', 'pop-in');
    void element.offsetWidth; // Trigger reflow
    element.classList.add(animationClass);
}

// เริ่มต้นเกม
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM Loaded');

    // ถ้าอยู่ในหน้า Scrabble Mode ให้สร้างเกม
    if (window.location.pathname.includes('scrabble_cw.html')) {
        const scrabbleBoard = new ScrabbleBoard();
        const letterRack = new LetterRack();

        // จัดการปุ่ม Menu
        if (elements.menuBtn) {
            const menuDropdown = elements.menuBtn.querySelector('.menu-dropdown');
            elements.menuBtn.addEventListener('click', () => {
                menuDropdown.classList.toggle('show');
            });

            // ปิด dropdown เมื่อคลิกที่อื่น
            document.addEventListener('click', (e) => {
                if (!elements.menuBtn.contains(e.target)) {
                    menuDropdown.classList.remove('show');
                }
            });
        }
        // จัดการปุ่ม Continue
        if (elements.continueBtn) {
            elements.continueBtn.addEventListener('click', () => {
                const menuDropdown = elements.menuBtn.querySelector('.menu-dropdown');
                menuDropdown.classList.remove('show');
            });
        }
        // จัดการปุ่ม Quit
        if (elements.quitBtn) {
            elements.quitBtn.addEventListener('click', () => {
                const menuDropdown = elements.menuBtn.querySelector('.menu-dropdown');
                menuDropdown.classList.remove('show');
            });
        }
    }
    // ถ้าอยุ่ในหน้าหลัก
    else if (elements.startBtn) {
        elements.startBtn.addEventListener('click', () => {
            showScreen(elements.selectMode, elements.container);
            setTimeout(() => {
                addAnimation(document.querySelector('.title2'), 'fade-in');
            }, 300);
        });
    }
});

// Screen Transition Functions
function showScreen(screenToShow, screenToHide) {
    // Hide current screen
    screenToHide.style.opacity = '0';
    
    setTimeout(() => {
        screenToHide.style.display = 'none';
        // Show new screen
        screenToShow.style.display = 'flex';
        // Force reflow
        void screenToShow.offsetWidth;
        screenToShow.style.opacity = '1';
    }, 300);
}

function goBack(current, previous) {
    showScreen(previous, current);
    
    setTimeout(() => {
        if (previous === elements.container) {
            // Animate home screen elements
            addAnimation(elements.title, 'fade-in');
            addAnimation(elements.description, 'slide-in');
            addAnimation(elements.startBtn, 'pop-in');
        } else {
            // Animate mode selection screen
            addAnimation(document.querySelector('.title2'), 'fade-in');
            animateElements(elements.modeButtons, 'pop-in');
        }
    }, 300);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    // ถ้าอยู่ในหน้า Scrabble ให้สร้างเกม
    if (window.location.pathname.includes('scrabble_cw.html')) {
        const scrabbleBoard = new ScrabbleBoard();
        const letterRack = new LetterRack();

        // จัดการ Menu Button
        const menuBtn = document.getElementById('menuBtn');
        const menuButton = menuBtn.querySelector('.menu-button');
        const menuDropdown = menuBtn.querySelector('.menu-dropdown');
        const continueBtn = document.getElementById('continueBtn');
        const quitBtn = document.getElementById('quitBtn');

        // Toggle dropdown เมื่อคลิกปุ่ม Menu
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDropdown.classList.toggle('show');
        });

        // ปิด dropdown เมื่อคลิกที่อื่น
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && menuDropdown.classList.contains('show')) {
                menuDropdown.classList.remove('show');
            }
        });

        // จัดการปุ่ม Continue
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                menuDropdown.classList.remove('show');
            });
        }

        // จัดการปุ่ม Quit
        if (quitBtn) {
            quitBtn.addEventListener('click', () => {
                window.location.href = '../index.html';
            });
        }

        // ปิด dropdown เมื่อกด ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuDropdown.classList.contains('show')) {
                menuDropdown.classList.remove('show');
            }
        });
    }
    // ถ้าอยู่ในหน้าหลัก
    else if (elements.startBtn) {
        elements.startBtn.addEventListener('click', () => {
            showScreen(elements.selectMode, elements.container);
            setTimeout(() => {
                addAnimation(document.querySelector('.title2'), 'fade-in');
            }, 300);
        });
        
        // Initial animations for home screen
        addAnimation(elements.title, 'fade-in');
        setTimeout(() => addAnimation(elements.description, 'slide-in'), 200);
        setTimeout(() => addAnimation(elements.startBtn, 'pop-in'), 400);
        
        // Add event listeners
        elements.backBtn.addEventListener('click', () => goBack(elements.selectMode, elements.container));
        elements.backBtn2.addEventListener('click', () => goBack(elements.containerCategory, elements.selectMode));
        
        // Add click event for mode buttons
        elements.modeButtons.forEach(button => {
            button.addEventListener('click', showCategoryScreen);
        });
    }
});

//------------------------------- Scrabble Board -------------------------------

// ขนาดของตาราง Scrabble (15x15)
const BOARD_GRID_SIZE = 15;

// คูณคะแนนสำหรับช่องพิเศษ
const BOARD_MULTIPLIERS = {
    TRIPLE_WORD: 'TW',
    DOUBLE_WORD: 'DW',
    TRIPLE_LETTER: 'TL',
    DOUBLE_LETTER: 'DL'
};

// ตำแหน่งของช่องพิเศษบนกระดาน
const SPECIAL_SQUARES = {
    TW: [[0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14]],
    DW: [[1, 1], [1, 13], [2, 2], [2, 12], [3, 3], [3, 11], [4, 4], [4, 10],
         [10, 4], [10, 10], [11, 3], [11, 11], [12, 2], [12, 12], [13, 1], [13, 13]],
    TL: [[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5],
         [9, 9], [9, 13], [13, 5], [13, 9]],
    DL: [[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14],
         [6, 2], [6, 6], [6, 8], [6, 12], [7, 3], [7, 11],
         [8, 2], [8, 6], [8, 8], [8, 12], [11, 0], [11, 7], [11, 14],
         [12, 6], [12, 8], [14, 3], [14, 11]]
};

class ScrabbleBoard {
    constructor() {
        this.boardSize = BOARD_GRID_SIZE;
        this.createBoard();
        this.setupDragAndDrop();
    }

    createBoard() {
        const grid = document.querySelector('.scrabble-grid');
        if (!grid) return;

        // ล้างตารางเก่าถ้ามี
        grid.innerHTML = '';

        // สร้างเซลล์ใหม่
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;

                // ตั้งค่าช่องพิเศษ
                this.setSpecialCell(cell, i, j);

                grid.appendChild(cell);
            }
        }
    }

    setupDragAndDrop() {
        const cells = document.querySelectorAll('.scrabble-grid .cell');
        
        cells.forEach(cell => {
            cell.addEventListener('dragover', (e) => {
                e.preventDefault();
                cell.classList.add('drag-over');
            });

            cell.addEventListener('dragleave', () => {
                cell.classList.remove('drag-over');
            });

            cell.addEventListener('drop', (e) => {
                e.preventDefault();
                cell.classList.remove('drag-over');
                const letter = e.dataTransfer.getData('text');
                // ตรวจสอบว่าเซลล์ว่างหรือเป็นช่องเริ่มต้น
                if (!cell.querySelector('.tile')) {
                    const tile = document.createElement('div');
                    tile.className = 'tile';
                    tile.textContent = letter;
                    
                    // ถ้าเป็นช่องเริ่มต้น ให้ลบไอคอนดาวออกก่อน
                    const star = cell.querySelector('.fa-star');
                    if (star) {
                        star.remove();
                    }
                    
                    cell.appendChild(tile);
                }
            });
        });
    }

    setSpecialCell(cell, row, col) {
        // ตำแหน่งกลาง
        if (row === 7 && col === 7) {
            cell.classList.add('start');
            const star = document.createElement('i');
            star.className = 'fa-solid fa-star';
            cell.appendChild(star);
            return;
        }

        // ตั้งค่าช่องพิเศษอื่นๆ
        if (SPECIAL_SQUARES.TW.some(([r, c]) => r === row && c === col)) {
            cell.classList.add('tw');
            cell.dataset.multiplier = 'TW';
        }
        else if (SPECIAL_SQUARES.DW.some(([r, c]) => r === row && c === col)) {
            cell.classList.add('dw');
            cell.dataset.multiplier = 'DW';
        }
        else if (SPECIAL_SQUARES.TL.some(([r, c]) => r === row && c === col)) {
            cell.classList.add('tl');
            cell.dataset.multiplier = 'TL';
        }
        else if (SPECIAL_SQUARES.DL.some(([r, c]) => r === row && c === col)) {
            cell.classList.add('dl');
            cell.dataset.multiplier = 'DL';
        }
    }
}

// Letter data with scores
const LETTER_DATA = {
    'A': { score: 1, count: 9 },
    'B': { score: 3, count: 2 },
    'C': { score: 3, count: 2 },
    'D': { score: 2, count: 4 },
    'E': { score: 1, count: 12 },
    'F': { score: 4, count: 2 },
    'G': { score: 2, count: 3 },
    'H': { score: 4, count: 2 },
    'I': { score: 1, count: 9 },
    'J': { score: 8, count: 1 },
    'K': { score: 5, count: 1 },
    'L': { score: 1, count: 4 },
    'M': { score: 3, count: 2 },
    'N': { score: 1, count: 6 },
    'O': { score: 1, count: 8 },
    'P': { score: 3, count: 2 },
    'Q': { score: 10, count: 1 },
    'R': { score: 1, count: 6 },
    'S': { score: 1, count: 4 },
    'T': { score: 1, count: 6 },
    'U': { score: 1, count: 4 },
    'V': { score: 4, count: 2 },
    'W': { score: 4, count: 2 },
    'X': { score: 8, count: 1 },
    'Y': { score: 4, count: 2 },
    'Z': { score: 10, count: 1 }
};

class LetterRack {
    constructor() {
        this.rack = document.getElementById('letter-rack');
        this.letters = [];
        this.maxLetters = 7;  // จำนวนตัวอักษรสูงสุด
        this.setupButtons();
        this.fillRack();
    }

    setupButtons() {
        document.getElementById('shuffleBtn').addEventListener('click', () => this.shuffleLetters());
        document.getElementById('refreshBtn').addEventListener('click', () => this.refreshLetters());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearRack());
    }

    createLetterTile(letter) {
        const tile = document.createElement('div');
        tile.className = 'letter-tile';
        tile.draggable = true;
        tile.textContent = letter;
        
        const score = document.createElement('span');
        score.className = 'score';
        score.textContent = LETTER_DATA[letter].score;
        tile.appendChild(score);

        // Drag events
        tile.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', letter);
            tile.classList.add('dragging');
        });

        tile.addEventListener('dragend', () => {
            tile.classList.remove('dragging');
        });

        return tile;
    }

    getRandomLetter() {
        const letters = [];
        for (const [letter, data] of Object.entries(LETTER_DATA)) {
            for (let i = 0; i < data.count; i++) {
                letters.push(letter);
            }
        }
        return letters[Math.floor(Math.random() * letters.length)];
    }

    fillRack() {
        // เคลียร์ตัวอักษรเก่าก่อน
        this.clearRack();
        
        // เพิ่มตัวอักษรใหม่จนครบ 7 ตัว
        while (this.letters.length < this.maxLetters) {
            const letter = this.getRandomLetter();
            this.letters.push(letter);
        }
        
        // อัพเดทการแสดงผล
        this.updateRackDisplay();
    }

    refreshLetters() {
        // เคลียร์และเติมตัวอักษรใหม่
        this.clearRack();
        this.fillRack();
    }

    clearRack() {
        this.letters = [];
        this.rack.innerHTML = '';
    }

    updateRackDisplay() {
        this.rack.innerHTML = '';
        // แสดงเฉพาะ 7 ตัวแรก
        this.letters.slice(0, this.maxLetters).forEach(letter => {
            const tile = this.createLetterTile(letter);
            this.rack.appendChild(tile);
        });
    }

    shuffleLetters() {
        // สลับตำแหน่งตัวอักษร
        for (let i = this.letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.letters[i], this.letters[j]] = [this.letters[j], this.letters[i]];
        }
        // อัพเดทการแสดงผล
        this.updateRackDisplay();
    }
}

// Background Animation
class BackgroundAnimation {
    constructor() {
        this.container = document.querySelector('.background-animation');
        this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.maxLetters = 15;  
        this.createInterval = null;
        this.init();
    }

    init() {
        if (!this.container) return;
        
        // Clear existing content
        this.container.innerHTML = '';
        
        // Create initial letters with delay
        for (let i = 0; i < this.maxLetters; i++) {
            setTimeout(() => {
                this.createLetter();
            }, i * 300);  
        }

        // Start creating new letters with longer interval
        this.createInterval = setInterval(() => {
            if (this.container.children.length < this.maxLetters) {
                this.createLetter();
            }
        }, 1000);  
    }

    createLetter() {
        if (!this.container) return;

        const letter = document.createElement('div');
        letter.className = 'bg-letter';
        
        // Random letter
        letter.textContent = this.letters[Math.floor(Math.random() * this.letters.length)];
        
        // Random position with margin from edges
        letter.style.left = `${10 + Math.random() * 80}%`;  
        
        // Random size with more medium letters
        const rand = Math.random();
        if (rand < 0.7) {  
            letter.classList.add('medium');
        } else if (rand < 0.85) {  
            letter.classList.add('small');
        } else {  
            letter.classList.add('large');
        }
        
        this.container.appendChild(letter);
        
        // Remove when animation ends
        letter.addEventListener('animationend', () => {
            if (letter.parentNode === this.container) {
                this.container.removeChild(letter);
            }
        });
    }

    stop() {
        if (this.createInterval) {
            clearInterval(this.createInterval);
            this.createInterval = null;
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const scrabbleBoard = new ScrabbleBoard();
    const letterRack = new LetterRack();
    const bgAnimation = new BackgroundAnimation();

    // Stop animation when start button is clicked
    const startBtn = document.querySelector('#startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            bgAnimation.stop();
        });
    }
});
