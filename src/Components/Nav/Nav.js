import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import netflix_logo from "../../assets/netflix_logo.png";
import "./Nav.css";
const Nav = () => {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav && ${show && "nav__black"}`}>
      <Link to="/">
        <img className="nav__logo" src={netflix_logo} alt="netflix-logo" />
      </Link>
      <img
        className="nav__avatar"
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="netflix-logo"
      />
    </div>
  );
};

export default Nav;
