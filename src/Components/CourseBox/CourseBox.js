import React, { useState } from "react";

import "./CourseBox.css";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CourseBox(props) {
  const [isImgShow, setIsImgShow] = useState(false);

  return (
    <div className="course-box col-4" style={{width: `${props.isSlider && '100%'}`}}>
      <div className="course-box-container">
        <Link to={`/course-info/${props.shortName}`}>
          <img
            src={`/${props.cover}`}
            alt=""
            className="course-box-img"
            onLoad={() => setIsImgShow(true)}
          />

          {!isImgShow && <CircleSpinner />}
        </Link>
        <div className="course-box-details">
          <Link
            to={`/course-info/${props.shortName}`}
            className="course-box-title"
          >
            {props.name}
          </Link>
          <div className="course-box-teacher-rating">
            <div className="course-box-teacher">
              <FaChalkboardTeacher className="course-box-teacher-icon" />
              <a href="" className="course-box-teacher-link">
                رضا دولتی
              </a>
            </div>
            <div className="course-box-rating">
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </div>
          </div>
          <div className="course-box-status">
            <div className="course-box-users">
              <FaUsers className="course-box-users-icon" />
              <span className="course-box-user-count">500</span>
            </div>
            <div className="course-box-price">
              <span className="course-box-price-amount">
                {props.price === 0 ? "رایگان" : props.price}
              </span>
            </div>
          </div>

          <div className="course-box-footer">
            <Link
              to={`/course-info/${props.shortName}`}
              className="course-box-footer-link"
            >
              مشاهده اطلاعات دوره
            </Link>
            <BsArrowLeftShort className="course-box-footer-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
