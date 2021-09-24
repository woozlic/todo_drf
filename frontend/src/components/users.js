import React from "react";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
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

export default UserList