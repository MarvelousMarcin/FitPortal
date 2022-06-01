"use strict";
const socket = io();

const messages = document.querySelector(".messages");
const $friends = document.querySelector(".friends--container");
const $userLoginInput = document.querySelector(".user--login--input");
const $chatBox = document.querySelector(".chat--box");
const $boxMessage = document.querySelector(".message");
const $addingError = document.querySelector(".error-message");
const $blur = document.querySelector(".blur");
const $addBox = document.querySelector(".add--box");

const $addFriendDbBtn = document.querySelector(".add--user--btn");
const $addFriendBtn = document.querySelector(".fi-rr-user-add");
const $addFriendPlace = document.querySelector(".add--user");

$addFriendBtn.addEventListener("click", () => {
  $addFriendPlace.classList.toggle("invisible");
  $addingError.style.opacity = "0";
});

const readAllData = async (login) => {
  const response = await fetch(
    "https://fit-portal-project.herokuapp.com/getuserinfo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login }),
    }
  );
  const data = await response.json();
  const $loginPlace = document.querySelector(".box--login");
  $loginPlace.textContent = login;

  const $weighPlace = document.querySelector(".box--w");
  const $heighPlace = document.querySelector(".box--h");
  const $agePlace = document.querySelector(".box--a");
  const $sexPlace = document.querySelector(".box--s");

  if (!data.weigth) {
    $weighPlace.textContent = `?`;
    $heighPlace.textContent = `?`;
    $agePlace.textContent = `?`;
    $sexPlace.textContent = `?`;
    return;
  }
  $weighPlace.textContent = `Weigth: ${data.weigth}kg`;

  $heighPlace.textContent = `Heigth: ${data.heigth}cm`;

  $agePlace.textContent = `Age: ${data.age}yo`;

  $sexPlace.textContent = `Sex: ${data.sex}`;
};

const getFriendsList = async function () {
  const response = await fetch(
    "https://fit-portal-project.herokuapp.com/friendlist"
  );
  const data = await response.json();

  data.forEach((friend) => {
    const html = `<div value="${friend}" class="friends--friend">
    <div class="login">${friend}</div>
    <i class="fi fi-rr-user"></i>
  </div>`;

    $friends.insertAdjacentHTML("beforeend", html);
  });

  const $seeProfileBtn = document.querySelectorAll(".fi-rr-user");

  $seeProfileBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      $addBox.style.transform = "scale(1)";
      $blur.style.opacity = ".7";
      $blur.style.zIndex = "4";

      const target = e.target.closest(".friends--friend").getAttribute("value");
      const data = readAllData(target);
    });
  });

  $blur.addEventListener("click", () => {
    $addBox.style.transform = "scale(0)";
    $blur.style.opacity = "0";
    $blur.style.zIndex = "-3";
    $nameInput.value = "";
    $duratInput.value = "";
    $dateInput.value = "";
  });
};

$addFriendDbBtn.addEventListener("click", async () => {
  const loginValue = $userLoginInput.value;
  if (!loginValue) {
    return;
  }

  const response = await fetch(
    "https://fit-portal-project.herokuapp.com/addfriend",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: loginValue }),
    }
  );

  const data = await response.json();

  if (data.error) {
    $addingError.style.opacity = "1";
  } else {
    const html = `<div class="friends--friend">
    <div class="login">${loginValue}</div>
    <i class="fi fi-rr-user"></i>
  </div>`;

    $friends.insertAdjacentHTML("beforeend", html);

    $addFriendPlace.classList.toggle("invisible");
  }

  $userLoginInput.value = "";
});

getFriendsList();
