import {useRef} from "react";

export default function Login() {
    const email = useRef();
    const password = useRef();
    function handleSubmit(event) {
        event.preventDefault();
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
