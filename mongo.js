let array = [
  {
     "_id": "67753a248aeaefacd6cab79f",
     "name": "pedro",
     "number": 3,
     "__v": 0
  },
  {
     "_id": "677549cadcaa264f4e80ee35",
     "name": "Marcio",
     "number": 46446846,
     "__v": 0
  },
  {
     "_id": "677549d2dcaa264f4e80ee38",
     "name": "Lucas",
     "number": 3545574,
     "__v": 0
  }
]

let personsFilteredAfter = array.filter(
  (personFiltered) => personFiltered._id !== '677549d2dcaa264f4e80ee38'
);

console.log(personsFilteredAfter);
