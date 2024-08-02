import { useEffect, useState } from 'react'
import './App.css'
import { Todoprovider } from './context'
import TodoForm from './componentes/Todoform'
import TodoItem from './componentes/Todoitems'


function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((ele) => ele.id === id ? ele : todo))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((ele) => ele.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((ele) => ele.id === id ?
      { ...ele, complete: !ele.complete } : ele
    ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <Todoprovider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
      <div className="container">
        <div className="main-container">
          <h1 className="title">Manage Your Todos</h1>
          <div className="form-container">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex-container">
            {/* Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className='todo-list'>
                <TodoItem todo={todo} />

              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  )
}

export default App
