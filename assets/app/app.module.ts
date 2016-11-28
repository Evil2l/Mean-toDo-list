import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from "./app.component";

import {TaskListComponent} from "./task-list/task-list.component";
import {TaskDetailComponent} from "./task-detail/task-detail.component";
import {TaskAddComponent} from "./task-list/task-new/task-add.component";
import {TaskTableComponent} from "./task-list/task-table/task-table.component";

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