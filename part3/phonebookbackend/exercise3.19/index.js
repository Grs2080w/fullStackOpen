const mongo = require('./mongo/mongo');

const express = require('express');
const app = express();
const cors = require('cors');

const morgan = require('morgan');
morgan.token('body', (req) => JSON.stringify(req.body));


//app.use(express.static('build'))
app.use(express.json()); // important
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: 'name need to have at least 3 characters' })
    }
  
    next(error)
}
// Este deve ser o último middleware a ser carregado.
app.use(errorHandler)


app.get('/info', async (req, res) => {

    await mongo.getAll().then(persons => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
    });

});

app.get('/api/persons', (req, res) => {
    mongo.getAll().then(persons => res.json(persons));
});

app.get('/api/persons/:id', async (req, res) => {
    const id = req.params.id

    await mongo.getAll().then(persons => {
        
        const person = persons.find(person => person._id.toString() === id);
        
        if (person) {
            res.json(person);
        } else {
            res.status(404).send({ status:404, error: 'person not found' }).end();
        }

    });
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
    
    mongo.addPerson(newPerson).catch(error => errorHandler(error, req, res));
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    mongo.remove(id);
    //res.send({ status:204, message: 'person deleted' });
})


app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const newPerson = req.body;
    mongo.update(id, newPerson);
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