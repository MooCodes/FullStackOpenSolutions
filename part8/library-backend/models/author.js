const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  born: {
    type: Number,
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Author", schema);
