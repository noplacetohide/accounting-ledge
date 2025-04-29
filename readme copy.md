# Tax App

This project consists of a **client** and a **backend** for managing tax-related operations. Follow the steps below to set up and run the application locally.

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (Recommended: Use `nvm` to manage Node versions)
- [npm](https://www.npmjs.com/)
- Access to required environment variables

---

## 🚀 Getting Started

### 1. Clone and Navigate

```bash
cd tax-app
```

### 2. Use Correct Node Version

```bash
nvm use
```

### 3. Install Dependencies

#### Client

```bash
cd client
npm i -f
```

#### Backend

```bash
cd ../backend
npm i -f
```

---

## 🔐 Environment Variables

### Client (`client/.env.local`)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### Backend (`backend/.env`)

```env
DB_HOST=your-db-host
DB_PORT=your-db-port
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_DATABASE=your-database-name
DB_CA_CERT=your-ca-cert-if-needed
```

> Make sure to replace placeholder values with actual credentials and secrets.  
> Do **not** commit `.env` files to version control.

---

## 🧪 Running the App

### Start the **Backend** (Port: `3000`)

```bash
cd backend
npm start
```

### Start the **Client** (Port: `3001`)

```bash
cd client
npm start
```

- Client runs on: `http://localhost:3001`
- Backend runs on: `http://localhost:3000`

Make sure both servers are running simultaneously for full functionality.

---

## 🛠 Troubleshooting

- If you encounter version issues, ensure `nvm` is installed and that you're using the correct Node version as specified in `.nvmrc`.
- If the backend can't connect to the database, double-check your `.env` values.

---

## 🎉 Happy Coding!

```

You can copy and paste this directly into your `README.md` file. Let me know if you want it in another format (like reStructuredText or plain text).
```
