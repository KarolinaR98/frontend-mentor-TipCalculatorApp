const billInput = document.getElementById("bill");
const tipButtons = document.getElementsByClassName("btn");
const customTipInput = document.getElementById("custom-tip");
const numOfPeopleInput = document.getElementById("num-of-people");
const errorMsg = document.querySelector(".error-msg");
const tipPerPerson = document.querySelector(".amountPerPerson");
const totalPerPerson = document.querySelector(".totalPerPerson");
const resetButton = document.querySelector(".btn-reset");

let billAmount = 0;
let tipPercentage = 0;
let numOfPeople = 0;
let finalTipPerPerson = 0;
let finalPerPerson = 0;


const onBillChange = (e) => {

    billAmount = e.target.value;
    unlockResetButton();
    calculateTipAndTotalAmount();
}

const resetSelectedFromButtons = () => {

    const tipButtons = document.getElementsByClassName("btn");

    for (let i = 0; i < tipButtons.length; i++) {
        if (tipButtons[i].classList.contains("selected")) {
            tipButtons[i].classList.remove("selected");
        }
    }
}

const resetSelectedFormInput = () => {

    const customTipInput = document.getElementById("custom-tip");

    if (customTipInput.classList.contains("selected")) {
        customTipInput.classList.remove("selected");
        customTipInput.value = "";
    }
}

const selectTipFromButton = (e) => {

    resetSelectedFromButtons();
    resetSelectedFormInput();
    e.target.classList.add("selected");

    let value = e.target.innerText.replace("%", "")
    tipPercentage = Number(value);
    unlockResetButton();
    calculateTipAndTotalAmount();
}

const selectTipFromInput = (e) => {

    resetSelectedFromButtons();
    e.target.classList.add("selected");

    tipPercentage = e.target.value;
    unlockResetButton();
    calculateTipAndTotalAmount();
}

const onNumOfPeopleChange = (e) => {

    numOfPeople = e.target.value;
    unlockResetButton();
    calculateTipAndTotalAmount();
}

const checkNumOfPeople = (e) => {

    if (numOfPeople == 0) {
        errorMsg.innerText = "Can't be zero";
        e.target.classList.add('error');
        unlockResetButton();
    }
}

const reserErrorMsg = () => {

    const numOfPeopleInput = document.getElementById("num-of-people");

    if (numOfPeopleInput.classList.contains('error')) {
        errorMsg.innerText = "";
        numOfPeopleInput.classList.remove('error');
    }

}

const unlockResetButton = () => {

    const resetButton = document.querySelector(".btn-reset");
    const numOfPeopleInput = document.getElementById("num-of-people");

    if (billAmount !== 0 || tipPercentage !== 0 || numOfPeople !== 0
        || numOfPeopleInput.classList.contains("error")) {
        if (resetButton.classList.contains("disabled")) {
            resetButton.classList.remove("disabled");
        }
    }
}


const calculateTipAndTotalAmount = () => {

    billAmount = Number(billAmount);
    tipPercentage = Number(tipPercentage);
    numOfPeople = Number(numOfPeople);

    console.log(billAmount, tipPercentage, numOfPeople);

    if (billAmount > 0 && tipPercentage > 0 && numOfPeople > 0) {
        let totalTip = (billAmount * (0.01 * tipPercentage));
        let totalBill = billAmount + totalTip;

        finalTipPerPerson = parseFloat(totalTip / numOfPeople).toFixed(2);
        finalPerPerson = parseFloat(totalBill / numOfPeople).toFixed(2);

        tipPerPerson.innerText = "$" + finalTipPerPerson;
        totalPerPerson.innerText = "$" + finalPerPerson;


    } else {
        tipPerPerson.innerText = "$0.00";
        totalPerPerson.innerText = "$0.00";

    }
}


const resetApp = (e) => {

    billInput.value = "";
    resetSelectedFromButtons();
    resetSelectedFormInput();
    numOfPeopleInput.value = "";
    reserErrorMsg();
    e.target.classList.add("disabled");

    tipPerPerson.innerText = "$0.00";
    totalPerPerson.innerText = "$0.00";

    billAmount = 0;
    tipPercentage = 0;
    numOfPeople = 0;
    finalTipPerPerson = 0;
    finalPerPerson = 0;
}

billInput.addEventListener("input", onBillChange);

for (let i = 0; i < tipButtons.length; i++) {
    tipButtons[i].addEventListener('click', selectTipFromButton);
}

customTipInput.addEventListener("input", selectTipFromInput);

numOfPeopleInput.addEventListener("input", onNumOfPeopleChange);
numOfPeopleInput.addEventListener("focusout", checkNumOfPeople);
numOfPeopleInput.addEventListener("click", reserErrorMsg);
resetButton.addEventListener('click', resetApp);

