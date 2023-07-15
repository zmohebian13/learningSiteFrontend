import React, { useEffect, useState } from "react";
import "./CourseInfo.css";
import Topbar from "../../Components/Topbar/Topbar";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import { FaTelegram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import CourseDetailBox from "../../Components/CourseDetailBox/CourseDetailBox";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { BsClockFill } from "react-icons/bs";
import { BsCalendarDateFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { MdNotificationImportant } from "react-icons/md";
import { AiFillPlayCircle, AiOutlineEye } from "react-icons/ai";
import { AiOutlineLineChart } from "react-icons/ai";
import ProgressBar from "react-bootstrap/ProgressBar";
import { AiOutlineLine } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa";
import { BsLink45Deg } from "react-icons/bs";
import { MdOutlineViewHeadline } from "react-icons/md";
import { TbCirclesRelation } from "react-icons/tb";
import Accordion from "react-bootstrap/Accordion";
import CommentTextArea from "../../Components/CommentTextArea/CommentTextArea";
import { useParams } from "react-router-dom";
import AccordionItem from "react-bootstrap/esm/AccordionItem";

export default function CourseInfo() {
  const [courseDetails, setCourseDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [courseTeacher, setCourseTeacher] = useState({})
  const [categoryId, setCategoryId] = useState([]);

  const { courseName } = useParams();

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    console.log(courseName);
    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          localStorageData === null ? null : localStorageData.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((courseInfo) => {
        console.log(courseInfo);
        setComments(courseInfo.comments);
        setSessions(courseInfo.sessions);
        setCourseDetails(courseInfo);
        setCreatedAt(courseInfo.createdAt);
        setUpdatedAt(courseInfo.updatedAt);
        setCourseTeacher(courseInfo.creator)
        setCategoryId(courseInfo.categoryID)
      });
  }, []);

  const submitComment = (newCommentBody, commentScore) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: commentScore,
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  return (
    <div>
      <Topbar />
      <NavBar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: `${categoryId.title}`,
            to: "/category-info/frontend/1",
          },
          { id: 3, title: `${courseDetails.name}`, to: "course-info/react" },
        ]}
      />

      <div className="course-info">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a href="#" className="course-info-link">
                آموزش برنامه نویسی فرانت اند
              </a>
              <h1 className="course-info-title">{courseDetails.name}</h1>
              <p className="course-info-desc">{courseDetails.description}</p>
              <div className="course-info-social-media">
                <a href="#" className="course-media-social-media-link">
                  <FaTelegram className="course-media-social-media-icon" />
                </a>
                <a href="#" className="course-media-social-media-link">
                  <FaTwitter className="course-media-social-media-icon" />
                </a>
                <a href="#" className="course-media-social-media-link">
                  <BsFacebook className="course-media-social-media-icon" />
                </a>
              </div>
            </div>
            <div className="col-6">
              <video
                src=""
                poster={courseDetails.cover}
                className="course-info-video"
                controls
              ></video>
            </div>
          </div>
        </div>
      </div>

      <div className="course-info-main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="course">
                <div className="course-boxes">
                  <div className="row">
                    <CourseDetailBox
                      title="وضعیت دوره :"
                      subtitle={
                        courseDetails.isComplete === 1
                          ? "به اتمام رسیده"
                          : "در حال برگزاری"
                      }
                      icon={
                        <IoCheckmarkDoneCircle className="course-detail-box-right-icon" />
                      }
                    />
                    <CourseDetailBox
                      title="زمان برگزاری :"
                      subtitle={createdAt.slice(0,10)}
                      icon={
                        <BsClockFill className="course-detail-box-right-icon" />
                      }
                    />
                    <CourseDetailBox
                      title="آخرین بروزرسانی :"
                      subtitle={updatedAt.slice(0,10)}
                      icon={
                        <BsCalendarDateFill className="course-detail-box-right-icon" />
                      }
                    />
                    <CourseDetailBox
                      title="روش پشتیبانی :"
                      subtitle="آنلاین"
                      icon={
                        <BsFillPersonFill className="course-detail-box-right-icon" />
                      }
                    />
                    <CourseDetailBox
                      title="پیش نیاز :"
                      subtitle="HTML CSS"
                      icon={
                        <MdNotificationImportant className="course-detail-box-right-icon" />
                      }
                    />
                    <CourseDetailBox
                      title="نوع مشاهده :"
                      subtitle="ضبط شده / آنلاین"
                      icon={
                        <AiFillPlayCircle className="course-detail-box-right-icon" />
                      }
                    />
                  </div>
                </div>

                {/* Start Course Progress */}
                <div className="course-progress-bar">
                  <div className="course-progress-header">
                    <AiOutlineLineChart className="course-progress-icon" />
                    <span className="course-progress-title">
                      درصد پیشرفت دوره : 100%
                    </span>
                  </div>
                  <div className="course-progress-bar-chart">
                    <ProgressBar animated now={100} variant="success" />
                  </div>
                </div>
                {/* Finish Course Progress */}

                {/* Start Introduction */}
                <div className="course-introduction">
                  <div className="course-int-item">
                    <AiOutlineLine className="courses-header-right-title-icon" />
                    <span className="course-int-title">
                      آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                    </span>
                    <img
                      src="/images/info/1.gif"
                      alt=""
                      className="course-int-img"
                    />
                    <p className="course-int-desc">
                      کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد
                      و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود
                      که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون
                      بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت
                      خواهید شد و حتی ممکن است ناامید شوید!
                    </p>
                    <p className="course-int-desc">
                      در این دوره نحوه کار با 20 مورد از پر استفاده ترین
                      کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان
                      آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار
                      نداشته باشید
                    </p>
                  </div>
                  <div className="course-int-item">
                    <AiOutlineLine className="courses-header-right-title-icon" />
                    <span className="course-int-title">
                      هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                      درآمد)
                    </span>
                    <img
                      src="/images/info/2.jpg"
                      alt=""
                      className="course-int-img"
                    />
                    <p className="course-int-desc">
                      وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                      از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                      حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                      موقع از این کتابخانه ها استفاده نکرده بودم.
                    </p>
                    <p className="course-int-desc">
                      همان طور که از اسم این دوره مشخص است، هدف از این دوره
                      آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه
                      های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با
                      قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه
                      دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت
                      وارد بازار کار شده و کسب درآمد کنید.
                    </p>
                    <p className="course-int-desc">
                      شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                      کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                      جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                      آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                    </p>
                    <p className="course-int-desc">
                      در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                      نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                      دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                      خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و
                      وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                    </p>
                  </div>
                  <div className="course-int-btns">
                    <a href="#" className="course-int-btn-item">
                      دانلود همگانی ویدیوها
                    </a>
                    <a href="#" className="course-int-btn-item">
                      دانلود همگانی پیوست‌ها
                    </a>
                  </div>

                  <div className="course-introduction-topic">
                    <Accordion className="accordion">
                      <Accordion.Item eventKey="0" className="accordion-item">
                        <Accordion.Header>جلسات دوره</Accordion.Header>
                        {sessions.map((session, index) => (
                          <Accordion.Body>
                            <div className="accordion-body-right">
                              <span className="accordion-body-count">
                                {index + 1}
                              </span>
                              <span className="accordion-body-play-icon">
                                <AiFillYoutube />
                              </span>
                              <a href="#" className="accordion-body-link">
                                {session.title}
                              </a>
                            </div>
                            <div className="accordion-body-left">
                              <span className="accordion-body-time">
                                {session.time}
                              </span>
                            </div>
                          </Accordion.Body>
                        ))}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                {/* Finish Introduction */}

                {/* Start Teacher Details */}
                <div className="teacher-details">
                  <div className="teacher-detail-header">
                    <div className="teacher-detail-header-right">
                      <img
                        src="/images/info/teacher.jfif"
                        alt=""
                        className="teacher-detail-header-img"
                      />
                      <div className="teacher-detail-header-title">
                        <a href="#" className="teacher-detail-header-link">
                          {courseTeacher.name}
                        </a>
                        <span className="teacher-detail-header-job">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div className="teacher-detail-header-left">
                      <FaChalkboardTeacher className="teacher-detail-header-left-icon" />
                      <span className="teacher-detail-header-left-name">
                        {courseTeacher.role === "ADMIN" && "مدرس"}
                      </span>
                    </div>
                  </div>
                  <div className="teacher-detail-footer">
                    <p className="teacher-detail-footer-detail">
                      اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2
                      سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در
                      زمینه وب فعالیت داشته باشم و..
                    </p>
                  </div>
                </div>
                {/* Finish Teacher Details */}

                {/* Start Comment Text Area */}
                <CommentTextArea
                  comments={comments}
                  submitComment={submitComment}
                />
                {/* Finish Comment Text Area */}
              </div>
            </div>
            <div className="col-4">
              <div className="course-info-sidebar">
                <div className="course-info-register-box">
                  {courseDetails.isUserRegisteredToThisCourse === true ? (
                    <span className="course-info-register-title">
                      <GiGraduateCap className="course-info-register-icon" />
                      دانشجوی دوره هستید
                    </span>
                  ) : (
                    <span className="course-info-register-title">
                      <GiGraduateCap className="course-info-register-icon" />
                      ثبت نام در دوره
                    </span>
                  )}
                </div>

                <div className="course-info-total">
                  <div className="course-info-total-top">
                    <div className="course-info-total-students">
                      <FaUserGraduate className="course-info-total-students-icon" />
                      <span className="course-info-total-title">
                        تعداد دانشجو :
                      </span>
                      <span className="course-info-total-student-number">
                        {courseDetails.courseStudentsCount}
                      </span>
                    </div>
                  </div>
                  <div className="course-info-total-bottom">
                    <div className="course-info-total-comment">
                      <FaRegComments className="course-info-total-comment-icon" />
                      <span className="course-info-total-comment-text">
                        67 دیدگاه
                      </span>
                    </div>
                    <div className="course-info-total-bottom-devide">|</div>
                    <div className="course-info-total-view">
                      <AiOutlineEye className="course-info-total-view-icon" />
                      <span className="course-info-total-view-text">
                        14,234 بازدید
                      </span>
                    </div>
                  </div>
                </div>

                <div className="course-info-short-url">
                  <div className="course-info-short-url-header">
                    <BsLink45Deg className="course-info-short-url-icon" />
                    <span className="course-info-short-url-title">
                      لینک کوتاه
                    </span>
                  </div>
                  <div className="course-info-short-url-link">
                    <span className="course-info-short-url-link-text">
                      https://sabzlearn.ir/?p=117472
                    </span>
                  </div>
                </div>

                <div className="course-info-headline">
                  <span className="course-info-headline-title">
                    <MdOutlineViewHeadline className="course-info-headline-icon" />
                    سرفصل های دوره
                  </span>
                  <span className="course-info-headline-subtitle">
                    برای مشاهده و یا دانلود دوره
                    <a href="#" className="course-info-headline-link">
                      {` -> اینجا <- `}
                    </a>
                    کلیک کنید
                  </span>
                </div>

                <div className="course-info-related-course">
                  <div className="course-info-related-header">
                    <span className="course-info-related-header-title">
                      <TbCirclesRelation className="course-info-related-header-icon" />
                      دوره های مرتبط
                    </span>
                  </div>
                  <ul className="course-info-related-list">
                    <li className="course-info-related-item">
                      <a href="#" className="course-info-related-item-link">
                        <img
                          src="/images/courses/nodejs.png"
                          alt=""
                          className="course-info-related-img"
                        />
                        <span className="course-info-related-title">
                          دوره متخصص node.js
                        </span>
                      </a>
                    </li>
                    <li className="course-info-related-item">
                      <a href="#" className="course-info-related-item-link">
                        <img
                          src="/images/courses/jango.png"
                          alt=""
                          className="course-info-related-img"
                        />
                        <span className="course-info-related-title">
                          دوره متخصص جنگو
                        </span>
                      </a>
                    </li>
                    <li className="course-info-related-item">
                      <a href="#" className="course-info-related-item-link">
                        <img
                          src="/images/courses/python.png"
                          alt=""
                          className="course-info-related-img"
                        />
                        <span className="course-info-related-title">
                          دوره متخصص پایتون
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
