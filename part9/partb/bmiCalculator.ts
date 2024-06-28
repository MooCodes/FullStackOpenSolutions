const calculateBmi = (height: number, weight: number): string => {
  const heightInM = height / 100;
  const bmi = weight / (heightInM * heightInM);

  if (bmi < 18.5) return "Underweight";
  else if (bmi < 25) return "Normal (healthy weight)";
  else if (bmi < 30) return "Overweight";
  else return "Obese";
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

if (isNaN(height) || isNaN(weight)) {
  throw new Error("Provided values were not numbers!");
}

if (height < 0 || weight < 0) {
  throw new Error("Provided values were not positive numbers!");
}

console.log(calculateBmi(height, weight));

