/* ==========================================================
   CUSTOMER FEEDBACK ANALYZER
   DASHBOARD JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       PAGE ANIMATION
    ========================================================== */

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition = "opacity .5s ease";

        document.body.style.opacity = "1";

    }, 100);

    /* ==========================================================
       STAT CARD HOVER EFFECT
    ========================================================== */

    const statCards = document.querySelectorAll(".stat-card");

    statCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-8px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0px)";

        });

    });

    /* ==========================================================
       CARD HOVER EFFECT
    ========================================================== */

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.boxShadow = "0 18px 40px rgba(0,0,0,.12)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";

        });

    });

    /* ==========================================================
       NOTIFICATION BUTTON
    ========================================================== */

    const notificationBtn = document.querySelector(".notification-btn");

    if(notificationBtn){

        notificationBtn.addEventListener("click", () => {

            alert("No new notifications.");

        });

    }

    /* ==========================================================
       QUICK ACTION BUTTONS
    ========================================================== */

    const actionButtons = document.querySelectorAll(".action-btn");

    actionButtons.forEach(button => {

        button.addEventListener("click", () => {

            const action = button.textContent.trim();

            switch(action){

                case "Upload Reviews":
                    window.location.href = "upload.html";
                    break;

                case "Run Analysis":
                    window.location.href = "analysis.html";
                    break;

                case "Export Report":
                    window.location.href = "reports.html";
                    break;

                default:
                    console.log(action);

            }

        });

    });

    /* ==========================================================
       SIDEBAR ACTIVE LINK
    ========================================================== */

    const currentPage = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll(".sidebar a");

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if(href === currentPage){

            link.parentElement.classList.add("active");

        }

    });

   /* ==========================================================
        LOAD DASHBOARD STATISTICS
    ========================================================== */

    const reviews = Storage.getReviews();
    const analysis = Storage.getAnalysis();

    const totalReviews = document.getElementById("totalReviews");
    const positiveReviews = document.getElementById("positiveReviews");
    const neutralReviews = document.getElementById("neutralReviews");
    const negativeReviews = document.getElementById("negativeReviews");

    totalReviews.textContent = reviews.length;

    let positive = 0;
    let neutral = 0;
    let negative = 0;

    if (analysis) {

        positive = analysis.positive;
        neutral = analysis.neutral;
        negative = analysis.negative;

    }

    positiveReviews.textContent = positive;
    neutralReviews.textContent = neutral;
    negativeReviews.textContent = negative;

    /* ==========================================================
        SENTIMENT OVERVIEW CHART
    ========================================================== */

    const chartCanvas = document.getElementById("sentimentChart");

    if (chartCanvas) {

        new Chart(chartCanvas, {

            type: "doughnut",

            data: {

                labels: [

                    "Positive",

                    "Neutral",

                    "Negative"

                ],

                datasets: [{

                    data: [

                        positive,

                        neutral,

                        negative

                    ],

                    backgroundColor: [

                        "#22C55E",

                        "#FACC15",

                        "#EF4444"

                    ],

                    borderColor: "#FFFFFF",

                    borderWidth: 2

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    }

    /* ==========================================================
        DATASET INFORMATION
    ========================================================== */

    const datasetReviews = document.getElementById("datasetReviews");
    const datasetStatus = document.getElementById("datasetStatus");
    const datasetSentiment = document.getElementById("datasetSentiment");

    if (datasetReviews) {

        datasetReviews.textContent = reviews.length;

    }

    if (datasetStatus) {

        datasetStatus.textContent = analysis ? "Completed" : "Waiting";

    }

    if (datasetSentiment) {

        if (!analysis) {

            datasetSentiment.textContent = "Not Available";

        } else if (positive > negative && positive > neutral) {

            datasetSentiment.textContent = "Predominantly Positive";

        } else if (negative > positive && negative > neutral) {

            datasetSentiment.textContent = "Predominantly Negative";

        } else if (neutral > positive && neutral > negative) {

            datasetSentiment.textContent = "Mostly Neutral";

        } else {

            datasetSentiment.textContent = "Balanced";

        }

    }
    
    /* ==========================================================
        RECENT REVIEWS
    ========================================================== */

    const recentReviewsList =
        document.getElementById("recentReviewsList");

    if (recentReviewsList) {

        recentReviewsList.innerHTML = "";

        if (reviews.length === 0) {

            recentReviewsList.innerHTML =
                "<li>No reviews available.</li>";

        } else {

            const latestReviews = reviews.slice(-5).reverse();

            latestReviews.forEach(review => {

                const li = document.createElement("li");

                const rating = Number(review.Rating);

                let stars = "";

                for (let i = 0; i < rating; i++) {

                    stars += "⭐";

                }

                li.innerHTML = `
                    <strong>${stars}</strong><br>
                    ${review.Review}
                `;

                recentReviewsList.appendChild(li);

            });

        }

    }
});
