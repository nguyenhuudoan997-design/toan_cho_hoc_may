from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from app.config import Config

# Khởi tạo các extension toàn cục
db = SQLAlchemy()
mail = Mail()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Khởi tạo extension với ứng dụng
    db.init_app(app)
    mail.init_app(app)

    # Đăng ký Blueprint Xác thực (Auth)
    from app.views.auth_controller import auth_bp
    app.register_blueprint(auth_bp)

    # Đăng ký các Blueprint thuộc khu vực nhân viên (Staff)
    from app.views.staff.order_controller import order_bp
    from app.views.staff.customer_controller import customer_bp
    from app.views.staff.review_controller import review_bp
    from app.views.staff.chat_controller import chat_bp
    from app.views.staff.stats_controller import stats_bp

    app.register_blueprint(order_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(review_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(stats_bp)

    return app