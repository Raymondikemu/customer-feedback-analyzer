/* ==========================================================
   CUSTOMER FEEDBACK ANALYZER
   INSIGHTS & RECOMMENDATIONS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       LOAD ANALYSIS RESULTS
    ========================================================== */

    const analysis = Storage.getAnalysis();

    const overallSentimentElement =
        document.getElementById("overallSentiment");

    const positiveHighlights =
        document.getElementById("positiveHighlights");

    const commonIssues =
        document.getElementById("commonIssues");

    const recommendationsList =
        document.getElementById("recommendationsList");

    const trendAnalysis =
        document.getElementById("trendAnalysis");

    const reportBtn =
        document.getElementById("reportBtn");

    /* ==========================================================
       NO ANALYSIS AVAILABLE
    ========================================================== */

    if (!analysis) {

        overallSentimentElement.textContent =
            "Waiting for Analysis";

        positiveHighlights.innerHTML =
            "<li>No positive insights available.</li>";

        commonIssues.innerHTML =
            "<li>No common issues identified.</li>";

        recommendationsList.innerHTML =
            "<li>Run sentiment analysis to generate recommendations.</li>";

        trendAnalysis.textContent =
            "No trend data available. Complete sentiment analysis to generate trends.";

        reportBtn.disabled = true;

        return;

    }

    /* ==========================================================
       ENABLE REPORT BUTTON
    ========================================================== */

    reportBtn.disabled = false;

    /* ==========================================================
       DETERMINE OVERALL SENTIMENT
    ========================================================== */

    let overallSentiment = "Balanced";

    if (
        analysis.positive > analysis.negative &&
        analysis.positive > analysis.neutral
    ) {

        overallSentiment = "Predominantly Positive";

    }

    else if (
        analysis.negative > analysis.positive &&
        analysis.negative > analysis.neutral
    ) {

        overallSentiment = "Predominantly Negative";

    }

    else if (
        analysis.neutral > analysis.positive &&
        analysis.neutral > analysis.negative
    ) {

        overallSentiment = "Mostly Neutral";

    }

    overallSentimentElement.textContent =
        overallSentiment;

    /* ==========================================================
       POSITIVE HIGHLIGHTS
    ========================================================== */

    positiveHighlights.innerHTML = "";

    positiveHighlights.innerHTML +=
        `<li>${analysis.positive} positive customer reviews detected.</li>`;

    if (analysis.positive >= analysis.negative) {

        positiveHighlights.innerHTML +=
            `<li>Customers generally express positive experiences.</li>`;

    }

    if (analysis.positive >= analysis.neutral) {

        positiveHighlights.innerHTML +=
            `<li>Positive feedback is one of the strongest sentiment categories.</li>`;

    }

    /* ==========================================================
       COMMON ISSUES
    ========================================================== */

    commonIssues.innerHTML = "";

    commonIssues.innerHTML +=
        `<li>${analysis.negative} negative customer reviews detected.</li>`;

    if (analysis.negative >= analysis.positive) {

        commonIssues.innerHTML +=
            `<li>Some customers reported unsatisfactory experiences.</li>`;

    }

    if (analysis.negative >= analysis.neutral) {

        commonIssues.innerHTML +=
            `<li>Investigate recurring complaints to improve customer satisfaction.</li>`;

    }

    /* ==========================================================
       AI RECOMMENDATIONS
    ========================================================== */

    recommendationsList.innerHTML = "";

    if (analysis.positive >= analysis.negative) {

        recommendationsList.innerHTML +=
            `<li>Maintain the current level of product quality and customer service.</li>`;

    }

    if (analysis.negative > 0) {

        recommendationsList.innerHTML +=
            `<li>Investigate the causes of negative customer reviews and address recurring complaints.</li>`;

    }

    if (analysis.neutral > 0) {

        recommendationsList.innerHTML +=
            `<li>Encourage neutral customers to provide additional feedback to better understand their experiences.</li>`;

    }

    recommendationsList.innerHTML +=
        `<li>Continue monitoring customer feedback regularly to identify future trends.</li>`;

    /* ==========================================================
       TREND ANALYSIS
    ========================================================== */

    trendAnalysis.textContent =
        `Out of ${analysis.total} customer reviews analyzed, ` +
        `${analysis.positive} were Positive, ` +
        `${analysis.neutral} were Neutral, and ` +
        `${analysis.negative} were Negative. ` +
        `This indicates an overall ${overallSentiment.toLowerCase()} customer sentiment.`;

    /* ==========================================================
       REPORT BUTTON
    ========================================================== */

    reportBtn.addEventListener("click", () => {

        window.location.href = "reports.html";

    });

});