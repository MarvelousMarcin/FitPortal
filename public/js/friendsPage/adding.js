"use strict";
const socket = io();

const messages = document.querySelector(".messages");
const $friends = document.querySelector(".friends--container");
const $userLoginInput = document.querySelector(".user--login--input");
const $chatBox = document.querySelector(".chat--box");
const $boxMessage = document.querySelector(".message");
const $addingError = document.querySelector(".error-message");

const $addFriendDbBtn = document.querySelector(".add--user--btn");
const $addFriendBtn = document.querySelector(".fi-rr-user-add");
const $addFriendPlace = document.querySelector(".add--user");
$addFriendBtn.addEventListener("click", () => {
  $addFriendPlace.classList.toggle("invisible");
  $addingError.style.opacity = "0";
});

const getFriendsList = async function () {
  const response = await fetch("http://localhost:3000/friendlist");
  const data = await response.json();

  data.forEach((friend) => {
    const html = `<div value="${friend}" class="friends--friend">
    <div class="login">${friend}</div>
    <i class="fi fi-rr-user"></i>
    <i class="fi fi-rr-envelope"></i>
  </div>`;

    $friends.insertAdjacentHTML("beforeend", html);
  });
};

$addFriendDbBtn.addEventListener("click", async () => {
  const loginValue = $userLoginInput.value;
  if (!loginValue) {
    return;
  }

  const response = await fetch("http://localhost:3000/addfriend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: loginValue }),
  });

  const data = await response.json();

  if (data.error) {
    $addingError.style.opacity = "1";
  } else {
    const html = `<div class="friends--friend">
    <div class="login">${loginValue}</div>
    <i class="fi fi-rr-user"></i>
    <i class="fi fi-rr-envelope"></i>
  </div>`;

    $friends.insertAdjacentHTML("beforeend", html);

    $addFriendPlace.classList.toggle("invisible");
  }

  $userLoginInput.value = "";
});

getFriendsList();
