console.log("I am running...");

const buttons = document.querySelectorAll('.btn');
let word = '';
let rowNumber = 1;
let columNumber = 1;

buttons.forEach(button =>{
    button.addEventListener('click', ()=>{
        letter = button.value;
        word += letter;
        updateWord(word, letter);
    })
})

function updateWord(word, letter){
    let className = 'value'+rowNumber+columNumber;
    console.log(className);
    document.querySelector(`.${className}`).innerHTML = letter;
    columNumber++;
}