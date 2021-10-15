import React from "react";
import {Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


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
                user ?
                    <div>
                        <div>Профиль пользователя {user.username}</div>
                        <div>
                            <p>Имя: {user.firstName}</p>
                            <p>Фамилия: {user.lastName}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    </div>
                        :
                        <div>
                            Не удалось получить данные профиля
                        </div>
            }
        </div>
    )
}

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td><Link to={`users/${user.id}`}>{user.username}</Link></td>
        </tr>
    )
}

const UserList = ({users}) => {

    return (
        <table>
            <tbody>
                <tr>
                    <td>Имя</td>
                    <td>Фамилия</td>
                    <td>Email</td>
                    <td>Никнейм</td>
                </tr>

                {users.map(user =>
                    <UserItem user={user} key={user.email} />
                )}
            </tbody>
        </table>

    )
}

export { UserProfile }
export default UserList