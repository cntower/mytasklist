"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var tasks_component_1 = require('./components/tasks/tasks.component');
var auth_guard_1 = require('./guards/auth.guard');
var authentification_service_1 = require('./services/authentification.service');
var task_service_1 = require('./services/task.service');
var login_component_1 = require('./components/login/login.component');
var register_component_1 = require('./components/register/register.component');
var home_component_1 = require('./components/home/home.component');
var card_1 = require('@angular2-material/card');
var button_1 = require('@angular2-material/button');
var checkbox_1 = require('@angular2-material/checkbox');
var grid_list_1 = require('@angular2-material/grid-list');
var input_1 = require('@angular2-material/input');
var icon_1 = require('@angular2-material/icon');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing,
                card_1.MdCardModule,
                button_1.MdButtonModule,
                icon_1.MdIconModule,
                checkbox_1.MdCheckboxModule,
                grid_list_1.MdGridListModule,
                input_1.MdInputModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                tasks_component_1.TasksComponent,
                home_component_1.HomeComponent
            ],
            providers: [
                auth_guard_1.AuthGuard,
                authentification_service_1.AuthenticationService,
                task_service_1.TaskService,
                icon_1.MdIconRegistry
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map