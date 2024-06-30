import data from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): Array<Patient> => {
  return data;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  data.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};
