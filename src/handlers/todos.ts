import { Request, Response } from 'express';
import { todoStore } from '../data/store.js';
import { Todo, TodoResponse, ErrorResponse } from '../types/todo.js';
import { validateCreateTodo, validateUpdateTodo, ValidationError } from '../utils/validation.js';

function toTodoResponse(todo: Todo): TodoResponse {
  return {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt.toISOString(),
  };
}

export function getAllTodos(req: Request, res: Response): void {
  const todos = todoStore.findAll();
  res.status(200).json(todos.map(toTodoResponse));
}

export function getTodoById(req: Request, res: Response): void {
  const todo = todoStore.findById(req.params.id);
  if (!todo) {
    const error: ErrorResponse = { error: 'Not Found', message: `Todo with id '${req.params.id}' not found` };
    res.status(404).json(error);
    return;
  }
  res.status(200).json(toTodoResponse(todo));
}

export function createTodo(req: Request, res: Response): void {
  try {
    const data = validateCreateTodo(req.body);
    const todo = todoStore.create(data.title, data.completed);
    res.status(201).json(toTodoResponse(todo));
  } catch (err) {
    if (err instanceof ValidationError) {
      const error: ErrorResponse = { error: 'Validation Error', message: err.message };
      res.status(400).json(error);
      return;
    }
    throw err;
  }
}

export function updateTodo(req: Request, res: Response): void {
  try {
    const data = validateUpdateTodo(req.body);
    const todo = todoStore.update(req.params.id, data);
    if (!todo) {
      const error: ErrorResponse = { error: 'Not Found', message: `Todo with id '${req.params.id}' not found` };
      res.status(404).json(error);
      return;
    }
    res.status(200).json(toTodoResponse(todo));
  } catch (err) {
    if (err instanceof ValidationError) {
      const error: ErrorResponse = { error: 'Validation Error', message: err.message };
      res.status(400).json(error);
      return;
    }
    throw err;
  }
}

export function deleteTodo(req: Request, res: Response): void {
  const deleted = todoStore.delete(req.params.id);
  if (!deleted) {
    const error: ErrorResponse = { error: 'Not Found', message: `Todo with id '${req.params.id}' not found` };
    res.status(404).json(error);
    return;
  }
  res.status(204).send();
}
