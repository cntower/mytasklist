import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentification.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
    }

    register() {
        this.loading = true;
        this.authenticationService.register(this.model.username, this.model.password)
            .subscribe(result => {
                if (result) {
                    if (result.success === true) {
                        // register successful
                        this.authenticationService.username = this.model.username;
                        this.authenticationService.currentUserPassword = this.model.password; 
                        this.router.navigate(['/login']);
                    } else {
                        this.error = result.message;
                        this.loading = false;
                    }
                } else {
                    // register failed
                    this.error = 'Something went wrong. Try again later.';
                    this.loading = false;
                }
            });
    }

}