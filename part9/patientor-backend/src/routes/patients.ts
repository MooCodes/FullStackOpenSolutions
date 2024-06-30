import express from "express";
import personService from "../services/patientService";
import toNewPatientEntry from "../../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.json(personService.getNonSensitiveEntries());
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const newPatient = personService.addPatient(newPatientEntry);
    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
