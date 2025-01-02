const mongo = require('./mongo/mongo');

const express = require('express');
const app = express();
const cors = require('cors');

const morgan = require('morgan');
morgan.token('body', (req) => JSON.stringify(req.body));


app.use(express.static('build'))
app.use(express.json()); // important
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


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

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    mongo.remove(id);
    //res.send({ status:204, message: 'person deleted' });
})



app.all('*', (req, res) => {
    console.log('Endpoint desconhecido acessado:', req.url);
    res.status(404).send({
        status:404,
        error: 'Endpoint desconhecido'
    });
});


app.listen(3001, () => {
    console.log("Server running on port 3001");
});