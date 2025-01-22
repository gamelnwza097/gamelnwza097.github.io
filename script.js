const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');

// รายการอิโมจิผลไม้
const allImages = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥭', '🥝', '🍉', '🍑'];

let flippedCards = [];
let matchedCards = 0;
let score = 0;
let selectedImages = [];
let isGameActive = false; // ตัวแปรบ่งชี้ว่าเกมเริ่มแล้ว

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function getRandomImages(numPairs) {
    const shuffled = [...allImages].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numPairs);
    return [...selected, ...selected];
}

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = image;
    
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    
    card.dataset.image = image;
    
    // เช็คว่าเกมเริ่มแล้วหรือยัง
    card.addEventListener('click', () => {
        if (!isGameActive || card.classList.contains('flipped') || flippedCards.length >= 2) return;
        flipCard(card);
    });

    return card;
}

function flipCard(card) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.image === card2.dataset.image;

    if (isMatch) {
        matchedCards += 2;
        score += 10; // เพิ่มคะแนนเมื่อจับคู่ถูกต้อง
        flippedCards = [];

        if (matchedCards === selectedImages.length) {
            setTimeout(() => alert(`คุณชนะแล้ว! คะแนนรวม: ${score}`), 500);
        }
    } else {
        score -= 5; // ลดคะแนนเมื่อจับคู่ผิด
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }

    updateScore();
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function initGame() {
    const numPairs = 6; // จำนวนคู่ของการ์ดที่ต้องการ
    selectedImages = getRandomImages(numPairs);
    const shuffledImages = shuffle(selectedImages);

    // สร้างการ์ด
    shuffledImages.forEach(image => {
        const card = createCard(image);
        gameBoard.appendChild(card);
    });

    updateScore();

    // ทำให้ผลไม้ทั้งหมดปรากฏในช่วงเริ่มต้น
    setTimeout(() => {
        // เมื่อครบเวลาแล้ว ให้หมุนการ์ดทั้งหมดกลับ
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.add('flipped'));

        // หลังจากแสดงการ์ดทั้งหมดแล้ว ค่อยหมุนการ์ดกลับ
        setTimeout(() => {
            allCards.forEach(card => card.classList.remove('flipped'));
            isGameActive = true; // เปิดให้คลิกการ์ดหลังจากปิดการ์ดหมดแล้ว
        }, 1000); // ปิดการ์ดหลังจากแสดงผล 1 วินาที
    }, 2000); // แสดงผลไม้ทั้งหมด 2 วินาทีหลังจากเริ่มเกม
}

initGame();
