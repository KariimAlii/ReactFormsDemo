import {useState} from "react";
import Input from "./Input.jsx";
import {hasMinLength, hasMinLength_V2, isEmail, isNotEmpty, validate} from "../util/validation.js";
import {useInput} from "../hooks/useInput.js";

export default function Login() {

    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
    } = useInput('');

    //! Validating on Input Lost Focus (Blur)
    //! It might last too long ==> Update didEdit on every keystroke
    const isEmailInvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
    const isEmailInvalid2 = didEdit.email && !validate(enteredValues.email, isEmail, isNotEmpty);
    const isPasswordInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);
    const isPasswordInvalid2 = didEdit.password && !validate(enteredValues.password, hasMinLength_V2(6));
    function handleSubmit(event) {
        event.preventDefault();
        console.log("SUBMITTED")
        console.log("Form Values:", enteredValues);
        //! You can reset the form
        setEnteredValues({
            email: '',
            password: ''
        })
    }




    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    onBlur={handleEmailBlur}
                    onChange={handleEmailChange}
                    value={emailValue}
                    error={isEmailInvalid && 'Please enter a valid email'}
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    onBlur={() => handleInputBlur('password')}
                    onChange={(event) => handleInputChange('password', event.target.value)}
                    value={enteredValues.password}
                    error={isPasswordInvalid && 'Please enter a valid password'}
                />
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
