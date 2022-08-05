import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props: { setName: (name: string) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [LoggedIn, setLoggedIn] = useState(false)

    let navigate = useNavigate()

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const responce = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await responce.json();

        props.setName(content.name);

        setLoggedIn(true);
    }

    useEffect(() => {
        if (LoggedIn){
           return navigate("/");
        }
    },[LoggedIn, navigate]);

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="email" className="form-control" placeholder="name@example.com"
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input type="password" className="form-control" placeholder="Password" 
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
}

export default Login;