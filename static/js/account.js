/* ==========================================
   ACCOUNT PAGE
   MENSTYLE
========================================== */

const PROFILE_KEY = "menstyle_account";
const ORDER_KEY = "menstyle_last_order";


/* ==========================================
   ACCOUNT MENU
========================================== */

const menuItems =
    document.querySelectorAll(".account-menu-item");

const accountSections =
    document.querySelectorAll(".account-section");

menuItems.forEach(function (button) {

    if (button.id === "logout-button") {
        return;
    }

    button.addEventListener("click", function () {

        const sectionName =
            button.dataset.section;

        menuItems.forEach(function (item) {
            item.classList.remove("active");
        });

        accountSections.forEach(function (section) {
            section.classList.remove("active");
        });

        button.classList.add("active");

        const selectedSection =
            document.getElementById(
                sectionName + "-section"
            );

        if (selectedSection) {
            selectedSection.classList.add("active");
        }
    });
});


/* ==========================================
   PROFILE
========================================== */

function getProfile() {

    const profile =
        localStorage.getItem(PROFILE_KEY);

    if (!profile) {
        return {};
    }

    try {
        return JSON.parse(profile);
    } catch (error) {

        console.error(
            "Không thể đọc thông tin tài khoản:",
            error
        );

        return {};
    }
}


function saveProfile() {

    const name =
        document.getElementById("account-name").value.trim();

    const email =
        document.getElementById("account-email").value.trim();

    const phone =
        document.getElementById("account-phone").value.trim();

    if (!name) {
        alert("Vui lòng nhập họ và tên.");
        return;
    }

    if (email && !email.includes("@")) {
        alert("Email không hợp lệ.");
        return;
    }

    if (
        phone &&
        !/^[0-9]{10,11}$/.test(phone)
    ) {
        alert("Số điện thoại không hợp lệ.");
        return;
    }

    const profile = {
        name: name,
        email: email,
        phone: phone
    };

    localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(profile)
    );

    updateProfileDisplay(profile);

    alert("Đã lưu thông tin tài khoản.");
}


function loadProfile() {

    const profile = getProfile();

    const nameInput =
        document.getElementById("account-name");

    const emailInput =
        document.getElementById("account-email");

    const phoneInput =
        document.getElementById("account-phone");

    if (nameInput) {
        nameInput.value =
            profile.name || "";
    }

    if (emailInput) {
        emailInput.value =
            profile.email || "";
    }

    if (phoneInput) {
        phoneInput.value =
            profile.phone || "";
    }

    updateProfileDisplay(profile);
}


function updateProfileDisplay(profile) {

    const profileName =
        document.querySelector(
            ".profile-info h2"
        );

    const avatar =
        document.querySelector(
            ".profile-avatar"
        );

    if (profileName) {

        profileName.textContent =
            profile.name || "Khách hàng";
    }

    if (avatar) {

        if (profile.name) {
            avatar.textContent =
                profile.name
                    .charAt(0)
                    .toUpperCase();
        } else {
            avatar.textContent = "A";
        }
    }
}


/* ==========================================
   ADDRESS
========================================== */

const ADDRESS_KEY =
    "menstyle_account_address";


function loadAddress() {

    const address =
        localStorage.getItem(
            ADDRESS_KEY
        );

    const addressInput =
        document.getElementById(
            "account-address"
        );

    if (addressInput) {
        addressInput.value =
            address || "";
    }
}


function saveAddress() {

    const address =
        document.getElementById(
            "account-address"
        ).value.trim();

    if (!address) {
        alert(
            "Vui lòng nhập địa chỉ nhận hàng."
        );
        return;
    }

    localStorage.setItem(
        ADDRESS_KEY,
        address
    );

    alert(
        "Đã lưu địa chỉ nhận hàng."
    );
}


/* ==========================================
   CHANGE PASSWORD
========================================== */

function changePassword() {

    const oldPassword =
        document.getElementById(
            "old-password"
        ).value;

    const newPassword =
        document.getElementById(
            "new-password"
        ).value;

    const confirmPassword =
        document.getElementById(
            "confirm-password"
        ).value;

    if (!oldPassword) {
        alert(
            "Vui lòng nhập mật khẩu hiện tại."
        );
        return;
    }

    if (!newPassword) {
        alert(
            "Vui lòng nhập mật khẩu mới."
        );
        return;
    }

    if (newPassword.length < 6) {
        alert(
            "Mật khẩu mới phải có ít nhất 6 ký tự."
        );
        return;
    }

    if (newPassword !== confirmPassword) {
        alert(
            "Mật khẩu xác nhận không khớp."
        );
        return;
    }

    alert(
        "Đổi mật khẩu thành công."
    );

    document.getElementById(
        "old-password"
    ).value = "";

    document.getElementById(
        "new-password"
    ).value = "";

    document.getElementById(
        "confirm-password"
    ).value = "";
}


/* ==========================================
   ORDER HISTORY
========================================== */

function loadOrderHistory() {

    const orderHistory =
        document.getElementById(
            "order-history"
        );

    if (!orderHistory) {
        return;
    }

    const order =
        localStorage.getItem(
            ORDER_KEY
        );

    if (!order) {
        return;
    }

    let orderData;

    try {
        orderData =
            JSON.parse(order);
    } catch (error) {

        console.error(
            "Không thể đọc đơn hàng:",
            error
        );

        return;
    }

    orderHistory.innerHTML = `
        <div class="order-card">

            <div class="order-card-header">
                <div>
                    <span>Mã đơn hàng</span>
                    <strong>${orderData.id || "--"}</strong>
                </div>

                <span class="order-status">
                    Đã đặt hàng
                </span>
            </div>

            <div class="order-card-body">

                <p>
                    <strong>Người nhận:</strong>
                    ${orderData.customer?.name || "--"}
                </p>

                <p>
                    <strong>Địa chỉ:</strong>
                    ${orderData.customer?.address || "--"}
                </p>

                <p>
                    <strong>Thanh toán:</strong>
                    ${orderData.paymentMethod || "--"}
                </p>

                <p>
                    <strong>Tổng tiền:</strong>
                    ${formatPrice(orderData.total || 0)}
                </p>

            </div>

        </div>
    `;
}


/* ==========================================
   FORMAT PRICE
========================================== */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "vi-VN"
    ).format(price) + "đ";
}


/* ==========================================
   LOGOUT
========================================== */

function logout() {

    const confirmLogout =
        confirm(
            "Bạn có chắc muốn đăng xuất?"
        );

    if (!confirmLogout) {
        return;
    }

    alert(
        "Bạn đã đăng xuất."
    );

    window.location.href = "/";
}


/* ==========================================
   EVENT LISTENERS
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProfile();

        loadAddress();

        loadOrderHistory();


        const saveProfileButton =
            document.getElementById(
                "save-profile-button"
            );

        if (saveProfileButton) {

            saveProfileButton.addEventListener(
                "click",
                saveProfile
            );
        }


        const saveAddressButton =
            document.getElementById(
                "save-address-button"
            );

        if (saveAddressButton) {

            saveAddressButton.addEventListener(
                "click",
                saveAddress
            );
        }


        const changePasswordButton =
            document.getElementById(
                "change-password-button"
            );

        if (changePasswordButton) {

            changePasswordButton.addEventListener(
                "click",
                changePassword
            );
        }


        const logoutButton =
            document.getElementById(
                "logout-button"
            );

        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                logout
            );
        }
    }
);