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
