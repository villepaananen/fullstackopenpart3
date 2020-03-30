const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const person = require("./models/person");

morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});

const app = express();
app.use(express.json());
app.use(express.static("build"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

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

  if (!person.name || !person.number) {
    return res.status(400).json({
      error: "content missing"
    });
  }

  if (persons.find(p => p.name === person.name)) {
    return res.status(400).json({
      error: "name must be unique"
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
