import React from "react";

export function Login() {


    return (
        <form action="/loginToSite" method="POST">
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" />
        </form>
    )
}

export default Login;