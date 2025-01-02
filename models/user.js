const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already existes"],
    minlength: [5, "Username should be atleast 5 characters long"],
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
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// create a new user : password123 -> before saving in db( a function),
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) next();
  console.log("password", this.password, this.userName);
  try {
    bcrypt.hash(this.password, 10).then((hashedPassword) => {
      console.log("hashedPassword: ", hashedPassword);
      this.password = hashedPassword;
      next();
    });
  } catch (error) {
    console.log("Error encrypting password", error);
  }
});

module.exports = mongoose.model("User", userSchema);
