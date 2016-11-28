import { Component, OnInit } from '@angular/core';
import {TaskListService} from "../task.service";
import {Task} from "../models/task.model";
import {Comment} from "../models/comment.model";
import {Router} from "@angular/router";

@Component({
    selector: 'task-table',
    templateUrl: './task-table.component.html'
})
export class TaskTableComponent implements OnInit {
    tasks: Task[];
    comments: Comment[];
    listFilter: string;
    checkedColor: string = "rgba(0, 200, 100, 0.3)";


    constructor(
        private taskListService: TaskListService,
        private router: Router

    ) { }

    ngOnInit() {
        this.tasks = this.taskListService.getTasks();

        // this.taskListService.getTasks()
        //     .subscribe(
        //         (tasks: Task[]) => {
        //             this.tasks = tasks;
        //         }
        //     );
        // this.comments = this.taskListService.getComments();
    }

    onCheck(check: any){
        return check.checked;
    }

    markTask(check: any){
        if(check.checked){
            return this.checkedColor;
        }
    }

    removeTask(task: any){
        return this.taskListService.deleteTask(task);
    }

    onSelect(task: Task) {
        this.router.navigate(['/tasks', task.id]);
    }

}