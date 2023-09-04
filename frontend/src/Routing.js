import "./components/css/App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stats from "./pages/Stats"
import App from "./pages/App";

function Routing() {
  return (
    <div className="div-Route">
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;