import React, { useEffect, useState } from "react";

import "./AllArticles.css";
import Topbar from "../../Components/Topbar/Topbar";
import NavBar from "../../Components/NavBar/NavBar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import Pagination from "../../Components/Pagination/Pagination";

export default function AllArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [shownArticles, setShownArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllArticles(result);
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
            title: "تمامی مقاله ها",
            to: "articles/1",
          },
        ]}
      />

      <div className="all-courses">
        <div className="container">
          <div className="all-courses-content">
            <div className="row">
              {shownArticles.map((article) => (
                <ArticleBox key={article.id} {...article} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Pagination
        items={allArticles}
        itemCount={6}
        pathName="/articles"
        setShownItem={setShownArticles}
      />

      <Footer />
    </div>
  );
}
