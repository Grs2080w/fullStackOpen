import Content from "./Content2.4";
import Total from "./Total2.4";

export default function Course({ course }) {
  return (
    <div>
      <h1>{course.name}</h1>

      <Content parts={course.parts} />

      <Total course={course} />
    </div>
  );
}
