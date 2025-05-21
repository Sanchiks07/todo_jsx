import "./ToDo.css"

function ToDo({ task, completed, id, onDelete, onToggle, onEdit }) {
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
        <button onClick={() => onEdit(id, task)}>📝</button>
      <br/><br/>
    </article>
  );
}

export default ToDo;