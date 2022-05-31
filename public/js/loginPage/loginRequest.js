const $loginBtn = document.querySelector(".login--btn");
const $passwordInput = document.querySelector("#password--input--id");
const $loginInput = document.querySelector("#login--input--id");
const $errorMessage = document.querySelector(".error-message");

$loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const login = $loginInput.value;
  const password = $passwordInput.value;
  const bodyVal = { login, password };

  const response = await fetch(
    "https://fit-portal-project.herokuapp.com/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyVal),
    }
  );

  if (response.ok) {
    return (location.href = "/mainpage");
  } else {
    const data = await response.json();

    if (data.error) {
      $loginInput.value = "";
      $passwordInput.value = "";
      $errorMessage.style.opacity = "1";
    }
  }
});
