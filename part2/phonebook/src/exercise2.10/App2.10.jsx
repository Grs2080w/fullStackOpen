import { useState, useEffect } from "react";
import Filter from "./exercise2.10/Filter";
import PersonForm from "./exercise2.10/PersonForm";
import Persons from "./exercise2.10/Persons";
import "./App.css";

export default function App() {
  const [persons, setPersons] = useState([
    { name: "Camila Laura Pereira", number: "(38) 127172-4536" },
    { name: "Sofia Silva", number: "(93) 421914-1058" },
    { name: "Ana Santos", number: "(44) 588361-6262" },
    { name: "Lucas Santos", number: "(6) 15214-9888" },
    { name: "Carlos Oliveira", number: "(58) 256143-4768" },
    { name: "Lucas Souza", number: "(49) 449495-2656" },
    { name: "Pedro Silva", number: "(31) 619770-6054" },
    { name: "Ana Santos", number: "(36) 487237-802" },
    { name: "Pedro Gabriel Silva", number: "(59) 731046-8677" },
    { name: "João Souza", number: "(97) 27480-2451" },
    { name: "Laura Oliveira", number: "(89) 822672-5960" },
    { name: "Laura Souza", number: "(93) 543675-7249" },
    { name: "João Santos", number: "(9) 235968-1651" },
    { name: "Maria Sofia Silva", number: "(18) 806177-5687" },
    { name: "Camila Pereira", number: "(15) 101563-8563" },
    { name: "Camila Silva", number: "(66) 836161-655" },
    { name: "João Pedro Oliveira", number: "(43) 884342-1315" },
    { name: "Gabriel Pereira", number: "(65) 588285-4191" },
    { name: "Laura Souza", number: "(91) 48909-3371" },
    { name: "Carlos Oliveira", number: "(59) 411768-1622" },
    { name: "Carlos Silva", number: "(85) 912190-2060" },
    { name: "Gabriel João Souza", number: "(86) 136030-9802" },
    { name: "Lucas Silva", number: "(73) 78832-2817" },
    { name: "Sofia Maria Oliveira", number: "(67) 951422-1013" },
    { name: "Maria Souza", number: "(54) 429479-2448" },
    { name: "Carlos Pereira", number: "(36) 406479-2137" },
    { name: "Lucas Oliveira", number: "(51) 272366-2979" },
    { name: "Gabriel Santos", number: "(97) 917595-8055" },
    { name: "Carlos Oliveira", number: "(68) 158334-9643" },
    { name: "Lucas Santos", number: "(38) 155566-5484" },
    { name: "Maria Laura Pereira", number: "(27) 247308-8841" },
    { name: "Pedro Santos", number: "(20) 324958-8506" },
    { name: "João Silva", number: "(67) 560603-3291" },
    { name: "Maria Souza", number: "(27) 518339-785" },
    { name: "Laura Laura Santos", number: "(96) 787854-5651" },
    { name: "Camila Pereira", number: "(4) 947776-2342" },
    { name: "Ana Sofia Souza", number: "(74) 66306-2255" },
    { name: "Ana Silva", number: "(26) 482115-6653" },
    { name: "Maria Silva", number: "(40) 736987-2310" },
    { name: "Ana Santos", number: "(84) 725036-4178" },
    { name: "Sofia Pereira", number: "(1) 220053-4065" },
    { name: "João Souza", number: "(22) 325891-5653" },
    { name: "Laura Ana Souza", number: "(81) 255780-700" },
    { name: "Camila Santos", number: "(21) 962397-3225" },
    { name: "Carlos Souza", number: "(63) 348191-1115" },
    { name: "Camila Silva", number: "(7) 829728-372" },
    { name: "João Oliveira", number: "(90) 317666-5528" },
    { name: "Pedro Souza", number: "(87) 680372-7879" },
    { name: "Camila Silva", number: "(57) 675689-2599" },
    { name: "Maria Sofia Pereira", number: "(2) 913651-6914" },
  ]);

  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personsFiltered, setPersonsFiltered] = useState(persons);

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

      <ul>
        <Persons persons={personsFiltered} />
      </ul>

    </div>
  );
}
