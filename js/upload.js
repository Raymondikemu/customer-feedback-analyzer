/* ==========================================================
   CUSTOMER FEEDBACK ANALYZER
   UPLOAD REVIEWS PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       GET HTML ELEMENTS
    ========================================================== */

    const dropArea = document.getElementById("dropArea");
    const fileInput = document.getElementById("fileInput");
    const browseBtn = document.getElementById("browseBtn");

    const fileName = document.getElementById("fileName");
    const fileSize = document.getElementById("fileSize");

    const uploadBtn = document.getElementById("uploadBtn");
    const removeBtn = document.getElementById("removeBtn");
    const continueBtn = document.getElementById("continueBtn");

    const statusMessage = document.getElementById("statusMessage");

    let selectedFile = null;

    /* ==========================================================
       OPEN FILE BROWSER
    ========================================================== */

    browseBtn.addEventListener("click", (e) => {

        e.preventDefault();

        e.stopPropagation();

        fileInput.click();

    });

    /* ==========================================================
       FILE SELECTED
    ========================================================== */

    fileInput.addEventListener("change", (e) => {

        if (e.target.files.length > 0) {

            handleFile(e.target.files[0]);

        }

    });

    /* ==========================================================
       DRAG EVENTS
    ========================================================== */

    ["dragenter", "dragover"].forEach(eventName => {

        dropArea.addEventListener(eventName, (e) => {

            e.preventDefault();

            dropArea.classList.add("dragover");

        });

    });

    ["dragleave", "dragend"].forEach(eventName => {

        dropArea.addEventListener(eventName, () => {

            dropArea.classList.remove("dragover");

        });

    });

    dropArea.addEventListener("drop", (e) => {

        e.preventDefault();

        dropArea.classList.remove("dragover");

        const file = e.dataTransfer.files[0];

        if (file) {

            handleFile(file);

        }

    });

    /* ==========================================================
       HANDLE FILE
    ========================================================== */

    function handleFile(file) {

        const extension = file.name.split(".").pop().toLowerCase();

        if (extension !== "csv" && extension !== "xlsx") {

            showMessage("Only CSV and XLSX files are supported.", "error");

            return;

        }

        selectedFile = file;

        fileName.textContent = file.name;

        fileSize.textContent = formatFileSize(file.size);

        showMessage("File selected successfully.", "success");

    }

    /* ==========================================================
       FORMAT FILE SIZE
    ========================================================== */

    function formatFileSize(bytes) {

        if (bytes < 1024) {

            return bytes + " Bytes";

        }

        if (bytes < 1024 * 1024) {

            return (bytes / 1024).toFixed(2) + " KB";

        }

        return (bytes / (1024 * 1024)).toFixed(2) + " MB";

    }

    /* ==========================================================
        RESET UPLOAD BUTTON
    ========================================================== */

    function resetUploadButton(){

        uploadBtn.disabled = false;

        uploadBtn.innerHTML = `
            Upload Reviews
        `;

    }

    /* ==========================================================
       REMOVE FILE
    ========================================================== */

    removeBtn.addEventListener("click", () => {

        selectedFile = null;

        fileInput.value = "";

        fileName.textContent = "No file selected";

        fileSize.textContent = "File size will appear here";

        continueBtn.disabled = true;

        statusMessage.style.display = "none";

    });

    /* ==========================================================
       UPLOAD BUTTON
    ========================================================== */

   uploadBtn.addEventListener("click", () => {

         if (!selectedFile) {

            showMessage("Please select a file first.", "error");

             return;

        }

        uploadBtn.disabled = true;

        uploadBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Importing Reviews...
        `;

        Papa.parse(selectedFile, {

            header: true,

            skipEmptyLines: true,

            complete: function(results){

                const reviews = results.data;

                // Check if CSV has data
                if(reviews.length === 0){

                    showMessage("The selected CSV file is empty.", "error");

                    resetUploadButton();

                    return;

                }

                // Check required columns
                const firstRow = reviews[0];

                if(!("Review" in firstRow) ||
                    !("Rating" in firstRow) ||
                    !("Date" in firstRow)){

                    showMessage(
                        "CSV must contain Review, Rating and Date columns.",
                        "error"
                    );

                    resetUploadButton();

                    return;

                }

                // Save reviews
                Storage.saveReviews(reviews);

                uploadBtn.innerHTML = `
                    <i class="fa-solid fa-check"></i>
                    Uploaded
                `;

                showMessage(
                    `${reviews.length} reviews imported successfully.`,
                    "success"
                );

                continueBtn.disabled = false;

            },

            error:function(){

                showMessage(
                    "Unable to read the CSV file.",
                    "error"
                );

                resetUploadButton();

            }

        });

    });
    /* ==========================================================
       CONTINUE
    ========================================================== */

    continueBtn.addEventListener("click", () => {

        window.location.href = "reviews.html";

    });

    /* ==========================================================
       STATUS MESSAGE
    ========================================================== */

    function showMessage(message, type) {

        statusMessage.className = "upload-status";

        statusMessage.classList.add(type);

        statusMessage.innerHTML = message;

    }

});