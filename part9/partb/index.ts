import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNaN(height) || isNaN(weight))
    res.json({ error: "malformatted parameters" });
  else res.json({ weight, height, bmi: calculateBmi(height, weight) });
});

interface ExercisesReqBody {
  target: number;
  daily_exercises: number[];
}

app.post("/exercises", (req, res) => {
  const { target, daily_exercises } = req.body as ExercisesReqBody;

  if (!target || !daily_exercises)
    return res.json({ error: "parameters missing" });
  if (isNaN(target) || daily_exercises.some(isNaN))
    return res.json({ error: "malformatted parameters" });

  return res.json(calculateExercises(target, daily_exercises));
});

app.listen(3003, () => {
  console.log("Server running on port 3003");
});
