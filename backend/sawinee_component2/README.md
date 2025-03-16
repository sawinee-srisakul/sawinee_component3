# Backend - Course Management API

## Project Overview

This is a simple **Course Management API** built with **Node.js** and **Express**. It allows you to manage courses in a MongoDB database with CRUD operations. The API also supports image uploads using **Multer** for storing course images.

The application provides endpoints for retrieving, adding, updating, and deleting courses, along with storing and serving course images from the `uploads/` directory.

## Features

- **Create, Read, Update, Delete** courses.
- Store course images in MongoDB using **Multer**.
- Serve static files from the `uploads` directory.
- Connects to a **MongoDB** database.

## Technologies Used

- **Node.js** (v16+)
- **Express.js** (v4.21.2)
- **MongoDB** (via Mongoose)
- **Multer** (for file uploads)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/sawinee-srisakul/sawinee_component2.git
```

### 2. Install Dependencies

Run the following command to install the required packages:

```bash
cd sawinee_component2
npm install
```

### 3. Start the Application

Run the following command to install the required packages:

```bash
node server.js

or

npm run start
```

### The server will start on http://localhost:3000.

### API Endpoints

### 1. Retrieve All Courses

**GET** `/courses`

**Response:**

- A list of all courses.

### 2. Retrieve a Specific Course

**GET** /courses/:id

**Params:**

- id: The unique course ID.

**Response:**

- Returns the details of the specified course.

### 3. Add a New Course

**POST** /courses

Request Body:

```bash
{
  "courseid": 600,
  "title": "Course Title",
  "description": "Course Description",
  "detail": "Course Detail",
  "instructor": "Instructor Name",
  "duration": 40,
  "category": "Category",
  "image": <image file>,
  "modules": ["Module 1", "Module 2", "Module 3"]
}
```

**Response:**

- Returns the newly created course with a unique ID.

### 4. Update a Course by ID

**PUT** /courses/:id

**Params:**

- id: The unique course ID to update.
  Request Body:

```bash
{
  "courseid": 600,
  "title": "Updated Course Title",
  "description": "Updated Description",
  "detail": "Course Detail",
  "instructor": "Updated Instructor",
  "duration": 45,
  "category": "Updated Category",
  "image": <image file>,
  "modules": ["Module 1", "Module 2", "Module 3"]
}
```

**Response:**

- Returns the updated course data.

### 5. Delete a Course by ID

**DELETE** /courses/:id

**Params:**

- id: The unique course ID to delete.

**Response:**

- Confirmation of course deletion.

### File Uploads

Multer is used for handling file uploads.
All uploaded images are stored in the uploads/ directory.
Each uploaded image is renamed with a timestamp for uniqueness.
