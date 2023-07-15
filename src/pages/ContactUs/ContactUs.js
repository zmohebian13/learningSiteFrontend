import React, { useState } from "react";
import "./ContactUs.css";

import Topbar from "../../Components/Topbar/Topbar";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import {
  BsFillPencilFill,
  BsFillPersonFill,
  BsFillTelephonePlusFill,
} from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Navigate, useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();

  const [contactName, setContactName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      body: "",
    },
  });

  const onSubmit = (data) => {
    const newContactInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      body: data.body,
    };

    console.log("User Info :", newContactInfo);

    fetch("http://localhost:4000/v1/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContactInfo),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        swal({
          title: "نظر شما با موفقیت ارسال شد",
          icon: "success",
          buttons: "ورود به صفحه اصلی",
        }).then((value) => {
          navigate("/");
        });
      }
    });
  };
  return (
    <div>
      <Topbar />
      <NavBar />

      <section className="contact-register">
        <div className="contact-container">
          <div className="contact">
            <span className="contact-title">ارتباط با ما</span>
            <span className="contact-subtitle">
              نظر یا انتقادت رو برای ما بنویس ...
            </span>
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="contact-form-username">
                <input
                  type="text"
                  {...register("name", {
                    required: "وارد کردن نام و نام خانوادگی الزامی است",
                    minLength: {
                      value: 3,
                      message:
                        "نام و نام خانوادگی باید حداقل 3 کاراکتر داشته باشد",
                    },
                    maxLength: {
                      value: 16,
                      message:
                        "نام و نام خانوادگی باید حداکثر 16 کاراکتر داشته باشد",
                    },
                  })}
                  className="contact-form-username-input"
                  placeholder="نام و نام خانوادگی"
                />
                <BsFillPersonFill className="contact-form-username-icon" />
              </div>
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
              <div className="contact-form-username">
                <input
                  type="text"
                  {...register("email", {
                    required: "وارد کردن آدرس ایمیل الزامی است",
                    minLength: {
                      value: 5,
                      message: "ایمیل باید حداقل 5 کاراکتر داشته باشد",
                    },
                    maxLength: {
                      value: 30,
                      message: "ایمیل باید حداکثر 30 کاراکتر داشته باشد",
                    },
                    pattern: {
                      value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
                      message: "ایمیل وارد شده معتبر نمی باشد",
                    },
                  })}
                  className="contact-form-username-input"
                  placeholder="آدرس ایمیل"
                />
                <MdEmail className="contact-form-username-icon" />
              </div>
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
              <div className="contact-form-username">
                <input
                  type="text"
                  {...register("phone", {
                    required: "وارد کردن شماره تلفن همراه الزامی است",
                    minLength: {
                      value: 10,
                      message:
                        "شماره تلفن همراه باید حداقل 10 کاراکتر داشته باشد",
                    },
                    maxLength: {
                      value: 13,
                      message:
                        "شماره تلفن همراه باید حداکثر 13 کاراکتر داشته باشد",
                    },
                    pattern: {
                      value:
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
                      message: "شماره وارد شده معتبر نمی باشد",
                    },
                  })}
                  className="contact-form-username-input"
                  placeholder="شماره تلفن"
                />
                <BsFillTelephonePlusFill className="contact-form-username-icon" />
              </div>
              {errors.phone && (
                <p className="error-message">{errors.phone.message}</p>
              )}
              <div className="contact-form-username">
                <textarea
                  type="text"
                  {...register("body", {
                    required: "وارد کردن متن نظر الزامی است",
                    minLength: {
                      value: 10,
                      message: "متن شما باید حداقل 10 کاراکتر داشته باشد",
                    },
                    maxLength: {
                      value: 100,
                      message: "متن شما باید حداکثر 100 کاراکتر داشته باشد",
                    },
                  })}
                  className="contact-form-username-input"
                  placeholder="متن خود را وارد کنید ..."
                />
                <BsFillPencilFill className="contact-form-username-icon" />
              </div>
              {errors.body && (
                <p className="error-message">{errors.body.message}</p>
              )}

              <button type="submit" className="contact-form-valid-btn">
                <IoSend className="contact-form-btn-icon" />
                <span className="contact-form-btn-text">ارسال نظر</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
