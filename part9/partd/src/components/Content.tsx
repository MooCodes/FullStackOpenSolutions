interface ContentProps {
  name: string;
  exerciseCount: number;
  groupProjectCount?: number;
  description?: string;
  backgroundMaterial?: string;
  requirements?: string[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      <p>
        <strong>
          {props.name} {props.exerciseCount}
        </strong>
        {props.groupProjectCount ? (
          <>
            <br /> group project count: {props.groupProjectCount}
          </>
        ) : (
          ""
        )}
        {props.description ? (
          <>
            <br />
            <em>{props.description}</em>
          </>
        ) : (
          ""
        )}
        {props.backgroundMaterial ? (
          <>
            <br />
            submit to {props.backgroundMaterial}
          </>
        ) : (
          ""
        )}
        {props.requirements ? (
          <>
            <br /> requirements: {props.requirements.join(", ")}
          </>
        ) : (
          ""
        )}
      </p>
    </>
  );
};

export default Content;
