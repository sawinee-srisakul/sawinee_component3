import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // Import useLocation hook

const DropdownMenu = ({ courses, handleCourseDetailClick }) => {
  const location = useLocation(); // Get the current location (path and search)

  // Check if the link is active based on the query parameter
  const getActiveClass = (courseId) => {
    const searchParams = new URLSearchParams(location.search);
    const activeCourseId = searchParams.get('id');
    return activeCourseId === courseId.toString()
      ? 'block px-4 py-2 text-green-900 hover:text-green-700 bg-red-100' // Active link background
      : 'block px-4 py-2 text-blue-900 hover:text-blue-700';
  };

  return (
    <li className='relative group cursor-pointer'>
      <a href='#' className='text-lg text-blue-900 hover:text-blue-700'>
        Course Details
      </a>
      <ul className='absolute left-0 w-48 bg-white shadow-md rounded-md hidden group-hover:block'>
        {courses.map((item) => (
          <li key={item._id}>
            <NavLink
              to={`/CourseDetailPage?id=${item._id}`} // Ensure the correct route
              onClick={() => {
                console.log(item); // Log the item when clicked
                handleCourseDetailClick(item._id); // Proceed with your existing function
              }}
              className={getActiveClass(item._id)} // Use dynamic active class
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default DropdownMenu;
