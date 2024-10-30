import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.interface';

@Injectable()
export class TasksService {
    
    private tasks: Task[] =[]
    private taskIdCounter = 1

    create(task: Task, userId: number): Task {
        const newTask : Task = {
            ...task, 
            id: this.taskIdCounter++,
            userId: userId
        }
        this.tasks.push(newTask)
        return newTask
    }

    findAll(userId: number): Task[] {
        return this.tasks.filter(task => task.userId === userId)
    }

    findOne(id: number, userId: number): Task {
        const task = this.tasks.find(t => t.id === id && t.userId === userId)
        if(!task) {
            throw new NotFoundException('Tarea no encontrada')
        }
        return task
    }

    update(id: number, task: Task, userId: number): Task {
        const existingTask = this.findOne(id, userId)
        const updateTask = {...existingTask, ...task}
        this.tasks = this.tasks.map(t => (t.id === id ? updateTask: t))
        return updateTask
    }

    remove(id: number, userId: number): void {
        const task = this.findOne(id, userId)
        this.tasks = this.tasks.filter(t => t.id !== task.id)
    }
}
