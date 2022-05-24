const $checkbox = document.querySelector("#register--input--checkbox");
const $password1 = document.querySelector("#register--input--password1");
const $password2 = document.querySelector("#register--input--password2");
const $email = document.querySelector("#register--input--email");
const $login = document.querySelector("#register--input--login");
const $registerBtn = document.querySelector(".register--btn");

$registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const login = $login.value;
  const email = $email.value;
  const password1 = $password1.value;
  const password2 = $password2.value;
  const checkbox = $checkbox.value === "on" ? true : false;

  // Password One === Password Two
  if (password1 !== password2) {
    return;
  }

  const body = { login, email, password: password1 };
  const response = await fetch(
    "https://fit-portal-project.herokuapp.com/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (response.ok) {
    location.href = "/login";
  }
});
