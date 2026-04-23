# 🍔 Delivery App

Web application where users can order food delivery from various shops. 

## 🔗 Project Links
- **Source Code:** https://github.com/dino004/delivery-app
- **Live Demo:** delivery-app-wine-seven.vercel.app** 

## 🏆 Complexity Level: Base Level (with Middle elements) 
The project fully covers all the requirements of the Base Level (two pages, working with a database, validation) and includes strict TypeScript typing. 

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3, TypeScript (native, without frameworks) 
- **Backend:** Node.js, Express.js 
- **Database:** MongoDB (Mongoose) — a full-fledged remote database (JSON files are not used). 

## 📋 Features

### Shops Page 
- Dynamically loads products and shops from the database. 
- Filters dishes by the selected restaurant. 
- Cart logic: prevents adding products from different shops at the same time.

### Shopping Cart Page 
- View all added items, change their count dynamically, or remove them. 
- Real-time total price calculation. 
- Cart state is saved in `LocalStorage` (data is preserved after page reload).
- Checkout form with field validation (Name, Email, Phone, Address). 
- Orders are submitted to the backend and saved to MongoDB. 

## 🛠️ How to Run Locally

### 1. Clone the repository
git clone [https://github.com/dino004/delivery-app.git](https://github.com/dino004/delivery-app.git)

2. Run Backend
Go to the backend folder: cd backend

Install dependencies: npm install

Create a .env file and add your MongoDB connection string:

MONGO_URI=your_mongodb_connection_string
PORT=3000

Start the server: npm start

3. Run Frontend
Go to the frontend folder: cd ../frontend

Compile TypeScript: npx tsc (or npx tsc -w for auto-compilation)

Open index.html in your browser (using Live Server extension is recommended).