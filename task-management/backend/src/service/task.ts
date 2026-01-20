import { prisma } from '@src/lib/prisma';
import { TASK_MANAGEMENT } from '@src/generated/prisma/client';

class TaskService {
  createTask = async (task: TASK_MANAGEMENT) => {
    return await prisma.tASK_MANAGEMENT.create({
      data: task,
    });
  };

  getTasks = async () => {
    return await prisma.tASK_MANAGEMENT.findMany();
  };
}

const taskService = new TaskService();

export { taskService };
