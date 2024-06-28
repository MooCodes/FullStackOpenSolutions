import express from "express";
import personService from "../services/patientService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.json(personService.getNonSensitiveEntries());
});

export default patientRouter;
