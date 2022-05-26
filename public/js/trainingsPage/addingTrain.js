"use strict";

const $blur = document.querySelector(".blur");
const $addBtn = document.querySelector(".fi-rr-add");
const $addBox = document.querySelector(".add--box");
const $sendReq = document.querySelector(".add-btn");
const $nameInput = document.querySelector(".add-name");
const $duratInput = document.querySelector(".add-duration");
const $dateInput = document.querySelector(".add-date");
const $trainings = document.querySelector(".trainings");

const createDateFunc = (date) => {
  const newDate = new Date(date);
  let day = newDate.getDate();
  let month = newDate.getMonth();
  let year = newDate.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${day}.${month}.${year}`;
};

const getTimeString = (time) => {
  const trainingHour = Math.trunc(time / 60);
  const trainingMin = time - 60 * trainingHour;
  const dura = `${trainingHour}h ${trainingMin}min`;
  return dura;
};

const loadTraingins = async () => {
  const response = await fetch(
    "https://fit-portal-project.herokuapp.com/traininglist"
  );
  const data = await response.json();

  if (!data) {
    return;
  }

  data.forEach((training) => {
    const html = `<div class="training">
    <div class="title">${training.name}</div>
    <div class="duration">${training.dura}</div>
    <div class="date">${createDateFunc(training.date)}</div>
  </div>`;

    $trainings.insertAdjacentHTML("afterbegin", html);
  });
};

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

  const response = await fetch(
    "https://fit-portal-project.herokuapp.com/training",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, duration, date }),
    }
  );

  if (response.ok) {
    const html = `<div class="training">
    <div class="title">${name}</div>
    <div class="duration">${getTimeString(duration)}</div>
    <div class="date">${createDateFunc(date)}</div>
    </div>`;
    console.log(html);

    $trainings.insertAdjacentHTML("afterbegin", html);
  }

  $blur.click();
});

loadTraingins();
