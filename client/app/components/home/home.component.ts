import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentification.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'home.component.html',
  providers: [TaskService]

})
 
export class HomeComponent implements OnInit {
 
    constructor(private authenticationService: AuthenticationService) { }
 
    ngOnInit() {
        //console.log('ngOnInit', this.authenticationService.username);
    }
}
