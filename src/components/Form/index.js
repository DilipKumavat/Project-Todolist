import React, { useState, Fragment } from "react";
import { Api } from "../../API/Auth";
import { useHistory, Link } from "react-router-dom";
import { Form, Col, Button, Container, Row } from "react-bootstrap";
import Input from "../Input/input.js";
import PasswordStrength from "../passwordStrengthIndicator";

const GeneralForm = (props) => {
  const { isSignupPage } = props;
  const History = useHistory();

  const [formValue, setFormValue] = useState({
    mobile: "",
    name: "",
    email: "",
    password: "",
  });

  const isNumberRegex = /\d/;
  const specialCharacterRegex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  const [passwordValidity, setpasswordValidity] = useState({
    minChar: undefined,
    specialChar: undefined,
    number: undefined,
  });

  const [passwordFocus, setpasswordFocus] = useState(false);

  const [err, setErr] = useState("");

  const onerror = (msg) => {
    setErr(msg.err);
  };

  const LoginOrSignUp = (evt) => {
    const form = evt.currentTarget;

    if (form.checkValidity() === true) {
      evt.preventDefault();
      evt.stopPropagation();
    }
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

  const checkPasswordCredential = (evt) => {
    setFormValue({ ...formValue, [evt.target.name]: evt.target.value });
    setpasswordValidity({
      minChar: evt.target.value.length >= 8 ? true : false,
      number: isNumberRegex.test(evt.target.value) ? true : false,
      specialChar: specialCharacterRegex.test(evt.target.value) ? true : false,
    });
  };

  const handleChange = (event) => {
    if (event.target.name === "password") {
      setpasswordFocus(true);
      checkPasswordCredential(event);
    } else {
      setpasswordFocus(false);
      setFormValue({ ...formValue, [event.target.name]: event.target.value });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 mb-5">
        <Col md="6">
          <h2>{isSignupPage ? "Signup Page" : "Login Page"}</h2>
        </Col>
      </Row>
      <Form onSubmit={LoginOrSignUp}>
        {Input.map((obj,idx) => {
          return isSignupPage || !obj.isSignupPage ? (
            <Row className="mt-3" className="justify-content-md-center" key={idx}>
              <Col md="6">
                <Form.Group>
                  <Form.Row>
                    <Col>
                      <Form.Control
                        required
                        type={obj.type}
                        name={obj.name}
                        placeholder={obj.placeholder}
                        value={formValue[obj.name]}
                        onChange={handleChange}
                        {...obj.minLength}
                        {...obj.maxLength}
                      />
                    </Col>
                  </Form.Row>
                </Form.Group>
              </Col>
            </Row>
          ) : null;
        })}
        {isSignupPage && passwordFocus ? (
          <Row className="justify-content-md-center">
            <Col md="6">
              <PasswordStrength
                passwordValidity={passwordValidity}
              ></PasswordStrength>
            </Col>
          </Row>
        ) : null}
        <Row className="justify-content-md-center">
          <Col md="6">
            <Button type="submit" className="mr-5">
              {isSignupPage ? "Signup" : "Login"}
            </Button>

            <Link to={isSignupPage ? "/login" : "signup"}>
              {isSignupPage ? "Already have an account?" : "Register now"}
            </Link>
          </Col>
        </Row>
      </Form>
      <Row className="justify-content-md-center mt-5 mb-5">
        <Col md="6">{err ? <h3 className="text-danger">{err}</h3> : null}</Col>
      </Row>
    </Container>
  );
};

export default GeneralForm;
