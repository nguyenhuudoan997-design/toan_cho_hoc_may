/* ==========================================
   CATEGORIES PAGE
   MENSTYLE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const categoryCards = document.querySelectorAll(".category-card");

    categoryCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.classList.add("hover");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("hover");
        });

    });

});