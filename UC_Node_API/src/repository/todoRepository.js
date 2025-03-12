import Todo from '../models/todomodel.js';

 class TodoRepository {

    async getTodos() {
        try {
            return Todo.find();
        } catch (error) {
            throw new Error(error);
        }
        }

    async createTodo(todo) {
        try {
            return Todo.create(todo);
        } catch (error) {
            throw new Error(error);
        }
    }

    async  updateTodo(id, todo) {
        try {
            const trimid =id.trim(); // Trim extra spaces or newlines
            return Todo.findByIdAndUpdate(trimid, todo, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }   

    async deleteTodo(id) {
        try {
            return Todo.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    }   

    async getTodoById(id) {
        try {
            return Todo.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default TodoRepository;
