import Header from "./components/Header";
import Total from "./components/Total";
import { CoursePart } from "./types/CoursePart";
import Part from "./components/Part";

const App = () => {

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to known type",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  // courseParts.map((part) => {
  //   if (part.kind === "group") {
  //     return part.groupProjectCount;
  //   }
  // });

  return (
    <div>
      <Header courseName={courseName} />
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
