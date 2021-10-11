import React from "react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import TodoList from "./todo";

const Project = () => {
    const [project, setProject] = useState({})
    const {id} = useParams()
    useEffect(() => {
        let isMounted = true
        axios.get(`http://127.0.0.1:8000/api/projects/${id}`)
            .then((data) => {
                if (isMounted) {
                    setProject(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        return () => { isMounted = false }
    }, [id])
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

    return(
        <table>
            <tbody>
            <tr>
                <td>Project id</td>
                <td>Title</td>
                <td>Repository</td>
                <td>Users</td>
            </tr>
            {projects.map(project => {
                return <ProjectItem project={project}/>
            })}
            </tbody>
        </table>
    )
}

export {Project}
export default Projects