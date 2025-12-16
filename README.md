# WhatsApp Clone (frontend + backend)

Simple real-time chat demo using React (frontend), Express + Socket.IO + MongoDB (backend).

Quick start (Windows PowerShell):

1. Backend

```powershell
cd C:\Users\theer\OneDrive\Desktop\wp\backend
npm install
# ensure MongoDB is running locally or update .env MONGO_URI
node server.js
```

2. Frontend

```powershell
cd C:\Users\theer\OneDrive\Desktop\wp\frontend
npm install
npm start
# open http://localhost:3000
```

Environment

- `backend/.env` should contain:

```
MONGO_URI=mongodb://127.0.0.1:27017/whatsapp
JWT_SECRET=your_jwt_secret
```

Notes
- Use the Register page to create users, then login from two browsers and select a contact to chat in real time.
- Socket.IO handles realtime messaging; messages are persisted in MongoDB.

Repo

https://github.com/Theertha72/Whatsapp
