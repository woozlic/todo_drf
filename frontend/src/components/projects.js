import React from "react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import TodoList from "./todo";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";

const Project = ({users, getHeaders}) => {
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
        <Card>
            {project.users
                ?
                <div>
                    <Link to={'/projects/'+project.id}><CardHeader title={project.title} /></Link>
                    <CardContent>
                        <p>Repository: {project.repositoryUrl}</p>
                        <div>Users: {project.users.map(userId => {
                            return <p key={userId}><Link to={'/users/' + userId}>{users.filter(u => u.id === userId)[0] && users.filter(u => u.id === userId)[0].username}</Link></p>
                    })}</div>
                        <TodoList getHeaders={getHeaders} projectId={project.id} key={project.id} />
                    </CardContent>
                </div>
                :
                <div>
                    Can't receive project's data
                </div>
            }

        </Card>
    )
}

const Projects = ({users, projects}) => {

    return(
        <div>
            <Typography variant="h5" sx={{textAlign: "center"}}>Projects</Typography>
            {projects.map((project) => {
                return (
                    <Card sx={{width: "100%", marginTop: "20px"}} key={project.id}>
                        <CardHeader title={<Link to={"/projects/"+project.id}>{project.title}</Link>} />
                        <CardContent>
                            <Typography>Repository: <Typography variant="overline">{project.repositoryUrl}</Typography></Typography>
                            <Typography>Users:</Typography>
                            {project.users.map(userId => {
                                return (
                                    <div key={userId}>
                                        <Typography variant="overline">
                                            <Link to={'/users/' + userId}>{users.filter(u => u.id === userId)[0] && users.filter(u => u.id === userId)[0].username}</Link>
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