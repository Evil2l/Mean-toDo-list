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

    // create and describe variables
    tasks: Task[];
    comments: Comment[];
    listFilter: string;

    // In constructor we define our services to use
    constructor(
        private taskListService: TaskListService,
        private router: Router

    ) { }

    // On creating component we use services to get data
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

    // change task to done/undone
    onCheck(task: Task){
        let renewTask = task;
        renewTask.isDone = !renewTask.isDone;
        return this.taskListService.changeTask(renewTask)
            .subscribe( result => console.log(result));

    }

    // to put checked element on top of table
    finished(e, t){
        if(e.checked){
            let parent = t.parentNode;
            parent.insertBefore(t, parent.firstChild);

        }

    }

    // delete task
    removeTask(task: any){
        return this.taskListService.deleteTask(task)
            .subscribe( result => console.log(result));
    }

    // on task select redirect to task description route
    onSelect(task: Task) {
        this.router.navigate(['/tasks', task.id]);
    }

}