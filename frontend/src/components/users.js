import React from "react";
import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import {Link} from 'react-router-dom'


const UserProfile = ({getHeaders}) => {
    const [user, setUser] = useState({})
    const {id} = useParams()

    useEffect(() => {
      let isMounted = true
      axios.get(`http://127.0.0.1:8000/api/users/${id}`, {headers: getHeaders()})
        .then((data) => {
            if (isMounted) {
                setUser(data.data)
            }
        })
        .catch((err) => {
            console.log(err)
        })
        return () => { isMounted = false }
    }, [id, getHeaders])

    return(
        <div>
            {
                Object.keys(user).length !== 0 && user ?
                    <Card>
                        <CardHeader title={`Профиль пользователя ${user.username}`} />
                        <CardContent>
                            <Typography>First name: {user.firstName}</Typography>
                            <Typography>Last name: {user.lastName}</Typography>
                            <Typography>Email: {user.email}</Typography>
                        </CardContent>
                    </Card>
                    :
                    <Typography>
                        Can't receive profile data
                    </Typography>
            }
        </div>
    )
}

const UserList = ({users}) => {

    return (
        <div>
            <Typography variant="h5" sx={{textAlign: "center"}}>Users</Typography>
            {users.map((user) => {
                return (
                    <Card sx={{width: "100%", marginTop: "20px"}} key={user.id}>
                        <Link to={'/users/'+user.id}><CardHeader title={user.firstName + ' ' + user.lastName} /></Link>
                        <CardContent>
                            <Typography>Email: <Typography variant="overline">{user.email}</Typography></Typography>
                            <Typography>Username: <Typography variant="overline">{user.username}</Typography></Typography>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
        )
}

export { UserProfile }
export default UserList