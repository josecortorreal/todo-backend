const express = require('express');
const router = express.Router();
// const Todo = require('../models/todoModels'); // Import your Todo model
const {Todo} = require('../models') 
// Create a new todo
router.post('/todos', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Todo content is required.' });
    }

    const todo = await Todo.create({ content });

    return res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get all todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    return res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get a todo by ID
router.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update a todo by ID
router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    todo.content = content;
    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Delete a todo by ID
router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    await todo.destroy();

    return res.status(200).json({ message: 'Todo deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
