"use strict";

const $blur = document.querySelector(".blur");
const $addBtn = document.querySelector(".fi-rr-add");
const $addBox = document.querySelector(".add--box");
const $sendReq = document.querySelector(".add-btn");
const $nameInput = document.querySelector(".add-name");
const $duratInput = document.querySelector(".add-duration");
const $dateInput = document.querySelector(".add-date");

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

$sendReq.addEventListener("click", async () => {
  const name = $nameInput.value;
  const duration = $duratInput.value;
  const date = new Date($dateInput.value).getTime();

  const response = await fetch("http://localhost:3000/training", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, duration, date }),
  });

  if (response.ok) {
  }

  $blur.click();
});
