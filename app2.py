from flask import Flask, render_template, request

app = Flask(__name__)


# ==========================================
# DỮ LIỆU SẢN PHẨM
# ==========================================

products = [
    {
        "id": 1,
        "name": "Áo thun basic đen",
        "category": "Áo nam",
        "price": 249000,
        "old_price": 299000,
        "image": "images/products/product-1.png"
    },
    {
        "id": 2,
        "name": "Áo sơ mi trắng",
        "category": "Áo nam",
        "price": 329000,
        "old_price": 399000,
        "image": "images/products/product-2.png"
    },
    {
        "id": 3,
        "name": "Quần jeans xanh",
        "category": "Quần nam",
        "price": 499000,
        "old_price": 599000,
        "image": "images/products/product-3.png"
    },
    {
        "id": 4,
        "name": "Áo khoác nam basic",
        "category": "Áo khoác",
        "price": 699000,
        "old_price": 799000,
        "image": "images/products/product-4.png"
    }
]


# ==========================================
# TRANG HOME
# ==========================================

@app.route("/")
def home():
    return render_template("home.html")


# ==========================================
# TRANG TÌM KIẾM
# ==========================================

@app.route("/search")
def search():

    keyword = request.args.get("q", "").strip()

    results = []

    if keyword:

        keyword_lower = keyword.lower()

        for product in products:

            if (
                keyword_lower in product["name"].lower()
                or keyword_lower in product["category"].lower()
            ):
                results.append(product)

    return render_template(
        "search.html",
        keyword=keyword,
        results=results
    )
    
# ==========================================
# TRANG DANH MỤC
# ==========================================

@app.route("/category")
def categories():
    return render_template("categories.html")

# ==========================================
# TRANG SẢN PHẨM THEO DANH MỤC
# ==========================================

@app.route("/category/<category_name>")
def category(category_name):

    results = []

    for product in products:
        if product["category"].lower() == category_name.lower():
            results.append(product)

    return render_template(
        "category.html",
        category_name=category_name,
        results=results
    )
    
# ==========================================
# TRANG TẤT CẢ SẢN PHẨM
# ==========================================

@app.route("/products")
def all_products():
    return render_template(
        "products.html",
        products=products
    )
    
@app.route("/promotion")
def promotion():
    promotion_products = []

    for product in products:
        if product["old_price"] > product["price"]:
            discount = round(
                (product["old_price"] - product["price"])
                / product["old_price"] * 100
            )

            promotion_product = product.copy()
            promotion_product["discount"] = discount

            promotion_products.append(promotion_product)

    return render_template(
        "promotion.html",
        products=promotion_products
    )
    
@app.route("/product/<int:product_id>")
def product_detail(product_id):
    product = None

    for item in products:
        if item["id"] == product_id:
            product = item
            break

    if product is None:
        return "Không tìm thấy sản phẩm", 404

    return render_template(
        "product-detail.html",
        product=product
    )

# ==========================================
# CART
# ==========================================

@app.route("/cart")
def cart():
    return render_template("cart.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

@app.route("/order-success")
def order_success():
    return render_template("order-success.html")

@app.route("/account")
def account():
    return render_template("account.html")

# ==========================================
# CHẠY ỨNG DỤNG
# ==========================================

if __name__ == "__main__":
    app.run(debug=True)