export default function Login() {
    function HandleSubmit() {
        console.log("SUBMITTED")
    }

    return (
        <form>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    { /* ! (HtmlFor) is the jsx alternative to native html (for) attribute */}
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" />
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" />
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button type="button" className="button" onClick={HandleSubmit}>Login</button>
            </p>
        </form>
    );
}
