(function(){
    const game = document.querySelector('.game');
    const areas = Array.from(document.querySelectorAll('.area'));
    const winningScreen = document.querySelector(".winner-screen");
    const winningMessage = document.querySelector(".winner-message");
    const restartButton = document.querySelector(".restart-game-button");
    const muteButton = document.querySelector("#mute-unmute-button");

    muteButton.onclick = handleClickAudio;
    restartButton.onclick = startGame;

    const CIRCLE_CLASS = 'circle';
    const X_CLASS = 'x';
    const WINNING_COMBINATIONS = [
        [0, 4, 8],
        [2, 4, 6],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ]
    const CLICK_AUDIO = 'audio/click.mp3';
    const WIN_AUDIO = 'audio/win.mp3';

    startGame();

    var circleTurn = false;
    var gameMuted = false;

    function handleClickAudio() {
        muteButton.classList.remove('fa-volume-up');
        muteButton.classList.remove('fa-volume-off');
        gameMuted = !gameMuted;
        if(gameMuted) return muteButton.classList.add('fa-volume-off');
        else  return muteButton.classList.add('fa-volume-up');
    }
    function playClickNoise() {
        if(!gameMuted) new Audio(CLICK_AUDIO).play();
    }
    function playWinNoise() {
        if(!gameMuted) new Audio(WIN_AUDIO).play();
    }
    function startGame() {
        circleTurn = false;
        setGameHoverClass();

        areas.forEach(area => {
            area.classList.remove(X_CLASS);
            area.classList.remove(CIRCLE_CLASS);
            area.addEventListener('click', handleClick, {once: true});
        });

        winningScreen.classList.remove('show');
    }

    function handleClick(e) {
        const area = e.target
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        playClickNoise();
        placeMark(area, currentClass);
        if(checkWin(currentClass)) return endGame(currentClass);
        else if(isDraw()) return endGame(false);
    }

    function placeMark(element, className) {
        element.classList.add(className);
        changeTurn();
    }

    function changeTurn() {
        circleTurn = !circleTurn;
        setGameHoverClass();
    }
    function setGameHoverClass() {
        game.classList.remove(X_CLASS);
        game.classList.remove(CIRCLE_CLASS);

        if(circleTurn) game.classList.add(CIRCLE_CLASS);
        else game.classList.add(X_CLASS);
    }
    function checkWin(className) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return areas[index].classList.contains(className);
            });
        });
    }
    function isDraw() {
        return areas.every(area => {
            return area.classList.contains(X_CLASS) || area.classList.contains(CIRCLE_CLASS);
        });
    }
    function endGame(className) {
        playWinNoise();
        if(className) {
            winningMessage.innerText = `${className.toUpperCase()}'S  WIN`;
        } else {
            winningMessage.innerText = `DRAW`
        }

        winningScreen.classList.add('show');
    }
}());