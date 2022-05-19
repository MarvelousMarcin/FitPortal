"use strict";

const $bmiVal = document.querySelector(".bmi--value");
const $bmiStatus = document.querySelector(".bmi--status");
const $bmiTips = document.querySelector(".bmi--tip");
const $pic = document.querySelectorAll(".info--img");
const $picSection = document.querySelector(".footer--section");

const loadBmiInfo = async () => {
  const response = await fetch("http://localhost:3000/bmiValue");
  const data = await response.json();

  $bmiVal.textContent = data.bmi;
  $bmiStatus.textContent = data.status;
  $bmiTips.textContent = data.tip;
};

const showPic = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  $pic.forEach((pic) => (pic.style.transform = "scale(1)"));
};

const picObserver = new IntersectionObserver(showPic, {
  root: null,
  threshold: 0.6,
});

picObserver.observe($picSection);

loadBmiInfo();
