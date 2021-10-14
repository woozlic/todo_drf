import React from "react";
import {useState} from "react";
import {CardHeader, Grid, TextField} from "@mui/material";
import {Button} from "@mui/material"
import {Card, CardContent} from "@mui/material";


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
        <Card>
            <CardContent>
                <Grid component="form" onSubmit={(event => handleSubmit(event))}>
                    <Grid container justifyContent="center">
                        <CardContent>
                            <TextField
                                id="outlined-basic"
                                label="Username"
                                type="username"
                                name="username"
                                value={username}
                                onChange={(event => handleChange(event))}
                            />
                        </CardContent>
                    </Grid>
                    <Grid container justifyContent="center">
                        <CardContent>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(event => handleChange(event))}
                            />
                        </CardContent>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Button type="submit" variant="contained" style={{margin: "0 auto"}}>Login</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}