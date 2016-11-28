import { Http, Response, Headers } from "@angular/http";
import { Injectable} from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import {Task} from "./models/task.model";
import {Comment} from "./models/comment.model";

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
        new Task("Do it Rick","Blah-blah-blah","2001-11-16T00:00:00", '0',
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
        new Task("Know what","never say never Morty",'2001-11-16T00:00:00', '1',
            [
                new Comment(
                    "Summer",
                    "Anyone here",
                    new Date()
                )
            ]
        )
    ];

    tasks: Task[] = [];

    constructor(private http: Http) { }

    addTask(task: Task){
        const body = JSON.stringify(task);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(
            'http://localhost:3000/task',
            body,
            {headers: headers})
            .map((response: Response) =>{
                const result = response.json();
                const task = new Task(result.obj.title, result.obj.description,result.obj.deadline, result.obj._id, []);
                this.tasks.push(task);
                return task;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    getTask(id: any): Task{
        return this.tasksDummy[id]
    }

    getTasks(): Task[]{
        return this.tasksDummy;
    }

    deleteTask(task: Task){
        this.tasksDummy.splice(this.tasksDummy.indexOf(task), 1);
    }

    getComments(): Comment[]{
        return this.commentsDummy;
    }

//OLD ADD TASK
    // addTask(task: Task){
    //     this.tasksDummy.push(task);
    // }


}