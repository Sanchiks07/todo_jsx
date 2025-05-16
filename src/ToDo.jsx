import "./ToDo.css"

function ToDo({ task, completed, id, onDelete, onToggle }) {
  return (
    <article>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      {task}
      <br/>

      <button onClick={() => onDelete(id)}>❌</button>
    </article>
  );
}

export default ToDo