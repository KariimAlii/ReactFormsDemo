import {hasMinLength, isEmail, isEqualsToOtherValue, isNotEmpty} from "../util/validation.js";
import {useActionState} from "react";

export default function Signup() {
    //! Form Actions
    //! available in React 19 or higher version
    //! Form Actions are used to handle form submission
    function signupAction(formData) {
        //! formData.get(key) , where key is the (name) attribute used for the input
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        const firstName = formData.get('first-name');
        const lastName = formData.get('last-name');
        const role = formData.get('role');
        const terms = formData.get('terms');
        const acqusitionChannel = formData.getAll('acquisition');

        let errors = [];

        if(!isEmail(email)) {
            errors.push('Invalid email address');
        }

        if(!isNotEmpty(password) || !hasMinLength(password ,6)) {
            errors.push('You must provide password with at least 6 characters');
        }

        if(isEqualsToOtherValue(password, confirmPassword)) {
            errors.push('Passwords do not match');
        }

        if(!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
            errors.push('First name & Last name are required');
        }

        if(!terms) {
            errors.push("You must agree to terms and conditions")
        }

        if(acqusitionChannel.length === 0) {
            errors.push('Please select at least one acquisition channel')
        }

        if(errors.length > 0) {
            return { errors }
        }

        return { errors : null }
    }

    //! use the (useActionState) hook after defining the (signupAction) because you need to pass it as a parameter
    //! you need to provide an initialState as the second parameter
    //!
    //! Return array of 3 elements
    //! 1st : FormState , which initially represents the initial form state
    //! 2nd : an updated formAction, a new function that wraps the signupAction and listens to its invocation
    //!       we can say it is our form action but with extra features and react is aware of it
    //! 3rd : pending : true or false, depending on the form is submitted or not
    const [formState, formAction, pending] = useActionState(signupAction, { errors : null });

    return (
        <form action={signupAction}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" />
            </div>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" />
                </div>

                <div className="control">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                    />
                </div>
            </div>

            <hr />

            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" />
                </div>

                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" />
                </div>
            </div>

            <div className="control">
                <label htmlFor="phone">What best describes your role?</label>
                <select id="role" name="role">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                    <option value="founder">Founder</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <fieldset>
                <legend>How did you find us?</legend>
                <div className="control">
                    <input
                        type="checkbox"
                        id="google"
                        name="acquisition"
                        value="google"
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className="control">
                    <input type="checkbox" id="other" name="acquisition" value="other" />
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className="control">
                <label htmlFor="terms-and-conditions">
                    <input type="checkbox" id="terms-and-conditions" name="terms" />I
                    agree to the terms and conditions
                </label>
            </div>

            <p className="form-actions">
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button className="button">Sign up</button>
            </p>
        </form>
    );
}
