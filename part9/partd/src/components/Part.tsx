import { CoursePart } from "../types/CoursePart";
import Content from "./Content";

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <Content
          name={props.part.name}
          exerciseCount={props.part.exerciseCount}
        />
      );
    case "group":
      return (
        <Content
          name={props.part.name}
          exerciseCount={props.part.exerciseCount}
          groupProjectCount={props.part.groupProjectCount}
        />
      );
    case "background":
      return (
        <Content
          name={props.part.name}
          exerciseCount={props.part.exerciseCount}
          description={props.part.description}
          backgroundMaterial={props.part.backgroundMaterial}
        />
      );
    case "special":
      return (
        <Content
          name={props.part.name}
          exerciseCount={props.part.exerciseCount}
          description={props.part.description}
          requirements={props.part.requirements}
        />
      );
  }
};

export default Part;
