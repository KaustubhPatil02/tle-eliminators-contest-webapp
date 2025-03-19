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