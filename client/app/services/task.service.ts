import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './../services/authentification.service';

@Injectable()
export class TaskService {
    constructor(private http: Http ,private authenticationService: AuthenticationService) {
        //console.log('Task Service Initialized...');
    }

    getTask() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append( 'Authorization', this.authenticationService.token );
        return this.http.get('/api/tasks', { headers: headers })
            .map(res => res.json());
    }

    addTask(newTask) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append( 'Authorization', this.authenticationService.token );
        return this.http.post('/api/task', JSON.stringify(newTask), { headers: headers })
            .map(res => res.json())
    }

    deleteTask(id) {
        var headers = new Headers();
        headers.append( 'Authorization', this.authenticationService.token );
        return this.http.delete('/api/task/' + id)
            .map(res => res.json());
    }

    updateStatus(task) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append( 'Authorization', this.authenticationService.token );
        return this.http.put('/api/task/'+task._id, JSON.stringify(task), { headers: headers })
            .map(res => res.json())
    }

}