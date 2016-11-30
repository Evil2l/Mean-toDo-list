import { Component, OnInit, EventEmitter } from '@angular/core';
import {TaskListService} from "../../task.service";
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
    changed = new EventEmitter();


    constructor(
        private taskListService: TaskListService,
        private router: Router

    ) { }

    ngOnInit() {

        this.taskListService.getTasks()
            .subscribe(
                (tasks: Task[]) => {
                    var changeTasks = [];
                    for(let task of tasks){
                        if(task.isDone){
                            changeTasks.push(task);
                        }
                    }
                    for(let task of tasks){
                        if(!task.isDone){
                            changeTasks.push(task);
                        }
                    }


                    this.tasks = changeTasks;
                }
            );
    }

    onCheck(task: Task){
        let renewTask = task;
        renewTask.isDone = !renewTask.isDone;
        console.log(renewTask);
        return this.taskListService.changeTask(renewTask)
            .subscribe( result => console.log(result));

    }

    finished(e, t){
        if(e.checked){
            let parent = t.parentNode;
            parent.insertBefore(t, parent.firstChild);

        }

    }

    markTask(check: any){
        if(check.checked){
            return this.checkedColor;
        }
    }

    removeTask(task: any){
        return this.taskListService.deleteTask(task)
            .subscribe( result => console.log(result));
    }

    onSelect(task: Task) {
        this.router.navigate(['/tasks', task.id]);
    }

}