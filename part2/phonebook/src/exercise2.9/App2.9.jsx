import { useState, useEffect } from "react";
import "./App.css";

export default function App() {

  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "6499958974" },
    { name: "Ada Lovelace", number: "4242424242" },
    { name: "Dan Abramov", number: "1111111111" },
    { name: "Mary Ana", number: "2222222222" },
    { name: "Ada leticia", number: "3333333333" },
    { name: "Dan Junior", number: "4444444444" },
    { name: "Mary Poppendieck", number: "5555555555" },
    { name: 'Gabriel', number: "64999026177" },
  ]);

  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState('');
  const [personsFiltered, setPersonsFiltered] = useState(persons)

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


  useEffect(() => {
      let regExp = new RegExp(filter, 'i')
      let personsFiltered = persons.filter(person => person.name.search(regExp) !== -1)
      setPersonsFiltered(personsFiltered)
  }, [filter])


  function inputFilter(event) {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

        <div>
          filter shown with <input value={filter} onChange={inputFilter} type="text" />
        </div>

      <h2>Add a new</h2>

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

      <Person persons={personsFiltered} />

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
