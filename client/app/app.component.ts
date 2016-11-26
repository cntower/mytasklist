import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentification.service';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls['app.component.css']

})
export class AppComponent {
  constructor(private auth:AuthenticationService){

    }
 }