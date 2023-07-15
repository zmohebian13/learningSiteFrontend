import React, { useEffect, useState } from "react";
import CoursesHeader from "../CoursesHeader/CoursesHeader";
import "./LastCourses.css";
import CourseBox from "../CourseBox/CourseBox";

export default function LastCourses() {
  const [allCourses, setAllCourses] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllCourses(result);
      });
  }, []);

  return (
    <div className="last-courses">
      <div className="last-courses-container">
        <div className="container">
          <div className="row">
            <CoursesHeader
              title="جدیدترین دوره ها"
              desc="سکوی پرتاب شما به سمت موفقیت"
              coursesBtn="تمامی دوره ها"
              courseBtnHref="courses/1"
            />
          </div>
        </div>

        <div className="last-courses-box">
          <div className="container">
            <div className="row">
              {allCourses.splice(0, 6).map((course) => (
                <CourseBox key={course.id} {...course}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
