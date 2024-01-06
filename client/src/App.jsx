
import "./components/navbar"
import NavBar from "./components/navbar";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <NavBar />
            <div className="body">
                <Home />
            </div>
        </>
    );
}

export default App;