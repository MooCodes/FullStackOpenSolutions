interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Content = (props: ContentProps) => {
  return (
    <>
      <p>
        {props.name} {props.exerciseCount}
      </p>
    </>
  );
};

export default Content;
