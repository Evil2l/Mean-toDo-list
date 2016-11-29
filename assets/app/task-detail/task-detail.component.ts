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

    comments: Comment[] = [];
    pageTitle: string = "Task Detail";
    task: Task;
    id: string = this.route.snapshot.params['id'];
    paramsSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private taskListService: TaskListService
    ) {

    }

    ngOnInit() {
        // this.comments = this.taskListService.getComments();
        this.taskListService.getComments(this.id)
            .subscribe(
                (comments: Comment[]) => {
                    this.comments = comments;
                }
            );

        this.taskListService.getTasks()
            .subscribe(
                (tasks: Task[]) => {
                    for(let task of tasks){
                        if(task.id === this.id){
                            this.task = task;
                            return task;
                        }

                    }
                }
            );

        this.paramsSubscription = this.route.params.subscribe( params =>{



        })
    }

    onSubmit(form: NgForm){
        const comment = new Comment(form.value.author, form.value.text, new Date(), this.id );
        // this.task.comments.push(comment);
        this.taskListService.addComment(comment)
            .subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        form.resetForm();


    }

    ngOnDestroy(){
        this.paramsSubscription.unsubscribe();
    }
}