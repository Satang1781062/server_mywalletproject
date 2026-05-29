MyWallet Server API



Backend API for managing personal income and expense tracking system.

Built with:
- Node.js
- Express.js
- MySQL
- Sequelize
- JWT Authentication



## Features
- User Authentication (Register / Login)
- JWT Authentication
- Create Wallet Transactions
- Income & Expense Tracking
- Category Management
- Protected Routes


## Project Structure
/server
├── config/  
│ └── db.js  
├── models/  
│ └── index.js  
│ └── Category.js 
│ └── User.js
│ └── Wallet.js
├── routes/  
│ └──auth.js
│ └──category.js
│ └── wallet.js  
├── controllers/  
│ └── auth.js  
│ └── category.js  
│ └── wallet.js  
├── middleware/  
│ └── auth.js  
├── .env  
├── server.js



Install dependencies
npm install

