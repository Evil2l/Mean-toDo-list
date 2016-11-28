import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../task-list/models/comment.model";
import {TaskListService} from "../task-list/task.service";
import {NgForm} from "@angular/forms";
import {Task} from "../task-list/models/task.model";
import {Subscription} from "rxjs";

@Component({

    templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit, OnDestroy {

    comments: Comment[];
    pageTitle: string = "Task Detail";
    task: Task;
    paramsSubscription: Subscription;
    productID: any;

    constructor(
        private route: ActivatedRoute,
        private taskListService: TaskListService
    ) { }

    ngOnInit() {
        this.comments = this.taskListService.getComments();

        this.productID = this.route.snapshot.params['id'];



        this.paramsSubscription = this.route.params.subscribe( params =>{

            this.task = this.taskListService.getTask(params['id']);

        })
    }

    onSubmit(form: NgForm){
        // here ned to get tasks[id].comments and add there
        // form.value.author, form.value.text, new Date()

    }

    ngOnDestroy(){
        this.paramsSubscription.unsubscribe();
    }
}