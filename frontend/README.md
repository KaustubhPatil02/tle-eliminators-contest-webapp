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