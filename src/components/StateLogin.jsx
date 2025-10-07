import {useState} from "react";
import Input from "./Input.jsx";

export default function Login() {
    const [enteredValues, setEnteredValues] = useState({
        email: '',
        password: ''
    });

    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false
    })

    //! Validating on Input Lost Focus (Blur)
    //! It might last too long ==> Update didEdit on every keystroke
    const isEmailInvalid = didEdit.email && !enteredValues.email.includes('@gmail');
    const isPasswordInvalid = didEdit.password && enteredValues.password.trim().length < 6;
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

    function handleInputChange(identifier, value) {
        setEnteredValues(prevValues => ({
            ...prevValues,
            [identifier]: value
        }));
        //! Update didEdit on every keystroke
        setDidEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: false
        }))
    }

    function handleInputBlur(identifier) {
        setDidEdit(prevEdit => ({
            ...prevEdit,
            [identifier]: true
        }))
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
                    onBlur={() => handleInputBlur('email')}
                    onChange={(event) => handleInputChange('email', event.target.value)}
                    value={enteredValues.email}
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
                    error={isEmailInvalid && 'Please enter a valid password'}
                />
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
