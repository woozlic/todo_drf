import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "@mui/material";

const Todo = (todo) => {
    return (
        <div>
            { todo.todo.isActive &&
                <div style={{display: "flex", justifyContent: "space-between"}}>
                            {todo.todo.text}
                            <Button onClick={() => todo.deleteTodo(todo.todo.id)} color="error" variant="outlined" size="small" >Delete</Button>
                </div>
            }
        </div>
    )
}

function TodoList({projectId, getHeaders, deleteTodo}){
    const [todos, setTodos] = useState([])
    useEffect(() => {
        let isMounted = true
        const headers = getHeaders()
        axios.get(`http://127.0.0.1:8000/api/todos/?project=${projectId}`, {headers})
            .then((data) => {
                if (isMounted) {
                    setTodos(data.data.results)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        return () => { isMounted = false }
    }, [projectId, getHeaders])
    return (
        <div>
            <h3>Todos:</h3>
            {todos && todos.map(todo => {
                return <Todo todo={todo} key={todo.url} deleteTodo={deleteTodo} />
            })
            }
        </div>
    )
}

export default TodoList