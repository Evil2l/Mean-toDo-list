import {  PipeTransform, Pipe } from '@angular/core';
import { Task } from './models/task.model';

@Pipe({
    name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

    transform(value: Task[], filterBy: string): Task[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((taskname: Task) =>
        taskname.title.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
