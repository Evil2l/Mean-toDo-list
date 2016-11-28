import { Component, OnInit, Input } from '@angular/core';
import {Task} from "../models/task.model";
import {NgForm} from "@angular/forms";
import {TaskListService} from "../task.service";

@Component({

    selector: 'task-add',
    templateUrl: './task-add.component.html',
    styles: [`.ng-invalid.ng-touched{border-color: red}`]
})
export class TaskAddComponent implements OnInit {

    @Input() tasks: Task[];
    constructor(private taskListService: TaskListService) { }

    ngOnInit() { }

    onSubmit(form: NgForm){
        console.log(form);

        this.taskListService.addTask(
            new Task(form.value.title, form.value.description, form.value.deadline, (this.tasks.length? this.tasks.length : 0).toString(), [])
        );
        form.resetForm();
    }

}
