import App from "./App";

import UserFetch from "./components/userFetch";
import CourseFetch from "./components/courseFetch";
import SingleCourse from "./components/singleCourse";

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
        path: "/users",
        element: <UserFetch />
    }

]);

export default Router;