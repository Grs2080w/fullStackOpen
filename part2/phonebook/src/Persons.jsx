export default function Persons({ persons , deletePerson}) {
    return persons.map((person) => {
      return (
        <tr key={person.name}>

            <td className="person" key={person.name}>
            {person.name}
            </td>

            <td>
                ☎️ {person.number}
            </td>

            <td>
              <button onClick={() => deletePerson(person)}>delete</button>
            </td>

        </tr>
        
      );
    });
  }