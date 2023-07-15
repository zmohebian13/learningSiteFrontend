import React, { useEffect, useState } from "react";

import "./AllCourses.css";
import Topbar from "../../Components/Topbar/Topbar";
import NavBar from "../../Components/NavBar/NavBar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";

export default function AllCourses() {
  const [allCourses, setAllCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllCourses(result);
      });
  }, []);
  return (
    <div>
      <Topbar />
      <NavBar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses/1",
          },
        ]}
      />

      <div className="all-courses">
        <div className="container">
          <div className="all-courses-content">
            <div className="row">
              {shownCourses.map((course) => (
                <CourseBox {...course} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Pagination
        items={allCourses}
        itemCount={6}
        pathName="/courses"
        setShownItem={setShownCourses}
      />

      <Footer />
    </div>
  );
}
