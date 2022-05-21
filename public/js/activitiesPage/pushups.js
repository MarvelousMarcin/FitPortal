"use strict";

const $pushupsActiv = document.querySelectorAll(".push--elem");
const $allAccept = document.querySelectorAll(".fi-br-check");

const showAccept = function () {};

$pushupsActiv.forEach((activ, counter) => {
  activ.addEventListener("click", () => {
    const check = $allAccept.item(counter);
    if (check.style.transform === "scale(1)") {
      check.style.transform = "scale(0)";
      activ.style.border = "7px solid #42bdb3";
    } else {
      check.style.transform = "scale(1)";
      activ.style.border = "7px solid #e3647d";
    }
  });
});
