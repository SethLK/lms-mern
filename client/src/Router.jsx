import App from "./App";
// import SingleCourse from "./components/singleCourse";
import CoursePage from "./pages/course/CoursePage";
import LessonPage from "./pages/lesson/LessonPage";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/logout";
import Course from "./pages/Course";
import Page from "./pages/page/PagePage";
import IsAdmin from "./middleware/isAdmin";

import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/courses",
        element: <Course />
    },
    {
        path: "/courses/:course_id",
        element: <CoursePage />
    },
    {
        path: "/courses/:course_id/lessons/:lesson_id",
        element: <LessonPage />
    },
    {
        path: "/courses/:course_id/lessons/:lesson_id/pages/:page_id",
        element: <Page />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/logout",
        element: <Logout />
    },
    {
        path: "/admin",
        element: <IsAdmin />
    }

]);

export default Router;