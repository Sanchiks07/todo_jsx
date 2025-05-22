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
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  function handleAdd(event) {
    event.preventDefault();

    if (editingId) {
      // rediģēšana
      setTodos(todos.map(todo => 
        todo.id === editingId ? { ...todo, task: editedTask } : todo
      ));
      setEditingId(null);
      setEditedTask("");
    } else {
      // pievienošana
      const newTodo = {
        id: crypto.randomUUID(),  // ļauj ģenerēt nejaušu ID
        task: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask("");
    }
  };

  function handleEdit(id, task) {
    setEditingId(id);
    setEditedTask(task);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditedTask("");
  }

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
    <div className="container">
      <div className="todo">
        <h1>Veicamie Uzdevumi</h1>

        <h3>Jauns Uzdevums</h3>
        <form onSubmit={handleAdd}>
          <label>
            Uzdevums<br/>
            <input
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              disabled={editingId !== null}
            />
          </label>
          <br/><br/>
          <button type="submit" disabled={editingId !== null}>Pievienot</button>
        </form>
        <br/>
        <hr/> {/* pievieonu līniju starp formu un esošajiem ierakstiem */}
        <br/>
        {todos.map((todo) => {
          if (todo.id === editingId) {
            return (
              <div key={todo.id}>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={handleAdd}>✅</button>
                <button onClick={handleCancelEdit}>❌</button>
              </div>
            )
          }
          return (
            <ToDo 
              key={todo.id} 
              {...todo} 
              onDelete={handleDelete} 
              onToggle={handleToggle} 
              onEdit={handleEdit} 
            />
          );
        })}
      </div>

      <div className="diary">
        <DiariesList/>
      </div>
    </div>
    </>
  )
}

export default App