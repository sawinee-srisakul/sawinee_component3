import express, { json } from 'express';
import cors from 'cors'; // Import the cors package
import pkg from 'mongoose';
import path from 'path';
import multer from 'multer'; // Import multer for file uploads
import { fileURLToPath } from 'url'; // Import fileURLToPath for ES module support
import { dirname } from 'path'; // Import dirname to work with file paths
const { connect, connection, Schema, model, Types } = pkg;
import { config } from 'dotenv';
config();

console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
connect(process.env.MONGODB_URI);

const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set up Multer for image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded images to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
  },
});

const upload = multer({ storage: storage });

// Define Mongoose schemas and models
const courseSchema = new Schema({
  courseid: { type: Number, required: true, unique: true },
  title: String,
  description: String,
  instructor: String,
  duration: Number,
  category: String,
  image: String, // Added field for image
  detail: String, // Added field for detailed description
  modules: [String], // Added field for modules as an array of strings
});

const Course = model('Course', courseSchema);

// 1. Retrieve all courses
app.get('/courses', (req, res) => {
  Course.find({})
    .then((courses) => {
      res.json(courses);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error retrieving courses');
    });
});

// 2. Retrieve a specific Course by _ID
app.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
    });

    if (!course) {
      return res.status(404).send({ error: 'Course not found' });
    }

    console.log(`courses id ${req.params.id}`, course);
    res.status(200).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// 3. Add a new Course
app.post('/courses', upload.single('image'), async (req, res) => {
  const image = req.file ? req.file.filename : ''; // Save the image filename
  const newCourse = new Course({
    _id: new Types.ObjectId(),
    ...req.body,
    image, // Store the image filename in the database
  });

  try {
    await newCourse.save();
    console.log('Course created:', newCourse);
    res.status(201).send(newCourse);
  } catch (error) {
    res.status(400).send(error);
  }
});

// 4. Update a course by ID
app.put('/courses/:courseId', upload.single('image'), async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined; // Get the new image filename
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: req.params.courseId },
      { ...req.body, image: image }, // Update image if provided
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).send({ error: 'Course not found' });
    }
    console.log(`Course ${req.params.courseId} updated:`, updatedCourse);
    res.status(200).send(updatedCourse);
  } catch (error) {
    res.status(400).send(error);
  }
});

// 5. Delete a course by Course ID
app.delete('/courses/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deletedCourse) {
      return res.status(404).send({ error: 'Course not found' });
    }
    console.log(`Course ${req.params.id} deleted:`, deletedCourse);
    res.status(200).send(deletedCourse);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
