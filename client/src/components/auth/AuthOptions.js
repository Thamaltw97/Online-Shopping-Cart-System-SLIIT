import React from "react";
import {useHistory} from "react-router-dom";

export default function AuthOptions() {
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");

    return(
        <div>
            <button id="btnAuth" onClick={register}>register</button>
            <button id="btnAuth" onClick={login}>Login</button>
        </div>
    )
}
