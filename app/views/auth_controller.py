from datetime import datetime, timedelta
import random
from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from werkzeug.security import check_password_hash, generate_password_hash
from flask_mail import Message
from app import db, mail
from app.models.user import User, PasswordReset

auth_bp = Blueprint('auth', __name__, template_folder='../templates')

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        # Tìm user theo email
        user = User.query.filter_by(email=email).first()
        
        # Kiểm tra mật khẩu và xác thực tài khoản/role nhân viên
        if user and check_password_hash(user.password_hash, password):
            if user.status == 'locked':
                flash('Tài khoản của bạn đã bị khóa!', 'danger')
                return redirect(url_for('auth.login'))
            
            # Lưu thông tin vào session
            session['user_id'] = user.id
            session['role_id'] = user.role_id
            session['full_name'] = user.full_name
            
            flash('Đăng nhập thành công!', 'success')
            
            # Nếu là nhân viên/admin (role_id = 1 hoặc 2), chuyển hướng về trang quản lý/dashboard
            if user.role_id in [1, 2]:
                return redirect(url_for('staff.dashboard')) # Sẽ tạo ở các bước sau
            else:
                return redirect(url_for('auth.login')) # Hoặc trang chủ khách hàng
        else:
            flash('Email hoặc mật khẩu không chính xác!', 'danger')
            
    return render_template('auth/login.html')

@auth_bp.route('/logout')
def logout():
    session.clear()
    flash('Đã đăng xuất thành công.', 'info')
    return redirect(url_for('auth.login'))

@auth_bp.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form.get('email')
        user = User.query.filter_by(email=email).first()
        
        if not user:
            flash('Email này không tồn tại trong hệ thống!', 'danger')
            return redirect(url_for('auth.forgot_password'))
        
        # Sinh mã OTP ngẫu nhiên 6 chữ số
        otp_code = str(random.randint(100000, 999999))
        expires_at = datetime.utcnow() + timedelta(minutes=15) # Hạn 15 phút
        
        # Lưu vào bảng password_resets
        reset_entry = PasswordReset(email=email, otp_code=otp_code, expires_at=expires_at)
        db.session.add(reset_entry)
        db.session.commit()
        
        # Gửi email chứa mã OTP
        try:
            msg = Message('Mã xác thực khôi phục mật khẩu - Quản lý Áo Nam',
                          sender='your_email@gmail.com',
                          recipients=[email])
            msg.body = f'Mã OTP khôi phục mật khẩu của bạn là: {otp_code}. Mã có hiệu lực trong 15 phút.'
            mail.send(msg)
            
            session['reset_email'] = email
            flash('Mã OTP đã được gửi đến email của bạn!', 'success')
            return redirect(url_for('auth.verify_otp'))
        except Exception as e:
            flash(f'Lỗi khi gửi email: {str(e)}', 'danger')
            
    return render_template('auth/forgot_password.html')

@auth_bp.route('/verify-otp', methods=['GET', 'POST'])
def verify_otp():
    if 'reset_email' not in session:
        return redirect(url_for('auth.forgot_password'))
        
    if request.method == 'POST':
        otp_code = request.form.get('otp_code')
        new_password = request.form.get('new_password')
        email = session['reset_email']
        
        # Kiểm tra mã OTP trong database
        reset_record = PasswordReset.query.filter_by(email=email, otp_code=otp_code).order_by(PasswordReset.created_at.desc()).first()
        
        if not reset_record or datetime.utcnow() > reset_record.expires_at:
            flash('Mã OTP không chính xác hoặc đã hết hạn!', 'danger')
            return redirect(url_for('auth.verify_otp'))
            
        # Cập nhật mật khẩu mới cho user
        user = User.query.filter_by(email=email).first()
        if user:
            user.password_hash = generate_password_hash(new_password)
            db.session.commit()
            
            # Xóa session tạm
            session.pop('reset_email', None)
            flash('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.', 'success')
            return redirect(url_for('auth.login'))
            
    return render_template('auth/verify_otp.html') # Hoặc form kết hợp