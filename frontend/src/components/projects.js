import React from "react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import TodoList from "./todo";
import { DataGrid } from '@mui/x-data-grid';

const Project = ({getHeaders}) => {
    const [project, setProject] = useState({})
    const {id} = useParams()

    useEffect(() => {
        let isMounted = true
        axios.get(`http://127.0.0.1:8000/api/projects/${id}`, {headers: getHeaders()})
            .then((data) => {
                if (isMounted) {
                    setProject(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        return () => { isMounted = false }
    }, [id, getHeaders])

    return (
        <div>
            {project.users
                ?
                <div>
                    <p>Title: {project.title}</p>
                    <p>Repository: {project.repositoryUrl}</p>
                    <p>Users: {project.users.map(user => {
                        return <Link to={`/users/${user}`} key={user}>{user} </Link>
                })}</p>
                    <TodoList projectId={project.id} key={project.id} />
                </div>
                :
                <div>
                    Не удалось загрузить проект
                </div>
            }

        </div>
    )
}

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td><Link to={`projects/${project.id}`}>{project.title}</Link></td>
            <td>{project.repositoryUrl}</td>
            <td>{project.users.map(user => {
                return <Link to={`users/${user}`} key={user}>{user} </Link>
            })}</td>
        </tr>
    )
}

const Projects = ({projects}) => {
    const columns = [
        {
            field: 'id',
            headerName: 'Project ID',
            width: 150,
            editable: false,
        },
        {
            field: 'repositoryUrl',
            headerName: 'Repository URL',
            width: 300,
            editable: false,
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 200,
            editable: false,
        },
        {
            field: 'users',
            headerName: 'Users',
            width: 150,
            editable: false,
        }
    ]

    return(
        <div>
            <div style={{ height: 400, width: 800, margin: "0 auto"}}>
                <DataGrid
                    rows={projects}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </div>
        </div>
    )
}

export {Project}
export default Projects