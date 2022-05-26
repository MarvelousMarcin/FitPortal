"use strict";

const $editButton = document.querySelector(".setting");
const $inputs = document.querySelectorAll(".data--input--value");
const $saveBtn = document.querySelector(".data--save");
const $heigthInput = document.querySelector(".heigth");
const $weigthInput = document.querySelector(".weigth");
const $ageInput = document.querySelector(".age");
const $sexInput = document.querySelector(".data--input--value--sex");
const $infoBtn = document.querySelector(".info");
const $infoBox = document.querySelector(".info--box");
const $infoPopup = document.querySelector(".info--popup");
const $hideInfo = document.querySelector(".info--hide");

const loadData = async () => {
  const response = await fetch("http://localhost:3000/dataValue");
  const data = await response.json();
  if (!data.message) {
    $heigthInput.value = data.heigth + "cm";
    $weigthInput.value = data.weigth + "kg";
    $ageInput.value = data.age + "yo";
    $sexInput.value = data.sex;
  } else {
    $heigthInput.value = "cm";
    $weigthInput.value = "kg";
    $ageInput.value = "yo";
    $sexInput.value = "";
  }

  $inputs.forEach((input) => {
    const ending = input.value.slice(input.value.length - 2);

    input.addEventListener("focusin", () => {
      input.value = input.value.replace(ending, "");
    });

    input.addEventListener("focusout", () => {
      input.value = input.value + ending;
    });
  });
};

loadData();

$editButton.addEventListener("click", (e) => {
  e.preventDefault();
  $inputs.forEach((input) => {
    if (input.disabled == true) {
      input.disabled = false;
      $sexInput.style.color = "#e3647d";
      input.style.color = "#e3647d";
      $saveBtn.style.opacity = "1";
    } else {
      input.disabled = true;
      input.style.color = "#42bdb3";
      $sexInput.style.color = "#42bdb3";
      $saveBtn.style.opacity = "0";
    }
  });
});

$saveBtn.addEventListener("click", async () => {
  const heigth = Number(removeEnding($heigthInput.value));
  const weigth = Number(removeEnding($weigthInput.value));
  const age = Number(removeEnding($ageInput.value));
  const sex = $sexInput.value;

  let shouldEnd = false;

  if (!heigth) {
    $heigthInput.value = "cm";
    shouldEnd = true;
  }
  if (!weigth) {
    $weigthInput.value = "kg";
    shouldEnd = true;
  }
  if (!age) {
    $ageInput.value = "yo";
    shouldEnd = true;
  }

  if (shouldEnd === true) {
    return;
  }

  const reqBody = { heigth, weigth, age, sex };
  console.log(reqBody);

  await fetch("http://localhost:3000/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  $editButton.click();
});

function removeEnding(word) {
  return word.slice(0, word.length - 2);
}

$sexInput.closest(".data--sex").addEventListener("click", () => {
  if ($saveBtn.style.opacity === "1") {
    console.log("test");
    if ($sexInput.value === "Male") {
      $sexInput.value = "Female";
    } else {
      $sexInput.value = "Male";
    }
  }
});

$infoBtn.addEventListener("click", () => {
  $infoBox.style.opacity = "0.8";
  $infoBox.style.zIndex = "4";
  $infoPopup.style.transform = "scale(1)";
});

$hideInfo.addEventListener("click", () => {
  $infoBox.style.opacity = "0";
  $infoBox.style.zIndex = "-4";
  $infoPopup.style.transform = "scale(0)";
});
