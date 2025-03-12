import TodoService from '../services/todoService.js';
import TodoRepository from '../repository/todoRepository.js';



const todoService = new TodoService(new TodoRepository());

async function getTodo(req, res) {
    try {  
        const todos = await todoService.getTodos();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createTodo(req, res) {
    try {
        const todo = await todoService.createTodo(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateTodo(req, res) {
    try {
        console.log(req.params.id, req.body);
        const todo = await todoService.updateTodo(req.params.id, req.body);
        res.status(200).json({ message: "todo updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteTodo(req, res) {
    try {
        const todo = await todoService.deleteTodo(req.params.id);
        res.status(200).json({ message: "todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getTodoById(req, res) {
    try {
        const todo = await todoService.getTodoById(req.params.id);
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export default {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById
};



