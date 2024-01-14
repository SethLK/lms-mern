import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";

export default function Page() {
    const [page, setPage] = useState({});
    const uri = location.pathname;
    useEffect(() => {
        async function getPage() {
            try {
                const res = await fetch(`http://localhost:3000/api${uri}`);
                if (res.ok) {
                    const data = await res.json();
                    setPage(data);
                } else {
                    console.error("Error fetching page data. Response status:", res.status);
                    const errorData = await res.json(); // If there is additional error information in the response body
                    console.error("Error data:", errorData);
                }
            } catch (err) {
                console.error("Error fetching page data", err);
            }
        }
        getPage();

    }, [uri]);
    return (
        <>
            <NavBar />
            <div className="body">
                <h1>{page.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
        </>
    );

}