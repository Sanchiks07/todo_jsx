import "./ToDo.css"

function ToDo({ task, completed, id, onDelete, onToggle, onEdit }) {
  return (
    <article>
      <div className="task">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        {task}
      </div>
      
      <div className="buttons">
        <button onClick={() => onDelete(id)}>❌</button>
        <button onClick={() => onEdit(id, task)}>📝</button>
      </div>
      <br/>
    </article>
  );
}

export default ToDo;