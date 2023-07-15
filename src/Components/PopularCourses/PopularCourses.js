import React, { useEffect, useState } from "react";
import "./PopularCourses.css";
import { Swiper, SwiperSlide } from "swiper/react";
import CoursesHeader from "../CoursesHeader/CoursesHeader";
import CourseBox from "../CourseBox/CourseBox";

import "swiper/css";
import "swiper/css/pagination";

export default function PopularCourses() {
  const [allPopularCourses, setAllPopularCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/popular`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllPopularCourses(data);
      });
  }, []);
  return (
    <div className="popular-courses">
      <div className="popular-courses-container">
        <div className="container">
          <div className="row">
            <CoursesHeader
              title="محبوب ترین دوره ها"
              desc="بر اساس امتیاز دانشجویان سبزلرن"
            />

            <div className="last-courses-box">
              <div className="container">
                <div className="row">
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    pagination={{
                      clickable: true,
                    }}
                    loop={true}
                    className="mySwiper"
                  >
                    {allPopularCourses.map((course) => (
                      <SwiperSlide>
                        <CourseBox {...course} isSlider={true} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
