export class Comment{
    constructor(
        public author: string,
        public text: string,
        public date: any,
        public taskId?: string
    ){}

}