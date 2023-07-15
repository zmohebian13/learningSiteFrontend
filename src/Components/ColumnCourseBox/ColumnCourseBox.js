import React, { useState } from "react";

import "./ColumnCourseBox.css";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ColumnCourseBox(props) {
  const [isImgShow, setIsImgShow] = useState(false);

  return (
    <div
      className="column-course-box col-12"
      style={{ width: `${props.isSlider && "100%"}` }}
    >
      <div className="column-course-box-container">
        <Link to={`/column-course-info/${props.shortName}`}>
          <img
            src={`/${props.cover}`}
            alt=""
            className="column-course-box-img"
            onLoad={() => setIsImgShow(true)}
          />

          {!isImgShow && <CircleSpinner />}
        </Link>
        <div className="column-course-box-details">
          <Link
            to={`/column-course-info/${props.shortName}`}
            className="column-course-box-title"
          >
            {props.name}
          </Link>
          <div className="column-course-box-teacher-rating">
            <div className="column-course-box-teacher">
              <FaChalkboardTeacher className="column-course-box-teacher-icon" />
              <a href="" className="column-course-box-teacher-link">
                رضا دولتی
              </a>
            </div>
            <div className="column-course-box-rating">
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </div>
          </div>
          <div className="column-course-box-desc">
            {props.description}
          </div>
          <div className="column-course-box-status">
            <div className="column-course-box-users">
              <FaUsers className="column-course-box-users-icon" />
              <span className="column-course-box-user-count">500</span>
            </div>
            <div className="column-course-box-price">
              <span className="column-course-box-price-amount">
                {props.price === 0 ? "رایگان" : props.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
