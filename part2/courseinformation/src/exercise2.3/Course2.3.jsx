import Content from "./Content2.3";
import Total from "./Total2.3";

export default function Course({ course }) {
  return (
    <div>
      <h1>{course.name}</h1>

      <Content parts={course.parts} />

      <Total course={course} />
    </div>
  );
}
