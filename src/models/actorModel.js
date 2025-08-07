const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Actor name is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ActorModel = mongoose.model("Actor", actorSchema);

module.exports = ActorModel;
