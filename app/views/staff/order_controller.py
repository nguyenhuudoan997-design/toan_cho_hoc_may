from datetime import datetime, date
from flask import Blueprint, render_template, request, redirect, url_for
from sqlalchemy import func
from app import db
from app.models.order import Order
from app.middlewares.role_middleware import staff_required

# Khai báo chính xác biến order_bp để file __init__.py gọi được
order_bp = Blueprint('order_bp', __name__, url_prefix='/staff/orders')

@order_bp.route('/', methods=['GET'])
@staff_required
def list_orders():
    # Trang danh sách quản lý đơn hàng của nhân viên
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return render_template('staff/orders.html', orders=orders)

@order_bp.route('/dashboard', methods=['GET'])
@staff_required
def dashboard():
    today = date.today()
    
    # 1. Thống kê đơn hàng trong ngày
    total_orders_today = Order.query.filter(func.date(Order.created_at) == today).count()
    
    # 2. Số đơn hàng đã xử lý trong ngày (trạng thái khác 'Chờ xác nhận')
    processed_orders_today = Order.query.filter(
        func.date(Order.created_at) == today,
        Order.order_status != 'Chờ xác nhận'
    ).count()
    
    # 3. Tổng doanh thu trong ngày
    revenue_today = db.session.query(func.sum(Order.final_amount)).filter(
        func.date(Order.created_at) == today,
        Order.order_status.in_(['Đã giao', 'Hoàn thành'])
    ).scalar() or 0

    # 4. Danh sách các đơn hàng mới nhất cần xử lý
    pending_orders = Order.query.filter_by(order_status='Chờ xác nhận').order_by(Order.created_at.desc()).limit(5).all()

    return render_template('staff/dashboard.html', 
                           total_orders=total_orders_today,
                           processed_orders=processed_orders_today,
                           revenue=revenue_today,
                           pending_orders=pending_orders)