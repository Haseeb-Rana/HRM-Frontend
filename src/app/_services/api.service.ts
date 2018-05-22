import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

    constructor(private http: Http) { }

   
    get(url) {
        return this.http.get(this.getUrl(url), this.setHeaders()).map((response: Response) => {
            let result = response.json();
            console.log("Get Result is: " + JSON.stringify(result, null, 2));
            return result;
        });
    }
    post(url, data = {}) {
        return this.http.post(this.getUrl(url), data, this.setHeaders());
    }

    put(url, data) {
        return this.http.put(this.getUrl(url), data, this.setHeaders());
    }

    destroy(url) {
        return this.http.delete(this.getUrl(url), this.setHeaders());
    }

    private setHeaders(): RequestOptions {
        let currentUser = this.getCurrentUser();
        // let token = this.getAuthToken();
        let token = this.getAuthToken();
        // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTI2ODIwOTg5LCJleHAiOjE1Mzk3ODA5ODl9.MkY-qKwTygUfkjy5loPljQ8rmTi4Z-65dORamwxMqxc";

        let headers = new Headers({ 'Accept': 'application/json' });
        if (currentUser && token) {
            console.log("Headers Token is : " + token);
            headers.append('authorization', token);
        }
        return new RequestOptions({ headers: headers });
    }

    getUrl(url) {
        return environment.apiUrl + url;
    }

    setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    removeCurrentUser() {
        localStorage.removeItem('currentUser');
    }

    setAuthToken(token) {
        localStorage.setItem('currentUserToken', JSON.stringify(token));
    }

    getAuthToken() {
        return JSON.parse(localStorage.getItem('currentUserToken')) || null;
    }

    removeAuthToken() {
        localStorage.removeItem('currentUserToken');
    }
    
    isAdmin(){
        let user = this.getCurrentUser();
        // if(user && user.owner !== "")
        //     return true;
        // return false;
    }
}