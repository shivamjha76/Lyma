// ---------------- Firebase SDK Imports ----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } 
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
  const registerPasswordInput = document.getElementById("registerPassword");
  const registerConfirmPasswordInput = document.getElementById("registerConfirmPassword");

  if (registerBtnSubmit) {
    registerBtnSubmit.addEventListener("click", async () => {
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("registerConfirmPassword").value;
      if (password !== confirmPassword) {
        alert("Passwords do not match. Please confirm your password correctly.");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        alert("Verification email sent! Please check your inbox and verify your email before logging in.");
      } catch (error) {
        console.error("❌ Registration Error:", error.message);
        alert(error.message);
      }
    });
    // ✅ Enter key triggers registration
    if (registerPasswordInput) {
      registerPasswordInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          registerBtnSubmit.click();
        }
      });
    }
    if (registerConfirmPasswordInput) {
      registerConfirmPasswordInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          registerBtnSubmit.click();
        }
      });
    }
  }

  // ✅ Password show/hide toggle for register confirm password
  const registerConfirmPasswordIcon = registerConfirmPasswordInput?.nextElementSibling;
  if (registerConfirmPasswordInput && registerConfirmPasswordIcon) {
    registerConfirmPasswordIcon.style.cursor = "pointer";
    registerConfirmPasswordIcon.addEventListener("click", function() {
      if (registerConfirmPasswordInput.type === "password") {
        registerConfirmPasswordInput.type = "text";
        registerConfirmPasswordIcon.classList.remove("bx-lock-alt");
        registerConfirmPasswordIcon.classList.add("bx-show");
      } else {
        registerConfirmPasswordInput.type = "password";
        registerConfirmPasswordIcon.classList.remove("bx-show");
        registerConfirmPasswordIcon.classList.add("bx-lock-alt");
      }
    });
  }

  // -----------------------------------------------------------------------------------------------------------//
  // 🔓 LOGIN
  const loginBtnSubmit = document.getElementById("loginSubmit");
  const loginPasswordInput = document.getElementById("loginPassword");
  if (loginBtnSubmit) {
    loginBtnSubmit.addEventListener("click", async () => {
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      // ✅ Remember Me: Save or remove email
      const rememberMeChecked = document.getElementById("login-check")?.checked;
      if (rememberMeChecked) {
        localStorage.setItem("lymaRememberEmail", email);
      } else {
        localStorage.removeItem("lymaRememberEmail");
      }
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          alert("Please verify your email before logging in.");
          return;
        }
        console.log("✅ User Logged In:", userCredential.user);
        alert("Login Successful 🎉");
        window.location.href = "/lyma/dist/html/dashboard.html";
      } catch (error) {
        console.error("❌ Login Error:", error.message);
        alert(error.message);
      }
    });
    // ✅ Enter key triggers login
    if (loginPasswordInput) {
      loginPasswordInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          loginBtnSubmit.click();
        }
      });
    }
  }

  // ✅ Forget Password functionality
  const forgotPasswordLink = document.getElementById("forgotPassword");
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      if (!email) {
        alert("Please enter your email address above to reset password.");
        return;
      }
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent! Check your inbox.");
      } catch (error) {
        alert("Error: " + error.message);
      }
    });
  }

  // ✅ Password show/hide toggle for login
  const loginPasswordIcon = loginPasswordInput?.nextElementSibling;
  if (loginPasswordInput && loginPasswordIcon) {
    loginPasswordIcon.style.cursor = "pointer";
    loginPasswordIcon.addEventListener("click", function() {
      if (loginPasswordInput.type === "password") {
        loginPasswordInput.type = "text";
        loginPasswordIcon.classList.remove("bx-lock-alt");
        loginPasswordIcon.classList.add("bx-show");
      } else {
        loginPasswordInput.type = "password";
        loginPasswordIcon.classList.remove("bx-show");
        loginPasswordIcon.classList.add("bx-lock-alt");
      }
    });
  }

  // ✅ Password show/hide toggle for register
  const registerPasswordIcon = registerPasswordInput?.nextElementSibling;
  if (registerPasswordInput && registerPasswordIcon) {
    registerPasswordIcon.style.cursor = "pointer";
    registerPasswordIcon.addEventListener("click", function() {
      if (registerPasswordInput.type === "password") {
        registerPasswordInput.type = "text";
        registerPasswordIcon.classList.remove("bx-lock-alt");
        registerPasswordIcon.classList.add("bx-show");
      } else {
        registerPasswordInput.type = "password";
        registerPasswordIcon.classList.remove("bx-show");
        registerPasswordIcon.classList.add("bx-lock-alt");
      }
    });
  }
});

