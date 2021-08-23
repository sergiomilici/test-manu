import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router"
import fb from "../../firebaseConfig";
import { AuthContext } from "../Auth/Auth";

const SignIn = ({ history }) => {

    const handleSignIn = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await fb
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );


    // fb.auth().signInWithEmailAndPassword(email.value, password.value)
    //     .then((user) => {
    //         user ? console.log("signed in") : console.log("not signed in")
    //     })
    //     .catch(function (error) {
    //         var errorCode = error.code
    //         var errorMessage = error.message
    //         console.log(errorCode)
    //         console.log(errorMessage)
    //     })


    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }


    return (
        <form
            onSubmit={handleSignIn}
        >
            <label htmlFor="email">Email</label>
            <input
                name="email"
                type="email"
                placeholder="email"
            />

            <label htmlFor="password">Password</label>
            <input
                name="password"
                type="password"
                placeholder="password"
            />
            <button type="submit">Log in</button>
        </form>

    )
}

export default withRouter(SignIn)