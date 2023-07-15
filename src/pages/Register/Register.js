import React, { useContext } from "react";

import "./Register.css";

import Topbar from "../../Components/Topbar/Topbar";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useForm } from "react-hook-form";

import { BsFillPersonFill, BsFillTelephonePlusFill } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { BsPersonPlusFill } from "react-icons/bs";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function Register() {

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
      confirmPassword: "",
      phone: "",
    },
  });

  console.log("Errors =>", errors);

  const onSubmit = (data) => {
    const newUserInfo = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.password,
      phone: data.phone,
    };

    console.log("User Info :", newUserInfo);

    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "با موفقیت عضو شدید",
          icon: "success",
          buttons: "ورود به پنل کاربری",
        }).then((value) => {
          navigate("/");
        });
        console.log(result.accessToken);
        authContext.login(result.user, result.accessToken);
      });
  };

  return (
    <div>
      <Topbar />
      <NavBar />

      <section className="login-register">
        <div className="login-container">
          <div className="login">
            <span className="login-title">ساخت حساب کاربری</span>
            <span className="login-subtitle">
              خوشحالیم که قراره به جمع ما بپیوندی :)
            </span>
            <div className="login-new-member">
              <span className="login-new-member-text">
                قبلا ثبت نام کرده اید ؟
              </span>
              <Link to="/login" className="login-new-member-link">
                وارد شوید
              </Link>
            </div>

            <form
              action="#"
              className="login-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="login-form-username">
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  className="login-form-username-input"
                  {...register("name", {
                    required: "وارد کردن نام و نام خانوادگی الزامی است",
                    minLength: {
                      value: 4,
                      message:
                        "نام و نام حانوادگی باید حداقل 5 کاراکتر داشته باشد",
                    },
                    maxLength: {
                      value: 12,
                      message:
                        "نام و نام خانوادگی باید حداکثر 12 کاراکتر داشته باشد",
                    },
                  })}
                />
                <BsFillPersonFill className="login-form-username-icon" />
              </div>
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}

              <div className="login-form-username">
                <input
                  type="text"
                  className="login-form-username-input"
                  placeholder="نام کاربری"
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
                />
                <BsFillPersonFill className="login-form-username-icon" />
              </div>
              {errors.username && (
                <p className="error-message">{errors.username.message}</p>
              )}

              <div className="login-form-username">
                <input
                  type="text"
                  className="login-form-username-input"
                  placeholder="آدرس ایمیل"
                  {...register("email", {
                    required: "وارد کردن ایمیل الزامی است",
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
                />
                <MdEmail className="login-form-username-icon" />
              </div>
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}

              <div className="login-form-username">
                <input
                  type="text"
                  className="login-form-username-input"
                  placeholder="تلفن همراه"
                  {...register("phone", {
                    required: "وارد کردن تلفن همراه الزامی است",
                    minLength: {
                      value: 10,
                      message:
                        "شماره تلفن همراه باید حداقل 3 کاراکتر داشته باشد",
                    },
                    maxLength: {
                      value: 13,
                      message:
                        "شماره تلفن همراه باید حداکثر 16 کاراکتر داشته باشد",
                    },
                    pattern: {
                      value:
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
                      message: "شماره وارد شده معتبر نمی باشد",
                    },
                  })}
                />
                <BsFillTelephonePlusFill className="login-form-username-icon" />
              </div>
              {errors.phone && (
                <p className="error-message">{errors.phone.message}</p>
              )}

              <div className="login-form-password">
                <input
                  type="password"
                  placeholder="رمز عبور"
                  className="login-form-password-input"
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

              <div className="login-form-password">
                <input
                  type="password"
                  placeholder="تایید رمز عبور"
                  className="login-form-password-input"
                  {...register("confirmPassword", {
                    required: "کلمه عبور با کلمه عبور وارد شده یکسان نمیباشد",
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
              {errors.confirmPassword && (
                <p className="error-message">
                  {errors.confirmPassword.message}
                </p>
              )}

              <button className="login-form-valid-btn" type="submit">
                <BsPersonPlusFill className="login-form-btn-icon" />
                <span className="login-form-btn-text">عضویت</span>
              </button>
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
    </div>
  );
}
