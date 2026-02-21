# 🎓 Campus Sphere - University IT Portal

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MUI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)
[![WebSockets](https://img.shields.io/badge/WebSockets-STOMP-orange?style=for-the-badge)](https://stomp-js.github.io/stompjs/)

**Campus Sphere** is a modern, enterprise-grade university management frontend designed for IT departments. It features a robust role-based access control (RBAC) system, real-time notifications, and a streamlined onboarding process for students and administrators.

---

## 🚀 Key Features

### 🔐 Advanced Authentication & RBAC
- **Multi-Role Support:** Specialized dashboards for `STUDENT`, `FACULTY`, `DEPT_ADMIN`, `COLLEGE_ADMIN`, and `SUPER_ADMIN`.
- **JWT Integration:** Secure session management with automatic JWT decoding to enforce route protection and identity persistence.
- **Secure Onboarding:** Student registration with email OTP verification and hierarchical selection (College → Department).

### 🔔 Real-Time Notification System
- **Live Updates:** Integrated with **SockJS** and **STOMP** for instant, push-based notifications.
- **Notification Center:** A dedicated history view that merges real-time alerts with persistent database records.
- **Interactive Feedback:** Global toast notifications for immediate user feedback on background events.

### 🎨 Modern UI/UX
- **Hybrid Styling:** Combines the utility of **Tailwind CSS** with the component richness of **Material UI (MUI)**.
- **Responsive Layout:** A flexible side-navigation architecture that works seamlessly across mobile, tablet, and desktop.
- **Global Error Handling:** Smart Axios interceptors that handle network failures, session timeouts, and forced password resets centrally.

---

## 🛠️ Tech Stack

- **Framework:** React 18 (Vite)
- **State Management:** React Context API
- **Routing:** React Router v6
- **Styling:** Tailwind CSS + Material UI v5
- **Networking:** Axios with Global Interceptors
- **Real-time:** STOMP.js + SockJS-client
- **Security:** jwt-decode

---

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── assets/             # Static assets & images
│   ├── components/         # Reusable UI components
│   ├── context/            # AuthContext & Global State
│   ├── hooks/              # Custom hooks (e.g., useNotifications)
│   ├── layouts/            # MainLayout with Sidebar/Navbar
│   ├── pages/              # View components (Dashboards, Auth, etc.)
│   ├── routes/             # Protected & Role-based routing logic
│   ├── services/           # API service layer (Admin, Auth, Notifications)
│   ├── utils/              # Axios instance & Helper functions
│   └── App.jsx             # Root component & Theme configuration
├── .env                    # Environment variables
└── tailwind.config.js      # Tailwind configuration
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your backend configuration:
```env
VITE_API_GATEWAY_URL=http://your-api-gateway-url

```

### 4. Run in Development mode
```bash
npm run dev
```

---

## 📡 API Integration Details

The frontend communicates with a Microservices architecture via an **API Gateway**.

| Service | Endpoint Prefix | Purpose |
| :--- | :--- | :--- |
| **Auth Service** | `/auth` | Login, Signup, OTP, Password Reset |
| **Admin Service** | `/admin` | College/Dept management, Student approvals |
| **Notification** | `/notification` | Fetching history & WebSocket STOMP relay |

---

## 🛡️ Security Protocol

- **Request Interceptors:** Automatically attaches `Authorization: Bearer <token>` and `loggedInUserId` to all outgoing requests.
- **Protected Routes:** Unauthorized access attempts are automatically redirected to a custom 403 Forbidden page.
- **Force Reset:** Detects `ERR_PASSWORD_RESET_REQUIRED` from the backend and redirects users to the secure password update screen.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
