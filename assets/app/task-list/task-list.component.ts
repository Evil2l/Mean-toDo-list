import { Component, OnInit } from '@angular/core';
import {TaskListService} from "../task.service";
import {Task} from "./models/task.model";
import {Comment} from "./models/comment.model";

@Component({
    selector: 'task-list',
    templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

    // define our variables
    private pageTitle: string = "Task App";
    tasks: Task[] = [];
    comments: Comment[];
    isHidden = true;

    // In constructor we define our services to use
    constructor(private taskListService: TaskListService) { }

    // On creating component we use services to get data
    ngOnInit() {
        // this.tasks = this.taskListService.getTasks();
        this.taskListService.getTasks()
            .subscribe(
                (tasks: Task[]) => {
                    this.tasks = tasks;
                }
            );
        // this.comments = this.taskListService.getComments();
    }

    // changer to show form or not
    showForm(){
        this.isHidden = !this.isHidden;
    }

}