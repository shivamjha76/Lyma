function myMenuFunction() {
  var i = document.getElementById("navMenu");
  if (i.className === "nav-menu") {
    i.className += " responsive";
  } else {
    i.className = "nav-menu";
  }
}

var loginBtn = document.getElementById("loginBtn");
var registerBtn = document.getElementById("registerBtn");
var loginBox = document.getElementById("login");
var registerBox = document.getElementById("register");

function showLogin() {
  loginBox.style.transform = "translateX(0)";
  registerBox.style.transform = "translateX(100%)";
  loginBtn.classList.add("whiteBtn");
  registerBtn.classList.remove("whiteBtn");
  loginBox.style.opacity = 1;
  registerBox.style.opacity = 0;
}

function showRegister() {
  loginBox.style.transform = "translateX(-100%)";
  registerBox.style.transform = "translateX(0)";
  loginBtn.classList.remove("whiteBtn");
  registerBtn.classList.add("whiteBtn");
  loginBox.style.opacity = 0;
  registerBox.style.opacity = 1;
}
