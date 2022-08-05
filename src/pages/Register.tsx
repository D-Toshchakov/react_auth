import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [IsRegistered, setIsRegistered] = useState(false);

    let navigate = useNavigate()

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch(`${process.env.REACT_APP_SERVER_URL}/api/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        setIsRegistered(true)
    }

    useEffect(() => {
        if (IsRegistered){
           return navigate("/login");
        }
    },[IsRegistered, navigate]);
    
    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <input className="form-control" placeholder="Name" 
                onChange={e => setName(e.target.value)}
                required
            />
            <input type="email" className="form-control" placeholder="name@example.com"  
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input type="password" className="form-control" placeholder="Password"  
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
}

export default Register;