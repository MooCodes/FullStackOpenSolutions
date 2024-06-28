interface Results {
  numOfDays: number;
  numOfTrainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

interface Arguments {
  target: number;
  exercises: number[];
}

const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const target = Number(args[2]);

  const exercises = args.filter((x) => !isNaN(Number(x))).map((x) => Number(x));
  exercises.shift();

  return { target, exercises };
};

const calculateExercises = (target: number, exercises: number[]): Results => {
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

const { target, exercises } = parseArguments(process.argv);

if (isNaN(target) || exercises.some((x) => isNaN(x))) {
  throw new Error("Provided values were not numbers!");
}

if (target < 0 || exercises.some((x) => x < 0)) {
  throw new Error("Provided values were not positive numbers!");
}

if (exercises.length === 0) {
  throw new Error("No training days!");
}

console.log(calculateExercises(target, exercises));
