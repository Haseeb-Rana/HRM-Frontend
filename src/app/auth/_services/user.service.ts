import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { User } from "../_models/index";
// import { ApiService } from "../../_services/api.service";
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
    constructor(private http: Http) {
    }

    forgotPassword(email: string) {
        return this.http.post('/api/forgot-password', JSON.stringify({ email }), this.jwt()).map((response: Response) => response.json());
    }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({ 'Accept': 'application/json' });
        if (currentUser && currentUser.auth_token) {
            console.log("Me Token is : " + currentUser.auth_token);
            // let headers = new Headers({ 'Authorization': currentUser.auth_token });
            headers.append('authorization', currentUser.auth_token );
        }
        return new RequestOptions({ headers: headers });

    }

    getUrl(url) {
        return environment.apiUrl + url;
    }

}