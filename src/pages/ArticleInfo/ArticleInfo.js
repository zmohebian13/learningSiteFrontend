import React, { useEffect, useState } from "react";

import "./ArticleInfo.css";
import Topbar from "../../Components/Topbar/Topbar";
import NavBar from "../../Components/NavBar/NavBar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

import { GoFileDirectory } from "react-icons/go";
import { BsArrowLeftShort, BsFillPersonFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import Footer from "../../Components/Footer/Footer";
import { FaTelegram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import CommentTextArea from "../../Components/CommentTextArea/CommentTextArea";
import { useParams } from "react-router-dom";

export default function ArticleInfo() {
  const [articleInfo, setArticleInfo] = useState({});
  const [categoryID, setCategoryID] = useState({});
  const [articleCreator, setArticleCreator] = useState({});
  const [articleCreatedAt, setArticleCreatedAt] = useState('');
  const { articleName } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articleName}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setArticleInfo(result);
        setCategoryID(result.categoryID);
        setArticleCreator(result.creator)
        setArticleCreatedAt(result.createdAt);
      });
  }, []);
  return (
    <div>
      <Topbar />
      <NavBar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "مقاله ها", to: "category-info/frontend" },
          { id: 3, title: "ویو  vs  ری اکت", to: "category-info/frontend" },
        ]}
      />

      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="article">
                <h1 className="article-title">{articleInfo.title}</h1>

                <div className="article-header-info">
                  <div className="article-header-item">
                    <GoFileDirectory className="article-header-icon" />
                    <span className="article-header-text">
                      {categoryID.title}
                    </span>
                  </div>
                  <div className="article-header-item">
                    <BsFillPersonFill className="article-header-icon" />
                    <span className="article-header-text">
                      ارسال شده توسط : {articleCreator.name}
                    </span>
                  </div>
                  <div className="article-header-item">
                    <BiTimeFive className="article-header-icon" />
                    <span className="article-header-text">
                      تاریخ انتشار : {articleCreatedAt.slice(0, 10)}
                    </span>
                  </div>
                  <div className="article-header-item">
                    <AiOutlineEye className="article-header-icon" />
                    <span className="article-header-text">21.4k بازدید</span>
                  </div>
                </div>

                <img
                  src={`/${articleInfo.cover}`}
                  alt=""
                  className="article-info-first-banner"
                />

                <div className="article-info-rating">
                  <div className="article-info-rating-icons">
                    <AiFillStar className="article-info-rating-icon" />
                    <AiFillStar className="article-info-rating-icon" />
                    <AiFillStar className="article-info-rating-icon" />
                    <AiOutlineStar className="article-info-rating-icon" />
                    <AiOutlineStar className="article-info-rating-icon" />
                  </div>
                  <span className="article-info-rating-text">
                    4.2/5 - (5 امتیاز)
                  </span>
                </div>

                <p className="article-info-desc">
                  جاوا اسکریپت یکی از زبان‌های برنامه‌نویسی اصلی حوزه فرانت‌اند
                  است که به واسطه فریم ورک‌های آن می‌توان انواع وب سایت‌ها،
                  اپلیکیشن‌ها و وب اپلیکیشن‌ها را طراحی کرد. به طور کلی بعد از
                  یادگیری html و css معمولاً باید آموزش جاوا اسکریپت را نیز فرا
                  بگیرید. . چرا که این زبان تکمیل‌کننده html و css بوده و در
                  چنین شرایطی موقعیت‌های شغلی بیشتر را در اختیار خواهید داشت و
                  همچنین می‌توانید پروژه‌های گسترده‌تری را انجام دهید. در حال
                  حاضر با وجود منابع رایگان موجود در وب شما به راحتی می‌توانید
                  زبان جاوا اسکریپت را به صورت حرفه‌ای فرا بگیرید. به همین واسطه
                  در ادامه مطلب قصد داریم سایت‌های شاخص آموزش این زبان
                  برنامه‌نویسی در جهان را به شما معرفی کنیم و در آخر بگوییم که
                  بهترین سایت آموزش جاوا اسکریپت کدام است.
                </p>

                <div className="article-info-read">
                  <span className="article-info-read-title">
                    آنچه در این مقاله خواهید خواند :
                  </span>
                  <ul className="article-info-read-list">
                    <li className="article-info-read-item">
                      <a href="#" className="article-info-item-link">
                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت
                      </a>
                    </li>
                    <li className="article-info-read-item">
                      <a href="#" className="article-info-item-link">
                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت
                      </a>
                    </li>
                    <li className="article-info-read-item">
                      <a href="#" className="article-info-item-link">
                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت
                      </a>
                    </li>
                  </ul>
                </div>

                <img
                  src="/images/blog/2.jpg"
                  alt=""
                  className="article-info-second-banner"
                />

                <div className="article-section">
                  <h2 className="article-section-title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت :
                  </h2>
                  <p className="article-section-desc">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                  <img
                    src="/images/blog/3.jpg"
                    alt=""
                    className="article-section-img"
                  />
                </div>

                <div className="article-section">
                  <h2 className="article-section-title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت :
                  </h2>
                  <p className="article-section-desc">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                  <img
                    src="/images/blog/3.jpg"
                    alt=""
                    className="article-section-img"
                  />
                </div>

                <div className="article-section">
                  <h2 className="article-section-title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت :
                  </h2>
                  <p className="article-section-desc">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                  <img
                    src="/images/blog/3.jpg"
                    alt=""
                    className="article-section-img"
                  />
                </div>

                <div className="article-social-media">
                  <span className="article-social-media-title">
                    اشتراک گذاری :
                  </span>
                  <a href="#" className="article-social-media-link">
                    <FaTelegram className="course-media-social-media-icon" />{" "}
                  </a>
                  <a href="#" className="article-social-media-link">
                    <FaTwitter className="course-media-social-media-icon" />
                  </a>
                  <a href="#" className="article-social-media-link">
                    <BsFacebook className="course-media-social-media-icon" />
                  </a>
                </div>
              </div>

              <div className="suggestion-articles">
                <div className="row">
                  <div className="col-6">
                    <div className="article-suggestion-right">
                      <a href="#" className="article-suggestion-icon-link">
                        <BsArrowRightShort className="article-suggestion-right-arrow-icon" />
                      </a>
                      <a href="#" className="article-suggestion-text-link">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                        تجربه برنامه نویسان
                      </a>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="article-suggestion-left">
                      <a href="#" className="article-suggestion-text-link">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                        تجربه برنامه نویسان
                      </a>
                      <a href="#" className="article-suggestion-icon-link">
                        <BsArrowLeftShort className="article-suggestion-left-arrow-icon" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* <CommentTextArea /> */}
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
