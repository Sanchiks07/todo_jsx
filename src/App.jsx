import ToDo from './ToDo.jsx'

import './App.css'

function App() {
  const todos = [
    { task: "Iemācīties React", completed: false },
    { task: "Iemācīties Laravel", completed: true },
    { task: "Nopirkt pienu", completed: false },
  ];

  return (
    <>
    <ToDo 
      task={todos[0].task}
      completed={todos[0].completed}
    />
    <br />
    <ToDo
      task={todos[1].task}
      completed={todos[1].completed}
    />
    <br />
    <ToDo
      task={todos[2].task}
      completed={todos[2].completed}
    />
    </>
  )
}

export default App