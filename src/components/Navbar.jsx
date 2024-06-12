import React from "react";
import './NavBar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light px-0">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center ms-4" >
          <h1>TASK</h1>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
