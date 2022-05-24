const $loginBtn = document.querySelector(".login--btn");
const $passwordInput = document.querySelector("#password--input--id");
const $loginInput = document.querySelector("#login--input--id");

$loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const login = $loginInput.value;
  const password = $passwordInput.value;
  const bodyVal = { login, password };

  const response = await fetch(`${process.env.REQ_URL}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyVal),
  });

  if (response.ok) {
    return (location.href = "/mainpage");
  }
  console.log("wrong");
});
