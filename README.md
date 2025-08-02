# 🚐 Parcel Delivery Management System

A parcel delivery management backend project built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**. Supports user authentication, role-based access control (Sender, Receiver, Admin), parcel tracking, status logs, cancel parcel, block or unblock parcel or user and many more.

---

## 🚀 Features

-   User registration and login with JWT
-   Role-based access control: `ADMIN`, `SENDER`, `RECEIVER`
-   Parcel creation, tracking, and delivery status updates
-   Admin controls:
    -   View and manage all parcels and users
    -   Block/unblock users and parcels
-   Parcel status logs pending, dispatched, in-transit, out for delivery, delivered
-   Delivery history and incoming parcel view for receiver
-   Secure request validation with zod

---

## 🛠 Tech Stack

-   **Backend**: Node.js, Express.js, TypeScript
-   **Database**: MongoDB + Mongoose
-   **Authentication**: JWT
-   **Validation**: Zod
-   **Linting**: ESLintr

## ⚙️ Getting Started

### 1. Clone the Repo

````bash
git clone https://github.com/Mohammadashif007/fullStack-backend
cd fullStack-backend

2. Install Dependencies
```bash
npm install

3. Environment Variables
Create a .env file in the root:
```bash
PORT=5000
DB_URL=mongodb+srv://your_database_url

#! BCRYPT
BCRYPT_SALT_ROUND=give_any_digit

#! JWT
JWT_ACCESS_SECRET=jwt_secret
JWT_ACCESS_EXPIRES=5d

4. Run in Development Mode

```bash
npm run start:dev


☑ API Endpoints

Auth

POST /api/v1/auth/login

User

GET /api/v1/user/register (Public)

PATCH /api/v1/user/block/:userId (Admin)

PATCH /api/v1/user/unblock/:userId (Admin)


Parcel

POST /api/v1/parcels (Sender)

GET /api/parcels/me (Sender)

PATCH /api/parcels/cancel/:id (Sender/Admin)

GET /api/parcels/incoming (Receiver)

PATCH /api/parcels/dispatch/:id (Admin)

PATCH /api/parcels/out-for-delivery/:id (Admin)

PATCH /api/parcels/out-for-delivery/:id (Admin)

PATCH /api/parcels/confirm-delivery/:id (Receiver)

PATCH /api/parcels/block/:parcelId (Admin)

PATCH /api/parcels/unblock/:parcelId (Admin)

PATCH /api/parcels/track/:trackingId (Admin/Sender/Receiver)

PATCH /api/parcels/confirm-delivery/:id (Receiver)

PATCH /api/parcels/:id/status-log (Admin/Sender/Receiver)

````


## 📦 Parcel Status Flow

```
CREATED → DISPATCHED → IN_TRANSIT → OUT_FOR_DELIVERY → DELIVERED