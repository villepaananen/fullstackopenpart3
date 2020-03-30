require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

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

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON());
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON());
  });
});

app.get("/info", (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON());
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
