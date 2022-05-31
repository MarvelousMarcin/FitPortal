"use strict";

const $bmiVal = document.querySelector(".bmi--value");
const $bmiStatus = document.querySelector(".bmi--status");
const $bmiTips = document.querySelector(".bmi--tip");
const $pic = document.querySelectorAll(".info--img");

const loadBmiInfo = async () => {
  const response = await fetch(
    "https://fit-portal-project.herokuapp.com/bmiValue"
  );
  const data = await response.json();

  console.log(data);
  if (data.status === "error") {
    return ($bmiVal.textContent = "You have to fill your data");
  }

  $bmiVal.textContent = data.bmi;
  $bmiStatus.textContent = data.status;
  $bmiTips.textContent = data.tip;
};

loadBmiInfo();
