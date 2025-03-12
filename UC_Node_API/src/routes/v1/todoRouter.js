import express from "express";
import todoController from "../../controller/todoController.js";

const todoRouter = express.Router();

todoRouter.get('/', todoController.getTodo);
todoRouter.post('/', todoController.createTodo);
todoRouter.put('/:id', todoController.updateTodo);
todoRouter.delete('/:id', todoController.deleteTodo);
todoRouter.get('/:id', todoController.getTodoById);

export default todoRouter;
