from flask import Blueprint, render_template, request, jsonify, session
from app import db
from app.middlewares.role_middleware import staff_required

chat_bp = Blueprint('chat_staff', __name__, template_folder='../../templates/staff', url_prefix='/staff/chat')

@chat_bp.route('/')
@staff_required
def chat_room():
    # Giao diện chat phiên với khách hàng (hỗ trợ text, ảnh, video, file)
    return render_template('staff/chat/room.html')

@chat_bp.route('/send', methods=['POST'])
@staff_required
def send_message():
    session_id = request.form.get('session_id')
    message_text = request.form.get('message')
    # Xử lý tệp đính kèm (ảnh, video, file) nếu có tải lên qua upload_service
    
    # Lưu tin nhắn với sender_type = 'staff' vào bảng chat_messages
    
    return jsonify({'status': 'success', 'message': 'Đã gửi tin nhắn'})