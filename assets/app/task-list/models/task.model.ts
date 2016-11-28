import {Comment} from "./comment.model";

export class Task{
    constructor(
        public title: string,
        public description: string,
        public deadline: string,
        public id?: string,
        public comments?: Comment[]
    ){}
}