let NumberField = document.getElementById("NumberField");
let submitButton = document.getElementById("SubmitButton");
let CorrectNumber = Math.floor(Math.random()*3);
let TryDisplay = document.getElementById('TryCounter')

function GuessingTheNumber(){
    let UserNumber = NumberField.value;
    if (UserNumber == CorrectNumber ){
        console.log("You have guess the correct Number!");
    }
    else {
        console.log('Oh no! This was an incorrect number, please try again!');
    }};

function IncrementTries(){
    let CurrentTry = parseInt(TryDisplay.textContent);
    let UpdatedTry = CurrentTry + 1;
    TryDisplay.textContent = UpdatedTry;

};
submitButton.addEventListener("click", function () {
    GuessingTheNumber();
    IncrementTries();
})


