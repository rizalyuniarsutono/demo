import React from "react";
import { Link } from "react-router-dom";

const PageTitle = ({ pageHeading, motherMenu, activeMenu }) => {
  let path = window.location.pathname.split("/");

  return (
    <div className="page-titles">
		<h4>{activeMenu}{pageHeading}</h4>
    </div>
  );
};

export default PageTitle;
