import Content from "./Content2.1";

export default function Course({ course }) {
    return (
        <div>
            <h1>{course.name}</h1>

            <Content parts={course.parts} />
        </div>
        
        
    );
}