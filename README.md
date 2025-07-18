# 🧱 NestJS Clean Architecture Project

> Một dự án sử dụng **NestJS** kết hợp với **Clean Architecture** để đảm bảo tính mô-đun, dễ mở rộng và bảo trì lâu dài.

## 📌 Mục tiêu

Dự án nhằm xây dựng một hệ thống backend chuẩn hóa theo kiến trúc Clean Architecture, tách biệt rõ ràng các tầng:

- **Domain** (Business logic)
- **Application / Use cases**
- **Infrastructure**
- **Presentation (Controllers)**

## 📁 Cấu trúc thư mục

```
lib/
├── domain/              # Entities, Interfaces, Repositories
│   ├── entities/
│   └── repositories/
│
├── application/         # Use Cases, DTOs, Interfaces
│   ├── use-cases/
│   └── dto/
│
├── infrastructure/      # Giao tiếp với DB, API bên ngoài
│   ├── database/
│   └── services/
│
├── presentation/        # Controllers, Request handlers
│
│
└── main.ts              # Entry point
```

## 🚀 Công nghệ sử dụng

- [NestJS](https://nestjs.com/)
- TypeScript
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Prisma](https://www.prisma.io/docs)
- Class-validator
- Dotenv
- Bcrypt & JWT

## 🔧 Cài đặt và chạy dự án

### 1. Clone dự án

```bash
git clone https://github.com/tenban/nestjs-clean-architecture.git
cd nestjs-clean-architecture
```

### 2. Cài đặt package

```bash
npm install
```

### 3. Thiết lập biến môi trường

Tạo file `.env`:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/db_name
JWT_SECRET=your_jwt_secret
```

### 4. Chạy project

```bash
npm run start:dev
```

### 5. Migrate DB (nếu dùng Prisma)

```bash
npx prisma migrate dev
```

## 🧪 Testing

```bash
npm run test
```

## ✅ Các chức năng hiện có

- [x] Đăng nhập & đăng ký tài khoản người dùng
- [x] Xác thực JWT (Authentication & Authorization)
- [x] Quản lý tài khoản người dùng, đơn hàng, giỏ hàng, danh mục, sản phẩm, banner, ...

## 🧠 Kiến trúc Clean

Clean Architecture giúp:

- Tách biệt **logic nghiệp vụ** khỏi **framework** hay **cơ sở dữ liệu**
- Dễ **unit test**
- Dễ mở rộng hoặc thay thế 1 phần như database, UI, service...

## 📌 Tài liệu tham khảo

- [Clean Architecture - Uncle Bob](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Awesome NestJS Clean Architecture Example](https://github.com/jmcdo29/clean-nest)

---

> ✨ Tác giả [BuiXuanDung]([https://github.com/your-profile](https://github.com/Arkzero1235))
