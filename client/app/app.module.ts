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

import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdInputModule } from '@angular2-material/input';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        MdCardModule,
        MdButtonModule,
        MdIconModule,
        MdCheckboxModule,
        MdGridListModule,
        MdInputModule
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
        TaskService,
        MdIconRegistry
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }