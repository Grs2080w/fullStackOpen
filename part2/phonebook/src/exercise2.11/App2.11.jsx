import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./exercise2.10/Filter2.10";
import PersonForm from "./exercise2.10/PersonForm2.10";
import Persons from "./exercise2.10/Persons2.10";
import "./App.css";

export default function App() {
  
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personsFiltered, setPersonsFiltered] = useState(persons);
  
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    })
  }, []);

  useEffect(() => {
    let regExp = new RegExp(filter, "i");
    let personsFiltered = persons.filter(
      (person) => person.name.search(regExp) !== -1
    );
    setPersonsFiltered(personsFiltered);
  }, [filter, persons]);

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
      number: number ? number : "00000000",
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
  function inputFilter(event) {
    setFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} inputFilter={inputFilter} />

      <h2>Add a new</h2>

      <PersonForm
        addPerson={addPerson}
        inputnewName={inputnewName}
        inputNewNumber={inputNewNumber}
        newName={newName}
        number={number}
      />

      <h2>Numbers</h2>

      <table>
        <tbody>
          <Persons persons={personsFiltered} />
        </tbody>
      </table>

    </div>
  );
}
