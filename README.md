# Finance Tracker – Web Application

## About the Project
Finance Tracker is a personal finance management web application developed using React.js.

It helps users manage their income and expenses, track transactions and view their financial summary.

The web application communicates with a shared Node.js and Express.js backend.

## Technologies Used
- React.js
- JavaScript
- React Router
- Context API
- Fetch API
- LocalStorage
- CSS

## Features
- User Registration and Login
- Add Income and Expense Transactions
- View All Transactions
- Update and Delete Transactions
- Search Transactions
- Filter Transactions
- Dashboard with Income, Expense and Balance
- Category-Wise Summary
- CSV Export
- Protected Routes

## Project Structure
- `src/` – Main application source
- `components/` – Reusable UI components
- `pages/` – Application pages
- `contexts/` – Shared application state
- `api.js` – Backend API communication
- `App.js` – Main application and routing

## Application Flow
1. User registers or logs in.
2. Authentication is handled through the backend.
3. The application uses the authentication token for protected API requests.
4. Users can manage their income and expense transactions.
5. The dashboard displays financial summaries.
6. Users can search, filter and export transaction records.

## Backend Connection
The web application connects to the shared Finance Tracker backend:

`https://finance-tracker-backend-ng8p.onrender.com`

## Installation and Setup

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Configure the backend API URL if required.
4. Start the application using the development script in `package.json`.



## Purpose
The application provides an easy-to-use web interface for managing personal finances and tracking transactions.
