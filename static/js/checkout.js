// ==========================================
// CHECKOUT
// ==========================================

const CART_KEY = "menstyle_cart";


// ==========================================
// LẤY GIỎ HÀNG
// ==========================================

function getCart() {

    const cart = localStorage.getItem(CART_KEY);

    if (!cart) {
        return [];
    }

    try {

        return JSON.parse(cart);

    } catch (error) {

        console.error(
            "Không thể đọc giỏ hàng:",
            error
        );

        return [];

    }

}


// ==========================================
// ĐỊNH DẠNG GIÁ
// ==========================================

function formatPrice(price) {

    return new Intl.NumberFormat("vi-VN").format(price) + "đ";

}


// ==========================================
// HIỂN THỊ ĐƠN HÀNG
// ==========================================

function renderCheckout() {

    const checkoutItems =
        document.getElementById("checkout-items");

    const subtotalElement =
        document.getElementById("subtotal");

    const shippingElement =
        document.getElementById("shipping");

    const totalElement =
        document.getElementById("total");


    if (!checkoutItems) {
        return;
    }


    const cart = getCart();


    // Nếu giỏ hàng trống
    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="empty-checkout">
                <p>Giỏ hàng đang trống.</p>
                <a href="/products">
                    Tiếp tục mua sắm
                </a>
            </div>
        `;

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


    let subtotal = 0;

    checkoutItems.innerHTML = "";


    // Hiển thị từng sản phẩm
    cart.forEach(function (item) {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;


        const checkoutItem =
            document.createElement("div");

        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <div class="checkout-item-image">

                <img
                    src="/static/${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="checkout-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Size: ${item.size}
                </p>

                <p>
                    Số lượng: ${item.quantity}
                </p>

            </div>


            <div class="checkout-item-price">

                ${formatPrice(itemTotal)}

            </div>

        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    // ==========================================
    // PHÍ VẬN CHUYỂN
    // ==========================================

    let shipping = 0;


    if (subtotal > 0 && subtotal < 500000) {

        shipping = 30000;

    }


    // ==========================================
    // TỔNG TIỀN
    // ==========================================

    const total =
        subtotal + shipping;


    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(subtotal);

    }


    if (shippingElement) {

        if (shipping === 0) {

            shippingElement.textContent =
                "Miễn phí";

        } else {

            shippingElement.textContent =
                formatPrice(shipping);

        }

    }


    if (totalElement) {

        totalElement.textContent =
            formatPrice(total);

    }

}


// ==========================================
// KIỂM TRA THÔNG TIN KHÁCH HÀNG
// ==========================================

function validateCustomerInfo() {

    const name =
        document.getElementById("customer-name").value.trim();

    const phone =
        document.getElementById("customer-phone").value.trim();

    const address =
        document.getElementById("customer-address").value.trim();


    if (!name) {

        alert("Vui lòng nhập họ và tên.");

        return false;

    }


    if (!phone) {

        alert("Vui lòng nhập số điện thoại.");

        return false;

    }


    if (!/^[0-9]{10,11}$/.test(phone)) {

        alert(
            "Số điện thoại không hợp lệ."
        );

        return false;

    }


    if (!address) {

        alert(
            "Vui lòng nhập địa chỉ nhận hàng."
        );

        return false;

    }


    return true;

}


// ==========================================
// ĐẶT HÀNG
// ==========================================

function placeOrder() {

    const cart = getCart();


    // Kiểm tra giỏ hàng
    if (cart.length === 0) {

        alert(
            "Giỏ hàng đang trống. Vui lòng thêm sản phẩm."
        );

        window.location.href = "/products";

        return;

    }


    // Kiểm tra thông tin
    if (!validateCustomerInfo()) {

        return;

    }


    // Lấy phương thức thanh toán
    const paymentMethod =
        document.querySelector(
            'input[name="payment-method"]:checked'
        );


    let paymentText =
        "Thanh toán khi nhận hàng";


    if (
        paymentMethod &&
        paymentMethod.value === "bank"
    ) {

        paymentText =
            "Chuyển khoản ngân hàng";

    }


    // Thông tin khách hàng
    const customerName =
        document.getElementById("customer-name").value.trim();

    const customerPhone =
        document.getElementById("customer-phone").value.trim();

    const customerAddress =
        document.getElementById("customer-address").value.trim();


    // ==========================================
    // TẠO MÃ ĐƠN HÀNG
    // ==========================================

    const orderId =
        "MS" +
        Date.now();


    // ==========================================
    // TÍNH TỔNG
    // ==========================================

    let subtotal = 0;


    cart.forEach(function (item) {

        subtotal +=
            item.price * item.quantity;

    });


    let shipping = 0;


    if (subtotal > 0 && subtotal < 500000) {

        shipping = 30000;

    }


    const total =
        subtotal + shipping;


    // ==========================================
    // LƯU ĐƠN HÀNG
    // ==========================================

    const order = {

        id: orderId,

        customer: {

            name: customerName,

            phone: customerPhone,

            address: customerAddress

        },

        paymentMethod: paymentText,

        products: cart,

        subtotal: subtotal,

        shipping: shipping,

        total: total,

        createdAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        "menstyle_last_order",
        JSON.stringify(order)
    );


    // Xóa giỏ hàng
    localStorage.removeItem(CART_KEY);


    // ==========================================
    // THÔNG BÁO
    // ==========================================

    alert(
        "Đặt hàng thành công!\n\n" +
        "Mã đơn hàng: " +
        orderId
    );


    // Chuyển về trang sản phẩm
    window.location.href = "/order-success";

}


// ==========================================
// KHỞI ĐỘNG
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCheckout();


        const placeOrderButton =
            document.getElementById(
                "place-order-button"
            );


        if (placeOrderButton) {

            placeOrderButton.addEventListener(
                "click",
                placeOrder
            );

        }

    }
);