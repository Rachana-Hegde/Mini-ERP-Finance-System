# 🏗️ Mini ERP & Finance System – Construction Industry Management App

This project is a modular **ERP (Enterprise Resource Planning) system** built specifically for the **construction industry**. It includes project tracking, finance management, AI-based insights, user authentication, and an admin panel — all delivered through a clean, modern web interface.

Built using **React.js**, **Node.js**, and **PostgreSQL**, this ERP system provides real-time insights, streamlined workflows, and a secure environment for multi-role users such as **Admin**, **Finance Manager**, and **Project Manager**.

---

## 🚀 Features

### 🔐 Authentication & User Roles

* Secure **JWT-based login system**
* Roles: **Admin**, **Finance Manager**, **Project Manager**
* Protected routes on frontend

### 📊 Dashboard & Insights

* KPI cards (Invoices Count, Cashflow Forecast)
* Recent invoices table
* AI-like insights (formula-based):

  * Cashflow prediction
  * Budget risk detection
  * Project health score

### 💰 Finance Module

* Create and manage invoices
* View all invoices in a table
* Track payments & amounts
* Ledger-style transaction support
* Multi-currency support using exchange rates

### 🧱 Project Management

* Add & manage construction projects
* Track project progress and spending
* AI risk analysis based on:

  * Budget vs progress mismatch
  * Delayed payments
  * Overspending

### ⚙️ Admin Panel

* Manage users
* Assign roles
* Audit log support (extendable)

---

## 📌 Technologies Used

### **Frontend**

* React.js
* Vite
* Axios
* CSS3
* Recharts / Chart.js (optional)

### **Backend**

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* bcryptjs

### **Database**

* PostgreSQL with relational schema:

  * Users
  * Projects
  * Invoices
  * Transactions
  * Vendors & Customers
  * Exchange Rates

---

## 🧠 How It Works

1. User logs in → JWT token stored in localStorage.
2. Protected pages (Dashboard, Finance, Admin) require authentication.
3. Dashboard fetches:

   * Total invoices
   * Cashflow forecast (from financial transactions)
   * Recent invoices
4. Finance page allows creating invoices tied to real project IDs.
5. AI insight logic evaluates:

   * Budget overrun
   * Project progress deviation
   * Payment delays
6. PostgreSQL stores all real data and relationships.

---

## 📥 Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-username/mini-erp-project.git
cd mini-erp-project
```

---

### **2️⃣ Backend Setup**

```bash
cd server
npm install
```

Create **.env** file:

```
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@127.0.0.1:5432/construction_erp
JWT_SECRET=your_jwt_secret
```

Run migrations (or manually import SQL):

```bash
psql -U postgres -d construction_erp -f migrations/init.sql
```

Start server:

```bash
npm run dev
```

Backend runs at →
[http://localhost:5000/](http://localhost:5000/)

---

### **3️⃣ Frontend Setup**

```bash
cd client
npm install
npm run start
```

Frontend runs at →
[http://localhost:5173/](http://localhost:5173/)

---

## 🧪 Input Fields (Invoice Module)

Each invoice creation requires:

* Project ID (must exist in DB)
* Amount
* Currency (INR/USD/EUR etc.)
* Customer ID (optional)
* Due Date

---

## 📊 AI Insight Logic

### 1. **Project Risk Score**

Based on:

| Factor            | Condition                | Impact      |
| ----------------- | ------------------------ | ----------- |
| Budget overrun    | spent > budget           | High risk   |
| Progress mismatch | spent% > progress% + 20% | Medium–High |
| Payment delays    | pending invoices too old | Adds risk   |

Outcome:

* 🟢 Low
* 🟡 Medium
* 🔴 High
* 🔥 Critical

### 2. **Cashflow Forecast**

Uses recent debit/credit transactions:

```
forecast = (sum(credits) - sum(debits)) / 6
```

Displayed on dashboard.

---

## 📂 Project Structure

```
mini-erp-project/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── migrations/
│   ├── config/
│   └── index.js
│
└── client/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── services/
    │   └── App.jsx
```

---

## 🧑‍💻 How to Use

1. Login using your admin account.
2. Navigate to Dashboard to view KPIs & insights.
3. Go to Finance → create invoices (must use valid project ID).
4. Check AI-generated cashflow forecast.
5. Admins can manage users and roles.

---

## 🛡️ Security Notes

* JWT token is required for all protected routes.
* Passwords stored using bcrypt hashing.
* `.env` is excluded using `.gitignore`.
* Client never sees database credentials.

---

## 📬 Contact

For questions or help:

🔗 **GitHub:** [Rachana-Hegde](https://github.com/Rachana-Hegde)
📧 **Email:** [your-email@example.com](mailto:your-email@example.com) *(optional)*
