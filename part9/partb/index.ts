import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

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

app.listen(3003, () => {
  console.log("Server running on port 3003");
});
