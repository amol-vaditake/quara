import React, { useState } from "react";
import { SidebarData } from "./Sidebardata_component";
import { Link } from "react-router-dom";
import "./Side_navbar_component.scss";

function SidenavbarComponent() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <React.Fragment>
      <div className="Navbar">
        <h4 onClick={showSidebar}>&#9776;</h4>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li onClick={showSidebar} className="navbar-toogle">
          &times;
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default SidenavbarComponent;
