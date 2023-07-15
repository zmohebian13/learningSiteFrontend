import React from "react";
import "./Footer.css";
import FooterItem from "../FooterItem/FooterItem";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

export default function Footer() {
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    const newNewsSubscribe = {
      email: data.email,
    };

    fetch("http://localhost:4000/v1/newsletters", {
      method:"POST",
      headers: {
        'COntent-Type' : "application/json"
      },
      body: JSON.stringify(newNewsSubscribe)
    }).then(res => {
      console.log(res)
      if(res.ok) {
        swal({
          title: "با موفقیت در خبرنامه عضو شدید",
          icon: "success",
          buttons: "ورود به صفحه اصلی",
        }).then((value) => {
          navigate("/");
        });
      }
    })

    console.log("email subscribe :", newNewsSubscribe);
  };

  return (
    <div className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="row">
            <FooterItem title="درباره ما">
              <p className="footer-item-desc">
                وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که
                در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل
                قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و
                فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم!
                و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی
                خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس
                در اون رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه!
                این به این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با
                دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین پشتیبانی خوب و با
                کیفیت رو به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای
                پشتیبانی دوره های رایگان شون هم هزینه دریافت میکنند و متعهد
                هستند که هوای کاربر های عزیز رو داشته باشند !
              </p>
            </FooterItem>

            <FooterItem title="آخرین مطالب">
              <div className="footer-item-link-part footer-item-desc">
                <a href="#" className="footer-item-link">
                  نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                </a>
                <a href="#" className="footer-item-link">
                  چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن
                </a>
                <a href="#" className="footer-item-link">
                  آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به
                  گام و تصویری
                </a>
                <a href="#" className="footer-item-link">
                  بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی
                  معایب و مزایا
                </a>
                <a href="#" className="footer-item-link">
                  معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش
                  رایگان
                </a>
              </div>
            </FooterItem>

            <div
              className="col-4"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <FooterItem title="دسترسی سریع" isSmall={true}>
                <div className="row footer-item-desc">
                  <div className="col-6">
                    <a href="#" className="footer-item-link">
                      آموزش HTML
                    </a>
                  </div>
                  <div className="col-6">
                    <a href="#" className="footer-item-link">
                      آموزش CSS
                    </a>
                  </div>
                  <div className="col-6">
                    <a href="#" className="footer-item-link">
                      آموزش JavaScript
                    </a>
                  </div>
                  <div className="col-6">
                    <a href="#" className="footer-item-link">
                      آموزش Bootstrap
                    </a>
                  </div>
                  <div className="col-6">
                    <a href="#" className="footer-item-link">
                      آموزش React
                    </a>
                  </div>
                </div>
              </FooterItem>
              <br />
              <FooterItem title="ارتباط با ما" isSmall={true}>
                <div className=" footer-item-desc">
                  <div className="col-12">
                    <Link to="/contact" className="footer-item-link">
                      با ما در ارتباط باشید ...
                    </Link>
                  </div>
                </div>
              </FooterItem>
              <br />
              <FooterItem title="عضویت در خبرنامه" isSmall={true}>
                <div className="footer-item-desc">
                  <div className="col-12">
                    <p className="footer-news">
                      جهت اطلاع از آخرین اخبار و تخفیف های سایت مشترک شوید
                    </p>
                    <form
                      className="footer-news-form"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <input
                        type="text"
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
                        placeholder="ایمیل خود را وارد کنید"
                        className="footer-news-input"
                      />
                      <button className="footer-news-btn" type="submit">
                        عضویت
                      </button>
                    </form>
                    {errors.email && (
                      <p className="error-message">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </FooterItem>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <span className="footer-copyright-text">
          کلیه حقوق برای آکادمی آموزش برنامه نویسی سبز لرن محفوظ است.
        </span>
      </div>
    </div>
  );
}
