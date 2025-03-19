Here’s a well-documented overview of this project, including its structure, purpose, and functionality. This document is designed to help you understand the project and its components.

---

# **TLE Eliminators - Contest Tracker**

## **Project Overview**

The **TLE Eliminators** project is a web application designed to help competitive programmers track upcoming and past contests on platforms like **LeetCode** and **Codeforces**. It also allows users to bookmark contests, view contest problems, and access related YouTube videos for learning.

The project is built with  **React + Vite as frontend** and a **Node.js as backend**. It uses **Puppeteer** for web scraping, **MongoDB** for storing bookmarks, and **Firebase** for user authentication.

---
## **Walkthrough Video**

Watch the walkthrough video to understand the functionality and features of the project:

[![Watch the Walkthrough Video](./public/walkthrough-thumbnail.png)](https://drive.google.com/file/d/1CrKpwBbNWbqnIGz8rHiDXjieE7rDcHX6/view?usp=drive_link)

---
## **Features**

1. **User Authentication**:
   - Login and logout using Google authentication via Firebase.

2. **Contest Tracking**:
   - View upcoming and past contests from platforms like LeetCode and Codeforces.
   - Bookmark contests for quick access.

3. **Problem Details**:
   - View problems for a specific contest.
   - Access related YouTube videos for contest preparation.

4. **Theme Toggle**:
   - Switch between light and dark themes.

5. **Responsive Design**:
   - Fully responsive UI for both desktop and mobile devices.

---

## **Project Structure**

### **Frontend**
Path: frontend

#### **Key Files and Directories**
- **`src/components/`**:
  - Navbar.jsx: The navigation bar with links, theme toggle, and user avatar.
  - ContestCard.jsx: Displays individual contest details.
  - ContestList.jsx: Lists contests with pagination.
  - ProblemDetails.jsx: Displays problems and related YouTube videos for a contest.
  - ThemeToggle.jsx: Button to toggle between light and dark themes.
  - AuthBtn.jsx: Handles user login and logout.

- **`src/pages/`**:
  - Home.jsx: The main page displaying upcoming and past contests.
  - Bookmarks.jsx: Displays bookmarked contests.

- **`src/context/`**:
  - AuthContext.jsx: Manages user authentication state.
  - ThemeContext.jsx: Manages theme state (light/dark).

- **`src/firebase/`**:
  - firebaseConfig.js: Firebase configuration for authentication.

- **`index.html`**:
  - The entry point for the React application.

- **`vite.config.js`**:
  - Configuration for the Vite build tool.

---

### **Backend**
Path: backend

#### **Key Files and Directories**
- **`models/`**:
  - Bookmark.js: Mongoose schema for storing bookmarked contests.

- **`routes/`**:
  - contestRoutes.js: API routes for fetching contests, problems, and managing bookmarks.

- **`scrapping/`**:
  - fetchContestProblems.js: Scrapes problems from contest pages using Puppeteer.
  - scrapper.js: Scrapes contest details from LeetCode.

- **`server.js`**:
  - The main server file that initializes the Express app and connects to MongoDB.

---

## **Frontend Documentation**

### **1. Navbar**
- **File**: Navbar.jsx
- **Purpose**: Displays the navigation bar with links, theme toggle, and user avatar.
- **Key Features**:
  - Hamburger menu for mobile view.
  - Links to home and bookmarks.
  - Theme toggle button.
  - User avatar for logged-in users.

---

### **2. ContestCard**
- **File**: ContestCard.jsx
- **Purpose**: Displays individual contest details.
- **Key Features**:
  - Shows contest title, platform, and start time.
  - Bookmark functionality.
  - Buttons to view problems and visit the contest site.

---

### **3. ContestList**
- **File**: ContestList.jsx
- **Purpose**: Lists contests with pagination.
- **Key Features**:
  - Displays contests in a grid layout.
  - Pagination for navigating through contests.
  - Handles both upcoming and past contests.

---

### **4. ProblemDetails**
- **File**: ProblemDetails.jsx
- **Purpose**: Displays problems and related YouTube videos for a contest.
- **Key Features**:
  - Fetches problems using the backend API.
  - Fetches related YouTube videos using the YouTube API.

---

### **5. ThemeToggle**
- **File**: ThemeToggle.jsx
- **Purpose**: Toggles between light and dark themes.
- **Key Features**:
  - Saves the selected theme in local storage.
  - Updates the theme dynamically.

---

### **6. Authentication**
- **File**: AuthBtn.jsx
- **Purpose**: Handles user login and logout.
- **Key Features**:
  - Uses Firebase for Google authentication.
  - Displays "Login" or "Logout" based on the user's authentication state.

---

## **Backend Documentation**

### **1. API Routes**
- **File**: contestRoutes.js
- **Purpose**: Defines API endpoints for fetching contests, problems, and managing bookmarks.
- **Key Endpoints**:
  - `/api/leetcode-contests`: Fetches upcoming and past contests from LeetCode.
  - `/api/codeforces-contests`: Fetches upcoming and past contests from Codeforces.
  - `/api/bookmarks`: Manages bookmarked contests.

---

### **2. Scraping**
- **File**: fetchContestProblems.js
- **Purpose**: Scrapes problems from contest pages using Puppeteer.
- **Key Features**:
  - Supports multiple platforms (LeetCode, Codeforces).
  - Dynamically extracts problem titles and URLs.

---

### **3. MongoDB Integration**
- **File**: Bookmark.js
- **Purpose**: Defines the schema for storing bookmarked contests.
- **Key Fields**:
  - `title`: The title of the contest.
  - `url`: The URL of the contest.
  - `startTime`: The start time of the contest.
  - `platform`: The platform hosting the contest.

---

## **Environment Variables**

### **Frontend**
- **File**: .env
- **Variables**:
  - `VITE_YOUTUBE_API_KEY`: API key for accessing the YouTube API.

### **Backend**
- **File**: .env
- **Variables**:
  - `MONGO_URI`: MongoDB connection string.

---

## **How to Run the Project**

### **1. Frontend**
- Navigate to the frontend directory:
  ```bash
  cd frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm run dev
  ```

### **2. Backend**
- Navigate to the backend directory:
  ```bash
  cd backend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the server:
  ```bash
  npm start
  ```

---

## **Technologies Used**

### **Frontend**
- React
- Tailwind CSS
- Axios
- Firebase Authentication
- React Router

### **Backend**
- Node.js
- Express.js
- Puppeteer
- MongoDB
- Cheerio

---

## **Future Enhancements**
1. Add support for more platforms (e.g., AtCoder, HackerRank).
2. Implement notifications for upcoming contests.
3. Improve error handling and logging.
4. Add user-specific settings for contest preferences.

---

This document provides a comprehensive overview of the project, its structure, and its functionality. It should serve as a helpful guide for understanding and maintaining the project.
