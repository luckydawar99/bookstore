// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Create a rest object
const app = express();

// Enable the CORS policy
app.use(cors());

// Set the JSON as MIME Type
app.use(bodyParser.json());

// Parse the client data
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to the database
mongoose.connect("mongodb://localhost:27017/reactdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4,
});

// Define schema
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  category: String,
  image: String,
  title: String,
});

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", userSchema);
const Book = mongoose.model("books", employeeSchema);

// Create the REST API
app.post("/users", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRecord = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newRecord.save();
    res.status(200).json({ insert: "successful",User:{
      _id:newRecord._id,
      fullname:newRecord.fullname,
      email:newRecord.email,
    } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//login request

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
else{
  
  res.status(200).json({ message: "Login successful",user:{
    _id:user._id,
    fullname:user.fullname,
    email:user.email
  } });
}
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// Using get parameter
app.get("/books", (req, res) => {
  Book.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

// Assign the port
app.listen(8080, () => {
  console.log("server started:8080");
});


// // Import modules
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require('bcryptjs');

// // Create a rest object
// const app = express();

// // Enable the CORS policy
// app.use(cors());

// // Set the JSON as MIME Type
// app.use(bodyParser.json());

// // Parse the client data
// app.use(bodyParser.urlencoded({ extended: false }));

// // Connect to the database
// mongoose.connect("mongodb://localhost:27017/reactdb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000,
//   autoIndex: false, // Don't build indexes
//   maxPoolSize: 10, // Maintain up to 10 socket connections
//   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//   family: 4, // Use IPv4, skip trying IPv6
// });

// // Define schema
// const Schema = mongoose.Schema;

// const employeeSchema = new Schema({
//   id: Number,
//   name: String,
//   price: Number,
//   category: String,
//   image: String,
//   title: String,
// });

// const userSchema = new Schema({
//   fullname: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model("users", userSchema);

// // Applying the schema to the database using mongoose
// const Book = mongoose.model("books", employeeSchema);

// // Create the rest API
// app.post("/users", async (req, res) => {
//   const { fullname, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }


//  const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newRecord = new User({
//       fullname,
//       email,
//       hashedPassword,
//     });

//     await newRecord.save();
//     res.status(200).json({ insert: "successful" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Using get parameter
// app.get("/books", (req, res) => {
//   Book.find({})
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ error: err.message });
//     });
// });

// // Assign the port
// app.listen(8080, () => {
//   console.log("server started:8080");
// });


// //import modules
// var express = require("express");
// var bodyparser = require("body-parser");
// var cors = require("cors");
// var mongoose = require("mongoose");

// //create a rest object
// var app = express();

// //enable the cors policy
// app.use(cors());

// //set the json as MIME Type
// app.use(bodyparser.json());

// //parse the client data
// app.use(bodyparser.urlencoded({ extended: false }));

// //connect to the database
// mongoose.connect("mongodb://localhost:27017/reactdb ", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000,
//   autoIndex: false, // Don't build indexes
//   maxPoolSize: 10, // Maintain up to 10 socket connections
//   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//   family: 4, // Use IPv4, skip trying IPv6
// });

// //define schema
// var Schema = mongoose.Schema;

// var employeeSchema = new Schema({
//   id: Number,
//   name: String,
//   price: Number,
//   category: String,
//   image: String,
//   title: String,
// });

// var users = new Schema({
//   fullname: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// var users = mongoose.model("users", users);

// //applying the schema to the database using mongoose
// var Modal = mongoose.model;
// var books = Modal("books", employeeSchema);

// //create the rest api
// app.post("/users", function (req, res) {
//   var newRecord = new users({
//     fullname: req.body.fullname,
//     email: req.body.email,
//     password: req.body.password,

//     /* id:req.body.id,
//     name: req.body.name,
//     price: req.body.price,
//     category: req.body.category,
//     image: req.body.image,
//     title: req.body.title,
//     */
//   });
// var  user = users.findOne({email});
//   if(user){
//     return res.status(400).json({message:"User alredy exists"});
//   }

//   // Save the record using Promises
//   newRecord
//     .save()
//     .then((result) => {
//       res.status(200).json({ insert: "successful" });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ error: err.message });
//     });
// });

// //using get parameter
// app.get("/books", (req, res) => {
//   books
//     .find({})
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ error: err.message });
//     });
// });

// //assign the port
// app.listen(8080, () => {
//   console.log("server started:8080");
// });
