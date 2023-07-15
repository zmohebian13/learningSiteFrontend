import React from "react";

import "./Breadcrumb.css";
import { AiOutlineHome } from "react-icons/ai";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Breadcrumb({ links }) {
  return (
    <div className="breadcrumb">
      <div className="container">
        <div className="breadcrumb-content">
          <div className="breadcrumb-icon">
            <AiOutlineHome className="breadcrumb-home-icon" />
          </div>
          <ul className="breadcrumb-list">
            {links.map((link) => (
              <li className="breadcrumb-item">
                <Link to={`/${link.to}`} className="breadcrumb-link">
                  {link.title}

                  {link.id !== links.length ? (
                    <FiChevronLeft className="breadcrumb-link-icon" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
