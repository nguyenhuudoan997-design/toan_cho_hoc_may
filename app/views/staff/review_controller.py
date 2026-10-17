from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from app import db
# Giả định bạn đã có models/product.py chứa các bảng reviews, review_replies
# Nếu chưa định nghĩa model, bạn có thể tạo mô hình tương ứng trong thư mục models
from app.middlewares.role_middleware import staff_required

review_bp = Blueprint('review_staff', __name__, template_folder='../../templates/staff', url_prefix='/staff/reviews')

@review_bp.route('/')
@staff_required
def index():
    # Xem danh sách đánh giá, sao, ảnh/video thực tế
    # (Kết nối tới bảng reviews trong database của bạn)
    return render_template('staff/reviews/index.html')

@review_bp.route('/<int:review_id>/reply', methods=['POST'])
@staff_required
def reply_review(review_id):
    staff_id = session.get('user_id')
    reply_text = request.form.get('reply_text')
    
    # Thêm phản hồi của nhân viên vào bảng review_replies
    # ... (code thêm vào DB)
    
    flash('Đã gửi phản hồi đánh giá thành công!', 'success')
    return redirect(url_for('review_staff.index'))

@review_bp.route('/<int:review_id>/toggle-hide', methods=['POST'])
@staff_required
def toggle_hide_review(review_id):
    # Logic ẩn/hiện bình luận (is_hidden = True/False)
    flash('Đã cập nhật trạng thái hiển thị bình luận!', 'success')
    return redirect(url_for('review_staff.index'))