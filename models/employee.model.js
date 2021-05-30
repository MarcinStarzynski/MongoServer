const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    //_id: { type: mongoose.Types.ObjectId, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    department: { type: String, required: true, ref: 'Department' },
    salary: { type: Number, required: false}
});

module.exports = mongoose.model('Employee', employeeSchema);