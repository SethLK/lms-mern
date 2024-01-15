import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";

export default function EditPage() {
    const [course, setCourse] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const uri = location.pathname;
    const updatedUri = uri.replace(/\/edit\//g, '/courses/');

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`http://localhost:3000/api${updatedUri}`);
                if (res.ok) {
                    const data = await res.json();
                    setCourse(data);
                } else {
                    console.error("Error fetching course data");
                }
            } catch (err) {
                console.error("Error fetching course data", err);
            }
        }

        fetchData();
    }, [uri]);

    return (
        <>
            <NavBar />
            <div className="body">

                <h1>{course.title}</h1>
            </div>
        </>
    );
}