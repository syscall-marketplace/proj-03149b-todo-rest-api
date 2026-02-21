import { CreateTodoRequest, UpdateTodoRequest } from '../types/todo.js';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateCreateTodo(data: any): CreateTodoRequest {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Request body must be an object');
  }

  if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
    throw new ValidationError('Title is required and must be a non-empty string');
  }

  return {
    title: data.title.trim(),
    completed: Boolean(data.completed)
  };
}

export function validateUpdateTodo(data: any): UpdateTodoRequest {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Request body must be an object');
  }

  const update: UpdateTodoRequest = {};
  
  if (data.title !== undefined) {
    if (typeof data.title !== 'string' || data.title.trim() === '') {
      throw new ValidationError('Title must be a non-empty string');
    }
    update.title = data.title.trim();
  }

  if (data.completed !== undefined) {
    update.completed = Boolean(data.completed);
  }

  return update;
}