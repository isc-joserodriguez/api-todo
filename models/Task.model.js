const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

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

// usando plugin de validación para que no se repitan correos
TaskSchema.plugin(uniqueValidator, { message: 'Ya existe ese Task' });

mongoose.model('Task', TaskSchema);