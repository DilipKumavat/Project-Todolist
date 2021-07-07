import Form from "../components/Form";
import React from 'react';
const LoginPage = (props) =>{

    return (
    <div className="login">
      <Form isSignupPage={false}/>
    </div>
  );
}

export default LoginPage;
