const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://gabriel:${password}@cluster0.y2g65.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;




mongoose.set("strictQuery", false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Contact = mongoose.model("contact", contactSchema);

const newContact = new Contact({
  name,
  number,
});

if (process.argv.length < 3) {

  console.log("give password as argument");
  process.exit(1);

} else if (process.argv.length === 3) {

  Contact.find({}).then((result) => {
        console.log('phonebook:');
        result.forEach((contact) => {
        console.log(contact.name, contact.number);
        });
        mongoose.connection.close();
    });
} else {
    newContact.save().then((result) => {
        console.log(`Added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
}

