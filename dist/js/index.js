// ---------------- Firebase SDK Imports ----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// ---------------- Firebase Config ----------------
const firebaseConfig = {
  apiKey: "AIzaSyD0VjHXHjT4fiU8lSKLUdmCk-Aiclaeg_E",
  authDomain: "lyma-7ee68.firebaseapp.com",
  projectId: "lyma-7ee68",
  storageBucket: "lyma-7ee68.firebasestorage.app",
  messagingSenderId: "489280517382",
  appId: "1:489280517382:web:7f511e6dbd113ea8f3da87",
  measurementId: "G-Q37E0800NW"
};

// ---------------- Init Firebase ----------------
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

console.log("✅ Lyma Firebase Ready");

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
  var registerBtn = document.getElementById("registerSubmit");
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

  // -----------------------------------------------------------------------------------------------------------//
  // 🔐 SIGN UP
  const registerBtnSubmit = document.getElementById("registerSubmit");
  if (registerBtnSubmit) {
    registerBtnSubmit.addEventListener("click", async () => {
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ User Registered:", userCredential.user);
        alert("Registration Successful 🎉");
        window.location.href = "/lyma/dist/html/dashboard.html";

      } catch (error) {
        console.error("❌ Registration Error:", error.message);
        alert(error.message);
      }
    });
  }

  // -----------------------------------------------------------------------------------------------------------//
  // 🔓 LOGIN
  const loginBtnSubmit = document.getElementById("loginSubmit");
  if (loginBtnSubmit) {
    loginBtnSubmit.addEventListener("click", async () => {
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ User Logged In:", userCredential.user);
        alert("Login Successful 🎉");
        window.location.href = "/lyma/dist/html/dashboard.html";
      } catch (error) {
        console.error("❌ Login Error:", error.message);
        alert(error.message);
      }
    });
  }
});

