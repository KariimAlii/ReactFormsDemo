import {useRef, useState} from "react";

export default function Login() {
    //! we need to use state because we need to update the ui if we found out that
    //! one of the form values is invalid
    const [emailIsInvalid, setEmailIsInvalid] = useState(false)

    const email = useRef();
    const password = useRef();
    function handleSubmit(event) {
        event.preventDefault();

        //! Validate Form on Submission
        const isEmailInvalid = !email.current.value.includes('@gmail');
        if(isEmailInvalid) {
            setEmailIsInvalid(true)
            return;
        }
        //! Unshow the message if email is valid
        setEmailIsInvalid(false)
        //! If Email is invalid => we need to prevent sending the http request
        console.log("Sending Http Request")

        console.log("SUBMITTED")
        //! email.current => input DOM element
        console.log("Entered Email:", email.current.value);
        //! password.current => input DOM element
        console.log("Entered Password:", password.current.value);

        //! The Problem with Refs => Resetting form values needs manipulating the dom directly using refs
        //! It works but not recommended
        //! 2nd Problem : You still need to deal with multiple Refs
        email.current.value = '';
        password.current.value = '';
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
                        ref={email}
                    />
                    <div className="control-error">
                        {emailIsInvalid && <p>Please enter a valid email!</p>}
                    </div>
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        ref={password}
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
