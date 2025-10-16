<div align="center">

# 🛍️ ShopUp

### Modern E-Commerce Platform

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.1.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-2.2.7-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

[Live Demo](https://shopup.vercel.app) • [Report Bug](https://github.com/SKSHAMKAUSHAL/E_SHOP_UP/issues) • [Request Feature](https://github.com/SKSHAMKAUSHAL/E_SHOP_UP/issues)

</div>

---

## ✨ Features

- 🔐 **Secure Authentication** - Firebase Auth with protected routes
- 🛒 **Smart Shopping Cart** - Redux-powered state management
- 💳 **Payment Integration** - Razorpay checkout
- 👨‍💼 **Admin Dashboard** - Complete product & order management
- 🌓 **Dark Mode** - Seamless theme switching
- 📱 **Fully Responsive** - Mobile-first design
- 🎨 **Modern UI** - Tailwind CSS with smooth animations
- ❤️ **Wishlist** - Save favorite products
- 🔍 **Advanced Filters** - Search & filter products easily

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/SKSHAMKAUSHAL/E_SHOP_UP.git

# Navigate to directory
cd E_SHOP_UP

# Install dependencies
npm install

# Create .env file and add Firebase config
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id

# Start development server
npm run dev
```

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Redux Toolkit
- Tailwind CSS
- React Router DOM

**Backend:**
- Firebase Firestore
- Firebase Authentication
- Firebase Storage

**Payment:**
- Razorpay Integration

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components & routes
├── context/           # Global state management
├── redux/             # Redux store & slices
├── fireabase/         # Firebase configuration
└── utils/             # Helper functions
```

## 🔒 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** (Email/Password)
3. Enable **Firestore Database**
4. Add your Firebase config to `.env` file

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /orders/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 👨‍💼 Admin Access

Update admin email in `src/App.jsx`:

```javascript
if (admin?.user?.email === 'your-admin-email@gmail.com') {
  return children;
}
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to Netlify

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400/ec4899/ffffff?text=ShopUp+E-Commerce" alt="ShopUp Screenshot" />
</div>

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sham Kaushal**

- GitHub: [@SKSHAMKAUSHAL](https://github.com/SKSHAMKAUSHAL)
- Email: skshamkaushal@gmail.com

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

<div align="center">
Made with ❤️ by Sham Kaushal
</div>

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.1.0-FFCA28?style=flat&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-2.2.7-764ABC?style=flat&logo=redux)](https://redux-toolkit.js.org/)

---

## ✨ Features

### 🎨 Professional Branding
- Custom-designed SVG logo with shopping bag and growth arrow
- Theme-adaptive logo (light/dark mode support)
- Consistent branding across all pages
- Multiple size variants for different contexts

### 🔐 Authentication & User Management
- User registration & login with Firebase Authentication
- Protected routes for authenticated users
- Secure logout functionality
- Admin role-based access control

### 🛒 Shopping Experience
- Product catalog with category filtering
- Advanced search functionality
- Product details with image gallery
- Shopping cart with Redux state management
- Wishlist functionality
- Order history tracking

### 💳 Checkout & Payment
- Multi-step checkout process
- Address management
- Razorpay payment integration
- Order confirmation & tracking

### 👨‍💼 Admin Dashboard
- Product management (Add/Edit/Delete)
- Order management & tracking
- Real-time inventory updates
- Sales analytics dashboard

### 🎨 UI/UX Features
- Responsive design (Mobile, Tablet, Desktop)
- Light/Dark mode toggle
- Smooth animations & transitions
- Toast notifications for user feedback
- Modern gradient color scheme
- Loading states & skeletons
- Professional logo integration

---

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React.js 18, Redux Toolkit, React Router DOM |
| **Styling** | Tailwind CSS 3, CSS3, PostCSS |
| **Backend** | Firebase Firestore, Firebase Auth, Firebase Storage |
| **Payment** | Razorpay Integration |
| **Icons** | React Icons (Heroicons, Font Awesome, Bootstrap Icons) |
| **Build Tool** | Vite 4.4 |
| **Notifications** | React Toastify |

---

## 📁 Project Structure

```
E_SHOP_UP/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images & media files
│   ├── components/        # Reusable components
│   │   ├── filter/       # Product filtering
│   │   ├── footer/       # Footer component
│   │   ├── heroSection/  # Hero banner
│   │   ├── layout/       # Layout wrapper
│   │   ├── loader/       # Loading spinners
│   │   ├── modal/        # Modal dialogs
│   │   ├── navbar/       # Navigation bar
│   │   ├── productCard/  # Product card
│   │   ├── testimonial/  # Customer reviews
│   │   └── track/        # Order tracking
│   ├── context/          # Context API
│   │   └── data/         # Global state management
│   ├── fireabase/        # Firebase configuration
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin dashboard
│   │   ├── allproducts/  # Product listing
│   │   ├── cart/         # Shopping cart
│   │   ├── home/         # Homepage
│   │   ├── order/        # Order history
│   │   ├── productInfo/  # Product details
│   │   └── registration/ # Login & Signup
│   ├── redux/            # Redux store & slices
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── README.md             # Documentation

```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Firebase account

### 1. Clone the Repository

```bash
git clone https://github.com/SKSHAMKAUSHAL/E_SHOP_UP.git
cd E_SHOP_UP
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** (Email/Password)
3. Enable **Firestore Database**
4. Enable **Firebase Storage** (optional for profile images)

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

### 5. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /orders/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 6. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint to check code quality |

---

## 👨‍💼 Admin Access

To access the admin dashboard:

1. The admin email is configured in `src/App.jsx` (ProtectedRouteForAdmin)
2. Default admin email: `skshamkaushal@gmail.com`
3. To change admin, update the email in the code:

```javascript
// src/App.jsx
if (admin?.user?.email === 'your-admin-email@gmail.com') {
  return children;
}
```

---

## 🎨 Color Scheme

The app uses a modern gradient-based color system defined in `src/context/data/myState.jsx`:

- **Primary**: Pink gradient (#ec4899 → #be185d)
- **Secondary**: Blue gradient (#3b82f6 → #1e40af)
- **Accent**: Purple gradient (#a855f7 → #7e22ce)

---

## 🔒 Security Features

- ✅ Protected routes with authentication checks
- ✅ Role-based access control for admin
- ✅ Firestore security rules
- ✅ Environment variable protection
- ✅ XSS protection with React
- ✅ Secure password handling with Firebase Auth

---

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with mobile-first approach.

---

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**Sham Kaushal**
- GitHub: [@SKSHAMKAUSHAL](https://github.com/SKSHAMKAUSHAL)
- Email: skshamkaushal@gmail.com

---

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/) - UI Library
- [Firebase](https://firebase.google.com/) - Backend Platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State Management
- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

Made with ❤️ by Sksham Kaushal

</div>