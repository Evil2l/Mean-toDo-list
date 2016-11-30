import { Component, Input } from '@angular/core';
import {NgForm} from "@angular/forms";

import {TaskListService} from "../../task.service";
import {Task} from "../models/task.model";

@Component({

    selector: 'task-add',
    templateUrl: './task-add.component.html',
    styles: [`.ng-invalid.ng-touched{border-color: red}`]
})
export class TaskAddComponent{

    // grab tasks from upper component
    @Input() tasks: Task[];

    // In constructor we define our services
    constructor(private taskListService: TaskListService) { }


    // On form submit we send data to create Task
    onSubmit(form: NgForm){
            const task = new Task(form.value.title, form.value.description, form.value.deadline, false, (this.tasks.length? this.tasks.length : 0).toString(), []);
            this.taskListService.addTask(task)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
            form.resetForm();
        }


}
