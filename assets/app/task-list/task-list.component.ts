import { Component, OnInit } from '@angular/core';
import {TaskListService} from "./task.service";
import {Task} from "./task";
import {Comment} from "./comment";

@Component({
    selector: 'task-list',
    templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

    private pageTitle: string = "Task App";
    tasks: Task[];
    comments: Comment[];

    isHidden = true;

    constructor(private taskListService: TaskListService) { }


    ngOnInit() {
        this.tasks = this.taskListService.getTasks();
        // this.taskListService.getTasks()
        //     .subscribe(
        //         (tasks: Task[]) => {
        //             this.tasks = tasks;
        //         }
        //     );
        this.comments = this.taskListService.getComments();
    }

    showForm(){
        this.isHidden = !this.isHidden;
    }



}