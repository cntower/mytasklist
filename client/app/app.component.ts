import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentification.service';
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'

})
export class AppComponent {
  constructor(private auth:AuthenticationService){

    }
 }