import { Http, Response, Headers } from "@angular/http";
import { Injectable} from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import {Task} from "./task-list/models/task.model";
import {Comment} from "./task-list/models/comment.model";

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
    comments: Comment[];

    constructor(private http: Http) { }

    addTask(task: Task){
        const body = JSON.stringify(task);
        const headers = new Headers({'Content-Type': 'application/json'});
        //noinspection TypeScriptUnresolvedFunction
        return this.http.post(
            'http://localhost:3000/task',
            body,
            {headers: headers})
            .map((response: Response) =>{
                const result = response.json();
                const task = new Task(result.obj.title, result.obj.description, result.obj.deadline, result.obj._id, []);
                this.tasks.push(task);
                return task;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    getTasks() {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get('http://localhost:3000/task')
            .map((response: Response) => {
                const tasks = response.json().obj;
                let transformedMessages: Task[] = [];
                for (let task of tasks) {
                    transformedMessages.push(new Task(
                        task.title,
                        task.description,
                        task.deadline,
                        task._id,
                        [
                        ]));
                }
                this.tasks = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    getTask(id: any): Task{
        return id;
    }


    deleteTask(task: Task){
        this.tasks.splice(this.tasks.indexOf(task), 1);
        //noinspection TypeScriptUnresolvedFunction
        return this.http.delete('http://localhost:3000/task/' + task.id)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getComments() {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get('http://localhost:3000/comment')
            .map((response: Response) => {
                const comments = response.json().obj;
                let transformedComments: Comment[] = [];
                for (let comment of comments) {
                    transformedComments.push(new Comment(
                        comment.author,
                        comment.text,
                        comment.date,
                        comment.taskId));
                }
                console.log(transformedComments);
                this.comments = transformedComments;
                return transformedComments;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    addComment(comment: Comment){
        const body = JSON.stringify(comment);
        const headers = new Headers({'Content-Type': 'application/json'});
        //noinspection TypeScriptUnresolvedFunction
        return this.http.post(
            'http://localhost:3000/comment',
            body,
            {headers: headers})
            .map((response: Response) =>{
                const result = response.json();
                const comment = new Comment(result.obj.author, result.obj.text, result.obj.date, result.obj.id);
                this.commentsDummy.push(comment);
                return comment;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    // getComments(): Comment[]{
    //     return this.commentsDummy;
    // }

}