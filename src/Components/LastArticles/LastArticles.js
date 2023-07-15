import React, { useEffect, useState } from "react";

import "./LastArticles.css";
import CoursesHeader from "../CoursesHeader/CoursesHeader";
import ArticleBox from "../ArticleBox/ArticleBox";

export default function LastArticles() {
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllArticles(result);
      });
  }, []);
  return (
    <div className="last-articles-courses">
      <div className="last-articles-container">
        <div className="container">
          <div className="row">
            <CoursesHeader
              title="آخرین مقاله ها"
              desc="پیش به سوی ارتقای دانش ..."
              coursesBtn="تمامی مقاله ها"
              courseBtnHref='articles/1'
            />
          </div>

          <div className="row">
            {allArticles.slice(0, 3).map((article) => (
              <ArticleBox key={article.id} {...article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
