import React, { useEffect, useState } from "react";
import "./Category.css";
import Topbar from "../../Components/Topbar/Topbar";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { MdOutlineWindow } from "react-icons/md";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import { useParams } from "react-router-dom";
import ColumnCourseBox from "../../Components/ColumnCourseBox/ColumnCourseBox";

export default function Category() {
  const [courses, setCourses] = useState([]);
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);
  const [status, setStatus] = useState("default");
  const [statusTitle, setStatusTitle] = useState("مرتب سازی پیش فرض");
  const [searchedValue, setSearchedValue] = useState("");
  const [courseDisplayType, setCourseDisplayType] = useState("row");

  const { categoryName } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses);
        setOrderedCourses(allCourses);
      });
  }, [categoryName]);

  useEffect(() => {
    switch (status) {
      case "free": {
        const freeCourses = courses.filter((course) => course.price === 0);
        setOrderedCourses(freeCourses);
        break;
      }
      case "money": {
        const notFreeCourses = courses.filter((course) => course.price !== 0);
        setOrderedCourses(notFreeCourses);
        break;
      }
      case "last": {
        setOrderedCourses(courses);
        break;
      }
      case "first": {
        const reversedCourse = courses.slice().reverse();
        setOrderedCourses(reversedCourse);
        break;
      }
      default: {
        setOrderedCourses(courses);
      }
    }
  }, [status]);

  const statusTitleChangeHandler = (event) => {
    setStatusTitle(event.target.textContent);
  };

  const searchedValueChangeHandler = (event) => {
    setSearchedValue(event.target.value);
    const filteredCourses = courses.filter((course) =>
      course.name.includes(event.target.value)
    );
    setOrderedCourses(filteredCourses);
  };

  return (
    <>
      <Topbar />
      <NavBar />

      <section className="category">
        <div className="container">
          <div className="category-container">
            <div className="row">
              {courses.length === 0 ? (
                <div className="alert alert-warning">
                  هنوز هیچ دوره ای برای این کتگوری وجود ندارد
                </div>
              ) : (
                <>
                  <div className="category-topbar">
                    <div className="category-topbar-right">
                      <div
                        className={`category-topbar-right-btn ${
                          courseDisplayType === "row"
                            ? "category-topbar-right-btn-active"
                            : ""
                        }`}
                        onClick={() => setCourseDisplayType("row")}
                      >
                        <MdOutlineWindow className="category-topbar-right-icon" />
                      </div>
                      <div
                        className={`category-topbar-right-btn ${
                          courseDisplayType === "column"
                            ? "category-topbar-right-btn-active"
                            : ""
                        }`}
                        onClick={() => setCourseDisplayType("column")}
                      >
                        <BsReverseListColumnsReverse className="category-topbar-right-icon" />
                      </div>
                      <div className="category-topbar-selection">
                        <span className="category-topbar-selection-title">
                          {statusTitle}
                          <AiOutlineCaretDown className="category-topbar-selection-icon" />
                        </span>
                        <ul className="category-topbar-selection-list">
                          <li
                            className="category-topbar-selection-item"
                            onClick={(event) => {
                              setStatus("default");
                              statusTitleChangeHandler(event);
                            }}
                          >
                            مرتب سازی پیش فرض
                          </li>
                          <li
                            className="category-topbar-selection-item"
                            onClick={(event) => {
                              setStatus("free");
                              statusTitleChangeHandler(event);
                            }}
                          >
                            مرتب سازی دوره های رایگان
                          </li>
                          <li
                            className="category-topbar-selection-item"
                            onClick={(event) => {
                              setStatus("money");
                              statusTitleChangeHandler(event);
                            }}
                          >
                            مرتب سازی دوره های پولی
                          </li>
                          <li
                            className="category-topbar-selection-item"
                            onClick={(event) => {
                              setStatus("last");
                              statusTitleChangeHandler(event);
                            }}
                          >
                            مرتب سازی بر اساس آخرین
                          </li>
                          <li
                            className="category-topbar-selection-item"
                            onClick={(event) => {
                              setStatus("first");
                              statusTitleChangeHandler(event);
                            }}
                          >
                            مرتب سازی بر اساس اولین
                          </li>
                          <li
                            className="category-topbar-selection-item"
                            onClick={(event) => {
                              setStatus("cheap");
                              statusTitleChangeHandler(event);
                            }}
                          >
                            مرتب سازی بر اساس ارزان ترین
                          </li>
                          <li
                            className="category-topbar-selection-item"
                            onClick={(event) => {
                              setStatus("expensive");
                              statusTitleChangeHandler(event);
                            }}
                          >
                            مرتب سازی بر اساس گران ترین
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="category-topbar-left">
                      <form action="#" className="category-topbar-form">
                        <input
                          type="text"
                          className="category-topbar-input"
                          placeholder="جستجوی دوره ..."
                          value={searchedValue}
                          onChange={searchedValueChangeHandler}
                        />
                        <BsSearch className="category-tobbar-form-icon" />
                      </form>
                    </div>
                  </div>

                  {shownCourses.length === 0 ? (
                    <div className="alert alert-warning mt-3">
                      هنوز هیچ دوره ای برای {statusTitle} وجود ندارد
                    </div>
                  ) : (
                    <>
                      <div className="container">
                        <div className="category-course-box">
                          <div className="row">
                            {courseDisplayType === "row" ? (
                              <>
                                {shownCourses.map((course) => (
                                  <CourseBox key={course.id} {...course} />
                                ))}
                              </>
                            ) : (
                              <>
                                {shownCourses.map((course) => (
                                  <ColumnCourseBox
                                    key={course.id}
                                    {...course}
                                  />
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              <Pagination
                items={orderedCourses}
                itemCount={6}
                pathName={`/category-info/${categoryName}`}
                setShownItem={setShownCourses}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
