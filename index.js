const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  { name: "Arto Hellas", number: "040-123456", id: 0 },
  { name: "Ada Lovelace", number: "49-33-5323523", id: 1 },
  { name: "Dan Abramov", number: "12-43-234345", id: 2 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 3 }
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) res.json(person);
  else res.status(404).send(`No person found with an id of ${id}.`);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (!person) {
    return res.status(400).json({
      error: "content missing"
    });
  }

  const id = Math.floor(Math.random() * 1000000);
  person.id = id;

  persons = persons.concat(person);
  res.json(person);
});

app.get("/info", (req, res) => {
  res
    .type("text/plain")
    .send(`Phonebook has info for ${persons.length} people.\n\n${new Date()}`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
