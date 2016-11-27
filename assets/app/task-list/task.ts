import {Comment} from "./comment";

export class Task{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public deadline: string,
        public comments?: Comment[]
    ){}
}