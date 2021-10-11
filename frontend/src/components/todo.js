import React, {useEffect, useState} from "react";
import axios from "axios";

const Todo = (todo) => {
    return <div>{todo.todo.text}</div>
}

function TodoList({projectId}){
    const [todos, setTodos] = useState([])
    useEffect(() => {
        let isMounted = true
        axios.get(`http://127.0.0.1:8000/api/todos/?project=${projectId}`)
            .then((data) => {
                if (isMounted) {
                    setTodos(data.data.results)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        return () => { isMounted = false }
    }, [projectId])
    return (
        <div>
            <h3>Todos:</h3>
            {todos && todos.map(todo => {
                return <Todo todo={todo} key={todo.url}/>
            })
            }
        </div>
    )
}

export default TodoList