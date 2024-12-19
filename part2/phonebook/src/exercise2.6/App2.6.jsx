import { useState } from "react";
import "./App.css";

export default function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);

  const [newName, setNewName] = useState("");

  function addPerson(event) {
    event.preventDefault();
    const newPerson = { name: newName };
    setPersons(persons.concat(newPerson));
    setNewName("");
  }

  function addnewName(event) {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          <input placeholder="Name" onChange={addnewName} value={newName} id="name" />
        </div>
        <div id="btn">
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      <Person persons={persons} />
    </div>
  );
}

function Person({ persons }) {
  return persons.map((person) => {
    return <p className="person" key={person.name}>{person.name}</p>;
  });
}
