"use strict";
const socket = io();

const messages = document.querySelector(".messages");
const $sendBtn = document.querySelector(".send--message");
const $messInput = document.querySelector(".message--input");
const $friends = document.querySelector(".friends--container");
const $userLoginInput = document.querySelector(".user--login--input");

const $addFriendDbBtn = document.querySelector(".add--user--btn");
const $addFriendBtn = document.querySelector(".fi-rr-user-add");
const $addFriendPlace = document.querySelector(".add--user");
$addFriendBtn.addEventListener("click", () => {
  $addFriendPlace.classList.toggle("invisible");
});

const getFriendsList = async function () {
  const response = await fetch("http://localhost:3000/friendlist");
  const data = await response.json();

  data.forEach((friend) => {
    const html = `<div class="friends--friend">
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
    console.log(data.error);
  } else {
    const html = `<div class="friends--friend">
    <div class="login">${loginValue}</div>
    <i class="fi fi-rr-user"></i>
    <i class="fi fi-rr-envelope"></i>
  </div>`;

    $friends.insertAdjacentHTML("beforeend", html);
  }

  $addFriendPlace.classList.toggle("invisible");
  $userLoginInput.value = "";
});

// socket.emit("hello", { message: "test" });

// socket.on("message", (message) => {
//   const html = Mustache.render(messageTemplate, {
//     message: message.text,
//   });

//   messages.insertAdjacentHTML("beforeend", html);
// });

$sendBtn.addEventListener("click", () => {
  const mess = $messInput.value;

  socket.emit("sendMessage", mess);
});

socket.on("createMessage", (message) => {
  console.log(message);
  const html = `<div class="message">
  <p>${message.user} - ${message.text}</p>
  </div>`;

  messages.insertAdjacentHTML("beforeend", html);
});

getFriendsList();
