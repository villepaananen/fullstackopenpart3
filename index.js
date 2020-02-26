const express = require("express");
const app = express();

let persons = [
  { name: "Arto Hellas", number: "040-123456" },
  { name: "Ada Lovelace", number: "49-33-5323523" }
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
