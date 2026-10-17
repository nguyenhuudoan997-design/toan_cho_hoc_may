from datetime import datetime
from app import db

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_code = db.Column(db.String(50), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    handler_id = db.Column(db.Integer, db.ForeignKey('users.id')) # Nhân viên/Admin xử lý đơn
    
    recipient_name = db.Column(db.String(100), nullable=False)
    recipient_phone = db.Column(db.String(20), nullable=False)
    shipping_address = db.Column(db.Text, nullable=False)
    
    total_amount = db.Column(db.Numeric(12, 2), nullable=False)
    discount_amount = db.Column(db.Numeric(12, 2), default=0)
    final_amount = db.Column(db.Numeric(12, 2), nullable=False)
    
    payment_method = db.Column(db.String(50)) # COD, Momo, VNPay
    payment_status = db.Column(db.String(30), default='pending') # pending, paid, failed
    order_status = db.Column(db.String(50), default='Chờ xác nhận') # Chờ xác nhận -> Chờ lấy hàng -> Đang giao -> Đã giao -> Hoàn thành / Hoàn trả / Hủy
    
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Quan hệ
    status_logs = db.relationship('OrderStatusLog', backref='order', lazy=True)

class OrderStatusLog(db.Model):
    __tablename__ = 'order_status_logs'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    staff_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) # Nhân viên thực hiện cập nhật
    old_status = db.Column(db.String(50))
    new_status = db.Column(db.String(50))
    note = db.Column(db.Text) # Lý do hoàn trả / ghi chú
    proof_images = db.Column(db.Text) # Ảnh minh chứng khi hoàn trả
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

class ReturnRequest(db.Model):
    __tablename__ = 'return_requests'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    handler_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    reason = db.Column(db.Text, nullable=False)
    proof_images = db.Column(db.Text)
    status = db.Column(db.String(30), default='Chờ duyệt') # Chờ duyệt, Đồng ý, Từ chối, Kho đã nhận, Đã hoàn tiền
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)