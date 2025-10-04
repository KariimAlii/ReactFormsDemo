import {useState} from "react";

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
                <div className="control no-margin">
                    { /* ! (HtmlFor) is the jsx alternative to native html (for) attribute */}
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        onBlur={() => handleInputBlur('email')}
                        onChange={(event) => handleInputChange('email', event.target.value)}
                        value={enteredValues.email}
                    />
                    <div className="control-error">
                        {isEmailInvalid && <p>Please enter a valid email address</p>}
                    </div>
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        onChange={(event) => handleInputChange('password', event.target.value)}
                        value={enteredValues.password}
                    />
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
