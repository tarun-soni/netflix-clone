import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUser } from "../../actions/userActions";
import { userInfoState } from "../../store/login";
import "./Login.scss";
const LoginScreen = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = await loginUser(email, password);
    if (loginInfo) {
      setUserInfo({
        userId: loginInfo._id,
        isAuthenticated: true,
        token: loginInfo.token,
        name: loginInfo.name,
        email: loginInfo.email,
      });
      localStorage.setItem("userToken", loginInfo.token);
      localStorage.setItem("userId", loginInfo._id);
    }
    if (loginInfo === undefined || null) {
      // todo wrong email pass alert popup
    }
  };

  if (userInfo.isAuthenticated || localStorage.getItem("userToken")) {
    return <Redirect to="/homescreen" />;
  }

  return (
    <>
      <Container
        style={{
          marginTop: "5rem",
          backgroundColor: "#111",
          height: "100vh",
        }}
      >
        <Row>
          <Col md={8}>
            <h3>Login </h3>
          </Col>
        </Row>
        <Container className="form-container">
          <Form className="login-form" onSubmit={onSubmit}>
            <Form.Label
              className="align-self-baseline font-weight-bold"
              htmlFor="email"
            >
              Email
            </Form.Label>
            <Form.Control
              className="w-100 m-2"
              type="email"
              placeholder="enter email"
              name="email"
              minLength="4"
              value={email}
              onChange={(e) => onChange(e)}
            ></Form.Control>
            <Form.Label
              className="align-self-baseline font-weight-bold mt-2"
              htmlFor="password"
            >
              Password
            </Form.Label>
            <Form.Control
              className="w-100 m-2"
              type="password"
              placeholder="Password"
              name="password"
              minLength="4"
              value={password}
              onChange={(e) => onChange(e)}
            ></Form.Control>
            <Button
              type="submit"
              variant="danger"
              className="w-100 mt-4 lspace-small"
            >
              Login
            </Button>
            <h6 className="my-2">
              Don't have an account? <Link to={"/register"}>Sign up </Link>
            </h6>
          </Form>
          <div className="features">
            <div className="feature">
              <i className="fas fa-database"></i>
              <h4>Store your fav Movie/Tv Show</h4>
              <p>Permanently Store your fav movies and access anytime.</p>
            </div>
            <div className="feature">
              <i className="fa fa-check-circle" aria-hidden="true"></i>
              <h4>Sign up and Login</h4>
              <p>Login to see and edit Movie or Tv Show List.</p>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default LoginScreen;
