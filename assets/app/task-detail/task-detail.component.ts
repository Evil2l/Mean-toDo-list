import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../task-list/models/comment.model";
import {TaskListService} from "../task.service";
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
    id: string = this.route.snapshot.params['id'];
    paramsSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private taskListService: TaskListService
    ) {
        taskListService.getTasks()
            .subscribe(
                (tasks: Task[]) => {
                    for(let task of tasks){
                        if(task.id === this.id){
                            console.log(task);
                            this.task = task;
                            return task;
                        }

                    }
                }
            );
    }

    ngOnInit() {
        // this.comments = this.taskListService.getComments();
        this.taskListService.getComments()
            .subscribe(
                (comments: Comment[]) => {
                    this.comments = comments;
                }
            );

        this.paramsSubscription = this.route.params.subscribe( params =>{


            this.task = this.taskListService.getTask(params['id']);

        })
    }

    onSubmit(form: NgForm){
        console.log(form);
        const comment = new Comment(form.value.author, form.value.text, new Date(), this.id );
        console.log(comment);
        // this.task.comments.push(comment);
        this.taskListService.addComment(comment)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        form.resetForm();
        // here ned to get tasks[id].comments and add there
        // form.value.author, form.value.text, new Date()

    }

    ngOnDestroy(){
        this.paramsSubscription.unsubscribe();
    }
}