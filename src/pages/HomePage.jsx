import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseList from '../components/CourseList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = (identifier) => {
    navigate(`/CourseDetailPage?id=${identifier}`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/courses');
        console.log(response);
        setCourses(response.data); // Set fetched courses into state
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='mt-4 sm:mt-8 md:mt-12 lg:mt-18  p-4 '>
        <h1 className='mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl text-center'>
          Component3: The new way to get the skills you need and employers want
        </h1>
      </div>
      <fieldset className='homepage-container card z-0 p-6'>
        <div className='min-h-screen p-4 z-0'>
          <CourseList courses={courses} onCourseClick={handleButtonClick} />
        </div>
      </fieldset>
      <Footer />
    </div>
  );
}

export default HomePage;
