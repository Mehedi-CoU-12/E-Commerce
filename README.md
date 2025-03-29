# E-Commerce Website

This is a **complete MERN stack e-commerce project** with authentication, payment integration, and cloud storage. The project includes essential features such as product management, user authentication, order processing, and payments using **Stripe**.

## 🛠 Tech Stack

- **Frontend**: React.js, Redux Toolkit (RTK)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Stripe
- **File Storage**: Cloudinary
- **Environment Variables**: .env for secure configuration

## ✨ Features

- 🔒 User Authentication (Register/Login/Logout with JWT & Cookies)
- 📦 Product Management (CRUD operations for products)
- 🛍️ Shopping Cart (Add/Remove products, update quantity)
- 💳 Secure Payments (Stripe integration)
- 📸 Image Uploads (Cloudinary integration for storing product images)
- 🛒 Order Management (Place orders, track order status)
- 🛠 Admin Panel (Manage users, products, and orders)
- 📧 Email Notifications (SMTP setup for password recovery)

## 🚀 Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/Mehedi-CoU-12/ecommerce-mern.git
cd ecommerce-mern
```

### 2️⃣ Install Dependencies
#### Backend:
```sh
npm install
```
#### Frontend:
```sh
cd frontend
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file inside the `backend/config/` directory and add the following variables:
```env
PORT=5000
DB_URI=your_mongodb_connection_string
STRIPE_API_KEY=your_stripe_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
SMTP_SERVICE=gmail
SMTP_MAIL=your_email
SMTP_PASSWORD=your_email_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
```

### 4️⃣ Start the Application
#### Run Backend:
```sh
npm start
```
#### Run Frontend:
```sh
cd frontend
npm start
```

## 📸 Screenshots
_(Add screenshots of your project UI here)_

## 📜 API Endpoints
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/payment/stripe` - Process payment with Stripe
- `GET /api/v1/products` - Get all products
- `POST /api/v1/orders` - Create a new order
_(More API endpoints documented in the code)_

## 🌎 Deployment
_(Add deployment details if hosted on Vercel, Heroku, Render, etc.)_

## 🤝 Contributing
Feel free to fork this repository and contribute by submitting a pull request!

## 📧 Contact
- **GitHub**: [Mehedi-CoU-12](https://github.com/Mehedi-CoU-12)
- **Email**: mehedihasana383@gmail.com


