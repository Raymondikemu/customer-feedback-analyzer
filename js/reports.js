/* ==========================================================
   CUSTOMER FEEDBACK ANALYZER
   REPORTS PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       GET HTML ELEMENTS
    ========================================================== */

    const downloadBtn = document.getElementById("downloadBtn");
    const printBtn = document.getElementById("printBtn");
    /* ==========================================================
        LOAD ANALYSIS RESULTS
    ========================================================== */

    const analysis = Storage.getAnalysis();

    console.log("Report Analysis:", analysis);

    /* ==========================================================
       CHECK REPORT STATUS
    ========================================================== */

    const reportAvailable = analysis !== null;

    downloadBtn.disabled = !reportAvailable;
    printBtn.disabled = !reportAvailable;

    /* ==========================================================
        REPORT SUMMARY
    ========================================================== */

    if (reportAvailable) {

        document.getElementById("reportTotal").textContent =
            analysis.total;

        document.getElementById("reportPositive").textContent =
            analysis.positive;

        document.getElementById("reportNeutral").textContent =
            analysis.neutral;

        document.getElementById("reportNegative").textContent =
            analysis.negative;

    }

    /* ==========================================================
        REPORT PREVIEW
    ========================================================== */

    const reportPreview =
        document.getElementById("reportPreview");

    if (reportAvailable) {

        let overallSentiment = "Balanced";

        if (analysis.positive > analysis.negative &&
            analysis.positive > analysis.neutral) {

            overallSentiment = "Predominantly Positive";

        }

        else if (analysis.negative > analysis.positive &&
                analysis.negative > analysis.neutral) {

            overallSentiment = "Predominantly Negative";

        }

        else if (analysis.neutral > analysis.positive &&
                analysis.neutral > analysis.negative) {

            overallSentiment = "Mostly Neutral";

        }

        reportPreview.innerHTML = `
            <h3>Customer Feedback Analysis Report</h3>

            <p><strong>Total Reviews:</strong> ${analysis.total}</p>

            <p><strong>Positive Reviews:</strong> ${analysis.positive}</p>

            <p><strong>Neutral Reviews:</strong> ${analysis.neutral}</p>

            <p><strong>Negative Reviews:</strong> ${analysis.negative}</p>

            <p><strong>Overall Sentiment:</strong> ${overallSentiment}</p>

            <hr>

            <p>
                This report summarizes the sentiment analysis performed on the uploaded customer reviews.
                The analysis indicates an overall <strong>${overallSentiment}</strong> sentiment based on
                customer ratings. Businesses can use these insights to identify strengths, address customer
                concerns, and improve overall customer satisfaction.
            </p>
        `;

    }

    /* ==========================================================
       EXPORT PDF
    ========================================================== */

    downloadBtn.addEventListener("click",()=>{

        if(!reportAvailable){

            alert(
                "No report available.\n\nComplete sentiment analysis before exporting a PDF."
            );

            return;

        }

        const reportContent =
            document.getElementById("reportPreview").innerHTML;

        const reportWindow = window.open("", "_blank");

        reportWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>

        <title>Customer Feedback Analysis Report</title>

        <style>

        body{

            font-family: Arial, sans-serif;

            padding:40px;

            line-height:1.7;

        }

        h1{

            color:#2563EB;

        }

        hr{

            margin:20px 0;

        }

        </style>

        </head>

        <body>

        <h1>Customer Feedback Analysis Report</h1>

        ${reportContent}

        </body>

        </html>
        `);

        reportWindow.document.close();

        reportWindow.print();

    });

    /* ==========================================================
       PRINT REPORT
    ========================================================== */

    printBtn.addEventListener("click",()=>{

        if(!reportAvailable){

            alert(
                "No report available to print."
            );

            return;

        }

        downloadBtn.click();

    });

});