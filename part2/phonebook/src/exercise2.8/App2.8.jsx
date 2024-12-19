import { useState } from "react";
import "./App.css";

export default function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "6499958974" },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");

  function addPerson(event) {
    event.preventDefault();

    let check = false;
    persons.forEach((person) => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        check = true;
      }
    });

    const newPerson = {
      name: newName ? newName : "unknown",
      number: number ? number  : "00000000",
    };

    if (check === false) {
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNumber("");
  }

  function inputnewName(event) {
    setNewName(event.target.value);
  }

  function inputNewNumber(event) {
    setNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          <input placeholder="Name" onChange={inputnewName} value={newName} />{" "}
          <br />
        </div>

        <div>
          <input
            placeholder="Number"
            type="number"
            value={number}
            onChange={inputNewNumber}
          />
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
    return (
      <p className="person" key={person.name}>
        {person.name} {person.number}
      </p>
    );
  });
}
