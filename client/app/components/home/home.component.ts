import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'home.component.html',
  providers: [TaskService]

})
 
export class HomeComponent implements OnInit {
 
    //constructor(private userService: UserService) { }
 
    ngOnInit() {
        // get users from secure api end point
        // this.userService.getUsers()
        //     .subscribe(users => {
        //         this.users = users;
        //     });
    }
}
