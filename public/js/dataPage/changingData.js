"use strict";

const $editButton = document.querySelector(".setting");
const $inputs = document.querySelectorAll(".data--input--value");
const $saveBtn = document.querySelector(".data--save");
const $heigthInput = document.querySelector(".heigth");
const $weigthInput = document.querySelector(".weigth");
const $ageInput = document.querySelector(".age");

$editButton.addEventListener("click", () => {
  $inputs.forEach((input) => {
    if (input.disabled == true) {
      input.disabled = false;
      input.style.color = "#e3647d";
      $saveBtn.style.opacity = "1";
    } else {
      input.disabled = true;
      input.style.color = "#42bdb3";
      $saveBtn.style.opacity = "0";
    }
  });
});

$inputs.forEach((input) => {
  const ending = input.value.slice(input.value.length - 2);

  input.addEventListener("focusin", () => {
    input.value = input.value.replace(ending, "");
  });

  input.addEventListener("focusout", () => {
    input.value = input.value + ending;
  });
});

$saveBtn.addEventListener("click", async () => {
  const heigth = Number(removeEnding($heigthInput.value));
  const weigth = Number(removeEnding($weigthInput.value));
  const age = Number(removeEnding($ageInput.value));

  const reqBody = { heigth, weigth, age, sex: "Male" };

  const response = await fetch("http://localhost:3000/data", {
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
