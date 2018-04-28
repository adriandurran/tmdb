const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
  roleName: {
    required: true,
    type: String,
    trim: true
  },
  compIds: {
    type: Array
  }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
