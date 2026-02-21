export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface CreateTodoRequest {
  title: string;
  completed?: boolean;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}

export interface TodoResponse {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}