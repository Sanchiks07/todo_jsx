import Diary from './Diary.jsx'
import { useEffect, useState } from "react";

function getLocalDiaries() {
  const stored = localStorage.getItem("diaries");
  return stored ? JSON.parse(stored) : [];
}

function DiariesList() {
    const [diaries, setDiaries] = useState(getLocalDiaries);

    const [newDiary, setNewDiary] = useState({ title: "", body: "", date: "" });
    const [editingId, setEditingId] = useState(null);
    const [editedDiary, setEditedDiary] = useState({ title: "", body: "", date: "" });

    useEffect(() => {
        localStorage.setItem("diaries", JSON.stringify(diaries));
    }, [diaries]);

    function handleNewDiaryChange(field, value) {
        setNewDiary(prev => ({ ...prev, [field]: value }));
    }

    function handleAddNewDiary(event) {
        event.preventDefault();
        if (!newDiary.title || !newDiary.body || !newDiary.date) return;

        const addedDiary = {...newDiary, id: crypto.randomUUID()};
        setDiaries(prev => [...prev, addedDiary]);
        setNewDiary({ title: "", body: "", date: "" });
    }

    function handleEdit(id) {
        const diaryToEdit = diaries.find(d => d.id === id);
        setEditingId(id);
        setEditedDiary({ ...diaryToEdit });
    }

    function handleEditedDiaryChange(field, value) {
        setEditedDiary(prev => ({ ...prev, [field]: value }));
    }

    function handleCancelEdit() {
        setEditingId(null);
        setEditedDiary({ title: "", body: "", date: "" });
    }

    function handleSaveEdit() {
        setDiaries(prev => prev.map(d => d.id === editingId ? {...d, ...editedDiary } : d));
        setEditingId(null);
        setEditedDiary({ title: "", body: "", date: "" });
    }

    function handleDelete(id) {
        setDiaries(prev => prev.filter(d => d.id !== id));
    }

    return (
        <>
            <h1>Dienasgrāmatas Ieraksti</h1>
            <h3>Jauns Ieraksts</h3>
            <form onSubmit={handleAddNewDiary}>
                <label>
                    Title
                    <br/>
                    <input
                        type="text"
                        value={newDiary.title}
                        onChange={e => handleNewDiaryChange("title", e.target.value)}
                        required
                    />
                </label>
                <br/>
                <label>
                    Body
                    <br/>
                    <textarea
                        value={newDiary.body}
                        onChange={e => handleNewDiaryChange("body", e.target.value)}
                        rows={3}
                        required
                    />
                </label>
                <br/>
                <label>
                    Date
                    <br/>
                    <input
                        type="date"
                        value={newDiary.date}
                        onChange={e => handleNewDiaryChange("date", e.target.value)}
                        required
                    />
                </label>
                <br/><br/>
                <button type="submit">Pievienot</button>
            </form>
            <br/>
            <hr/>   {/* pievieonu līniju starp formu un esošajiem ierakstiem */}
            <br/>
        
            {diaries.map(diary => (
                <div key={diary.id}>
                    {editingId === diary.id ? (
                        <>
                            <label>
                                Title
                                <br/>
                                <input
                                    type="text"
                                    value={editedDiary.title}
                                    onChange={e => handleEditedDiaryChange("title", e.target.value)}
                                />
                            </label>
                            <br/>
                            <label>
                                Body
                                <br/>
                                <textarea
                                    value={editedDiary.body}
                                    onChange={e => handleEditedDiaryChange("body", e.target.value)}
                                    rows={4}
                                />
                            </label>
                            <br/>
                            <label>
                                Date
                                <br/>
                                <input
                                    type="date"
                                    value={editedDiary.date}
                                    onChange={e => handleEditedDiaryChange("date", e.target.value)}
                                />
                            </label>
                            <br/><br/>
                            <button onClick={handleSaveEdit}>✅</button>
                            <button onClick={handleCancelEdit}>❌</button>
                        </>
                    ) : (
                        <>
                            <Diary {...diary} />
                            <button onClick={() => handleDelete(diary.id)}>❌</button>
                            <button onClick={() => handleEdit(diary.id)}>📝</button>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export default DiariesList;