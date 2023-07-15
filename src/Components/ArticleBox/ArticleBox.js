import React, { useState } from "react";
import "./ArticleBox.css";
import { BiBookReader } from "react-icons/bi";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import { Link } from "react-router-dom";

export default function ArticleBox({ title, description, cover, shortName }) {
  const [isImgShow, setIsImgShow] = useState(false);

  const onImageLoad = () => {
    setIsImgShow(true);
  };

  return (
    <div className="article-box col-4">
      <div className="article-box-container">
        <div className="article-box-top">
          <Link
            to={`/article-info/${shortName}`}
            className="article-box-link-img"
          >
            <img
              src={`/${cover}`}
              alt=""
              className="article-box-image"
              onLoad={onImageLoad}
            />

            {!isImgShow && <CircleSpinner />}
          </Link>
        </div>
        <div className="article-box-down">
          <Link to={`/article-info/${shortName}`} className="article-box-link">
            {title}
          </Link>
          <p className="article-box-desc">{description}</p>
          <div className="article-box-btn-part">
            <Link to={`/article-info/${shortName}`} className="article-box-btn">
              <BiBookReader className="article-box-btn-icon" />
              بیشتر بخوانید ...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
