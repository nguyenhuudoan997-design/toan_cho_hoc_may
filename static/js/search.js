// ==========================================
// MENSTYLE - SEARCH JAVASCRIPT
// ==========================================


document.addEventListener("DOMContentLoaded", function () {

    initSearchForm();
    initAddToCartButtons();

});


// ==========================================
// FORM TÌM KIẾM
// ==========================================

function initSearchForm() {

    const searchForm = document.querySelector(".search-form");

    if (!searchForm) {
        return;
    }


    searchForm.addEventListener("submit", function (event) {

        const input = searchForm.querySelector("input[name='q']");

        if (!input) {
            return;
        }


        const keyword = input.value.trim();


        if (keyword === "") {

            event.preventDefault();

            alert("Vui lòng nhập tên sản phẩm cần tìm.");

            input.focus();

        }

    });

}


// ==========================================
// THÊM VÀO GIỎ
// ==========================================

function initAddToCartButtons() {

    const buttons = document.querySelectorAll(".add-to-cart");


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productName =
                this.dataset.product;


            if (productName) {

                alert(
                    productName +
                    " đã được thêm vào giỏ hàng."
                );

            }

        });

    });

}