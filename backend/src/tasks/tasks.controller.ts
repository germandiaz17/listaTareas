import { Controller, Post, Get, Delete, Param, Body, UseGuards, Request, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.interface";
import { AuthGuard } from "@nestjs/passport";

@Controller('tasks')
export class TasksController {
    
    constructor(private readonly taskservice: TasksService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() task: Task, @Request() req) {
        return this.taskservice.create(task, req.user.userId)
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll(@Request() req) {
        return this.taskservice.findAll(req.user.userId)
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findOne(@Param('id') id: string, @Request() req) {
        const taskId = parseInt(id);
        return this.taskservice.findOne(taskId, req.user.userId)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id') id: string, @Body() task: Task, @Request() req) {
        const taskId = parseInt(id);
        return this.taskservice.update(taskId, task, req.user.userId)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    remove(@Param('id') id: string, @Request() req){
        const taskId = parseInt(id);
        return this.taskservice.remove(taskId, req.user.userId)
    }
}
