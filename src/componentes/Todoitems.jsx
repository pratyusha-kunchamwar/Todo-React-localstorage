import './Todoitems.css';
import { useTodo } from '../context';
import { useState } from 'react';

export default function TodoItem({ todo }) {
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    // const toggleCompleted = () => {
    //     toggleComplete(todo.id);
    // };
    const todoItemStyle = {
        backgroundColor: todo.completed ? '#c6e9a7' : '#ccbed7',
        color: todo.completed ? '#000' : '#fff',
      };

    return (
        <div
      className="todo-item"
      style={todoItemStyle} // Apply inline styles
    >
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={()=>toggleComplete(todo.id)}
            />
            <input
                type="text"
                className={`todo-input ${todo.completed ? "completed" : ""} ${isTodoEditable ? "editable" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            <button
                className="todo-button"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            <button
                className="todo-button"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

