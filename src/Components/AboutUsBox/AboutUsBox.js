import React from "react";

import "./AboutUsBox.css";
import { SiCoursera } from "react-icons/si";

export default function AboutUsBox({ title, desc, icon }) {
  return (
    <div className="about-us-box col-6">
      <div className="about-us-box-container">
        <div className="about-us-box-right"> 
          {icon}
        </div>
        <div className="about-us-box-left">
          <span className="about-us-box-title">{title}</span>
          <span className="about-us-box-desc">{desc}</span>
        </div>
      </div>
    </div>
  );
}
