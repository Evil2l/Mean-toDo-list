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


    // Component title
    pageTitle: string = "Task Detail";

    // Used variables
    comments: Comment[] = [];
    task: Task;
    id: string = this.route.snapshot.params['id'];
    paramsSubscription: Subscription;

    // In constructor we define our services
    constructor(
        private route: ActivatedRoute,
        private taskListService: TaskListService
    ) {

    }

    // On creating component we use services to get data
    ngOnInit() {

        // Here we get Comments
        this.taskListService.getComments(this.id)
            .subscribe(
                (comments: Comment[]) => {
                    this.comments = comments;
                }
            );
        // Here we get Tasks
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
    // On form submit we send data to create Task
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

    //On change value of checkbox we use service method to patch data
    onCheck(task: Task){
        let renewTask = task;
        renewTask.isDone = !renewTask.isDone;
        console.log(renewTask);
        return this.taskListService.changeTask(renewTask)
            .subscribe( result => console.log(result));

    }

    // on destroy component we stop listen the params subsccription
    ngOnDestroy(){
        this.paramsSubscription.unsubscribe();
    }
}