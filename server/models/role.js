const mongoose = require('mongoose');
const { Schema } = mongoose;

const Competency = require('./competency');

const roleSchema = new Schema({
  roleName: {
    required: true,
    type: String,
    trim: true
  },
  timeToSQEP: {
    type: Number,
    default: 0
  },
  competencies: [{ type: Schema.Types.ObjectId, ref: 'Competency' }]
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
