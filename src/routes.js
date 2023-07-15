import CourseInfo from "./pages/CourseInfo/CourseInfo"
import Index from "./pages/Index/Index"
import ArticleInfo from './pages/ArticleInfo/ArticleInfo'
import Category from './pages/Category/Category'
import AllCourses from "./pages/AllCourses/AllCourses";
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/Register/Register";
import AllArticles from "./pages/AllArticles/AllArticles";
import ContactUs from "./pages/ContactUs/ContactUs";
import Search from "./pages/Search/Search";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/courses/:page", element: <AllCourses /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/articles/:page", element: <AllArticles /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/contact", element: <ContactUs /> },
  { path: "/register", element: <Register /> },
  { path: "/search/:value", element: <Search /> },
];

export default routes