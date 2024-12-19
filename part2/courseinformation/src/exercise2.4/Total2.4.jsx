export default function Total({ course }) {
  var parts = course.parts;
  const total = parts.reduce((s, p) => (s += p.exercises), 0);

  return <p style={{ fontWeight: "bold" }}>total of exercises {total} banana</p>;
}
