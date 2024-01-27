import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Cookies from "js-cookie"; // Import Cookies for handling tokens

export default function LessonPage() {
    const [lesson, setLesson] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pageForm, showpageForm] = useState(false);
    const [pages, setPages] = useState([]); // State to store pages
    const uri = window.location.pathname; // Use window.location.pathname to get the current path
    const authToken = Cookies.get("jwt_token"); // Get your auth token from Cookies

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`http://localhost:3000/api${uri}`);
                if (res.ok) {
                    const data = await res.json();
                    setLesson(data);

                    // Fetch pages for the lesson
                    const pagesRes = await fetch(`http://localhost:3000/api${uri}/pages`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    });

                    if (pagesRes.ok) {
                        const pagesData = await pagesRes.json();
                        setPages(pagesData);
                    } else {
                        console.error("Error fetching pages", pagesRes.statusText);
                    }

                } else {
                    console.error("Error fetching Lesson data");
                }
            } catch (err) {
                console.error("Error fetching Lesson data", err);
            }
        }

        fetchData();
    }, [uri, authToken]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const pageData = {
            title: title,
            content: content
        };

        try {
            const res = await fetch(`http://localhost:3000/api${uri}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(pageData),
            });

            if (res.ok) {
                // Handle successful response
                const newPage = await res.json();
                console.log("Page added successfully:", newPage);
                // Update the pages state with the new page
                setPages([...pages, newPage]);
                // Additional logic if needed
            } else {
                console.error("Error adding page", res.statusText);
            }
        } catch (error) {
            console.error("Error adding page", error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="body">
                <h1>{lesson.title}</h1>
                <button onClick={() => showpageForm(!pageForm)}>
                    Add Lessons
                </button>
                {pageForm && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="page-title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <ReactQuill theme="snow" value={content} onChange={(value) => setContent(value)} />
                            <button type="submit">Add</button>
                        </form>
                    </>
                )}
                <h2>Pages:</h2>
                <ul>
                    {Array.isArray(pages.pages) && pages.pages.map((page, index) => (
                        <li key={index}>
                            <Link to={`${uri}/pages/${page._id}`}>{`Page ${index + 1}: ${page.title}`}</Link>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    );
}
