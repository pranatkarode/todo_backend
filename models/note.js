const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return v >= new Date();
        },
        message: "Due date cannot be in the past",
      },
    },
    category: {
      type: String,
      enum: ["Work", "Personal", "School"],
      default: null,
    },
    tags: [{ type: String }],
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

noteSchema.pre("save", async function (next) {
  try {
    const userExists = await mongoose.model("User").findById(this.userId);
    if (!userExists) {
      return next(new Error("Invalid userId"));
    }
  } catch (error) {}
});

module.exports = mongoose.model("Note", noteSchema);
