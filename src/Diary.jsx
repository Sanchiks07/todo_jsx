import "./Diary.css"

function Diary({ title, body, date }) {
    return (
        <>
        <h2>{title}</h2>
        <p>{body}</p>
        <p className="date">{date}</p>
        </>
      );
}

export default Diary