const calculateBmi = (height: number, weight: number): string => {
  const heightInM = height / 100;
  const bmi = weight / (heightInM * heightInM);

  if (bmi < 18.5) return "Underweight";
  else if (bmi < 25) return "Normal (healthy weight)";
  else if (bmi < 30) return "Overweight";
  else return "Obese";
};

export default calculateBmi;