import { Injectable } from '@angular/core';
import {Task} from "./task";
import {Comment} from "./comment";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class TaskListService {
    private commentsDummy: Comment[] = [
        new Comment(
            "Rick",
            "Hello there",
            new Date()
        ),
        new Comment(
            "Morty",
            "Hello Rick",
            new Date()
        )
    ];
    private tasksDummy: Task[] = [
        new Task("0","Do it Rick","Blah-blah-blah",'2001-11-16T00:00:00',
            [
                new Comment(
                    "Rick",
                    "Hello there",
                    new Date()
                ),
                new Comment(
                    "Morty",
                    "Hello Rick",
                    new Date()
                )
            ]
        ),
        new Task("1","Know what","never say never Morty",'2001-11-16T00:00:00',
            [
                new Comment(
                    "Summer",
                    "Anyone here",
                    new Date()
                )
            ]
        )
    ];

    tasks: Task[];

    constructor(private http: Http) { }

    getTask(id: any): Task{
        return this.tasksDummy[id]
    }

    getTasks(): Task[]{
        return this.tasksDummy;
    }

    //--- HTTP
    // getTasks(){
    //     return this.http.get('http://localhost:3000/task' )
    //         .map( (response: Response) =>{
    //             const tasks = response.json().obj;
    //             let transformedTasks: Task[] = [];
    //             for(let task of tasks){
    //                 console.log(task, "-----------");
    //                 transformedTasks.push(new Task(task.id, task.title, task.description, task.deadline, []
    //                 ))
    //             }
    //             this.tasks = transformedTasks;
    //             return transformedTasks;
    //         })
    //         .catch((error: Response) => Observable.throw(error.json()));
    //
    // }

    addTask(task: Task){
        this.tasksDummy.push(task);
        const body = JSON.stringify(task);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.post('http://localhost:3000/task', body, {headers: headers})
             .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    deleteTask(task: Task){
        this.tasksDummy.splice(this.tasksDummy.indexOf(task), 1);
    }

    getComments(): Comment[]{
        return this.commentsDummy;
    }

    addComment(comment: Comment){
        this.commentsDummy.push(comment);
    }

    deleteCommentk(comment: Comment){
        this.commentsDummy.splice(this.commentsDummy.indexOf(comment), 1)
    }

}