import {hasMinLength, isEmail, isEqualsToOtherValue, isNotEmpty} from "../util/validation.js";
import {useActionState} from "react";

//! Form Actions
//! available in React 19 or higher version
//! Form Actions are used to handle form submission
//!
//! Note that now on each submit react resets the form --> use (defaultValue) attribute
//! You can move form action outside of component function because you don't use props or state
function signupAction(prevFormState, formData) {
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
        return {
            errors,
            formValues: {
                email,
                password,
                confirmPassword,
                firstName,
                lastName,
                role,
                acqusitionChannel,
                terms
            }
        }
    }

    return { errors : null }
}
export default function Signup() {


    //! use the (useActionState) hook after defining the (signupAction) because you need to pass it as a parameter
    //! you need to provide an initialState as the second parameter
    //!
    //! Return array of 3 elements
    //! 1st : FormState , which initially represents the initial form state
    //! 2nd : an updated formAction, a new function that wraps the signupAction and listens to its invocation
    //!       we can say it is our form action but with extra features and react is aware of it
    //! 3rd : pending : true or false, depending on the form is submitted or not
    const [formState, formAction] = useActionState(signupAction, { errors : null });

    return (
        <form action={formAction}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" defaultValue={formState.formValues?.email} />
            </div>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" defaultValue={formState.formValues?.password} />
                </div>

                <div className="control">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                        defaultValue={formState.formValues?.confirmPassword}
                    />
                </div>
            </div>

            <hr />

            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" defaultValue={formState.formValues?.firstName}/>
                </div>

                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" defaultValue={formState.formValues?.lastName} />
                </div>
            </div>

            <div className="control">
                <label htmlFor="phone">What best describes your role?</label>
                {/* ! Select loses its value , it is a bug in react action forms */}
                <select id="role" name="role" defaultValue={formState.formValues?.role}>
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
                        defaultChecked={formState.formValues?.acqusitionChannel.includes('google')}
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                        defaultChecked={formState.formValues?.acqusitionChannel.includes('friend')}
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="other"
                        name="acquisition"
                        value="other"
                        defaultChecked={formState.formValues?.acqusitionChannel.includes('other')}
                    />
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className="control">
                <label htmlFor="terms-and-conditions">
                    <input
                        type="checkbox"
                        id="terms-and-conditions"
                        name="terms"
                        defaultChecked={formState.formValues?.terms}
                    />
                    I agree to the terms and conditions
                </label>
            </div>

            {formState.errors && (
                <ul className="error">
                    {formState.errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            )}
            <p className="form-actions">
                {/* ! reset now resets to the (defaultValue) or (defaultChecked) */}
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button className="button">Sign up</button>
            </p>
        </form>
    );
}
