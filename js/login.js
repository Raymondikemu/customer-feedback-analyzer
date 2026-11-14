/* ==========================================================
   CUSTOMER FEEDBACK ANALYZER
   LOGIN JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       GET HTML ELEMENTS
    ========================================== */

    const loginForm = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginButton = document.querySelector(".login-btn");

    /* ==========================================
       SHOW / HIDE PASSWORD
    ========================================== */

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");

        } else {

            password.type = "password";

            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");

        }

    });

    /* ==========================================
       LOGIN FORM
    ========================================== */

    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        if(email.value.trim() === ""){

            alert("Please enter your email.");

            email.focus();

            return;

        }

        if(password.value.trim() === ""){

            alert("Please enter your password.");

            password.focus();

            return;

        }

        /* Change Button While Logging In */

        loginButton.disabled = true;

        loginButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Logging In...
        `;

        /* Simulate Login */

        setTimeout(() => {

            window.location.href = "dashboard.html";

        },1500);

    });

    /* ==========================================
       INPUT FOCUS EFFECT
    ========================================== */

    document.querySelectorAll(".input-box input").forEach(input=>{

        input.addEventListener("focus",()=>{

            input.parentElement.style.boxShadow="0 0 0 4px rgba(108,99,255,.15)";

        });

        input.addEventListener("blur",()=>{

            input.parentElement.style.boxShadow="none";

        });

    });

    /* ==========================================
       CARD HOVER EFFECT
    ========================================== */

    document.querySelectorAll(".review-card, .analytics-card").forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform="translateY(-8px)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="translateY(0)";

        });

    });

    /* ==========================================
       PAGE FADE-IN
    ========================================== */

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition = ".5s";

        document.body.style.opacity = "1";

    },100);

});