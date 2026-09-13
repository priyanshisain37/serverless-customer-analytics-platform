# Serverless Customer Analytics Platform

A serverless customer analytics platform built using **React, Flask, AWS DynamoDB, and Amazon S3**. This project collects customer product-view events and displays useful analytics through an interactive dashboard.

## Project Overview

The **Serverless Customer Analytics Platform** is designed to track customer interactions with products and analyze customer behavior. Product details are stored in Amazon DynamoDB, while customer activity logs are stored in Amazon S3.

The frontend provides a product-based interface, login/logout functionality, and an analytics dashboard.

## Features

* Product listing from AWS DynamoDB
* Product-view event tracking
* Storage of event logs in Amazon S3
* Interactive analytics dashboard
* Total product views
* Product-wise view counts
* Active events
* Most viewed product
* Recent customer activity
* Refresh Analytics feature
* Login and logout functionality
* React-based frontend
* Flask-based backend

## Technologies Used

### Frontend

* React.js
* Vite
* Axios
* React Router
* Recharts
* HTML
* CSS

### Backend

* Python
* Flask
* Flask-CORS
* Boto3

### AWS Services

* Amazon DynamoDB
* Amazon S3
* AWS IAM
* AWS CLI

## Project Structure

```text
Serverless-Customer-Analytics-Platform/
│
├── aws/
│   └── architecture.txt
│
├── backend/
│   └── app.py
│
├── docker/
│
├── docs/
│   ├── Serverless Customer Analytics Platform.md
│   └── aws_services_used.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── screenshots/
│
├── .gitignore
└── README.md
```

## How the Project Works

1. The user opens the React frontend.
2. Product details are fetched from the Flask backend.
3. The backend retrieves product data from Amazon DynamoDB.
4. When a user views a product, the event is sent to the backend.
5. The backend stores the event log in Amazon S3.
6. The dashboard reads the stored logs and displays customer analytics.

## How to Run the Project

### 1. Run the Backend

Open a terminal and execute:

```powershell
cd backend
.\venv\Scripts\Activate
python app.py
```

The backend runs at:

```text
http://127.0.0.1:5000/
```

### 2. Run the Frontend

Open another terminal and execute:

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173/
```

## AWS Configuration

The backend uses AWS services through **Boto3**. AWS credentials should be configured locally using the AWS CLI.

Do not upload AWS access keys, secret keys, credentials files, or `.env` files to GitHub.

## Screenshots

The `screenshots` folder contains screenshots of:

* Homepage
* Product listing
* Product-view tracking
* Analytics dashboard
* DynamoDB products table
* Amazon S3 event logs

## Future Enhancements

* User registration with a database
* Advanced customer segmentation
* Date-wise analytics
* More interactive charts
* AWS Lambda-based event processing
* Automated deployment using CI/CD
* Improved authentication and authorization

## Author

**Priyanshi Sain**

B.Tech — Artificial Intelligence & Data Science

Interests: Data Engineering, Cloud Computing, and Data Analytics
