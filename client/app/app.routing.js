"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./components/login/login.component');
var register_component_1 = require('./components/register/register.component');
var home_component_1 = require('./components/home/home.component');
var auth_guard_1 = require('./guards/auth.guard');
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map