import React, { useState } from 'react';
import './TodoForm.css';
import { useTodo } from '../context';

function TodoForm() {
    const[todo,settodo]=useState("");
    const {addTodo}=useTodo()
    const add=(e)=>{
        e.preventDefault();
        if(!todo)return;
        addTodo({todo,complete:false})
        settodo("")

    }
    return (
        <form className="form-container" onSubmit={add}>
            <input
                type="text"
                placeholder="Write Todo..."
                className="input-field"
                value={todo} onChange={(e)=>settodo(e.target.value)}
            />
            <button type="submit" className="submit-button">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
