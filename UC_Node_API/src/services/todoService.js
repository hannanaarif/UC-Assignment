

class TodoService {
  constructor(todoRepository) {
    this.repository = todoRepository;
  }

  async getTodos() {
    try {
      return this.repository.getTodos();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createTodo(todo) {
    try {
      return this.repository.createTodo(todo);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateTodo(id, todo) {
    try {
      console.log("id", id, "todo", todo);
      return this.repository.updateTodo(id, todo);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTodo(id) {
    try {
      return this.repository.deleteTodo(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTodoById(id) {
    try {
      return this.repository.getTodoById(id);
    } catch (error) {
      throw new Error(error);
    }
  } 
}

export default TodoService;


