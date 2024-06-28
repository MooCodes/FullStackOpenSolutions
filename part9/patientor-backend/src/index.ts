import express from "express";
import cors from "cors"; 
import diagnoseRouter from "./routes/diagnoses";

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnoseRouter);

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
