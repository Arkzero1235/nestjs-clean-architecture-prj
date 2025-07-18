# 🧱 NestJS Clean Architecture Project

> Một dự án sử dụng **NestJS** kết hợp với **Clean Architecture** để đảm bảo tính mô-đun, dễ mở rộng và bảo trì.

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
<p align="left">
  <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS" width="40" height="40" marginRight="40"/>
  &nbsp;
  <img src="https://www.postgresql.org/media/img/about/press/elephant.png" alt="PostgreSQL" width="40" height="40" marginRight="40"/>
  &nbsp;
  <img src="https://avatars.githubusercontent.com/u/17219288?s=200&v=4" alt="Prisma" width="40" height="40" marginRight="40"/>
  &nbsp;
  <img src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" alt="Docker" width="40" height="40" marginRight="40"/>
</p>

- [NestJS](https://nestjs.com/)
- TypeScript
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Prisma](https://www.prisma.io/docs)
- Class-validator
- Dotenv
- Bcrypt & JWT

## 🔧 Cài đặt và chạy dự án

### 0. Phần mềm yêu cầu

- **Visual Studio Code** ![VSCode](https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,w_256,h_256/https://assets.ubuntu.com/v1/034147e9-code_ozwVHSV.png) 

-  **pgAdmin 4** ![pgAdmin](https://api.nuget.org/v3-flatcontainer/danielcunha.toolkit.postgresql.snakecase/1.1.0/icon)

### 1. Clone project

```bash
git clone https://github.com/Arkzero1235/nestjs-clean-architecture-prj.git
cd nestjs-clean-architecture-prj
```

### 2. Cài đặt package

```bash
npm install
```

### 3. Thiết lập biến môi trường

Tạo file `.env`:

```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/DB_name?schema=public"
JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
JWT_ACCESS_EXPIRES_IN=30s
JWT_REFRESH_EXPIRES_IN=7d
```

### 4. Migrate prisma ORM

```bash
cd lib/infrastructure/database/prisma-orm
npx prisma migrate dev
npx generate prisma
```

### 5. Generate prisma seed 

```bash
npx prisma db seed
```

### 6. Chạy project

```bash
npm run start:dev
```

## 📄 Swagger document

Sau khi chạy server, truy cập:

👉 [http://localhost:3333/api/v1/docs](http://localhost:3333/api/v1/docs)


## ✅ Các chức năng hiện có

- [x] Đăng nhập & đăng ký tài khoản người dùng
- [x] Xác thực JWT (Authentication & Authorization)
- [x] Quản lý tài khoản người dùng, đơn hàng, giỏ hàng, danh mục, sản phẩm, banner, ...

## 🧠 Kiến trúc Clean Architecture

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
