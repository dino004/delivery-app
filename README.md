# [cite_start]🍔 Delivery App (ElifTech School Test Task) [cite: 3, 5]

[cite_start]Web application where users can order food delivery from various shops. 

## 🔗 Project Links
- **Source Code:** [GitHub Repository](https://github.com/dino004/delivery-app)
- [cite_start]**Live Demo (Public URL):** ⏳ *Deployment in progress (link will appear here soon)* 

## [cite_start]🏆 Complexity Level: Base Level (with Middle elements) 
[cite_start]The project fully covers all the requirements of the Base Level (two pages, working with a database, validation) and includes strict TypeScript typing. 

## 🚀 Tech Stack

- [cite_start]**Frontend:** HTML5, CSS3, TypeScript (native, without frameworks) 
- [cite_start]**Backend:** Node.js, Express.js 
- [cite_start]**Database:** MongoDB (Mongoose) — a full-fledged remote database (JSON files are not used). 

## 📋 Features

### [cite_start]Shops Page 
- [cite_start]Dynamically loads products and shops from the database. 
- [cite_start]Filters dishes by the selected restaurant. 
- Cart logic: prevents adding products from different shops at the same time.

### [cite_start]Shopping Cart Page 
- [cite_start]View all added items, change their count dynamically, or remove them. 
- [cite_start]Real-time total price calculation. 
- Cart state is saved in `LocalStorage` (data is preserved after page reload).
- [cite_start]Checkout form with field validation (Name, Email, Phone, Address). 
- [cite_start]Orders are submitted to the backend and saved to MongoDB. 

## 🛠️ How to Run Locally

### 1. Clone the repository
```bash
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