interface Results {
  numOfDays: number;
  numOfTrainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

export const calculateExercises = (
  target: number,
  exercises: number[]
): Results => {
  const numOfDays = exercises.length;
  const numOfTrainingDays = exercises.filter((x) => x > 0).length;
  const average =
    exercises.reduce((acc, curr) => acc + curr, 0) / exercises.length;
  const success = average >= target;
  const rating = success ? 3 : average > target / 2 ? 2 : 1;
  const ratingDescription = success
    ? "good"
    : average > target / 2
    ? "not too bad but could be better"
    : "bad";

  return {
    numOfDays,
    numOfTrainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};
