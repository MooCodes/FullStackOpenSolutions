import data from "../../data/patients";
import { Patient, NonSensitivePatient } from "../types";

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

export default {
  getEntries,
  getNonSensitiveEntries,
};
