import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ courses, onCourseClick }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-0'>
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} onClick={onCourseClick} />
      ))}
    </div>
  );
};

export default CourseList;
