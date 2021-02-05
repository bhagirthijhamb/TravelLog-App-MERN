const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: true
}

// const defaultRequiredDate = {
//   type: Date,
//   default: Date.now(),
//   required: true
// }

const logEntrySchema = new Schema({
  // title: requiredString,
  title: { type: String, required: true },
  visitDate: { required: true, type: Date },
  description: String,
  comments: String,
  rating: { type: Number, min: 0, max: 10, default: 0 },
  image: String,
  latitude: { ...requiredNumber, min: -90, max: 90 },
  longitude: { ...requiredNumber, min: -1800, max: 180
  },
}, {
  timestamps: true
})

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;