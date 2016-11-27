import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {Http, HttpModule} from "@angular/http";

import {TaskListComponent} from "./task-list/task-list.component";
import {TaskDetailComponent} from "../app/task-list/task-detail.component";
import {TaskAddComponent} from "./task-list/task-add.component";
import {TaskTableComponent} from "./task-list/task-table.component";

import {routing} from "./app.routing";
import {TaskFilterPipe} from "./task-list/task-filter.pipe";
import {TaskListService} from "../app/task-list/task.service";

@NgModule({
    declarations: [
        AppComponent,
        TaskListComponent,
        TaskTableComponent,
        TaskDetailComponent,
        TaskAddComponent,
        TaskFilterPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        routing

    ],
    providers: [
        TaskListService,

    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}