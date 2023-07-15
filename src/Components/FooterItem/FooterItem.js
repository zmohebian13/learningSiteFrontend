import React from 'react'

import './FooterItem.css'

export default function FooterItem({ title, children, isSmall}) {
  return (
    <div className={`footer-item ${isSmall ? 'col-12' : 'col-4'}`}>
      <div className="footer-item-container">
        <span className="footer-item-title">{title}</span>
        {children}
      </div>
    </div>
  );
}
