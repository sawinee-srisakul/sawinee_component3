import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CourseManagementPage = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseid: '',
    title: '',
    description: '',
    instructor: '',
    duration: '',
    category: '',
    image: null,
    detail: '',
    modules: [],
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/courses')
      .then((response) => setCourses(response.data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'modules') {
      // Split by commas to convert to array
      setFormData({
        ...formData,
        [name]: value.split(',').map((item) => item.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        if (key === 'modules' && Array.isArray(formData[key])) {
          formData[key].forEach((module) => {
            form.append('modules[]', module); // Use 'modules[]' to ensure array format on backend
          });
        } else {
          form.append(key, formData[key]);
        }
      }
    });

    // Log the FormData as an object
    let formObject = {};
    form.forEach((value, key) => {
      formObject[key] = value;
    });
    console.log('Form data being sent:', formObject); // Check the data before sending

    if (isEdit) {
      axios
        .put(`http://localhost:3000/courses/${currentCourseId}`, form)
        .then((response) => {
          setCourses(
            courses.map((course) =>
              course._id === currentCourseId ? response.data : course
            )
          );
          resetForm();
        })
        .catch((error) => console.error('Error updating course:', error));
    } else {
      axios
        .post('http://localhost:3000/courses', form)
        .then((response) => {
          setCourses([...courses, response.data]);
          resetForm();
        })
        .catch((error) => console.error('Error adding course:', error));
    }
  };

  const resetForm = () => {
    setFormData({
      courseid: '',
      title: '',
      description: '',
      instructor: '',
      duration: '',
      category: '',
      image: null,
      detail: '',
      modules: [],
    });
    setImagePreview(null);
    setIsEdit(false);
    setCurrentCourseId(null);
  };

  const handleEdit = (course) => {
    setFormData({
      courseid: course.courseid,
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      category: course.category,
      image: null,
      detail: course.detail,
      modules: course.modules,
    });

    // Set the preview of the existing image if available
    setImagePreview(
      course.image ? `http://localhost:3000/uploads/${course.image}` : null
    );

    setIsEdit(true);
    setCurrentCourseId(course._id);
  };

  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      axios
        .delete(`http://localhost:3000/courses/${courseId}`)
        .then(() => {
          setCourses(courses.filter((course) => course._id !== courseId));
        })
        .catch((error) => console.error('Error deleting course:', error));
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='p-4'>
        <h2 className='text-3xl font-semibold mb-8 bg-blue-500 text-white p-4'>
          Course Management
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4 max-w-md mx-auto'>
          <input
            type='number'
            name='courseid'
            value={formData.courseid}
            onChange={handleInputChange}
            placeholder='Course ID'
            required
            className='w-full p-2 border'
          />
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            placeholder='Course Title'
            required
            className='w-full p-2 border'
          />
          <textarea
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            placeholder='Course Description'
            className='w-full p-2 border'
          />
          <input
            type='text'
            name='instructor'
            value={formData.instructor}
            onChange={handleInputChange}
            placeholder='Instructor Name'
            className='w-full p-2 border'
          />
          <input
            type='number'
            name='duration'
            value={formData.duration}
            onChange={handleInputChange}
            placeholder='Duration'
            className='w-full p-2 border'
          />
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleInputChange}
            placeholder='Category'
            className='w-full p-2 border'
          />
          <input
            type='file'
            name='image'
            onChange={handleFileChange}
            className='w-full p-2 border'
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt='Preview'
              className='max-w-xs mx-auto'
            />
          )}
          <textarea
            name='detail'
            value={formData.detail}
            onChange={handleInputChange}
            placeholder='Detailed Description'
            className='w-full p-2 border'
          />
          <input
            type='text'
            name='modules'
            value={formData.modules.join(', ')} // Join the array into a string for display
            onChange={handleInputChange}
            placeholder='Modules (comma-separated)'
            className='w-full p-2 border'
          />
          <button type='submit' className='w-full p-2 bg-blue-500 text-white'>
            {isEdit ? 'Update Course' : 'Add Course'}
          </button>
          <button
            type='button'
            onClick={resetForm}
            className='w-full p-2 bg-gray-500 text-white'
          >
            Clear
          </button>
        </form>

        <h2 className='text-3xl font-semibold mt-8  bg-green-500 text-white p-4'>
          Course List
        </h2>
        <div className='p-8'>
          <ul>
            {courses.map((course) => (
              <li
                key={course._id}
                className='mb-4 flex items-center border-b border-gray-200 pb-4'
              >
                <div className='flex-1'>
                  <h4 className='text-lg font-bold'>{course.title}</h4>
                  <p>{course.description}</p>
                </div>
                <div className='flex space-x-2'>
                  <button
                    onClick={() => handleEdit(course)}
                    className='p-2 bg-yellow-500 text-white  rounded-md hover:bg-yellow-700'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className='p-2 bg-red-500 text-white  rounded-md hover:bg-red-700'
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseManagementPage;
