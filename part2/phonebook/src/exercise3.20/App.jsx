import { useState, useEffect } from "react";
// components
import Filter from "./exercise2.10/Filter2.10";
import PersonForm from "./exercise2.10/PersonForm2.10";
import Persons from "./Persons";
import Notification from "./Notification";
//style
import "./App.css";
//server
import { getAll, create, remove, altere } from "./serverDb"; 

export default function App() {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [personsFiltered, setPersonsFiltered] = useState(persons);
  const [alter, setAlter] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState({
    message: null,
    color: null,
  });

  useEffect(() => {
    if (showNotification) {
      const timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, 3000); // 3000 milissegundos = 3 segundos

      return () => clearTimeout(timeoutId);
    }
  }, [showNotification]);

  useEffect(() => {
    getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    let regExp = new RegExp(filter, "i");
    let personsFiltered = persons.filter(
      (person) => person.name.search(regExp) !== -1
    );

    setPersonsFiltered(personsFiltered);
  }, [filter, persons]);

  useEffect(() => {
    async function updateServer() {
      if (alter) {
          await getAll().then((response) => {
          setPersons(response.data);
        });
      }
    }

    updateServer();

    setAlter(false);
  }, [alter]);

  useEffect(() => {
    setPersonsFiltered(persons);
  }, [persons])

  async function addPerson(event) {
    event.preventDefault();

    var existingPerson = personsFiltered.find(person => person.name === newName);   

    if (existingPerson) {
      
      if (window.confirm(`${newName} already exists. Replace with new number?`)) {
        // Update in-memory data
        var updatedPerson = { ...existingPerson, number };
        let personFiltered2 = personsFiltered.map(person => person._id === updatedPerson._id ? updatedPerson : person);
        
        setPersonsFiltered(personFiltered2);

        
        // Update server data
        await getAll().then(async(response) => {

          let existingPerson = response.data.find(person => person.name === newName); 
          let updatedPerson = { ...existingPerson, number };  
          await altere(updatedPerson);

        })
        

        setMessage({ message: `Updated ${existingPerson.name}`, color: 'green' });
        setShowNotification(true);

      } else {

        setMessage({ message: `${newName} already exists.`, color: 'yellow' });
        setShowNotification(true);
      }

    } else {
      // Create new person
      var newPerson = { 
        name: newName ? newName : "unknown", 
        number: number ? number : "00000000" }; 
        
      var personsFilteredThird = personsFiltered.concat(newPerson);
        
      setPersonsFiltered(personsFilteredThird);
      
      setMessage({ message: `Added ${newPerson.name}`, color: 'green' });
      setShowNotification(true);
      
      await create(newPerson).catch((error) => {
        setMessage({ message: error.response.data.error, color: 'red' });
        setShowNotification(true);

        let personsFilteredAfter = personsFiltered.filter(
          (personFiltered) => personFiltered.name !== newPerson.name
        );
        
        setPersonsFiltered(personsFilteredAfter);
        
      })

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

    
    if (window.confirm("Delete " + person.name + "?")) {
      
      let personsFilteredAfter = personsFiltered.filter(
        (personFiltered) => personFiltered._id !== person._id
      );
      
      setPersonsFiltered(personsFilteredAfter);
      remove(person);
      setMessage({ message: `Deleted ${person.name}`, color: "red" });
      setShowNotification(true);

    } else {

      setMessage({ message: `${person.name} was not deleted`, color: "red" });
      setShowNotification(true);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} showNotification={showNotification} />

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
