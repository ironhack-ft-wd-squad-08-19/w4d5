const mongoose = require("mongoose");
// to fix deprecation warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect("mongodb://localhost/mongoose-example");

// const Schema = mongoose.Schema;

// const userSchema = new mongoose.Schema({
//   name: String
// });

// const User = new mongoose.model("User", userSchema);

// User.create({ name: "John Doe" });

// const catSchema = new mongoose.Schema({
//   name: String,
//   lives: Number
// });

// const Cat = new mongoose.model("Cat", catSchema);

// Cat.create({ name: "Puss in boots", lives: 9 });

// const sheepSchema = new mongoose.Schema({
//   name: String
// });

// const Sheep = new mongoose.model("Sheep", sheepSchema);

// Sheep.create({ name: "Dolly" });

const placeSchema = new mongoose.Schema({
  name: String,
  creationDate: String
});

const Place = new mongoose.model("Place", placeSchema);

// Place.create({ name: 123456 });

// const place = Place.find({ name: "Old Trafford" });
// console.log(place);

Place.find({ name: "New Trafford" })
  .then(data => {
    // console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

// insertMany([]) to insert multiple documents
// Place.insertMany([{ name: "Atrium Tower" }, { name: "Fernsehturm" }]);

// .find({query}) returns all documents matching a query -> [{}, {}, ...]
// Place.find().then(places => {
//   console.log(places);
// });

// .findOne({query}) returns the first document matching a query {}
// Place.findOne({ name: "Old Trafford" }).then(place => {
//   console.log(place);
// });

// .findById(id) returns the document with the given id
// Place.findById("5d722ca4f18a05aadc1f3276").then(place => {
//   console.log(place);
// });

// Place.findOneAndDelete({ name: "Old Trafford" }).then(data => {
//   console.log(data);
// });

// Place.deleteOne({ name: "123456" }).then(data => {
//   console.log(data);
// });

// Place.deleteMany({}).then(data => {
//   console.log(data);
// });
// Place.create({ name: "Old Trafford" });

Place.updateOne(
  { name: "Old Trafford" },
  { name: "Anfield Road", creationDate: "1900" }
).then(data => {
  console.log(data);
});

// Place.updateMany([])

Place.update({ name: "Anfield Road" }, { name: "tutu" });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    set: value => {
      return value
        .split(" ")
        .map(part => part[0].toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
    }
    // lowercase: true
    //   maxlength: 20
  },
  age: {
    type: Number,
    min: 18,
    max: 70
  },
  hobbies: [String],
  address: Object,
  role: {
    type: String,
    enum: ["user", "admin", "mod"],
    default: "user"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      message: "Email must be lowercase",
      validator: value => {
        if (value.toLowerCase() === value) return true;
        else return false;
      }
    }
  }
});

// const User = mongoose.model("User", userSchema);

// User.create({
//   name: "Creed Bratton",
//   email: "      creed3@thug.com"
// })
//   .then(() => {
//     console.log("User successfully created");
//   })
//   .catch(err => {
//     console.log("Error at creation: ", err);
//   });
