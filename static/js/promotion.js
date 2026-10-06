document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            alert("Sản phẩm khuyến mãi đã được thêm vào giỏ hàng.");

        });

    });

});