// controllers/taskController.js
exports.addTask = (req, res) => {
  const { title, dueDate } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
  }

  // Lógica para agregar la tarea...
  return res.status(200).json({ message: 'Tarea agregada exitosamente' });
};
