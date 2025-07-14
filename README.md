# Firebase E-commerce

A modern, full-stack e-commerce web application built with **React.js**, **Redux**, and **Firebase**. This project features user authentication, product management, shopping cart, order processing, and an admin dashboard.

---

## Features

- User registration & login (Firebase Auth)
- Product listing, filtering, and search
- Product details page
- Add to cart & cart management (Redux)
- Checkout with address and payment (Razorpay integration)
- Order history for users
- Admin dashboard for managing products and viewing orders
- Responsive UI with dark mode support
- Toast notifications for user feedback

---

## Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend/Database:** Firebase Firestore, Firebase Auth
- **Payment:** Razorpay
- **State Management:** Redux Toolkit
- **Notifications:** react-toastify

---

## Folder Structure

```
.
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── Components/
│   ├── Context/
│   ├── Firebase/
│   ├── pages/
│   └── Redux/
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/firebase-ecomerce.git
cd firebase-ecomerce
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure Firebase

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication and Firestore Database
- Copy your Firebase config and set environment variables in a `.env` file:

```
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

### 4. Run the app

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Lint the code

---

## Customization

- Update product images and data in Firestore
- Modify UI components in `src/Components/`
- Update payment integration in `src/pages/cart/Cart.jsx`

---

## Admin Access

- The admin dashboard is accessible only to the user with the admin email.
- To change the admin, update the email check in [`ProtectedRouteForAdmin`](src/App.jsx).

---

**Happy Coding!** 🚀
hello world