import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from '../../services/authentification.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }
 
    ngOnInit() {
        // set register data in model
        this.model.email = this.authenticationService.currentUserEmail;
        this.model.password = this.authenticationService.currentUserPassword;
        this.authenticationService.currentUserEmail = '';
        this.authenticationService.currentUserPassword = '';
        //reset login status
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}