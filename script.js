
async function mainApp() {
    const wordsList = ['SPACE', 'SPADE', 'SAKIL', 'TROLY', 'NEVER', 'BOOBS'];
    // const wordsList = ['SAKIL'];
    const buttons = document.querySelectorAll('.btn');
    const backspace = document.querySelector('.backspace');
    const submit = document.querySelector('.submit');
    const announcement = document.querySelector('.announcement');
    let word = '';
    let wordLength = 0;
    let rowNumber = 1;
    let columNumber = 1;
    let correctWord = getRandomWord(wordsList);
    console.log(correctWord);


    function getRandomWord(wordsList) {
        let randomIndex = Math.floor(Math.random() * wordsList.length);
        return wordsList[randomIndex];
    }

    function updateWord(letter) {
        let className = 'value' + rowNumber + columNumber;
        document.querySelector(`.${className}`).innerHTML = letter;
        columNumber++;
        wordLength++;
    }

    function matchWord(word, correctWord) {
        if (word == correctWord) {
            return true;
        }
    }

    function backspaceOne() {
        word = word.slice(0, -1);
        columNumber--;
        wordLength--;
        let className = 'value' + rowNumber + columNumber;
        document.querySelector(`.${className}`).innerHTML = '';
    }

    function updatePlaceholderColor() {
        for (i = 1; i < 6; i++) {
            let className = 'value' + rowNumber + i;
            let element = document.querySelector(`.${className}`);
            if (element) {
                element.style.backgroundColor = 'rgb(52, 106, 52)';
            } else {
                console.error('Element with class', className, 'not found');
            }
        }
    }

    function unMatchedColorUpdate() {
        console.log("donotmatched activated...");
        correctWord;
        word;
        correctLetters = [];
        for (i = 0; i < 5; i++) {
            correctLetters[i] = correctWord[i];
        }
        console.log(correctLetters);
        for (i = 0; i < 5; i++) {
            if (word[i] == correctWord[i]) {
                let className = 'value' + rowNumber + parseInt(i + 1);
                let element = document.querySelector(`.${className}`);
                if (element) {
                    element.style.backgroundColor = '#133A18';
                } else {
                    console.error('Element with class', className, 'not found');
                }
            }
            else if (correctLetters.includes(word[i])) {
                let className = 'value' + rowNumber + parseInt(i + 1);
                let element = document.querySelector(`.${className}`);
                if (element) {
                    element.style.backgroundColor = '#FFDD36';
                } else {
                    console.error('Element with class', className, 'not found');
                }
            }
            else {
                let className = 'value' + rowNumber + parseInt(i + 1);
                let element = document.querySelector(`.${className}`);
                if (element) {
                    element.style.backgroundColor = '#C61A09';
                } else {
                    console.error('Element with class', className, 'not found');
                }
            }
        }
    }

    async function donNotMatched() {
        console.log("Do not matched");
        await unMatchedColorUpdate();
        announcement.innerHTML = 'Not Matched.Try Next One...'
        rowNumber++;
        word = '';
        wordLength = 0;
        columNumber = 1;
    }

    async function notEnough() {
        announcement.innerHTML = 'Not Enough Letters...'
        await new Promise(resolve => setTimeout(resolve, 500));
        announcement.innerHTML = 'Guess The Word...'
    }

    async function tooManyLetters() {
        announcement.innerHTML = 'Too Many Letters...'
        await new Promise(resolve => setTimeout(resolve, 500));
        announcement.innerHTML = 'Guess The Word...'
    }
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (wordLength < 6) {
                letter = button.value;
                word += letter;
                updateWord(letter);
            }
            else {
                tooManyLetters();
            }
        })
    })

    if (backspace) {
        backspace.addEventListener('click', () => {
            backspaceOne();
        })
    }

    if (submit) {
        submit.addEventListener('click', () => {
            if (wordLength == 5) {
                if (matchWord(word, correctWord)) {
                    announcement.innerHTML = 'You Win...'
                    updatePlaceholderColor();
                }
                else {
                    donNotMatched();
                }
            }
            else {
                notEnough();
            }
        })
    }
    document.addEventListener('keydown', (event) => {

        let letter = event.key.toUpperCase();
        if (['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'].includes(letter)) {
            if (wordLength <= 4) {
                word += letter;
                updateWord(letter);
            }
            else{
                console.log("exsess");
                tooManyLetters();
            }
        }

        else if (letter === 'ENTER') {
            if (wordLength == 5) {
                if (matchWord(word, correctWord)) {
                    announcement.innerHTML = 'You Win...'
                    updatePlaceholderColor();
                }
                else {
                    donNotMatched();
                }
            }
            else {
                notEnough();
            }
        }

        else if (letter === 'BACKSPACE') {
            backspaceOne();
        }
    });

}

mainApp();
