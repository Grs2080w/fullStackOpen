export default function Persons({ persons }) {
    return persons.map((person) => {
      return (
        <tr key={person.number}>

            <td className="person" key={person.name}>
            {person.name}
            </td>

            <td>
                ☎️ {person.number}
            </td>

        </tr>
        
      );
    });
  }