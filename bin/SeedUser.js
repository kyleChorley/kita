const user = [
  {
    username: "User",
    password: "User",
    userType: "admin"
  },
  {
    username: "Parent",
    password: "Parent",
    userType: "parentUser"
  },
  {
    username: "Kita",
    password: "Kita",
    userType: "kita"
  }
];

const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect("mongodb://localhost/kita");

// const users = user.map(user => {
//   return user;
// });

User.insertMany(user)
  .then(documents => {
    console.log(`Success! ${documents.length}, users were added`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
