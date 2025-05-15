import { useState } from "react";
import "./ToDo.css"

function ToDo({ task, completed }) {
  const [check, setCheck] = useState(completed);
  
  return (
    <label>
      <input
        type="checkbox"
        checked={check}
        onChange={() => setCheck(!check)}
      />
      {task}
      <br/>
    </label>
  );
}

export default ToDo