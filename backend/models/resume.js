const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    fileName: {
      type: String,
      required: true
    },

    atsScore: {
      type: Number,
      default: 0
    },

    skillsFound: {
      type: [String],
      default: []
    },

    skillsMissing: {
      type: [String],
      default: []
    },

    strengths: {
      type: [String],
      default: []
    },

    suggestions: {
      type: [String],
      default: []
    },

    aiFeedback: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true // 🔥 Automatically adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Resume", resumeSchema);