const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-k2c8f.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "HTML is Easy",
  number: new Date()
});

if (process.argv.length > 3) {
  person.save().then(response => {
    console.log("note saved!");
    mongoose.connection.close();
  });
} else {
  person.find().then(response => {
    console.log("note saved!");
    mongoose.connection.close();
  });
}
