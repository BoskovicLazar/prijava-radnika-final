import { Express} from 'express';

import authMiddleware from './middlewares/auth';
import { login } from './controllers/auth';
import {
  getAllEmployees,
  getEmployee,
  getArchivedEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from './controllers/employees';
import {
  getAllTimes,
  getTime,
  registerTime,
  updateTime,
} from './controllers/timeline';

export default (app: Express) => {
  app.post('/api/login', login);

  app.get('/api/employees/archived', authMiddleware, getArchivedEmployees);
  app.get('/api/employees/:id', authMiddleware, getEmployee);
  app.put('/api/employees/:id', authMiddleware, updateEmployee);
  app.delete('/api/employees/:id', authMiddleware, deleteEmployee);
  app.get('/api/employees', authMiddleware, getAllEmployees);
  app.post('/api/employees', authMiddleware, addEmployee);

  app.post('/api/times/register', registerTime);

  app.get('/api/employees/:employeeId/times/:id', authMiddleware, getTime);
  app.put('/api/employees/:employeeId/times/:id', authMiddleware, updateEmployee);
  app.get('/api/employees/:employeeId/times', authMiddleware, getAllTimes);
}
