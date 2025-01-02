const mongoose = require("mongoose");
const password = process.env.PASSWORD;

const url = `mongodb+srv://gabriel:022008@cluster0.y2g65.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Contact = mongoose.model("contact", contactSchema);

async function addPerson({name, number}) {

  const newContact = new Contact({
    name,
    number,
  });

  newContact.save().then((result) => {
    console.log("note saved!");
  });
}

async function getAll() { 
  return await Contact.find({});
}

async function remove(id) {
  console.log(id);
  
  return await Contact.findByIdAndDelete(id).then(() => console.log("Deleted"))
}

module.exports = { addPerson, getAll, remove };

