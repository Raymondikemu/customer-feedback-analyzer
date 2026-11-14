/* ==========================================================
   CUSTOMER FEEDBACK ANALYZER
   SENTIMENT ANALYSIS PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       GET HTML ELEMENTS
    ========================================================== */

    const startBtn = document.getElementById("startAnalysisBtn");
    const continueBtn = document.getElementById("continueBtn");

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    const analysisSummary = document.getElementById("analysisSummary");
    const sentimentChart = document.getElementById("sentimentChart");
    console.log("analysisSummary:", analysisSummary);

    /* ==========================================================
        LOAD REVIEWS
    ========================================================== */

    const reviews = Storage.getReviews();
    const positiveCount = document.getElementById("positiveCount");

    const neutralCount = document.getElementById("neutralCount");

    const negativeCount = document.getElementById("negativeCount");

    console.log("Reviews Loaded:", reviews);

    /* ==========================================================
        DETERMINE SENTIMENT
    ========================================================== */

    function getSentiment(review) {

        const rating = Number(review.Rating);

        if (rating >= 4) {

            return "Positive";

        }

        if (rating === 3) {

            return "Neutral";

        }

        return "Negative";

    }

   
    /* ==========================================================
       START ANALYSIS
    ========================================================== */

    startBtn.addEventListener("click", () => {

        // Prevent multiple clicks
        startBtn.disabled = true;

        startBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing Reviews...';

        let progress = 0;

        progressBar.style.width = "0%";

        progressText.textContent = "Starting analysis...";

        const interval = setInterval(() => {

            progress++;

            progressBar.style.width = progress + "%";

            progressText.textContent =
                "Analyzing customer reviews... " + progress + "%";

            if (progress >= 100) {

                clearInterval(interval);

                analysisComplete();

            }

        }, 40);

    });

    /* ==========================================================
       ANALYSIS COMPLETE
    ========================================================== */

    function analysisComplete() {

        /* ==========================================================
            COUNT SENTIMENTS
        ========================================================== */

        let positive = 0;

        let neutral = 0;

        let negative = 0;

        reviews.forEach(review => {

            const sentiment = getSentiment(review);

            if (sentiment === "Positive") {

                positive++;

            }

            else if (sentiment === "Neutral") {

                neutral++;

            }

            else {

                negative++;

            }

        });

        positiveCount.textContent = positive;

        neutralCount.textContent = neutral;

        negativeCount.textContent = negative;

        const analysisResults = {

            positive,

            neutral,

            negative,

            total: reviews.length,

            analyzedReviews: reviews.map(review => ({

                ...review,

                Sentiment: getSentiment(review)

            }))

        };

        Storage.saveAnalysis(analysisResults);

        new Chart(sentimentChart, {

            type: "pie",

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

                    ]

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

             }

        });

        let overallSentiment = "balanced";

        if (positive > negative && positive > neutral) {

            overallSentiment = "predominantly positive";

        }

        else if (negative > positive && negative > neutral) {

            overallSentiment = "predominantly negative";

        }

        else if (neutral > positive && neutral > negative) {

            overallSentiment = "mostly neutral";

        }

        analysisSummary.innerHTML = `
        A total of <strong>${reviews.length}</strong> customer reviews were analyzed.
        <strong>${positive}</strong> reviews were classified as Positive,
        <strong>${neutral}</strong> as Neutral,
        and <strong>${negative}</strong> as Negative.
        Overall, customer sentiment is <strong>${overallSentiment}</strong>.
        `;

        progressText.textContent =
            "Analysis completed successfully.";

        startBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Analysis Complete';

        startBtn.style.background = "#2563EB";

        continueBtn.disabled = false;

    }

    /* ==========================================================
       CONTINUE TO INSIGHTS
    ========================================================== */

    continueBtn.addEventListener("click", () => {

        window.location.href = "insights.html";

    });

});
