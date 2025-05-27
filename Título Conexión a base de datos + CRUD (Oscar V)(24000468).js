const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date
});

module.exports = mongoose.model('Task', TaskSchema);
const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date
});

module.exports = mongoose.model('Goal', GoalSchema);
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('🟢 MongoDB conectado'))
.catch(err => console.error('🔴 Error al conectar MongoDB:', err));

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
const express = require('express');
const router = express.Router();

const Task = require('../models/Task');
const Goal = require('../models/Goal');

// Obtener tareas
router.get('/getTasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Obtener metas
router.get('/getGoals', async (req, res) => {
    const goals = await Goal.find();
    res.json(goals);
});

// Agregar tarea
router.post('/addTask', async (req, res) => {
    const { title, description, dueDate } = req.body;
    const newTask = new Task({ title, description, dueDate });
    await newTask.save();
    res.json({ message: 'Tarea agregada' });
});

// Agregar meta
router.post('/addGoal', async (req, res) => {
    const { title, description, dueDate } = req.body;
    const newGoal = new Goal({ title, description, dueDate });
    await newGoal.save();
    res.json({ message: 'Meta agregada' });
});

// Eliminar tarea
router.delete('/removeTask/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarea eliminada' });
});

// Eliminar meta
router.delete('/removeGoal/:id', async (req, res) => {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meta eliminada' });
});

module.exports = router;
