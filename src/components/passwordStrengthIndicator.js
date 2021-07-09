import React from "react";
const PasswordStrength = (props) =>{
    const {passwordValidity} = props;
    const {minChar,specialChar,number} = passwordValidity;

    return (
        <div className="password-meter text-left mb-4">
            <p className="text-dark">
                password must contains:
            </p>
            <ul className="text-muted">
                <li><PasswordLogic isValid={minChar} text="Have atleast 8 character"/></li>
                <li><PasswordLogic isValid={number} text="Have atleast 1 Number"/></li>
                <li><PasswordLogic isValid={specialChar} text="Have atleast 1 Special character"/></li>
            </ul>
        </div>
    )
}

const PasswordLogic = (props) =>{
    const {isValid,text} = props;
    const cssLogic = isValid ? "text-success" : isValid !== null ? "text-danger" : "";
    return <p className={cssLogic}>{text}</p>
}

export default PasswordStrength;