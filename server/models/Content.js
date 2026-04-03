const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: false, // Optional because 'ask' might just have a question
    },
    platform: {
      type: String,
      required: false,
    },
    audience: {
      type: String,
      required: false,
    },
    generatedContent: {
      type: mongoose.Schema.Types.Mixed, // Can be string or JSON object
      required: true,
    },
    type: {
      type: String,
      enum: ['generate', 'ask', 'improve', 'ideas'],
      required: true,
    },
    originalContent: {
      type: String,
      required: false, // Useful for the 'improve' endpoint
    },
    question: {
      type: String,
      required: false, // Useful for the 'ask' endpoint
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Content', contentSchema);
