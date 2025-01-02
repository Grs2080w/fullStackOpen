export default function PersonForm({
  addPerson,
  inputnewName,
  inputNewNumber,
  newName,
  number,
}) {
  return (
    <form onSubmit={addPerson}>
      <div>
        <input placeholder="Name" onChange={inputnewName} value={newName} />{" "}
        <br />
      </div>

      <div>
        <input
          placeholder="Number"
          type="text"
          value={number}
          onChange={inputNewNumber}
        />
      </div>

      <div id="btn">
        <button type="submit">add</button>
      </div>
    </form>
  );
}
