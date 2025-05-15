import Diary from './Diary.jsx'

function DiariesList() {
    const diaries = [
        { id: 1, title: "Nam Nam", body: "Bike go vroom vroom", date: "15-05-2025" },
        { id: 2, title: "Help", body: "I wanna go home.", date: "15-05-2025" },
        { id: 3, title: "Just dance!", body: "Maziņš odiņš esmu es...", date: "15-05-2025" },
    ];

    return (
        <>
        <h1>Dienasgrāmatas ieraksti</h1>

        {diaries.map((diary) => {
            return <Diary key={diary.id} {...diary} />;
        })}
        </>
    )
}

export default DiariesList