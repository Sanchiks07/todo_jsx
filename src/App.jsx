import ToDo from './ToDo.jsx'
import DiariesList from './DiariesList.jsx'
import { useState } from "react";
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: "Iemācīties React", completed: false },
    { id: 2, task: "Iemācīties Laravel", completed: true },
    { id: 3, task: "Nopirkt pienu", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  function handleAdd(event) {
    event.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),  //ļauj ģenerēt nejaušu ID
      task: newTask,
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
    setNewTask("");
  };

  function handleDelete(id) {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  };

  function handleToggle(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  };

  return (
    <>
    <form onSubmit={handleAdd}>
      <label>
        Jauns uzdevums:
        <input
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
      </label>
      <button type="submit">Pievienot</button>
    </form>

    <h1>Veicamie uzdevumi</h1>
    {todos.map((todo) => {
      return <ToDo key={todo.id} {...todo} onDelete={handleDelete} onToggle={handleToggle} />;
    })}

    <DiariesList/>
    </>
  )
}

export default App