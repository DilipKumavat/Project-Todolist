import React, { useState, Fragment } from "react";
import { Api } from "../../API/Auth";
import { useHistory, Link, useLocation } from "react-router-dom";
import { Form, Col, Button, Container, Row } from "react-bootstrap";

const GeneralForm = (props) => {
  const { isSignupPage } = props;
  const History = useHistory();
  const Location = useLocation();

  const [formValue, setFormValue] = useState({
    mobile: "",
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");

  const onerror = (msg)=>{
    console.log(msg);
    setErr(msg);
  }

  const LoginOrSignUp = () => {
    if (isSignupPage) {
      const flag = Object.keys(formValue).some((key) => formValue[key] === "");

      if (flag) {
        return;
      } else {
        Api(History, formValue, "signup", onerror);
      }
    } else {
      if (formValue.mobile === "" || formValue.password === "") {
        return;
      }
      Api(History, formValue, "login", onerror);
    }
  };

  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center mt-5 mb-5">
          <Col md="6">
            <h2>{isSignupPage ? "Signup Page" : "Login Page"}</h2>
          </Col>
        </Row>
        {isSignupPage ? (
          <Row className="mt-3" className="justify-content-md-center">
            
            <Col md="6">
              <Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your Name"
                      value={formValue.name}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Row>
              </Form.Group>
            </Col>
            
          </Row>
        ) : null}
        {isSignupPage ? (
          <Row  className="justify-content-md-center">
            
            <Col md="6">
              <Form.Group controlId="formGroupEmail">
                <Form.Row>
                  <Col>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your Email Id"
                      value={formValue.email}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Row>
              </Form.Group>
            </Col>
            
          </Row>
        ) : null}
        <Row className="mt-1" className="justify-content-md-center">
          
          <Col md="6">
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Control
                    type="Number"
                    placeholder="Enter Mobile Number"
                    name="mobile"
                    maxLength={10}
                    minLength="10"
                    value={formValue.mobile}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Row>
            </Form.Group>
          </Col>
          
        </Row>
        <Row  className="justify-content-md-center">
          <Col md="6">
            <Form.Group controlId="formGroupPassword">
              <Form.Row>
                <Col>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValue.password}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Row>
            </Form.Group>
          </Col>
          
        </Row>
        <Row  className="justify-content-md-center">
          
          <Col md="6">
            <Button onClick={LoginOrSignUp} className="mr-5">
              {isSignupPage ? "Signup" : "Login"}
            </Button>

            <Link to={isSignupPage ? "/login" : "signup"}>
              {isSignupPage ? "Already have an account?" : "Register now"}
            </Link>
          </Col>
          
        </Row>
      </Container>

      {err ? <p>{err}</p> : null}
    </div>
  );
};

export default GeneralForm;
