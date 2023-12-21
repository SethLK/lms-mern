import App from "./App";

import UserFetch from "./components/userFetch";
import CourseFetch from "./components/courseFetch";
import SingleCourse from "./components/singleCourse";
import GetLessonByCourse from "./components/getLessonByCourse";
import Login from "./pages/login";
import Register from "./pages/register";

import {
    createBrowserRouter
} from "react-router-dom";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/courses",
        element: <CourseFetch />
    },
    {
        path: "/courses/:course_id",
        element: <SingleCourse />
    },
    {
        path: "/courses/:course_id/lessons/:lesson_id",
        element: <GetLessonByCourse />
    },
    {
        path: "/users",
        element: <UserFetch />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }

]);

export default Router;