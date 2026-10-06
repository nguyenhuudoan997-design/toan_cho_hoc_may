/* ==========================================
   MENSTYLE - CART
========================================== */


/* ==========================================
   CART STORAGE KEY
========================================== */

const CART_KEY = "menstyle_cart";


/* ==========================================
   GET CART
========================================== */

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


/* ==========================================
   SAVE CART
========================================== */

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* ==========================================
   FORMAT PRICE
========================================== */

function formatPrice(price) {

    return new Intl.NumberFormat("vi-VN").format(price) + "đ";

}


/* ==========================================
   RENDER CART
========================================== */

function renderCart() {

    const cartItems = document.getElementById("cart-items");
    const emptyCart = document.getElementById("empty-cart");

    const subtotalElement = document.getElementById("subtotal");
    const shippingElement = document.getElementById("shipping");
    const totalElement = document.getElementById("total");


    if (!cartItems) {
        return;
    }


    const cart = getCart();


    /* --------------------------------------
       CART EMPTY
    -------------------------------------- */

    if (cart.length === 0) {

        cartItems.innerHTML = "";

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        if (subtotalElement) {
            subtotalElement.textContent = "0đ";
        }

        if (shippingElement) {
            shippingElement.textContent = "0đ";
        }

        if (totalElement) {
            totalElement.textContent = "0đ";
        }

        return;

    }


    /* --------------------------------------
       CART HAS PRODUCTS
    -------------------------------------- */

    if (emptyCart) {
        emptyCart.style.display = "none";
    }


    let subtotal = 0;


    cartItems.innerHTML = "";


    cart.forEach(function (item, index) {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;


        const cartItem = document.createElement("article");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product">

                <div class="cart-product-image">

                    <img
                        src="/static/${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="cart-product-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Danh mục: ${item.category}
                    </p>

                    <p>
                        Size: ${item.size}
                    </p>

                </div>

            </div>


            <div class="cart-price">

                ${formatPrice(item.price)}

            </div>


            <div class="cart-quantity">

                <button
                    type="button"
                    class="quantity-button"
                    onclick="decreaseQuantity(${index})"
                >
                    −
                </button>


                <span class="quantity-value">

                    ${item.quantity}

                </span>


                <button
                    type="button"
                    class="quantity-button"
                    onclick="increaseQuantity(${index})"
                >
                    +
                </button>

            </div>


            <div class="cart-item-total">

                ${formatPrice(itemTotal)}

            </div>


            <button
                type="button"
                class="remove-button"
                onclick="removeItem(${index})"
                title="Xóa sản phẩm"
            >
                ×
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    /* --------------------------------------
       SHIPPING
    -------------------------------------- */

    let shipping = 0;


    /*
       Miễn phí vận chuyển
       khi đơn hàng từ 500.000đ
    */

    if (subtotal > 0 && subtotal < 500000) {

        shipping = 30000;

    }


    const total = subtotal + shipping;


    /* --------------------------------------
       UPDATE SUMMARY
    -------------------------------------- */

    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(subtotal);

    }


    if (shippingElement) {

        shippingElement.textContent =
            shipping === 0
                ? "Miễn phí"
                : formatPrice(shipping);

    }


    if (totalElement) {

        totalElement.textContent =
            formatPrice(total);

    }

}


/* ==========================================
   INCREASE QUANTITY
========================================== */

function increaseQuantity(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    cart[index].quantity += 1;


    saveCart(cart);

    renderCart();

}


/* ==========================================
   DECREASE QUANTITY
========================================== */

function decreaseQuantity(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        const shouldRemove = confirm(
            "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?"
        );


        if (shouldRemove) {

            cart.splice(index, 1);

        }

    }


    saveCart(cart);

    renderCart();

}


/* ==========================================
   REMOVE ITEM
========================================== */

function removeItem(index) {

    const cart = getCart();


    if (!cart[index]) {
        return;
    }


    const shouldRemove = confirm(
        "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?"
    );


    if (!shouldRemove) {
        return;
    }


    cart.splice(index, 1);


    saveCart(cart);

    renderCart();

}


/* ==========================================
   CHECKOUT
========================================== */

function checkout() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
        return;
    }

    window.location.href = "/checkout";
}

/* ==========================================
   EVENT: CHECKOUT BUTTON
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCart();


        const checkoutButton =
            document.getElementById("checkout-button");


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                checkout
            );

        }

    }
);