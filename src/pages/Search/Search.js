import React, { useEffect, useState } from "react";

import "./Search.css";
import Topbar from "../../Components/Topbar/Topbar";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import CoursesHeader from "../../Components/CoursesHeader/CoursesHeader";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

export default function Search() {
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);
  const { value } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setArticles(result.allResultArticles);
        setCourses(result.allResultCourses);
      });
  }, []);

  return (
    <div>
      <Topbar />
      <NavBar />

      <div className="container">
        <div className="row">
          <CoursesHeader
            title={`نتیجه دوره ها برای "${value}"`}
          />

          {courses.length === 0 ? (
            <div className="alert alert-warning">
              هیچ دوره ای برای جستجوی شما پیدا نشد
            </div>
          ) : (
            <>
              {courses.map((course) => (
                <CourseBox key={course.id} {...course} />
              ))}
            </>
          )}
        </div>
      </div>

      <div className="container">
        <div className="row">
          <CoursesHeader title={`نتیجه مقالات برای "${value}"`} />

          {articles.length === 0 ? (
            <div className="alert alert-warning mt-3">
              هیچ مقاله ای برای جستجوی شما پیدا نشد
            </div>
          ) : (
            <>
              {articles.map((article) => (
                <ArticleBox key={article.id} {...article} />
              ))}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
