"use strict";

const $blur = document.querySelector(".blur");
const $addBtn = document.querySelector(".fi-rr-add");
const $addBox = document.querySelector(".add--box");

$addBtn.addEventListener("click", () => {
  $addBox.style.transform = "scale(1)";
  $blur.style.opacity = ".7";
  $blur.style.zIndex = "4";
});

$blur.addEventListener("click", () => {
  $addBox.style.transform = "scale(0)";
  $blur.style.opacity = "0";
  $blur.style.zIndex = "-3";
});
