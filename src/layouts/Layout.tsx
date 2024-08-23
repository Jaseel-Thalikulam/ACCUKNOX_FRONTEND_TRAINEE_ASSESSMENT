import { Outlet, useLocation } from "react-router-dom";
import "../styles/layout.scss";
import { Input } from "antd";
import React from "react";
function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const pathNames: { [key: string]: string } = {
    "/home": "Home",
    "/dashboard": "Dashboard",
    "/profile": "Profile", 
    "/settings": "Settings",
  };

  const pathSegments = currentPath.split("/").filter(Boolean);

  const breadcrumb = pathSegments.map((segment, index) => {
    const isLast = index === pathSegments.length - 1;
    const segmentPath = `/${segment}`;
    const segmentName = pathNames[segmentPath] || segment;

    return (
      <React.Fragment key={index}>
        <span className={isLast ? "active-link" : ""}>{segmentName}</span>
        {!isLast && " > "}
      </React.Fragment>
    );
  });

  return (
    <>
      <div className="header">
        <div className="header--side--left">
          <p className="poppins-semibold navigation-link">{breadcrumb}</p>
        </div>
        <div className="header--side">
          <Input.Search
            size="middle"
            className="search"
            placeholder="Search anything.."
          />
        </div>
      </div>
      <div className="content--container">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
