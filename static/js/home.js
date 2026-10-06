// ==========================================
// MENSTYLE - HOME JAVASCRIPT
// ==========================================


// ==========================================
// 1. CHỜ TRANG HTML TẢI XONG
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Khởi tạo các chức năng của trang Home
    initSmoothScroll();
    initSearchButton();
    initAccountButton();
    initCartButton();
    initAddToCartButtons();

});


// ==========================================
// 2. CUỘN MƯỢT ĐẾN CÁC KHU VỰC
// ==========================================

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

}


// ==========================================
// 3. NÚT TÌM KIẾM
// ==========================================

function initSearchButton() {

    const searchButton = document.querySelector(".search-button");

    if (!searchButton) {
        return;
    }

    searchButton.addEventListener("click", function () {

        alert("Chức năng tìm kiếm sẽ được phát triển ở bước tiếp theo.");

    });

}


// ==========================================
// 4. NÚT TÀI KHOẢN
// ==========================================

function initAccountButton() {

    const accountButton = document.querySelector(".account-button");

    if (!accountButton) {
        return;
    }

    accountButton.addEventListener("click", function () {

        alert("Chức năng tài khoản sẽ được phát triển ở bước tiếp theo.");

    });

}


// ==========================================
// 5. NÚT GIỎ HÀNG
// ==========================================

function initCartButton() {

    const cartButton = document.querySelector(".cart-button");

    if (!cartButton) {
        return;
    }

    cartButton.addEventListener("click", function () {

        alert("Giỏ hàng hiện đang trống.");

    });

}


// ==========================================
// 6. NÚT "THÊM VÀO GIỎ"
// ==========================================

function initAddToCartButtons() {

    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productName = this.dataset.product;

            if (productName) {

                alert(
                    productName +
                    " đã được thêm vào giỏ hàng."
                );

            } else {

                alert("Sản phẩm đã được thêm vào giỏ hàng.");

            }

        });

    });

}