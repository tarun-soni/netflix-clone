import React, { useEffect, useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { logoutUser } from "../../actions/userActions";
import netflix_logo from "../../assets/netflix_logo.png";
import {
  addedMovieAlert,
  plsLoginAlert,
  removeMovieAlert,
} from "../../store/alerts";
import { userInfoState } from "../../store/login";
import CustomToast from "../CustomToast";
import "./Nav.scss";
const Nav = () => {
  const [show, handleShow] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const history = useHistory();

  //alert states

  const [addMovieAlertState, setAddMovieAlert] = useRecoilState(
    addedMovieAlert
  );
  const [showPlsLoginAlert, setShowPlsLoginAlert] = useRecoilState(
    plsLoginAlert
  );
  const [removeMovieAlertState, setRemoveMovieAlert] = useRecoilState(
    removeMovieAlert
  );

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
    // console.log("userInfo :>> ", userInfo);

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
      {showPlsLoginAlert && (
        <CustomToast
          variant="danger"
          onClose={() => setShowPlsLoginAlert(false)}
          msg="Please Login to add Movies to Favs"
        />
      )}
      {addMovieAlertState && (
        <CustomToast
          variant="success"
          onClose={() => setAddMovieAlert(false)}
          msg="Movie Added to your Fav list"
        />
      )}
      {removeMovieAlertState && (
        <CustomToast
          variant="info"
          onClose={() => setRemoveMovieAlert(false)}
          msg="Movie Removed from your Fav list"
        />
      )}
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
        <NavDropdown>
          <LinkContainer to="/my-list">
            <NavDropdown.Item disabled>
              <h6>{userInfo.name}</h6>
            </NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logout}>LOGOUT</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <NavDropdown>
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
