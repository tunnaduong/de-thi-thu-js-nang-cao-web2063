const btnSubmit = document.querySelector("#btn-submit");

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  const inputUsername = document.querySelector("#username");
  const inputPassword = document.querySelector("#password");

  if (!inputUsername.value) {
    alert("Không để trống username");
    inputUsername.focus();
    return;
  }

  if (!inputPassword.value) {
    alert("Không để trống password");
    inputPassword.focus();
    return;
  }

  if (inputPassword.value && inputPassword.value.length < 6) {
    alert("Cần tối thiểu 6 ký tự");
    inputPassword.focus();
    return;
  }

  if (inputUsername.value == "admin" && inputPassword.value == "123456") {
    alert("Đăng nhập thành công");

    localStorage.setItem("username", inputUsername.value);

    window.location.href = "index.html";
  } else {
    alert("Sai tài khoản hoặc mật khẩu");
  }
});
