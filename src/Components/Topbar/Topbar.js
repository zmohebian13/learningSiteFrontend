import React, { memo, useEffect, useState } from "react";
import "./Topbar.css";
import { HiOutlineMail } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import { Link } from "react-router-dom";

export default memo(function Topbar() {
  const [allTopbarLinks, setAllTopbarLinks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus/topbar`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllTopbarLinks(data);
      });
  }, []);

  const getRandomTopbarLink = (arr, randomCount) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, randomCount);
  };

  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="topbar-content">
          <div className="topbar-right">
            <ul className="topbar-right-menu">
              {getRandomTopbarLink(allTopbarLinks, 5).map((link) => (
                <li className="topbar-menu-item">
                  <Link to={`/course-info/${link.href}`} className="topbar-right-link">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="topbar-left">
            <div className="top-bar-email">
              <a href="#" className="topbar-left-link">
                sabzlearn@gmail.com
                <HiOutlineMail className="topbar-left-icon" />
              </a>
            </div>
            <div className="top-bar-phone">
              <a href="#" className="topbar-left-link">
                09921558293
                <HiPhone className="topbar-left-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})
