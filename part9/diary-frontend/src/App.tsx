import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

type DiaryEntry = Omit<Diary, "id">;

const getAllDiaries = async () => {
  const { data } = await axios.get<Diary[]>(
    "http://localhost:3000/api/diaries"
  );
  return data;
};

const createDiary = async (entry: DiaryEntry) => {
  try {
    const { data } = await axios.post<Diary>(
      "http://localhost:3000/api/diaries",
      entry
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("Unknown error when creating diary");
    }
  }
};

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [entry, setEntry] = useState<DiaryEntry>({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createDiary(entry)
      .then((data) =>
        setDiaries((prevDiaries) =>
          data ? [...prevDiaries, data] : prevDiaries
        )
      )
      .catch((error) => {
        const err = error as AxiosError;
        setErrorMessage(err.response!.data as string);
        setTimeout(() => setErrorMessage(""), 5000);
      });
  };

  if (diaries.length === 0) return <>Loading...</>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        {errorMessage && <h3 style={{ color: "red" }}>{errorMessage}</h3>}
        <h2>Add New Entry</h2>
        <div>
          date:{" "}
          <input
            value={entry.date}
            type="text"
            name="date"
            onChange={(e) => setEntry({ ...entry, date: e.target.value })}
          />
        </div>
        <div>
          weather:{" "}
          <input
            value={entry.weather}
            type="text"
            name="weather"
            onChange={(e) => setEntry({ ...entry, weather: e.target.value })}
          />
        </div>
        <div>
          visibility:{" "}
          <input
            value={entry.visibility}
            type="text"
            name="visibility"
            onChange={(e) => setEntry({ ...entry, visibility: e.target.value })}
          />
        </div>
        <div>
          comment:{" "}
          <input
            value={entry.comment}
            type="text"
            name="comment"
            onChange={(e) => setEntry({ ...entry, comment: e.target.value })}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary Entries</h2>
      <div>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            weather: {diary.weather}
            <br />
            visiblity: {diary.visibility}
            <br />
            comment: {diary.comment}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
