const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');

window.onload = function() {
    Swal.fire({
        title: 'แจ้งเตือน!',
        text: 'ยังไม่ชำระเงินสำหรับเว็บไซต์นี้ โปรดชำระเงินหรือติดต่อ ig: p.spn_',
        icon: 'warning',
        confirmButtonText: 'ตกลง',
        footer: '<a href="https://www.instagram.com/p.spn_" target="_blank">นำทางไป Instagram</a>'
    });
};

// รายการอิโมจิผลไม้พร้อมชื่อ
const allImages = [
    {imageUrl: '/img/Motherboard.png', name: 'mother board'},
    {imageUrl: '/img/RTX.png', name: 'gpu'},
    {imageUrl: '/img/cpu.png', name: 'cpu'},
    {imageUrl: '/img/mouse.png', name: 'mouse'},
    {imageUrl: '/img/ram.png', name: 'ram'},
    {imageUrl: '/img/screen.png', name: 'monitor'}
];

let flippedCards = [];
let matchedCards = 0;
let score = 0;
let selectedImages = [];
let isGameActive = false;

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function getRandomImages(numPairs) {
    const shuffled = [...allImages].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numPairs);
    return [...selected, ...selected];
}

function createCard(imageObj) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    
    // เพิ่มรูปภาพ
    const img = document.createElement('img');
    img.src = imageObj.imageUrl;
    img.alt = imageObj.name;
    img.classList.add('assets-img');
    
    // เพิ่มชื่อผลไม้
    const fruitName = document.createElement('div');
    fruitName.textContent = imageObj.name;
    fruitName.classList.add('assets-name');
    
    // ใส่รูปภาพและชื่อผลไม้ใน cardBack
    cardBack.appendChild(img);
    cardBack.appendChild(fruitName);
    
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    
    card.dataset.image = imageObj.imageUrl; // ใช้ URL รูปภาพเป็นตัวอ้างอิง
    
    card.addEventListener('click', () => {
        if (!isGameActive || card.classList.contains('flipped') || flippedCards.length >= 2) return;
        flipCard(card);
    });

    return card;
}

// ส่วนที่เหลือของโค้ดยังคงเดิม
function flipCard(card) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function resetGame() {
    // ล้างบอร์ดเกมและรีเซ็ตตัวแปร
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = 0;
    score = 0;
    isGameActive = false;

    // เริ่มเกมใหม่
    Swal.fire({
        title: 'แจ้งเตือน!',
        text: 'ยังไม่ชำระเงินสำหรับเว็บไซต์นี้ โปรดชำระเงินหรือติดต่อ ig: p.spn_',
        icon: 'warning',
        confirmButtonText: 'ตกลง',
        footer: '<a href="https://www.instagram.com/p.spn_" target="_blank">นำทางไป Instagram</a>'
    });
    initGame();
}


function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.image === card2.dataset.image;

    if (isMatch) {
        matchedCards += 2;
        score += 10;
        flippedCards = [];

        if (matchedCards === selectedImages.length) {
            setTimeout(() => {
                Swal.fire({
                    title: 'คุณชนะแล้ว!',
                    text: `คะแนนรวมของคุณคือ ${score}`,
                    icon: 'success',
                    confirmButtonText: 'เล่นอีกครั้ง',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.isConfirmed) {
                        resetGame(); // เรียกฟังก์ชันเพื่อเริ่มเกมใหม่
                    }
                });
            }, 500);
        }
    } else {
        score -= 5;
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
    const numPairs = 6;
    selectedImages = getRandomImages(numPairs);
    const shuffledImages = shuffle(selectedImages);

    shuffledImages.forEach(imageObj => {
        const card = createCard(imageObj);
        gameBoard.appendChild(card);
    });

    updateScore();

    setTimeout(() => {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.add('flipped'));

        setTimeout(() => {
            allCards.forEach(card => card.classList.remove('flipped'));
            isGameActive = true;
        }, 1800);
    }, 1500);
}

initGame();