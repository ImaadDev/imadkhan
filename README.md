# Imad's Portfolio

This is a full-stack personal portfolio project built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It showcases projects, certifications, blog posts, and client reviews. The application also includes an administrative panel for managing content dynamically.

## Features

- **Dynamic Content Management**: Add, edit, and delete projects, certifications, blog posts, technologies, and reviews via a secure admin panel.
- **Categorization & Tagging**: Organize content with categories and tags for better navigation and searchability.
- **Featured Items**: Mark projects, blogs, technologies, and reviews as "featured" to highlight them on the frontend.
- **Responsive Design**: Optimized for various screen sizes, from mobile devices to large desktops.
- **Modern UI/UX**: Clean and interactive user interface with animations and effects.
- **Image Uploads**: Integrated Cloudinary for efficient image storage and delivery.
- **User Authentication (Admin)**: Secure login for administrative users.
- **Blog Details Page**: Dedicated page for each blog post with full content display.

## Technologies Used

### Frontend
- **React.js**: Frontend JavaScript library for building user interfaces.
- **React Router DOM**: For declarative routing in React applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: Promise-based HTTP client for making API requests.
- **Lucide React / React Icons (Si)**: Icon libraries for a rich visual experience.
- **Vite**: Next-generation frontend tooling for a fast development experience.
- **React Query (Optional/Future)**: For data fetching, caching, and state management.

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: MongoDB object data modeling (ODM) for Node.js.
- **Cloudinary**: Cloud-based image and video management.
- **jsonwebtoken**: For implementing JWT-based authentication.
- **bcryptjs**: For password hashing.
- **dotenv**: To load environment variables from a `.env` file.
- **multer**: Middleware for handling `multipart/form-data`, primarily for file uploads.

## Setup and Installation

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd ImadPortfolio
```

### 2. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory and add the following environment variables:

```
PORT=5000
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<A Strong Secret Key>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
```

-   `MONGO_URI`: Obtain this from MongoDB Atlas or your local MongoDB instance.
-   `JWT_SECRET`: Generate a strong, random string.
-   `CLOUDINARY_*`: Get these credentials from your Cloudinary account.

### 3. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:

```bash
cd ../frontend
```

Install frontend dependencies:

```bash
npm install
```

Create a `.env` file in the `frontend` directory and add the following environment variable:

```
VITE_BACKEND_URL=http://localhost:5000
```
(Ensure this matches your backend `PORT`)

## Running the Application

### 1. Start the Backend Server

In the `backend` directory, run:

```bash
npm start
```
The backend server will start on `http://localhost:5000` (or your specified `PORT`).

### 2. Start the Frontend Development Server

In the `frontend` directory, run:

```bash
npm run dev
```
The frontend application will open in your browser, usually at `http://localhost:5173` (or another available port).

## Admin Panel

Access the admin panel by navigating to `/admin` in your frontend application.
**Default Admin Credentials:** (You should change these immediately after initial setup)
-   **Username**: `admin`
-   **Password**: `password`

## API Endpoints (Backend)

-   `/api/projects`: CRUD operations for projects.
-   `/api/certifications`: CRUD operations for certifications.
-   `/api/blogs`: CRUD operations for blog posts.
-   `/api/technologies`: CRUD operations for technologies.
-   `/api/reviews`: CRUD operations for reviews.
-   `/api/users/register`: User registration.
-   `/api/users/login`: User login.
-   `/api/users/profile`: User profile management.

## Frontend Routes

-   `/`: Home Page
-   `/projects`: All Projects
-   `/certifications`: All Certifications
-   `/blogs`: All Blog Posts
-   `/blogs/:id`: Individual Blog Post Details
-   `/about`: About Me
-   `/contact`: Contact Us
-   `/login`: Admin Login
-   `/admin`: Admin Dashboard
    -   `/admin/projects`: Manage Projects
    -   `/admin/certifications`: Manage Certifications
    -   `/admin/blogs`: Manage Blog Posts
    -   `/admin/technologies`: Manage Technologies
    -   `/admin/settings`: Admin Settings (including reviews)

## Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.


---
**Note**: This README provides a general overview. For detailed instructions or troubleshooting, refer to the inline comments in the code or open an issue on the repository.
