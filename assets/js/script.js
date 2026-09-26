/* =====================================================
   GLINK MEDIA V2
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    /* ================= PRELOADER ================= */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.classList.add("hide");
        }, 500);
    });

    /* ================= NAVBAR ================= */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();

    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("open")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    /* Close mobile menu after clicking */

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });

    /* ================= DARK / LIGHT MODE ================= */

    const themeToggle = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("glink-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
        updateThemeIcon();
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light");

        const isLight = document.body.classList.contains("light");

        localStorage.setItem("glink-theme", isLight ? "light" : "dark");

        updateThemeIcon();
    });

    function updateThemeIcon() {
        const icon = themeToggle.querySelector("i");

        if (document.body.classList.contains("light")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    }

    /* ================= BACK TO TOP ================= */

    const backTop = document.getElementById("back-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }
    });

    /* ================= ACTIVE NAV ================= */

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(".nav-menu > a");

    function updateActiveNav() {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;

            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);

    /* ================= CONTACT → WHATSAPP ================= */

    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("name-contact").value.trim();

        const email = document.getElementById("email-contact").value.trim();

        const message = document.getElementById("message-contact").value.trim();

        if (!name || !email || !message) {
            alert("Silakan lengkapi semua data.");
            return;
        }

        const phone = "6285755604512";

        const text =
            `*PESAN GLINK MEDIA*%0A%0A` +
            `Nama : ${encodeURIComponent(name)}%0A` +
            `Email : ${encodeURIComponent(email)}%0A%0A` +
            `Pesan : ${encodeURIComponent(message)}`;

        const whatsappURL = `https://wa.me/${phone}?text=${text}`;

        window.open(whatsappURL, "_blank", "noopener");
    });

    /* ================= AOS ================= */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 70
        });
    }

    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            const targetID = this.getAttribute("href");

            if (targetID === "#" || !document.querySelector(targetID)) {
                return;
            }

            event.preventDefault();

            document.querySelector(targetID).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});

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
