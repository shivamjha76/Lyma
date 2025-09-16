// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0VjHXHjT4fiU8lSKLUdmCk-Aiclaeg_E",
  authDomain: "lyma-7ee68.firebaseapp.com",
  projectId: "lyma-7ee68",
  storageBucket: "lyma-7ee68.firebasestorage.app",
  messagingSenderId: "489280517382",
  appId: "1:489280517382:web:7f511e6dbd113ea8f3da87",
  measurementId: "G-Q37E0800NW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// -----------------------------------------------------------------------------------------------------------//
// ✅ DOM-safe wrapper
window.addEventListener("DOMContentLoaded", () => {
  // 🔧 Navbar toggle
  function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if (i.className === "nav-menu") {
      i.className += " responsive";
    } else {
      i.className = "nav-menu";
    }
  }

  // 🔧 Login/Signup toggle
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

  // ✅ Make functions accessible from HTML
  window.showLogin = showLogin;
  window.showRegister = showRegister;
  window.myMenuFunction = myMenuFunction;
});

console.log("Lyma is ready 🚀");