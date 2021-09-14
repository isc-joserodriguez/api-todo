const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'no puede estar vacío'],
        index: true
    },
    idUser: { type: mongoose.ObjectId, required: true, ref: 'User' },
    description: {
        type: String,
        required: [true, 'no puede estar vacío'],
        index: true,
    },
    dueDate: { type: Date, required: true },
    status: { type: Boolean, default: false }
},
    { timestamps: true }
);

mongoose.model('Task', TaskSchema);