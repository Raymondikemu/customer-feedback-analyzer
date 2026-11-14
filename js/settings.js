/* ==========================================================
   CUSTOMER FEEDBACK ANALYZER
   SETTINGS PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       GET HTML ELEMENTS
    ========================================================== */

    const clearDataBtn =
        document.getElementById("clearDataBtn");

    /* ==========================================================
       CLEAR ALL APPLICATION DATA
    ========================================================== */

    clearDataBtn.addEventListener("click", () => {

        const confirmClear = confirm(

            "Are you sure you want to clear all application data?\n\n" +

            "This will permanently remove:\n" +

            "• Uploaded Reviews\n" +

            "• Sentiment Analysis Results\n" +

            "• Generated Insights\n" +

            "• Reports\n\n" +

            "This action cannot be undone."

        );

        if (!confirmClear) {

            return;

        }

        /* ======================================================
           CLEAR STORAGE
        ====================================================== */

        Storage.clearAll();

        /* ======================================================
           SUCCESS MESSAGE
        ====================================================== */

        alert(

            "All application data has been cleared successfully."

        );

        /* ======================================================
           RETURN TO DASHBOARD
        ====================================================== */

        window.location.href = "dashboard.html";

    });

});