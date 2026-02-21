import { Todo } from '../types/todo.js';
import { randomUUID } from 'crypto';

class TodoStore {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return [...this.todos];
  }

  findById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  create(title: string, completed: boolean = false): Todo {
    const todo: Todo = {
      id: randomUUID(),
      title,
      completed,
      createdAt: new Date()
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: string, updates: { title?: string; completed?: boolean }): Todo | null {
    const todo = this.findById(id);
    if (!todo) return null;

    if (updates.title !== undefined) todo.title = updates.title;
    if (updates.completed !== undefined) todo.completed = updates.completed;

    return todo;
  }

  delete(id: string): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }
}

export const todoStore = new TodoStore();