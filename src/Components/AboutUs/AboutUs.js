import React from "react";

import "./AboutUs.css";
import CoursesHeader from "../CoursesHeader/CoursesHeader";
import { BiHelpCircle } from "react-icons/bi";
import AboutUsBox from "../AboutUsBox/AboutUsBox";
import { SiCoursera } from "react-icons/si";
import { FaLeaf } from 'react-icons/fa'
import { GiCutDiamond } from 'react-icons/gi'
import { FaCrown } from 'react-icons/fa'

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us-container">
        <div className="container">
          <div className="row">
            <CoursesHeader
              title="ما چه کمکی بهتون میکنیم ؟"
              desc="از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست ..."
              courseIcon={
                <BiHelpCircle className="courses-header-right-title-icon" />
              }
            />
          </div>
        </div>

        <div className="container">
          <div className="row">
            <AboutUsBox
              title="دوره های اختصاصی"
              desc="با پشتیبانی و کیفیت بالا ارایه میده !"
              icon={<SiCoursera className="about-us-box-icon" />}
            />
            <AboutUsBox
              title="اجازه تدریس"
              desc="به هر مدرسی رو نمیده. چون کیفیت براش مهمه !"
              icon={<FaLeaf className="about-us-box-icon" />}
            />
            <AboutUsBox
              title="دوره پولی و رایگان"
              desc="براش مهم نیست. به مدرس حقوق میده تا نهایت کیفیت رو در پشتیبانی و آپدیت دوره ارایه بده !"
              icon={<GiCutDiamond className="about-us-box-icon" />}
            />
            <AboutUsBox
              title="اهمیت به کاربر"
              desc="اولویت اول و آخر آکادمی اهیمت به کابرها . رفع نیاز های آموزشی و زوندن اونها به بازار کار است !"
              icon={<FaCrown className="about-us-box-icon" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
