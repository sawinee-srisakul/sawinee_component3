import '../styles/CourseDetailPage.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CourseDetailPage() {
  const [course, setCourse] = useState(null);
  const [isEnrollModalOpen, setEnrollModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    residentialAddress: '',
    termsConditions: false,
    declaration: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('id');
  console.log('Course ID:', courseId);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/courses/${courseId}`
        );
        console.log('API Response:', response.data);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to fetch course. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const toggleEnrollModal = () => {
    setEnrollModalOpen(!isEnrollModalOpen);
    setIsConfirmed(false);
  };

  const confirmEnrollment = () => {
    setIsConfirmed(true);
  };

  const handleButtonClick = () => {
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Send data to API or handle accordingly
    confirmEnrollment();
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-grow'>
        <fieldset className='login-container card'>
          {isLoading ? (
            <p className='text-center text-gray-500'>Loading...</p>
          ) : error ? (
            <p className='text-center text-red-500'>{error}</p>
          ) : course ? (
            <div className='mt-4 sm:mt-8 md:mt-12 lg:mt-18 p-4'>
              <h1 className='mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-4xl'>
                {course.title}
              </h1>
              <img
                src={`http://localhost:3000/uploads/${course.image}`}
                alt={course.title || 'Course Image'}
                className='w-full max-h-[400px] object-cover mb-4 rounded mx-auto ml-0'
              />
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <h3 className='text-xl font-bold dark:text-white'>
                    Instructor:
                  </h3>
                  <p className='course-detail'>{course.instructor}</p>
                </div>
                <div className='flex items-center space-x-2'>
                  <h3 className='text-xl font-bold dark:text-white'>
                    Durations:
                  </h3>
                  <p className='course-detail'>{course.duration} hours</p>
                </div>
                <div className='flex items-center space-x-2'>
                  <h3 className='text-xl font-bold dark:text-white'>
                    Category:
                  </h3>
                  <p className='course-detail'>{course.category}</p>
                </div>

                <h3 className='text-xl font-bold dark:text-white mb-4'>
                  {course.description}
                </h3>
                <p className='course-detail'>{course.detail}</p>
                <h3 className='text-xl font-semibold'>Modules:</h3>
                <ul className='list-disc pl-6 space-y-2'>
                  {course.modules.map((module, index) => (
                    <li key={index} className='course-module'>
                      {module}
                    </li>
                  ))}
                </ul>
                <div className='app-buttons flex justify-end mt-4'>
                  <button
                    className='px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-all duration-300 ease-in-out'
                    onClick={toggleEnrollModal}
                  >
                    Enroll Now
                  </button>
                  <button
                    className='ml-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300'
                    onClick={handleButtonClick}
                  >
                    Back to Home Page
                  </button>
                </div>
              </div>

              {/* Enrollment Modal */}
              <Modal
                isOpen={isEnrollModalOpen}
                onRequestClose={toggleEnrollModal}
                contentLabel='Enroll'
                className='modal'
                overlayClassName='modal-overlay'
              >
                <div className='bg-white p-6 rounded-lg w-full max-w-sm mx-auto'>
                  {isConfirmed ? (
                    <div className='text-center'>
                      <h2 className='text-2xl font-semibold text-green-600 mb-4'>
                        Confirmed your enrollment
                      </h2>
                      <button
                        className='btn btn-primary bg-blue-500 text-white px-4 py-2 rounded'
                        onClick={toggleEnrollModal}
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className='text-2xl font-semibold mb-4'>
                        Enroll in {course.title}
                      </h2>
                      <p className='mb-4'>
                        Are you sure you want to enroll in this course?
                      </p>

                      {/* Form Fields */}
                      <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                          <label className='block text-sm font-medium text-gray-700'>
                            Full Name
                          </label>
                          <input
                            type='text'
                            name='fulltName'
                            value={formData.fulltName}
                            onChange={handleInputChange}
                            required
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
                          />
                        </div>

                        <div className='mb-4'>
                          <label className='block text-sm font-medium text-gray-700'>
                            Residential Address
                          </label>
                          <input
                            type='text'
                            name='residentialAddress'
                            value={formData.residentialAddress}
                            onChange={handleInputChange}
                            required
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
                          />
                        </div>

                        <div className='mb-4'>
                          <label className='inline-flex items-center'>
                            <input
                              type='checkbox'
                              name='termsConditions'
                              checked={formData.termsConditions}
                              onChange={handleCheckboxChange}
                              required
                              className='form-checkbox'
                            />
                            <span className='ml-2 text-sm'>
                              I have read and agree with the{' '}
                              <a href='#' className='text-blue-500'>
                                IAT Terms and Conditions
                              </a>
                            </span>
                          </label>
                        </div>

                        <div className='mb-4'>
                          <label className='inline-flex items-center'>
                            <input
                              type='checkbox'
                              name='declaration'
                              checked={formData.declaration}
                              onChange={handleCheckboxChange}
                              required
                              className='form-checkbox'
                            />
                            <span className='ml-2 text-sm'>
                              By checking this box, you declare that the
                              information provided is true. You may be asked to
                              provide personal documents as evidence to prove
                              your residential address at a later time. TAFE NSW
                              has the right to revoke your enrolment if the
                              information is found to be inaccurate.
                            </span>
                          </label>
                        </div>

                        {/* Buttons */}
                        <div className='flex justify-between'>
                          <button
                            type='submit'
                            className='btn btn-success bg-green-500 text-white px-4 py-2 rounded'
                          >
                            Confirm Enrollment
                          </button>
                          <button
                            type='button'
                            className='btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded'
                            onClick={toggleEnrollModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </Modal>
            </div>
          ) : (
            <div>
              {courseId ? (
                <p>Course not found for the given ID: {courseId}</p>
              ) : (
                <p>Invalid course ID</p>
              )}
            </div>
          )}
        </fieldset>
      </div>

      <Footer />
    </div>
  );
}

export default CourseDetailPage;
