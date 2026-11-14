/* ==========================================================
   CUSTOMER FEEDBACK ANALYZER
   REVIEWS LIST PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       GET HTML ELEMENTS
    ========================================================== */

    const searchInput = document.getElementById("searchInput");
    const ratingFilter = document.getElementById("ratingFilter");
    const table = document.getElementById("reviewsTable");
    const rows = table.querySelectorAll("tbody tr");
    const reviewsBody = document.getElementById("reviewsBody");

    const totalReviewsCard = document.getElementById("totalReviews");

    const averageRatingCard = document.getElementById("averageRating");

    const pendingReviewsCard = document.getElementById("pendingReviews");


    /* ==========================================================
        LOAD REVIEWS FROM STORAGE
    ========================================================== */

    loadReviews();

    function loadReviews() {

        const reviews = Storage.getReviews();

        console.log("Loaded Reviews:", reviews);

        if (reviews.length > 0) {

            reviewsBody.innerHTML = "";

        }

        let totalRating = 0;
        reviews.forEach((review, index) => {

            totalRating += Number(review.Rating);
            const stars = "⭐".repeat(Number(review.Rating));

            reviewsBody.innerHTML += `
                <tr>

                    <td>${index + 1}</td>

                    <td>${review.Review}</td>

                    <td>${stars} (${review.Rating})</td>

                    <td>${review.Date}</td>

                    <td>

                        <span class="status pending">

                            Pending

                        </span>

                    </td>

                    <td>

                        <button class="view-btn">

                            <i class="fa-solid fa-eye"></i>

                        </button>

                    </td>

                </tr>
            `;

        });
        totalReviewsCard.textContent = reviews.length;

        averageRatingCard.textContent =
            (totalRating / reviews.length).toFixed(1);

        pendingReviewsCard.textContent = reviews.length;

    }

    /* ==========================================================
        SEARCH REVIEWS
    ========================================================== */

    searchInput.addEventListener("keyup", () => {

        const rows = reviewsBody.querySelectorAll("tr");

        const value = searchInput.value.toLowerCase();

        rows.forEach(row => {

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(value) ? "" : "none";

        });

    });

   /* ==========================================================
        FILTER BY RATING
    ========================================================== */

    ratingFilter.addEventListener("change", () => {

        const rows = reviewsBody.querySelectorAll("tr");

        const selectedRating = ratingFilter.value;

        rows.forEach(row => {

            if (selectedRating === "all") {

                row.style.display = "";

                return;

            }

            const ratingCell = row.children[2];

            if (!ratingCell) return;

            const ratingText = ratingCell.textContent;

            const match = ratingText.match(/\((\d)\)/);

            if (!match) return;

            const rating = match[1];

            row.style.display = rating === selectedRating ? "" : "none";

        });

    });

    /* ==========================================================
        VIEW REVIEW
    ========================================================== */

    reviewsBody.addEventListener("click", (e) => {

        if (!e.target.closest(".view-btn")) return;

        const row = e.target.closest("tr");

        const reviewID = row.children[0].textContent;
        const reviewText = row.children[1].textContent;
        const rating = row.children[2].textContent;
        const date = row.children[3].textContent;
        const status = row.children[4].textContent.trim();

        alert(
            `Review ID: ${reviewID}

            Review:
            ${reviewText}

            Rating: ${rating}

            Date: ${date}

            Status: ${status}`
        );

    });

    /* ==========================================================
       UPDATE SUMMARY CARD
    ========================================================== */

    function updateSummary(){

        const remainingRows =
            table.querySelectorAll("tbody tr").length;

        const cards =
            document.querySelectorAll(".summary-card h2");

        if(cards.length >= 3){

            cards[0].textContent = remainingRows;
            cards[2].textContent = remainingRows;

        }

    }

    /* ==========================================================
       PAGINATION BUTTONS (UI ONLY)
    ========================================================== */

    const pageButtons =
        document.querySelectorAll(".page");

    pageButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            pageButtons.forEach(btn=>{

                btn.classList.remove("active");

            });

            button.classList.add("active");

        });

    });

    /* ==========================================================
       TABLE ROW HOVER
    ========================================================== */

    rows.forEach(row=>{

        row.addEventListener("mouseenter",()=>{

            row.style.transition=".3s";

        });

    });

});