import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./course.css";

export default function CoursePage() {
  const [course, setCourse] = useState({});
  const [lessonTitle, setLessonTitle] = useState("");
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [lessons, setLessons] = useState([]); // New state for lessons
  const userString = Cookies.get("user");
  const user = userString ? JSON.parse(userString) : null;
  const uri = location.pathname;
  const authToken = Cookies.get("jwt_token");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/api${uri}/lessons`);
        if (res.ok) {
          const data = await res.json();
          setCourse(data);
          setLessons(data.lessons || []); // Set lessons from course data
        } else {
          console.error("Error fetching course data");
        }
      } catch (err) {
        console.error("Error fetching course data", err);
      }
    }

    fetchData();
  }, [uri]);

  const addLessonSubmit = async (e) => {
    e.preventDefault();

    const lessonData = {
      title: lessonTitle,
      instructorId: user._id,
    };

    try {
      const res = await fetch(`http://localhost:3000/api${uri}/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(lessonData),
      });

      if (res.ok) {
        const newLesson = await res.json();
        setLessons([...lessons, newLesson]); // Update lessons state
        setLessonTitle(""); // Clear lesson title after adding
        setShowLessonForm(false); // Hide the form after adding
      } else {
        console.error("Error adding lesson", res.statusText);
      }
    } catch (error) {
      console.error("Error adding lesson", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="body">
        <div>
          {course && (
            <>
              <h1>Title: {course.title}</h1>
              {user && user.role === "instructor" && (
                <>
                  <button onClick={() => setShowLessonForm(!showLessonForm)}>
                    Add Lessons
                  </button>
                  {showLessonForm && (
                    <form onSubmit={addLessonSubmit}>
                      <h1>Add Lesson Form</h1>
                      <input
                        type="text"
                        name="title"
                        id="lesson_title"
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        placeholder="Enter Lesson Title"
                      />
                      <button type="submit">Add</button>
                    </form>
                  )}
                </>
              )}
              <p>Description: {course.description}</p>
              <h2>Lessons:</h2>
              <ul>
                {lessons.map((lesson, index) => (
                  <li key={index}>
                    <Link to={`${uri}/lessons/${lesson._id}`}>
                      {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
