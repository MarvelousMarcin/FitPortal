"use strict";

const $pushupsActiv = document.querySelectorAll(".push--elem");
const $allAccept = document.querySelectorAll(".fi-br-check");
let doneDays = [];

const loadDoneActivities = async function () {
  const response = await fetch("http://localhost:3000/activitieslist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "squats" }),
  });
  doneDays = await response.json();

  addListners(doneDays);
};

loadDoneActivities();

const addListners = function (doneDays) {
  $pushupsActiv.forEach((activ, counter) => {
    const check = $allAccept.item(counter);

    if (doneDays.includes(counter + 1)) {
      check.style.transform = "scale(1)";
      activ.style.border = "7px solid #e3647d";
    }
    activ.addEventListener("click", async () => {
      if (check.style.transform === "scale(1)") {
        check.style.transform = "scale(0)";
        activ.style.border = "7px solid #42bdb3";

        await fetch("http://localhost:3000/activities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "squats", day: counter + 1 }),
        });
      } else {
        check.style.transform = "scale(1)";
        activ.style.border = "7px solid #e3647d";

        await fetch("http://localhost:3000/activities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "squats", day: counter + 1 }),
        });
      }
    });
  });
};
