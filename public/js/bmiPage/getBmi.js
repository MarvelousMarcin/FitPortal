"use strict";

const $bmiVal = document.querySelector(".bmi--value");
const $bmiStatus = document.querySelector(".bmi--status");
const $bmiTips = document.querySelector(".bmi--tip");

const loadBmiInfo = async () => {
  const response = await fetch("http://localhost:3000/bmiValue");
  const data = await response.json();

  $bmiVal.textContent = data.bmi;
  $bmiStatus.textContent = data.status;
  $bmiTips.textContent = data.tip;
};

loadBmiInfo();
