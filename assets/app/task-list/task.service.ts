import { Injectable } from '@angular/core';
import {Task} from "./models/task.model";
import {Comment} from "./models/comment.model";
import {Http} from "@angular/http";


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

    tasks: Task[];

    constructor(private http: Http) { }

    getTask(id: any): Task{
        return this.tasksDummy[id]
    }

    getTasks(): Task[]{
        return this.tasksDummy;
    }
    addTask(task: Task){
        this.tasksDummy.push(task);
    }

    deleteTask(task: Task){
        this.tasksDummy.splice(this.tasksDummy.indexOf(task), 1);
    }

    getComments(): Comment[]{
        return this.commentsDummy;
    }



}