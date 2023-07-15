import React from "react";
import "./CoursesHeader.css";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";

export default function CoursesHeader({ title, desc, coursesBtn, courseBtnHref }) {
  return (
    <div className="courses-header">
      <div className="courses-header-container">
        <div className="courses-header-right">
          <div className="courses-header-right-title-icon-part">
            <AiOutlineLine className="courses-header-right-title-icon" />
          </div>
          <div className="courses-header-right-description">
            <div className="courses-header-right-title">{title}</div>
            <div className="courses-header-right-title-desc">{desc}</div>
          </div>
        </div>

        {coursesBtn ? (
          <div className="courses-header-left">
            <Link to={`/${courseBtnHref}`} className="courses-header-left-link">
              {coursesBtn}
              <BsArrowLeftShort className="courses-header-left-icon" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
