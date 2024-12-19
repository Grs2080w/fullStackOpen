import { useState, useEffect } from "react";
// components
import Filter from "./exercise2.10/Filter2.10";
import PersonForm from "./exercise2.10/PersonForm2.10";
import Persons from "./Persons2.14and2.15";
//style
import "./App.css";
//server comunication
import * as sDb from "./serverDb";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personsFiltered, setPersonsFiltered] = useState(persons);

  useEffect(() => {
    sDb.getAll().then((response) => {
      setPersons(response.data);
    });
  }, [persons]);

  useEffect(() => {
    let regExp = new RegExp(filter, "i");
    let personsFiltered = persons.filter(
      (person) => person.name.search(regExp) !== -1
    );
    setPersonsFiltered(personsFiltered);
  }, [filter, persons]);

  function addPerson(event) {
    event.preventDefault();

    let personBefore = {};
    let check = false;
    persons.forEach((person) => {
      if (person.name === newName) {
        
        let res = window.confirm(
          `${newName} is already added to phonebook, replace old number with new one?`
        );

        if (res) {
          personBefore = person
          check = 'true';
        } else {
          alert(`${newName} is already added to phonebook`);
          check = 1;
        }
      }
    });

    const newPerson = {
      name: newName ? newName : "unknown",
      number: number ? number : "00000000",
    };

    if (check === 'true') {
      sDb.alter({id:personBefore.id, ...newPerson});

    } else if (!check) {
      sDb.create(newPerson)
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

  function deletePerson(person) {
    let res = window.confirm("Delete " + person.name + "?");
    if (res) {
      sDb.remove(person).then((response) => console.log(response));
    } else {
      window.alert("Person was not deleted");
    }
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
          <Persons persons={personsFiltered} deletePerson={deletePerson} />
        </tbody>
      </table>

    </div>
  );
}
