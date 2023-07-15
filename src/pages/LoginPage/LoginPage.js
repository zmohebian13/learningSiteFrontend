import React, { useContext, useState } from "react";

import "./LoginPage.css";
import Topbar from "../../Components/Topbar/Topbar";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useForm } from "react-hook-form";

import { BsFillPersonFill } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi";
import { RxEnter } from "react-icons/rx";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    const userData = {
      identifier: data.username,
      password: data.password,
    };

    fetch(`http://localhost:4000/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then((result) => {
        swal({
          title: "با موفقیت وارد شدید",
          icon: "success",
          buttons: "ورود به پنل کاربری",
        }).then((value) => {
          navigate("/");
        });
        console.log(result);
        authContext.login({}, result.accessToken);
      })
      .catch((err) => {
        console.log(`err =>`, err);
        swal({
          title: "همچین کاربری یافت نشد",
          icon: "error",
          buttons: "تلاش دوباره",
        });
      });

    console.log(userData);
  };

  const onChangeHandler = () => {
    console.log("google recaptcha");
  };

  return (
    <>
      <Topbar />
      <NavBar />

      <section className="login-register">
        <div className="login-container">
          <div className="login">
            <span className="login-title">ورود به حساب کاربری</span>
            <span className="login-subtitle">
              خوشحالیم دوباره میبینیمت دوست عزیز :)
            </span>
            <div className="login-new-member">
              <span className="login-new-member-text">کاربر جدید هستید؟</span>
              <Link to="/register" className="login-new-member-link">
                ثبت نام
              </Link>
            </div>

            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="login-form-username">
                <input
                  type="text"
                  {...register("username", {
                    required: "وارد کردن نام کاربری الزامی است",
                    minLength: {
                      value: 3,
                      message: "نام کاربری باید حداقل 3 کاراکتر داشته باشد",
                    },
                    maxLength: {
                      value: 16,
                      message: "نام کاربری باید حداکثر 16 کاراکتر داشته باشد",
                    },
                    pattern: {
                      value: /^[a-z0-9_-]{3,15}$/g,
                      message: "نام کاربری وارد شده معتبر نمی باشد",
                    },
                  })}
                  placeholder="نام کاربری"
                  className="login-form-username-input"
                  name="username"
                />
                <BsFillPersonFill className="login-form-username-icon" />
              </div>
              {errors.username && (
                <p className="error-message">{errors.username.message}</p>
              )}

              <div className="login-form-password">
                <input
                  type="password"
                  placeholder="رمز عبور"
                  className="login-form-password-input"
                  name="password"
                  {...register("password", {
                    required: "وارد کردن کلمه عبور الزامی است",
                    minLength: {
                      value: 5,
                      message: "کلمه عبور باید حداقل 5 کاراکتر داشته باشد",
                    },
                    maxLength: {
                      value: 12,
                      message: "کلمه عبور باید حداکثر 12 کاراکتر داشته باشد",
                    },
                  })}
                />
                <GiPadlock className="login-form-password-icon" />
              </div>
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}

              <div className="login-form-password recaptcha-parent">
                <ReCAPTCHA
                  sitekey="Your client site key"
                  onChange={onChangeHandler}
                />
              </div>

              <button type="submit" className="login-form-valid-btn">
                <RxEnter className="login-form-btn-icon" />
                <span className="login-form-btn-text">ورود</span>
              </button>

              <div className="login-form-password-setting">
                <div className="login-form-password-remember">
                  <input
                    type="checkbox"
                    className="login-form-password-checkbox"
                  />
                  <span className="login-form-remember-password-text">
                    مرا به خاطر داشته باش
                  </span>
                </div>
                <div className="login-form-password-forget">
                  <a href="#" className="login-form-password-forget-link">
                    رمز عبور را فراموش کرده اید؟
                  </a>
                </div>
              </div>
            </form>

            <div className="login-desc">
              <span className="login-desc-title">کاربر محترم :</span>
              <ul className="login-desc-list">
                <li className="login-desc-item">
                  لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                  استفاده کنید.
                </li>
                <li className="login-desc-item">
                  ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
                </li>
                <li className="login-desc-item">
                  لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
