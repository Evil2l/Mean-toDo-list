import { Component, OnInit, Input } from '@angular/core';
import {Task} from "./task";
import {NgForm} from "@angular/forms";
import {TaskListService} from "./task.service";

@Component({

    selector: 'task-add',
    templateUrl: './task-add.component.html',
    styles: [`.ng-invalid.ng-touched{border-color: red}`]
})
export class TaskAddComponent implements OnInit {

    @Input() tasks: Task[];
    @Input() newTask: boolean;
    constructor(private taskListService: TaskListService) { }

    ngOnInit() { }

    onSubmit(form: NgForm){
        console.log(form);

        this.taskListService.addTask(
            new Task("186", form.value.title, form.value.description, form.value.deadline)
        ).subscribe(
            data => console.log(data),
            error => console.log(error)
        );
        form.resetForm();
    }

}
