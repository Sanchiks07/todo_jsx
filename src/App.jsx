import ToDo from './ToDo.jsx'
import DiariesList from './DiariesList.jsx'

import './App.css'

function App() {
  const todos = useState([
    { id: 1, task: "Iemācīties React", completed: false },
    { id: 2, task: "Iemācīties Laravel", completed: true },
    { id: 3, task: "Nopirkt pienu", completed: false },
  ]);

  newTask = "";

  return (
    <>
    <h1>Veicamie uzdevumi</h1>

    <form>
      <label>
        <input
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>

    {todos.map((todo) => {
      return <ToDo key={todo.id} {...todo} />;
    })}

    <DiariesList/>
    </>
  )
}

export default App