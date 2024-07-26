const inputSlider = document.querySelector("[data-lengthSlider]");
const length = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "~`!@#$%^&*()_+{}[]|:;<,>.?/";
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
function handleSlider() {
  inputSlider.value = passwordLength;
  length.innerText = passwordLength;
}
function setIndicator(color) {
  indicator.style.background = color;
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomNumber() {
  return getRndInteger(0, 9);
}
function generateLowercase() {
  return String.fromCharCode(getRndInteger(97, 123));
}
function generateUppercase() {
  return String.fromCharCode(getRndInteger(65, 91));
}
function generateSymbol() {
  const randNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randNum);
}
function shufflePassword(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    //swapping
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((data) => {
    str = str + data;
  });
  return str;
}
function calcStrength() {
  let hasUppercase = false;
  let hasLowercase = false;
  let hasNumbers = false;
  let hasSymbol = false;

  if (uppercaseCheck.checked) hasUppercase = true;
  if (lowercaseCheck.checked) hasLowercase = true;
  if (numbersCheck.checked) hasNumbers = true;
  if (symbolCheck.checked) hasSymbol = true;

  if (
    hasUppercase &&
    hasLowercase &&
    (hasNumbers || hasSymbol) &&
    passwordLength >= 8
  ) {
    const val=document.querySelector(".display-container")
    val.style.borderColor="green"
  } else if (
    (hasLowercase || hasUppercase) &&
    (hasNumbers || hasSymbol) &&
    passwordLength >= 6
  ) {
    const val=document.querySelector(".display-container")
    val.style.borderColor="yellow"
  } else {
    const val=document.querySelector(".display-container")
    val.style.borderColor="red"
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "failed";
  }
  copyMsg.classList.add("active");
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});
copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyContent();
  }
});

function handleCheckBox() {
  checkCount = 0;
  allCheckBox.forEach((checkBox) => {
    if (checkBox.checked == 1) checkCount++;
  });

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}
allCheckBox.forEach((checkBox) => {
  checkBox.addEventListener("change", handleCheckBox);
});

generateBtn.addEventListener("click", () => {
  if (checkCount <= 0) return;
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  //create new password

  //remove old password
  password = "";

  //put the checked getcharacter fun in an array
  let funArray = [];
  if (uppercaseCheck.checked) {
    funArray.push(generateUppercase);
  }
  if (lowercaseCheck.checked) {
    funArray.push(generateLowercase);
  }
  if (numbersCheck.checked) {
    funArray.push(getRandomNumber);
  }
  if (symbolCheck.checked) {
    funArray.push(generateSymbol);
  }
  for (let i = 0; i < funArray.length; i++) {
    password += funArray[i]();
  }
  for (let i = 0; i < passwordLength - funArray.length; i++) {
    let randIndex = getRndInteger(0, funArray.length);
    password += funArray[randIndex]();
  }

  //shuffle the password
  password = shufflePassword(Array.from(password));

  passwordDisplay.value = password;
  //calculate strength
  calcStrength();
});
