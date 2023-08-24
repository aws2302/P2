import { Outlet } from "react-router-dom";
import "./index.css"

const RootLayout = () => {
  return (
    <div className="container">
        <Outlet /> {/* Render Outlet component here */}
    </div>
  );
}

export default RootLayout;
