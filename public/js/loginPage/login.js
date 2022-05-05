// Input animation

const $upperTextLogin = document.querySelector(".login--upper-login");
const $upperTextPass = document.querySelector(".login--upper-password");
const $passInput = document.querySelector("#password--input--id");
const $loginInput = document.querySelector("#login--input--id");

$loginInput.addEventListener("input", () => {
  if ($loginInput.value === "") {
    $upperTextLogin.style.zIndex = "-3";
    return ($upperTextLogin.style.transform = "translateY(0.45rem)");
  }
  $upperTextLogin.style.zIndex = "1";
  $upperTextLogin.style.transform = "translateY(-0.4rem)";
});

$passInput.addEventListener("input", () => {
  if ($passInput.value === "") {
    $upperTextPass.style.zIndex = "-3";

    return ($upperTextPass.style.transform = "translateY(0.45rem)");
  }
  $upperTextPass.style.zIndex = "1";
  $upperTextPass.style.transform = "translateY(-0.4rem)";
});
