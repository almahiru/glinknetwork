/*
  ==========================================
  GLINK NETWORK
  LOGIN + SESSION JAVASCRIPT
  ==========================================
*/

/* ==============================
   LOGIN
============================== */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();

        const password = document.getElementById("password").value;

        const errorMessage = document.getElementById("errorMessage");

        const loginButton = document.getElementById("loginButton");

        /*
      LOGIN DEMO

      Username : admin
      Password : glink123
    */

        const validUsername = "admin";
        const validPassword = "glink123";

        if (username === validUsername && password === validPassword) {
            loginButton.disabled = true;
            loginButton.textContent = "LOGIN...";

            /*
        Simpan session
      */

            localStorage.setItem("glink_logged_in", "true");

            localStorage.setItem("glink_username", username);

            /*
        Redirect dashboard
      */

            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 500);
        } else {
            errorMessage.textContent = "Username atau password salah.";

            errorMessage.style.display = "block";
        }
    });
}

/* ==============================
   SHOW / HIDE PASSWORD
============================== */

const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {
    togglePassword.addEventListener("click", function () {
        const password = document.getElementById("password");

        if (password.type === "password") {
            password.type = "text";
            togglePassword.textContent = "🙈";
        } else {
            password.type = "password";
            togglePassword.textContent = "👁";
        }
    });
}

/* ==============================
   CHECK LOGIN SESSION
============================== */

function checkLogin() {
    const loggedIn = localStorage.getItem("glink_logged_in");

    if (loggedIn !== "true") {
        window.location.href = "index.html";
    }
}

/* ==============================
   LOGOUT
============================== */

function logout() {
    localStorage.removeItem("glink_logged_in");

    localStorage.removeItem("glink_username");

    window.location.href = "index.html";
}
