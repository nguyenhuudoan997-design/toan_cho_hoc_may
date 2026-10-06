// ==========================================
// PRODUCT DETAIL
// ==========================================

const CART_KEY = "menstyle_cart";


// ==========================================
// SIZE
// ==========================================

let selectedSize = "";


const sizeButtons = document.querySelectorAll(".size-button");


sizeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Bỏ chọn tất cả size
        sizeButtons.forEach(function (item) {
            item.classList.remove("selected");
        });

        // Chọn size hiện tại
        button.classList.add("selected");

        selectedSize = button.dataset.size;
    });

});


// ==========================================
// QUANTITY
// ==========================================

const quantityInput = document.getElementById("quantity");
const decreaseButton = document.getElementById("decrease-quantity");
const increaseButton = document.getElementById("increase-quantity");


if (decreaseButton) {

    decreaseButton.addEventListener("click", function () {

        let quantity = parseInt(quantityInput.value);

        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
        }

    });

}


if (increaseButton) {

    increaseButton.addEventListener("click", function () {

        let quantity = parseInt(quantityInput.value);

        quantity++;

        quantityInput.value = quantity;

    });

}


// ==========================================
// GET CART
// ==========================================

function getCart() {

    const cart = localStorage.getItem(CART_KEY);

    if (!cart) {
        return [];
    }

    try {

        return JSON.parse(cart);

    } catch (error) {

        console.error("Không thể đọc giỏ hàng:", error);

        return [];

    }

}


// ==========================================
// SAVE CART
// ==========================================

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(redirectToCart = false) {

    const addButton = document.getElementById("add-to-cart");

    if (!addButton) {
        return;
    }


    // Kiểm tra size
    if (!selectedSize) {

        alert("Vui lòng chọn kích thước.");

        return;

    }


    // Lấy thông tin sản phẩm từ HTML
    const productId = Number(addButton.dataset.id);
    const productName = addButton.dataset.name;
    const productCategory = addButton.dataset.category;
    const productPrice = Number(addButton.dataset.price);
    const productImage = addButton.dataset.image;


    // Lấy số lượng
    const quantity = Number(quantityInput.value);


    // Lấy giỏ hàng hiện tại
    const cart = getCart();


    // Tìm sản phẩm cùng ID và cùng size
    const existingProduct = cart.find(function (item) {

        return (
            Number(item.id) === productId &&
            item.size === selectedSize
        );

    });


    if (existingProduct) {

        // Nếu đã có → tăng số lượng
        existingProduct.quantity += quantity;

    } else {

        // Nếu chưa có → thêm sản phẩm mới
        cart.push({

            id: productId,

            name: productName,

            category: productCategory,

            price: productPrice,

            image: productImage,

            size: selectedSize,

            quantity: quantity

        });

    }


    // Lưu giỏ hàng
    saveCart(cart);


    // Thông báo
    if (redirectToCart) {

        window.location.href = "/cart";

    } else {

        alert(
            "Đã thêm sản phẩm vào giỏ hàng."
        );

    }

}


// ==========================================
// BUTTON: THÊM VÀO GIỎ
// ==========================================

const addToCartButton = document.getElementById("add-to-cart");


if (addToCartButton) {

    addToCartButton.addEventListener(
        "click",
        function () {

            addToCart(false);

        }
    );

}


// ==========================================
// BUTTON: MUA NGAY
// ==========================================

const buyNowButton = document.getElementById("buy-now");


if (buyNowButton) {

    buyNowButton.addEventListener(
        "click",
        function () {

            addToCart(true);

        }
    );

}