import React from "react";
import {useState} from "react";

export default function LoginForm(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleChange(event){
        if (event.target.name === 'username'){
            setUsername(event.target.value)
        }
        else if (event.target.name ==='password'){
            setPassword(event.target.value)
        }
    }

    function handleSubmit(event){
        props.getToken(username, password)
        event.preventDefault()
    }
    return (
        <div>
            <div>Login page</div>
            <form onSubmit={(event => handleSubmit(event))}>
                <input type="text" name="username" placeholder="Username" value={username} onChange={(event => handleChange(event))} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(event => handleChange(event))} />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}