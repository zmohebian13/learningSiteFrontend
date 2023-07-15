import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "نام حداقل باید 3 کاراکتر داشته باشد")
    .max(12, "نام حداکثر باید 12 کاراکتر داشته باشد")
    .required("وارد کردن نام و نام خانوادگی الزامی است"),
  username: Yup.string()
    .min(5, "نام کاربری حداقل باید 5 کاراکتر داشته باشد")
    .max(12, "نام کاربری حداکثر باید 12 کاراکتر داشته باشد")
    .required("وارد کردن نام کاربری الزامی است"),
  email: Yup.string()
    .email()
    .min(3, "ایمیل حداقل باید 10 کاراکتر داشته باشد")
    .max(30, "ایمیل حداکثر باید 30 کاراکتر داشته باشد")
    .required("وارد کردن ایمیل الزامی است"),
  password: Yup.number()
    .min(4)
    .positive()
    .integer()
    .required("وارد کردن کلمه عبور الزامی است"),
});

export default registerSchema;
