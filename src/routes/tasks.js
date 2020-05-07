import { Router } from 'express';
import { createTask, getTasks, getTaskById, getTasksByProject, deleteTask, updateTask } from './../controllers/Task.controller';

const router = Router();

router.post('/', createTask);

router.get('/', getTasks);
router.get('/:taskId', getTaskById);
router.get('/project/:projectId', getTasksByProject);

router.delete('/:taskId', deleteTask);
router.put('/:taskId', updateTask);

export default router;
