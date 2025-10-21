# BlogMuse

**A full-stack MERN blogging application**

*Inspiring your creative journey*

---

## About

BlogMuse is a modern, full-stack blogging platform designed for creative writers and content creators. Built with the MERN stack, it provides a seamless experience for users to create, share, and discover engaging blog content. The platform combines powerful backend functionality with an intuitive frontend interface, making it easy for writers to focus on what they do best - creating compelling content.

BlogMuse stands out with its user-friendly interface, robust authentication system, and innovative features like post saving and infinite scroll pagination, making it an ideal platform for both casual bloggers and serious content creators.

---
---

## 📸 Screenshots

<img width="1512" height="982" alt="Screenshot 2025-10-21 at 12 30 32 PM" src="https://github.com/user-attachments/assets/17711840-dbd2-4e4a-b536-e55185862f4f" />
<img width="1512" height="982" alt="Screenshot 2025-10-21 at 12 31 06 PM" src="https://github.com/user-attachments/assets/5283e785-0ad3-4d4e-aa16-a362ae89db88" />
<img width="1512" height="982" alt="Screenshot 2025-10-21 at 12 31 13 PM" src="https://github.com/user-attachments/assets/14ba273d-5572-4dae-9b7d-16bdac65495b" />
<img width="1512" height="982" alt="Screenshot 2025-10-21 at 12 31 23 PM" src="https://github.com/user-attachments/assets/103e4eb2-3e50-4965-860f-4ca43937c7cc" />
<img width="1512" height="982" alt="Screenshot 2025-10-21 at 12 31 27 PM" src="https://github.com/user-attachments/assets/bbeec9c3-dec0-4b8f-95d5-cea395444d9f" />
<img width="1512" height="982" alt="Screenshot 2025-10-21 at 12 31 45 PM" src="https://github.com/user-attachments/assets/424429fe-69b4-4b90-80f9-bf46ca66f380" />


---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with HTTP-only cookies for enhanced security
- **bcrypt password hashing** for secure password storage
- **Protected routes** with client-side and server-side validation
- **Session management** with automatic token refresh

### 📝 Post Management
- **Rich text editor** powered by React Quill for content creation
- **Create, read, update, delete** blog posts with full CRUD operations
- **Image upload support** for post covers and content
- **Post descriptions** with character limits for better organization

### 💾 Save & Bookmark System
- **Save posts** for later reading with one-click functionality
- **Save count tracking** to measure post popularity
- **Personal saved posts collection** accessible from user profiles
- **Unsaved posts** with instant updates

### 👤 User Profiles
- **Customizable user profiles** with profile and cover images
- **Created posts tracking** to showcase user content
- **Saved posts management** for easy access
- **User statistics** and activity tracking

### 🔄 Advanced UI/UX
- **Infinite scroll pagination** with custom React hooks for smooth loading
- **Responsive design** that works on all devices
- **Material-UI components** for consistent, modern interface
- **Styled-components** for custom styling and theming

### 🗄️ Data Management
- **Automated database seeding** with sample data
- **Data validation** with comprehensive error handling
- **MongoDB integration** with Mongoose ODM
- **Environment-based configuration**

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router v6** - Client-side routing with protected routes
- **Material-UI (MUI)** - Component library for consistent design
- **React Quill** - Rich text editor for content creation
- **Styled Components** - CSS-in-JS styling solution
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT (jsonwebtoken)** - JSON Web Token authentication
- **bcrypt** - Password hashing library
- **cookie-parser** - Cookie parsing middleware

### Development Tools
- **Nodemon** - Development server with auto-restart
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **ESLint** - Code linting and formatting

---

## 📁 Project Structure

```
BlogMuse/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   └── public/             # Public static files
├── backend/                # Express.js API server
│   ├── authHelpers/        # Authentication utilities
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API route handlers
│   └── scripts/            # Database seeding scripts
└── package.json            # Root package configuration
```

---

## 🚀 Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd BlogMuse
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend` directory:

```env
MONGO_URL=mongodb://localhost:27017/blogmuse
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Database Setup (Optional)
Seed the database with sample data:

```bash
cd backend
npm run seed
```

### 5. Start the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend Development Server:**
```bash
cd client
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 🔧 Available Scripts

### Backend Scripts
```bash
cd backend

npm start          # Start development server with nodemon
npm run build      # Install dependencies
npm run seed       # Seed database with sample data
npm run validate-data  # Validate sample data before seeding
```

### Frontend Scripts
```bash
cd client

npm start          # Start React development server
npm run build      # Build for production
npm test           # Run test suite
npm run eject      # Eject from Create React App
```

---

## 🔌 API Features

### RESTful Architecture
- **RESTful API design** with proper HTTP methods
- **Consistent response format** with success/error handling
- **Pagination support** for large datasets
- **Error handling** with meaningful error messages

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### Post Management Endpoints
- `GET /posts` - Get all posts (with pagination)
- `POST /posts` - Create new post
- `GET /posts/:id` - Get single post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `POST /posts/:id/save` - Save post
- `POST /posts/:id/unsave` - Unsave post

### User Management Endpoints
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/saved` - Get user's saved posts

---

## 🚀 Future Enhancements

- **Real-time notifications** for post interactions
- **Comment system** for post engagement
- **Social features** like following/followers
- **Search functionality** with advanced filtering
- **Post categories and tags** for better organization
- **Email notifications** for user activities
- **Mobile app** development
- **Content moderation** tools
- **Analytics dashboard** for post performance

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** for the amazing React framework
- **Express.js** for the robust backend framework
- **MongoDB** for the flexible database solution
- **Material-UI** for the beautiful component library
- **React Quill** for the rich text editor
- **Claude AI** for assistance in creating this comprehensive README documentation
- **All contributors** who helped make this project possible

---

**Happy Blogging with BlogMuse! 🚀**
