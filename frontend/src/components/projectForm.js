import React from "react";
import {Button, TextField, Typography} from "@mui/material";
import {FormControl} from "@mui/material";
import {MenuItem} from "@mui/material";


export default function ProjectForm({createProject, users}) {
    const [formState, setFormState] = React.useState({
        title: '',
        repositoryUrl: '',
        users: [],
    })
    const handleFieldChange = event => {
        event.preventDefault()
        setFormState(formState => ({
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value
    }));
  };

    return (
        <FormControl className='form' margin='dense'>
            <Typography variant="h5" sx={{textAlign: "center"}}>Create new project</Typography>
            <TextField id="outlined-basic" onChange={handleFieldChange} value={formState.title} name="title" label="Title" variant="outlined" sx={{marginTop: "5px"}} />
            <TextField id="outlined-basic" onChange={handleFieldChange} value={formState.repositoryUrl} name="repositoryUrl" label="Repository url" sx={{marginTop: "15px"}} variant="outlined" />

            <TextField
                sx={{marginTop: "15px"}}
                select
                name="users"
                id="users"
                variant="outlined"
                label="Users"
                SelectProps={{
                    multiple: true,
                    value: formState.users,
                    onChange: handleFieldChange,
                }}
            >
                {
                    users.map(user => {
                        return <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
                    })
                }
            </TextField>
            <Button onClick={() => { createProject(formState.title, formState.repositoryUrl, formState.users) }} sx={{marginTop: "10px"}} variant="contained">Create</Button>
        </FormControl>
    )
}