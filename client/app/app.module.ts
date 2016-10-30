import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component'

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, TasksComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
