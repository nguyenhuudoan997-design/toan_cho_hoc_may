/* ==========================================
   ORDER SUCCESS
   MENSTYLE
========================================== */

const ORDER_KEY = "menstyle_last_order";


/* ==========================================
   FORMAT PRICE
========================================== */

function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}


/* ==========================================
   GET LAST ORDER
========================================== */

function getLastOrder() {
    const order = localStorage.getItem(ORDER_KEY);

    if (!order) {
        return null;
    }

    try {
        return JSON.parse(order);
    } catch (error) {
        console.error(
            "Không thể đọc thông tin đơn hàng:",
            error
        );

        return null;
    }
}


/* ==========================================
   DISPLAY ORDER
========================================== */

function renderOrderSuccess() {
    const order = getLastOrder();

    if (!order) {
        alert(
            "Không tìm thấy thông tin đơn hàng."
        );

        window.location.href = "/products";

        return;
    }


    /* MÃ ĐƠN HÀNG */

    const orderId =
        document.getElementById("order-id");

    if (orderId) {
        orderId.textContent =
            order.id || "--";
    }


    /* TÊN KHÁCH HÀNG */

    const customerName =
        document.getElementById("customer-name");

    if (customerName) {
        customerName.textContent =
            order.customer?.name || "--";
    }


    /* SỐ ĐIỆN THOẠI */

    const customerPhone =
        document.getElementById("customer-phone");

    if (customerPhone) {
        customerPhone.textContent =
            order.customer?.phone || "--";
    }


    /* ĐỊA CHỈ */

    const customerAddress =
        document.getElementById("customer-address");

    if (customerAddress) {
        customerAddress.textContent =
            order.customer?.address || "--";
    }


    /* PHƯƠNG THỨC THANH TOÁN */

    const paymentMethod =
        document.getElementById("payment-method");

    if (paymentMethod) {
        paymentMethod.textContent =
            order.paymentMethod || "--";
    }


    /* TỔNG TIỀN */

    const orderTotal =
        document.getElementById("order-total");

    if (orderTotal) {
        orderTotal.textContent =
            formatPrice(order.total || 0);
    }
}


/* ==========================================
   PAGE LOAD
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {
        renderOrderSuccess();
    }
);