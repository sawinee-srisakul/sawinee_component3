# Component 3 - Client-Side Integration

## Project Overview

This repository contains a full-stack course management application. It includes both the client-side, built with React, and a backend server implemented using Node.js. The application provides a user-friendly interface for managing and enrolling in courses.

**_Key features include:_**

- Course Listing Page: Displays a list of all available courses, allowing users to view course details.
- Course Detail Page: Shows detailed information about a specific course, including prerequisites, duration, and instructor details.

- In addition to the front-end, this repository also contains the back-end server, which provides the necessary API for fetching and managing course data.

- Backend (Node.js): The server provides RESTful endpoints to handle data operations such as fetching courses, and course details
  By running both the back-end and front-end applications locally, users can access a fully functional course management system.

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/sawinee-srisakul/sawinee_component3.git
```

### 2. Install Frontend (FE) Dependencies

Navigate to the frontend directory and install the required packages:

```bash
cd sawinee_component3
npm install
```

### 3. Install Backend (BE) Dependencies

Navigate to the backend directory and install the required packages:

```bash
cd backend/sawinee_component2
npm install
```

### 4. Start the BE Application

Start the backend application by running the following command:

```bash
node server.js
```

### The Backend server will start on http://localhost:3000.

### 5. Start the FE Application

Open a new terminal window, navigate back to the frontend directory, and run the following command to start the frontend application:

```bash
cd sawinee_component3
npm run dev
```

### This will launch the web application, and you can access it at http://localhost:5173 (default Vite port).
