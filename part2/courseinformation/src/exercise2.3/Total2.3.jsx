export default function Total({ course }) {
    var parts = course.parts
    const total = parts.reduce(
        (s, p) => s += p.exercises, 0
    );

    return <p>total of exercises {total}</p>;
}
