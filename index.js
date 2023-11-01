const express = require('express')
const app = express()

const PORT = 3001

app.use(express.json())

let db = [
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

app.get('/', (req, res) => {
  res.redirect('/api/persons')
})

app.get('/api/persons', (req, res) => {
    res.contentType('application/json').send(db)
})

app.post('/api/persons', (req, res) => {
  const data = req.body
  const valid_entries = new Set(["id", "name", "number"])
  if (Object.keys(data).filter(k => valid_entries.has(k)).length !== valid_entries.size) {
    res.send("invalid body")
  } 
  const person = Object.fromEntries(Object.entries(data).filter(e => valid_entries.has(e[0])))
  if (db.filter(e => e.id === data.id).length !== 0) {
    db = db.filter(e => e.id !== person.id)
  }
  db.push(person)
  res.send(db)
})

app.get('/api/persons/:id', (req, res) => {
    const person_id = Number(req.params.id)
    const data = db.filter(entry => entry["id"] === person_id)
    console.log(data)
    if (data.length < 1) {
        res.status(404).send(`<p>No person with id ${person_id} exists in database</p>`)
    }
    res.contentType('application/json').send(db.filter(entry => entry["id"] === person_id))
})

app.get('/info', (req, res) => {
    const date = new Date()
    const msg = `<p>Phonebook has info for ${db.length} people</p>`
                + `<p>${date.toString()}</p>`
    res.contentType('text/html').send(msg)
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`)
})