import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './components/tasks/tasks.component'

import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentification.service';
import { TaskService } from './services/task.service';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { HomeComponent } from './components/home/home.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        TasksComponent,
        HomeComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        TaskService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }