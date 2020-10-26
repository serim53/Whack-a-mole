const holes = document.querySelectorAll('.hole');   //구멍
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');   //두더지
let lastHole;
let timeUp = false; //시간을 정해두고 게임
let score = 0;

function randTime(min, max) {   //랜덤타임을 반환
    return Math.round(Math.random() *(max-min) + min) // Math.random은 0과 1사이의 값을 랜덤으로 가져오는 함수.
                                                        // min과 max 사이의 값을 랜덤으로 가져옴.
}

function randHole(holes) {
    const randIndex = Math.floor(Math.random() *holes.length)
    const hole = holes[randIndex]
    if(hole === lastHole){  //이전 구멍과 현재 구명이 같을 경우 다시 랜덤으로 구멍을 가져옴
        return randHole(holes)
    }

    lastHole = hole;
    return hole;
}

function peep() {
    const time = randTime(1000, 2000)
    const hole = randHole(holes)
    hole.classList.add('up')

    setTimeout(() => {
        hole.classList.remove('up')
        if(!timeUp){
            peep()
        }
    }, time)
}

function startGame() {
    scoreBoard.textContent = 0  // html에 렌더링해줄 score
    score = 0   //javascript 내의 score
    timeUp = false
    peep()

    setTimeout(() => timeUp = true, 10000) // 10초가 지나면 timeUp이 false가 되고 게임이 끝남. // 두더지 게임 진행 시간
}

function bonk(e) {

    if(!e.isTrusted) return // 신뢰성 검사
    this.classList.remove('up')
    score++
    scoreBoard.textContent = score
}

moles.forEach(mole => mole.addEventListener('click', bonk));