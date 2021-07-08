import React from "react";

const Input = [
  {
    type: "text",
    name: "name",
    placeholder: "Enter Your Name",
    isSignupPage: true,
  },
  {
    type: "email",
    name: "email",
    placeholder: "Enter Your Email",
    isSignupPage: true,
  },
  {
    type: "Number",
    name: "mobile",
    placeholder: "Enter Your Mobile",
    isSignupPage: false,
  },
  {
    type: "password",
    name: "password",
    placeholder: "Enter Your Password",
    isSignupPage: false,
    
  },
];

export default Input;
