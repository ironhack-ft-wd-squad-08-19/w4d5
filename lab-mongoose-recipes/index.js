const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Recipe.create({ title: "Tacos", cuisine: "Tex-Mex" }).then(recipe => {
//   console.log(recipe.title);
// });

// Recipe.insertMany(data).then(recipes => {
//   // `recipes` is the array of documents that were added in the collection
//   for (const recipe of recipes) {
//     console.log(recipe.title);
//   }
//   Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(
//     () => {
//       console.log("Recipe updated successfully");
//     }
//   );
//   Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
//     console.log("Recipe deleted successfully");
//   });
// });

Recipe.create({
  title: "Tacos",
  cuisine: "Tex-Mex"
})
  .then(recipe => {
    console.log(recipe.title);
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(recipe.title);
    });
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    //   .then(data => data)
    //   .catch(err => {
    //     console.log("Handling errors for the update:", err);
    //   });
  })
  .then(() => {
    console.log("Recipe successfully updated");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Recipe successfully deleted");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
