import React from "react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import TodoList from "./todo";
import { DataGrid } from '@mui/x-data-grid';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";

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

const Projects = ({users, projects}) => {
    const columns = [
        {
            field: 'id',
            headerName: 'Project ID',
            width: 150,
            editable: false,
            renderCell: (cellValues) => {
                return (
                  <div>
                      <Link to={"/projects/"+cellValues.value}> {cellValues.value}</Link>
                  </div>
                );
              }
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
            renderCell: (cellValues) => {
                return (
                  <div>
                      {cellValues.value.map((id) => {
                          return <Link to={'/users/' + id} key={id}> {id}</Link>
                      })}
                  </div>
                );
              }
        }
    ]

    return(
        <div>
            <Typography variant="h5" sx={{textAlign: "center"}}>Projects</Typography>
            {projects.map((project) => {
                return (
                    <Card sx={{width: "100%", marginTop: "20px"}}>
                        <CardHeader title={project.title} />
                        <CardContent>
                            <Typography>Repository: <Typography variant="overline">{project.repositoryUrl}</Typography></Typography>
                            <Typography>Users:</Typography>
                            {project.users.map(userId => {
                                return (
                                    <div>
                                        <Typography variant="overline">
                                            <Link to={'/users/' + userId}>{users.filter(u => u.id === userId)[0].username}</Link>
                                        </Typography>
                                    </div>
                                )
                            })}
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export {Project}
export default Projects