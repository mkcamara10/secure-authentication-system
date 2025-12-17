# Secure Authentication System 🔒

[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-brightgreen?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A **full-stack secure authentication system** built with a modern React frontend and Node.js/Express backend. Features **glassy/liquid UI effects**, smooth animations, and **robust security practices**. Perfect for production or portfolio showcase.  

---

## 🌟 Features

- **User Registration & Login**
- **Email Verification** via OTP
- **Password Hashing** with bcrypt
- **JWT-based Authentication** (access + refresh tokens)
- **Rate Limiting & Account Lockout** to prevent brute-force attacks
- **CSRF Protection** using `csurf`
- **Input Sanitization & XSS Protection**
- **Secure Headers** with Helmet, CORS configured
- **Admin Endpoints** for user and login activity monitoring (optional)

---

## 🛠 Tech Stack

- **Frontend:** React.js, Vite, CSS (glassy/liquid UI, responsive, animations)  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Security:** bcrypt, JWT, Helmet, csurf, input validation  

---

## ⚙️ Requirements

- Node.js 18+
- MongoDB (local or Atlas)
- SMTP account for email verification  
  *(Development: [Ethereal](https://ethereal.email/))*

---

## 🚀 Quick Start (Development)

1. **Clone the project:**

```bash
git clone https://github.com/<your-new-username>/secure-authentication-system.git
cd secure-authentication-system
````

2. **Backend Setup**

```bash
cd backend
cp .env.example .env
# Fill in .env values: MONGO_URI, JWT secrets, SMTP credentials, CLIENT_URL
npm install
npm run dev
```

3. **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

4. Open frontend at [http://localhost:5173](http://localhost:5173) and backend at [http://localhost:5000](http://localhost:5000).

---

## 💡 Notes

* For email testing in development, use [Ethereal](https://ethereal.email/) or any SMTP provider.
* All files include **`Made by MKCamara`** for attribution.
* Fully responsive, visually appealing, and production-ready.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

Made with ❤️ by **MKCamara**
