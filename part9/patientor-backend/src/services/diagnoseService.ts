import data from "../../data/diagnoses";
import { Diagnose } from "../types";

const getEntries = (): Array<Diagnose> => {
  return data;
};

export default { getEntries };