const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already existes"],
    minlength: [5, "Username should be atleast 5 characters long"],
    maxlength: [15, "Username should not exceed 15 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        const regex = new RegExp(
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
        );
        return regex.test(v);
      },
      msg: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     const regex =
    //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/;

    //     console.log("regex", v, " ", v.match(regex));
    //     return v.match(regex);
    //   },
    //   msg: "Invalid password",
    // },
    // match: [
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/,
    //   ,
    //   "invalid password",
    // ],
  },
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const regex = new RegExp("^[A-Za-z]+$");
        return regex.test(v);
      },
      msg: "First Name should not contain digits",
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const regex = new RegExp("^[A-Za-z]+$");
        return regex.test(v);
      },
      msg: "Last Name should not contain digits",
    },
  },
});

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

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
