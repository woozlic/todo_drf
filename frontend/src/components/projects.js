import React from "react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import TodoList from "./todo";
import {Button, Card, CardContent, CardHeader, FormControl, MenuItem, TextField, Typography} from "@mui/material";

const Project = ({users, getHeaders, deleteProject, createTodo, deleteTodo}) => {
    const [project, setProject] = useState({})
    const [showTodoForm, setShowTodoForm] = useState(false)
    const [formState, setFormState] = useState({
        user: '',
        text: ''
    })
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

    const handleFieldChange = event => {
        event.preventDefault()
        setFormState(formState => ({
            ...formState,
            [event.target.name]: event.target.value
    }))}

    return (
        <Card>
            {project.users
                ?
                <div>
                    <Link to={'/projects/'+project.id}><CardHeader title={project.title} subheader={<Button onClick={() => deleteProject(project.id)} sx={{marginTop: "10px"}} variant="contained" color="error">Delete project</Button>} /></Link>
                    <CardContent>
                        <p>Repository: <a href={project.repositoryUrl}>{project.repositoryUrl}</a></p>
                        <div>Users: {project.users.map(userId => {
                            return <p key={userId}><Link to={'/users/' + userId}>{users.filter(u => u.id === userId)[0] && users.filter(u => u.id === userId)[0].username}</Link></p>
                    })}</div>
                        <TodoList deleteTodo={deleteTodo} getHeaders={getHeaders} projectId={project.id} key={project.id} />
                        {
                            showTodoForm ?
                                <FormControl className='form' margin='dense'>
                                    <TextField
                                        sx={{marginTop: "15px"}}
                                        select
                                        name="user"
                                        id="user"
                                        variant="outlined"
                                        label="User owner"
                                        SelectProps={{
                                            value: formState.user,
                                            onChange: handleFieldChange,
                                        }}
                                    >
                                        {
                                            project.users.map(userId => {
                                                return <MenuItem key={userId} value={userId}>{users.filter(u => u.id === userId)[0] && users.filter(u => u.id === userId)[0].username}</MenuItem>
                                            })
                                        }
                                    </TextField>
                                    <TextField id="outlined-basic" onChange={handleFieldChange} value={formState.text} name="text" label="Text" variant="outlined" sx={{marginTop: "15px"}} />
                                    <Button variant="outlined" onClick={() => createTodo(project.id, formState.user, formState.text)} sx={{marginTop: "15px"}}>Create TODO</Button>
                                </FormControl>
                                :
                                <Button sx={{marginTop: "10px"}} onClick={() => setShowTodoForm(true)} variant="contained">Add TODO</Button>
                        }
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

const Projects = ({users, projects, deleteProject}) => {
    const [searchField, setSearchField] = useState('')
    const [filteredProjects, setFilteredProjects] = useState([])
    const [isMounted, setIsMounted] = useState(false)

    const handleFieldChange = event => {
        setSearchField(event.target.value)
    }

    function search(event) {
        setFilteredProjects(projects.filter(project => project.title.includes(searchField)))
        event.preventDefault()
    }

    useEffect(() => {
        if (!isMounted) {
            setFilteredProjects(projects)
        }
        setIsMounted(true)
    }, [isMounted])

    return(
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <TextField sx={{marginTop: "15px", marginBottom: "15px", width: "100%"}} id="search" label="Search..." type="search" onChange={handleFieldChange} />
                <Button onClick={event => search(event)}>Search</Button>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="h5" sx={{padding: "10px"}}>Projects</Typography>
                <Button component={Link} to="/projects/create/" variant="contained">Create new project</Button>
            </div>
            {filteredProjects.map((project) => {
                return (
                    <Card sx={{width: "100%", marginTop: "20px"}} key={project.id}>
                        <CardHeader title={<Link to={"/projects/"+project.id}>{project.title}</Link>} subheader={<Button onClick={() => deleteProject(project.id)} sx={{marginTop: "10px"}} variant="contained" color="error">Delete project</Button>} />
                        <CardContent>
                            <Typography>Repository: <Typography variant="overline"><a href={project.repositoryUrl}>{project.repositoryUrl}</a></Typography></Typography>
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