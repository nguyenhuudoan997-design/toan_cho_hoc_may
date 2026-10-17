from functools import wraps
from flask import session, redirect, url_for, flash

def staff_required(f):
    """
    Decorator kiểm tra quyền nhân viên hoặc admin.
    Dựa trên thông tin lưu trong session (ví dụ: session['user_id'] và session['role_id']).
    Theo yêu cầu: Nhân viên có role_id tương ứng (hoặc name = 'Nhân viên' / 'Admin').
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Kiểm tra xem người dùng đã đăng nhập chưa
        if 'user_id' not in session:
            flash('Vui lòng đăng nhập để tiếp tục.', 'warning')
            return redirect(url_for('auth.login')) # Chuyển hướng về trang đăng nhập
        
        # Kiểm tra role_id của nhân viên (ví dụ role_id = 1 hoặc tùy chỉnh theo database của bạn)
        # Giả sử role_id == 1 là Admin/Nhân viên như trong tài liệu của bạn
        user_role = session.get('role_id')
        
        # Bạn có thể điều chỉnh điều kiện này tùy thuộc vào cách phân chia ID role trong bảng roles
        # Ví dụ: cho phép cả Nhân viên (role_id = 1 hoặc 2) truy cập
        if user_role not in [1, 2]: 
            flash('Bạn không có quyền truy cập vào khu vực này!', 'danger')
            return redirect(url_for('auth.login'))
            
        return f(*args, **kwargs)
    return decorated_function