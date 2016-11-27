import { Routes, RouterModule } from "@angular/router";
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskDetailComponent} from "./task-list/task-detail.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TaskListComponent },
    { path: 'tasks/:id', component: TaskDetailComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);