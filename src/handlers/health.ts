import { Request, Response } from 'express';

export function healthCheck(req: Request, res: Response): void {
  res.status(200).json({
    status: 'healthy',
    service: 'todo-rest-api',
    timestamp: new Date().toISOString(),
  });
}
