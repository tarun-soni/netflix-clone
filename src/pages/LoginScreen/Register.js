import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
import { registerUser } from "../../actions/userActions";
import { userInfoState } from "../../store/login";

const Register = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const registerInfo = await registerUser(name, email, password);
    if (registerInfo) {
      setUserInfo({
        userId: registerInfo._id,
        isAuthenticated: true,
        token: registerInfo.token,
        name: registerInfo.name,
        email: registerInfo.email,
      });
      localStorage.setItem("userToken", registerInfo.token);
      localStorage.setItem("userId", registerInfo._id);
    }
    if (registerInfo === undefined || null) {
    }
  };
  if (userInfo.isAuthenticated || localStorage.getItem("userToken")) {
    return <Redirect to="/homescreen" />;
  }
  return (
    <>
      <Container
        className="form-container"
        style={{
          marginTop: "7rem",
          backgroundColor: "#111",
          height: "50vh",
        }}
      >
        <Form className="login-form" onSubmit={onSubmit}>
          <Form.Label
            className="align-self-baseline font-weight-bold"
            htmlFor="name"
          >
            Name
          </Form.Label>

          <Form.Control
            className="w-100 m-1"
            type="text"
            placeholder="Enter your Name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => onChange(e)}
          />

          <Form.Label
            className="align-self-baseline font-weight-bold"
            htmlFor="email"
          >
            Email
          </Form.Label>
          <Form.Control
            className="w-100 m-1"
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
            className="w-100 m-1"
            type="password"
            placeholder="Password"
            name="password"
            minLength="4"
            value={password}
            onChange={(e) => onChange(e)}
          ></Form.Control>
          <Button
            type="submit"
            variant="success"
            className="w-100 mt-4 lspace-small"
          >
            Register
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
