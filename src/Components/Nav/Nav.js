import React, { useEffect, useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { logoutUser } from "../../actions/userActions";
import netflix_logo from "../../assets/netflix_logo.png";
import { userInfoState } from "../../store/login";
import "./Nav.scss";
const Nav = () => {
  const [show, handleShow] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const history = useHistory();
  const logout = async () => {
    await logoutUser();
    setUserInfo({
      userId: null,
      isAuthenticated: false,
      token: null,
      name: "",
      email: "",
    });
    history.push("/");
  };

  useEffect(() => {
    console.log("userInfo :>> ", userInfo);

    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", { passive: false });
    };
  }, [userInfo]);

  return (
    <div className={`nav && ${show && "nav__black"}`}>
      <Link to="/">
        <img className="nav__logo" src={netflix_logo} alt="netflix-logo" />
      </Link>

      <div className="search-div">
        <Link to="/searchPage">
          <Button variant="outline" className="btn my-2 ">
            wanna search? ....
          </Button>
        </Link>
      </div>
      <img
        className="nav__avatar"
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="netflix-logo"
      />

      {userInfo.isAuthenticated ? (
        <NavDropdown title={"            " + "            "}>
          <LinkContainer to="/my-list">
            <NavDropdown.Item disabled>
              <h6>{userInfo.name}</h6>
            </NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logout}>LOGOUT</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <NavDropdown title={"            " + "            "}>
          <LinkContainer to="/login">
            <NavDropdown.Item>
              <h6>SIGN IN</h6>
            </NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      )}
    </div>
  );
};

export default Nav;
