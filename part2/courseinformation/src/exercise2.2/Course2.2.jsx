import Content from "./Content2.2";
import Total from "./Total";

export default function Course({ course }) {
  return (
    <div>
      <h1>{course.name}</h1>

      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  );
}
