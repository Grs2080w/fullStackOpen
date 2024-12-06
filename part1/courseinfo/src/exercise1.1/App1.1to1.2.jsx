import Header from "./components-exercise1.1/header.jsx";
import Content from "./components-exercise1.1/content.jsx";
import Total from "./components-exercise1.1/total.jsx";

export default function App() {
  const course = "Desenvolvimento de aplicação Half Stack";
  const part1 = "Fundamentos da biblioteca React";
  const exercises1 = 10;
  const part2 = "Usando props para passar dados";
  const exercises2 = 7;
  const part3 = "Estado de um componente";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};


