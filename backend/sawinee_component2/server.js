import express from 'express';
import cors from 'cors';
import pkg from 'mongoose';
import path, { dirname } from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();

const { connect, connection, Schema, model, Types } = pkg;

console.log('MONGODB_URI:', process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
  console.error(
    '❌ Missing MONGODB_URI in .env file. Please set it before running the server.'
  );
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// =======================
// Serve uploads folder
// =======================
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// =======================
// MongoDB connection
// =======================
connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// =======================
// Multer config
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// =======================
// Schema
// =======================
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

// =======================
// API Routes
// =======================
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).send('Error retrieving courses');
  }
});

app.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send({ error: 'Course not found' });
    res.status(200).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/courses', upload.single('image'), async (req, res) => {
  try {
    const newCourse = new Course({
      _id: new Types.ObjectId(),
      ...req.body,
      image: req.file ? req.file.filename : '',
    });
    await newCourse.save();
    res.status(201).send(newCourse);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/courses/:courseId', upload.single('image'), async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.courseId,
      { ...req.body, image: req.file ? req.file.filename : undefined },
      { new: true }
    );
    if (!updatedCourse)
      return res.status(404).send({ error: 'Course not found' });
    res.status(200).send(updatedCourse);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/courses/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse)
      return res.status(404).send({ error: 'Course not found' });
    res.status(200).send(deletedCourse);
  } catch (error) {
    res.status(400).send(error);
  }
});

// =======================
// ✅ Serve React frontend
// =======================
const frontendPath = path.join(__dirname, '../../dist');
app.use(express.static(frontendPath));

// Fallback for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// =======================
// Start server
// =======================
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
