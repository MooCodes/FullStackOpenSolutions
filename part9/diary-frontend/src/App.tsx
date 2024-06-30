import { useEffect, useState } from "react";
import axios from "axios";

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

const getAllDiaries = async () => {
  const { data } = await axios.get<Diary[]>("http://localhost:3000/api/diaries");
  return data;
};

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  if (diaries.length === 0) {
    return <>Loading...</>;
  }

  console.log(diaries);

  return <>
    <h2>Diary Entries</h2>
    {diaries.map((diary) => (
      <div key={diary.id}>
        <h3>{diary.date}</h3>
        weather: {diary.weather}<br />
        visiblity: {diary.visibility}<br />
        comment: {diary.comment}
      </div>
    ))}
  </>;
}

export default App;
