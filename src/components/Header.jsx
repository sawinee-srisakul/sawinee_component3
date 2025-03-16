import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Logo from './Logo';
import DropdownMenu from './DropdownMenu';
import LoginModal from './LoginModal';

function Header() {
  const [nav, setNav] = useState(false);
  const [courses, setCourses] = useState([]);
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('username')
  );

  const navigate = useNavigate();

  // Fetch Courses API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Navigation Handlers
  const handleHomeClick = () => {
    navigate('/');
    setNav(false);
  };

  const handleCourseDetailClick = (identifier) => {
    navigate(`/CourseDetailPage?id=${identifier}`);
    setNav(false);
  };

  // Handle Login
  const handleLoginSuccess = (user) => {
    localStorage.setItem('username', user);
    setUsername(user);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    setIsLoggedIn(false);
  };

  // Open Login Modal
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  // Navigate to Add/Edit Course Page
  const handleAddEditCourseClick = (courseId = null) => {
    if (courseId) {
      navigate(`/CourseManagementPage?id=${courseId}`);
    } else {
      navigate('/CourseManagementPage');
    }
    setNav(false);
  };

  return (
    <>
      <header className='sticky top-0 left-0 z-10 bg-white p-4 border-b-4 border-gray-100 shadow-md'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
          <div className='flex lg:flex-1'>
            <Logo handleClick={handleHomeClick} />
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex space-x-6'>
            <ul className='flex space-x-6'>
              <li>
                <NavLink
                  to='/'
                  onClick={handleHomeClick}
                  className='text-lg text-blue-900 hover:text-blue-700'
                >
                  Home
                </NavLink>
              </li>

              <DropdownMenu
                courses={courses}
                handleCourseDetailClick={handleCourseDetailClick}
              />
            </ul>
          </div>

          {/* Login Section */}
          <div className='hidden lg:flex items-center space-x-4'>
            {isLoggedIn ? (
              <div className='flex items-center space-x-4'>
                <span className='text-blue-900 font-semibold space-x-8 ml-4'>
                  Welcome, {username}
                </span>
                <button
                  onClick={() => handleAddEditCourseClick()}
                  className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700'
                >
                  Add/Edit Course
                </button>

                <button
                  onClick={handleLogout}
                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700'
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className='bg-blue-600 text-white px-4  space-x-8 ml-4 py-2 rounded-md hover:bg-blue-700'
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNav(true)}
            className='lg:hidden p-2 rounded-md text-blue-900 focus:outline-none hover:text-blue-700'
          >
            <span className='text-2xl'>&#9776;</span>
          </button>
        </nav>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />

      {/* Mobile Side Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          nav ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setNav(false)}
      ></div>

      {/* Mobile Side Navigation Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          nav ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setNav(false)}
          className='absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900'
        >
          &#x2715;
        </button>
        <div className='flex flex-col mt-16 space-y-4 px-6'>
          <ul className='space-y-4'>
            <li>
              <NavLink
                to='/'
                onClick={handleHomeClick}
                className='text-lg text-blue-900 hover:text-blue-700'
              >
                Home
              </NavLink>
            </li>

            <DropdownMenu
              courses={courses}
              handleCourseDetailClick={handleCourseDetailClick}
            />

            <li>
              {isLoggedIn ? (
                <div className='flex flex-col space-y-4'>
                  <span className='text-blue-900 font-semibold'>
                    Welcome, {username}
                  </span>
                  <button
                    onClick={() => handleAddEditCourseClick()}
                    className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700'
                  >
                    Add/Edit Course
                  </button>

                  <button
                    onClick={handleLogout}
                    className='bg-red-500 text-white  px-4 py-2 rounded-md hover:bg-red-700 w-full'
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full'
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
