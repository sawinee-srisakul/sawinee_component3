import React, { useState } from 'react';

const CourseCard = ({ course, onClick }) => {
  return (
    <div className='bg-white p-4 border border-gray-300 rounded-lg shadow-md flex flex-col items-center text-center transition-transform transform hover:-translate-y-1'>
      <img
        src={`http://localhost:3000/uploads/${course.image}`}
        alt={course.title}
        className='w-full h-48 object-cover mb-4 rounded'
      />
      <h2 className='text-2xl font-bold text-gray-900'>{course.title}</h2>
      <h4 className='text-lg font-semibold text-gray-700'>
        Duration: {course.duration} hours
      </h4>
      <p className='text-base text-gray-600'>{course.description}</p>

      <button
        className='mt-4 px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-all duration-300 ease-in-out'
        onClick={() => onClick(course._id)}
      >
        <span className='sr-only'>View More</span>
        View More
      </button>
    </div>
  );
};

export default CourseCard;
