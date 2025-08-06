
# 🧠 Automated Delivery Locker System – Backend Docs

This backend powers an automated delivery locker system with features like locker management, package tracking, facial recognition-based pickups, and automatic locker assignment.

---

## 📚 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Modules](#modules)
  - [Authentication](#authentication)
  - [Locker Management](#locker-management)
  - [Package Handling](#package-handling)
  - [Cron Jobs](#cron-jobs)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Workflows](#workflows)
- [Environment Setup](#environment-setup)
- [Contributors](#contributors)

---

## 🧭 Overview

The backend handles:
- User authentication (JWT-based)
- Courier & system-assigned locker allocation
- Package status tracking (Queued, Assigned, Delivered)
- Facial recognition support for package pickup
- Admin/courier APIs

---

## 🛠️ Tech Stack

- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT** for auth
- **Cron jobs** for automation
- **Bcrypt** for password hashing

---

## 📁 Folder Structure

```bash
├── controllers/
├── models/
├── routes/
├── middlewares/
├── services/
├── utils/
├── cron/
├── config/
├── .env
└── server.js
```

---

## 🧩 Modules

### 🔐 Authentication
- **Endpoints**:
  - `POST /auth/login`
  - `POST /auth/register`
  - `POST /auth/refresh-token`
- Uses JWT tokens.
- Passwords hashed via bcrypt.

### 🔒 Locker Management
- Track locker status: `available`, `occupied`, `maintenance`.
- Assign locker via courier or auto-cron.
- `POST /lockers/assign`
- `GET /lockers/status`

### 📦 Package Handling
- CRUD for packages
- Statuses: `queued`, `assigned`, `delivered`, `expired`
- Locker assignment, pickup verification

### ⏰ Cron Jobs
- Periodic auto-assignment of lockers to queued packages
- Notification/reminder triggers
- Runs every X minutes (configured in `.env`)

---

## 📡 API Reference

### Package APIs
| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | /packages             | Get all packages               |
| POST   | /packages             | Create new package             |
| POST   | /packages/assign      | Assign locker to a package     |
| PATCH  | /packages/:id/pickup  | Mark package as picked         |

### Locker APIs
| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | /lockers         | Get all lockers          |
| POST   | /lockers/assign  | Assign a locker manually |

### Auth APIs
| Method | Endpoint         | Description       |
|--------|------------------|-------------------|
| POST   | /auth/login      | User login        |
| POST   | /auth/register   | New user register |

---

## 🧾 Data Models

### 🔸 User
```json
{
  "_id": ObjectId,
  "email": "string",
  "password": "hashed",
  "role": "admin | courier | user"
}
```

### 🔸 Locker
```json
{
  "_id": ObjectId,
  "lockerNumber": Number,
  "status": "available | occupied | maintenance"
}
```

### 🔸 Package
```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "lockerId": ObjectId,
  "status": "queued | assigned | delivered",
  "createdAt": Date
}
```

---

## 🔁 Workflows

### 📤 Package Drop-off (Courier)
1. Courier logs in
2. Enters package details
3. System assigns locker (or courier manually assigns)
4. Locker status updated to `occupied`

### 📥 Package Pickup (User)
1. User arrives at locker
2. Facial recognition confirms identity
3. Locker opens
4. Package marked as `delivered`

### ⚙️ Cron Locker Assignment
- Runs every X mins
- Finds queued packages
- Assigns nearest available locker

---

## ⚙️ Environment Setup

```bash
# .env
PORT=3000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
CRON_SCHEDULE=*/10 * * * *
```

**To run:**
```bash
npm install
npm run dev
```

---

