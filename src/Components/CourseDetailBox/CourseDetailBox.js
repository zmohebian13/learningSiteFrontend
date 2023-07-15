import React from "react";

import "./CourseDetailBox.css";

export default function CourseDetailBox({ title, subtitle, icon}) {
  return (
    <div className="col-4">
      <div className="course-detail-box">
        <div className="course-detail-box-right">
          { icon }
        </div>
        <div className="course-detail-box-left">
          <span className="course-detail-box-title">{title}</span>
          <span className="course-detail-box-subtitle">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}
