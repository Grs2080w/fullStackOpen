const mongo = require('./mongo/mongo');

const express = require('express');
const app = express();

const morgan = require('morgan');
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const cors = require('cors');
app.use(cors());

app.use(express.json()); // important

app.use(express.static('build'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
});

app.get('/api/persons', (req, res) => {
    mongo.getAll().then(persons => res.json(persons));
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).send({ status:404, error: 'person not found' }).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    let newPersons = persons.filter(person => person.id !== id);
    persons = newPersons;
    res.status(204).send({ status:204, message: 'person deleted' }).end();
})

app.post('/api/persons', (req, res) => {
    
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({
            status:400,
            error: 'name or number missing'
        });
    }
    
    var newPerson = {
        name: req.body.name, 
        number: req.body.number
    };

    mongo.addPerson(newPerson);
})


app.listen(3001, () => {
    console.log("Server running on port 3001");
});