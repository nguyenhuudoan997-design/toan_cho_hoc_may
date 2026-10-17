import os

class Config:
    # Khóa bảo mật ứng dụng
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'ao-nam-secret-key-super-secure'
    
    # Kết nối MySQL (Thay user, password, tên database cho phù hợp với máy của bạn)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:123456@localhost:3000/new_project'
    # Cấu hình gửi Mail (Dùng cho tính năng quên mật khẩu / gửi mã OTP)
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME') or 'your_email@gmail.com'
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') or 'your_email_app_password'