import { useState, useEffect } from "react";
import UserFetch from "./components/userFetch";
import CourseFetch from "./components/courseFetch";

function App(){
    return(
        <>
        {/* <UserFetch /> */}
        <CourseFetch />
        </>
    )
}

export default App;