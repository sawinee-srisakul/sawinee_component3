import express from 'express';
import cors from 'cors';
import pkg from 'mongoose';
import path, { dirname } from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config(); // Load environment variables

// Destructure Mongoose
const { connect, connection, Schema, model, Types } = pkg;

// Log MongoDB URI
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Validate MongoDB URI
if (!process.env.MONGODB_URI) {
  console.error(
    '❌ Missing MONGODB_URI in .env file. Please set it before running the server.'
  );
  process.exit(1);
}

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json()); // Use express.json() instead of { json }

// Server port
const port = process.env.PORT || 3000;

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Define Mongoose schema
const courseSchema = new Schema({
  courseid: { type: Number, required: true, unique: true },
  title: String,
  description: String,
  instructor: String,
  duration: Number,
  category: String,
  image: String,
  detail: String,
  modules: [String],
});

const Course = model('Course', courseSchema);

/* -------------------------------
   ROUTES
--------------------------------*/

// 1️⃣ Get all courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving courses');
  }
});

// 2️⃣ Get a specific course by ID
app.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// 3️⃣ Add a new course
app.post('/courses', upload.single('image'), async (req, res) => {
  try {
    const image = req.file ? req.file.filename : '';
    const newCourse = new Course({
      _id: new Types.ObjectId(),
      ...req.body,
      image,
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).send(error);
  }
});

// 4️⃣ Update a course
app.put('/courses/:courseId', upload.single('image'), async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) updatedData.image = req.file.filename;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.courseId,
      updatedData,
      { new: true }
    );

    if (!updatedCourse)
      return res.status(404).send({ error: 'Course not found' });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).send(error);
  }
});

// 5️⃣ Delete a course
app.delete('/courses/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse)
      return res.status(404).send({ error: 'Course not found' });
    res.status(200).json(deletedCourse);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
