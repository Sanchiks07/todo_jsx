import Diary from './Diary.jsx'
import { useState } from 'react';

function DiariesList() {
    const [diaries, setDiaries] = useState([
        { id: 1, title: "R1 <3", body: "Bike go vroom vroom", date: "2025-05-15" },
        { id: 2, title: "Help", body: "I wanna go home.", date: "2025-05-15" },
        { id: 3, title: "Just dance!", body: "Maziņš odiņš esmu es...", date: "2025-05-15" },
    ]);

    const [newDiary, setNewDiary] = useState({ title: "", body: "", date: "" });

    const [editingId, setEditingId] = useState(null);
    const [editedDiary, setEditedDiary] = useState({ title: "", body: "", date: "" });

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
            <div className="diary">
                <div className="diary-header">
                    <h1>Dienasgrāmatas ieraksti</h1>
                    <h3>Jauns Ieraksts</h3>
                    <form onSubmit={handleAddNewDiary} className="new-form">
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
                </div>
            </div>

            {diaries.map(diary => (
                <div key={diary.id} className="lists-edit">
                    {editingId === diary.id ? (
                        <>
                            <label>
                                Title
                                <br/>
                                <input
                                    type="text"
                                    value={editedDiary.title}
                                    onChange={e => handleEditedDiaryChange("title", e.target.value)}
                                    placeholder="Virsraksts"
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
                                    placeholder="Saturs"
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
                            <button onClick={handleSaveEdit}>✔</button>
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