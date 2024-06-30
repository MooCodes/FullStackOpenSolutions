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
            type="date"
            name="date"
            onChange={(e) => setEntry({ ...entry, date: e.target.value })}
          />
        </div>
        <div>
          weather:{" "}
          <div>
            <input
              type="radio"
              name="weather"
              value="sunny"
              onChange={(e) => setEntry({ ...entry, weather: e.target.value })}
            />
            sunny
            <input
              type="radio"
              name="weather"
              value="rainy"
              onChange={(e) => setEntry({ ...entry, weather: e.target.value })}
            />
            rainy
            <input
              type="radio"
              name="weather"
              value="cloudy"
              onChange={(e) => setEntry({ ...entry, weather: e.target.value })}
            />
            cloudy
            <input
              type="radio"
              name="weather"
              value="stormy"
              onChange={(e) => setEntry({ ...entry, weather: e.target.value })}
            />
            stormy
            <input
              type="radio"
              name="weather"
              value="windy"
              onChange={(e) => setEntry({ ...entry, weather: e.target.value })}
            />
            windy
          </div>
        </div>
        <div>
          visibility:{" "}
          <div>
            <input
              type="radio"
              name="visibility"
              value="great"
              onChange={(e) =>
                setEntry({ ...entry, visibility: e.target.value })
              }
            />
            great
            <input
              type="radio"
              name="visibility"
              value="good"
              onChange={(e) =>
                setEntry({ ...entry, visibility: e.target.value })
              }
            />
            good
            <input
              type="radio"
              name="visibility"
              value="ok"
              onChange={(e) =>
                setEntry({ ...entry, visibility: e.target.value })
              }
            />
            ok
            <input
              type="radio"
              name="visibility"
              value="poor"
              onChange={(e) =>
                setEntry({ ...entry, visibility: e.target.value })
              }
            />
            poor
          </div>
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
