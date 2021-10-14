import React from "react";
import {Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';


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

    const columns = [
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: false,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 300,
        editable: false,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: false,
    },
    {
        field: 'username',
        headerName: 'Username',
        width: 150,
        editable: false,
        renderCell: (cellValues) => {
            return (
              <div>
                  <Link to={"/users/"+cellValues.row.id}> {cellValues.value}</Link>
              </div>
            );
          }
    }]

    return (
        <div style={{ height: 400, width: 800, margin: "0 auto"}}>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </div>
    )
}

export { UserProfile }
export default UserList