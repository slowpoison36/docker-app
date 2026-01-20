import { Router } from 'express';
import { taskService } from '../service/task';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.json({ tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving tasks', error: error?.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating task', error: error?.message });
  }
});

export { router as taskController };
