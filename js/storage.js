/* ==========================================================
   CUSTOMER FEEDBACK ANALYZER
   STORAGE MANAGER

   This file is responsible for storing and retrieving
   data used throughout the application.

   Every page communicates with this file instead of
   accessing localStorage directly.

   If we later switch to PHP + MySQL,
   this is the only file that will need major changes.
========================================================== */

const Storage = {

    /* ======================================================
       STORAGE KEYS
    ====================================================== */

    REVIEW_KEY: "customer_reviews",

    ANALYSIS_KEY: "sentiment_analysis",

    SETTINGS_KEY: "admin_settings",

    /* ======================================================
       REVIEW FUNCTIONS
    ====================================================== */

    saveReviews(reviews){

        localStorage.setItem(

            this.REVIEW_KEY,

            JSON.stringify(reviews)

        );

    },

    getReviews(){

        const reviews = localStorage.getItem(

            this.REVIEW_KEY

        );

        return reviews ? JSON.parse(reviews) : [];

    },

    clearReviews(){

        localStorage.removeItem(

            this.REVIEW_KEY

        );

    },

    /* ======================================================
       ANALYSIS FUNCTIONS
    ====================================================== */

    saveAnalysis(results){

        localStorage.setItem(

            this.ANALYSIS_KEY,

            JSON.stringify(results)

        );

    },

    getAnalysis(){

        const analysis = localStorage.getItem(

            this.ANALYSIS_KEY

        );

        return analysis ? JSON.parse(analysis) : null;

    },

    clearAnalysis(){

        localStorage.removeItem(

            this.ANALYSIS_KEY

        );

    },

    /* ======================================================
       SETTINGS
    ====================================================== */

    saveSettings(settings){

        localStorage.setItem(

            this.SETTINGS_KEY,

            JSON.stringify(settings)

        );

    },

    getSettings(){

        const settings = localStorage.getItem(

            this.SETTINGS_KEY

        );

        return settings ? JSON.parse(settings) : {};

    },

    clearSettings(){

        localStorage.removeItem(

            this.SETTINGS_KEY

        );

    },

    /* ======================================================
       RESET APPLICATION
    ====================================================== */

    clearAll(){

        this.clearReviews();

        this.clearAnalysis();

        this.clearSettings();

    }

};