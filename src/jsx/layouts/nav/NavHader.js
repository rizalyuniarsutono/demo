import React, { useState } from "react";
import { Link } from "react-router-dom";

/// images
// import logo from "../../../images/logo-ma.jpg";
import logo from "../../../images/logo-ma2.png";
import logoText from "../../../images/logotext-ma.png";

export function NavMenuToggle() {
   setTimeout(() => {
      let mainwrapper = document.querySelector("#main-wrapper");
      if (mainwrapper.classList.contains('menu-toggle')) {
         mainwrapper.classList.remove("menu-toggle");
      } else {
         mainwrapper.classList.add("menu-toggle");
      }
   }, 200);
}

const NavHader = () => {
   const [toggle, setToggle] = useState(false);
   return (
      <div className="nav-header" style={{ backgroundColor: "#0423cf" }}>
         {/* <Link to="/" className="brand-logo">
            <img className="logo-abbr" src={logo} alt="" />
            <img className="logo-compact" src={logoText} alt="" />
            <img className="brand-title" src={logoText} alt="" />
         </Link> */}
         <Link to="/" className="brand-logo">
            <img className="logo-abbr" src={logo} alt="" />
            <img className="brand-title" src={logoText} alt="" />
            {/* <b className="brand-title" style={{ color: "yellow", fontSize: "13px" }}>MAHKAMAH AGUNG CORPORATE UNIVERSITY</b> */}
         </Link>

         <div className="nav-control"
            onClick={() => {
               setToggle(!toggle)
               NavMenuToggle()
            }
            }
         >
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>
      </div>
   );
};

export default NavHader;
