from flask import Blueprint, render_template, request, redirect, url_for, flash
from werkzeug.security import generate_password_hash
from app import db
from app.models.user import User
from app.middlewares.role_middleware import staff_required

customer_bp = Blueprint('customer_staff', __name__, template_folder='../../templates/staff', url_prefix='/staff/customers')

@customer_bp.route('/create', methods=['GET', 'POST'])
@staff_required
def create_customer():
    if request.method == 'POST':
        full_name = request.form.get('full_name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        password = request.form.get('password', '12345678') # Mật khẩu mặc định nếu nhân viên tạo hộ
        
        # Kiểm tra email đã tồn tại chưa
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Email này đã được đăng ký trong hệ thống!', 'danger')
            return redirect(url_for('customer_staff.create_customer'))
            
        # Tạo mới khách hàng (role_id = 3 tương ứng với Khách hàng)
        new_customer = User(
            role_id=3,
            full_name=full_name,
            email=email,
            phone=phone,
            password_hash=generate_password_hash(password),
            status='active',
            is_verified=True
        )
        
        db.session.add(new_customer)
        db.session.commit()
        
        flash('Thêm mới khách hàng thành công!', 'success')
        return redirect(url_for('customer_staff.create_customer'))
        
    return render_template('staff/customers/create.html')