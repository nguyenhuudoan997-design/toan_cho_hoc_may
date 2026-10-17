from app import create_app, db

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        # Tự động tạo các bảng trong database nếu chưa tồn tại
        db.create_all()
        print("Database tables created successfully!")
    
    # Chạy server ở chế độ debug port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)