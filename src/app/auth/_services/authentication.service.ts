import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Router } from '@angular/router';
import "rxjs/add/operator/map";
import { environment } from '../../../environments/environment';
import { ApiService } from '../../_services/api.service'


@Injectable()
export class AuthenticationService {

    constructor(private router: Router , private http: Http, private apiService: ApiService) {
        this.currentUser = this.apiService.getCurrentUser();
        this.token = this.apiService.getAuthToken();
    }

    login(email: string, password: string) {
        return this.http.post(this.apiService.getUrl('/login'), { email: email, password: password })
            .map((response: Response) => {
                let user = response.json();
                this.isLoggedIn = true;
                // console.log("Current User is: " + JSON.stringify(user, null, 2));
                if (user && user.success && user.data && user.data.auth_token) {
                    this.setCredentials(user.data.auth_token, user.data);
                }
                return user;
            });
    }


    public token: string;
    public isLoggedIn: boolean;
    public currentUser: any;

    setCredentials(token, user){
        this.token = token;
        this.apiService.setCurrentUser(user);
        this.apiService.setAuthToken(token);
    }

    logout(): void {
        this.token = null;
        this.apiService.removeAuthToken();
        this.apiService.removeCurrentUser();
        location.reload();
        this.router.navigate(['login']);
    }

    verify(){
       return this.apiService.get('/me');
    }
    isAuthenticated(){
        // if(this.apiService.getAuthToken())
        //     return true;
        // else
        //     return false;
        if(this.apiService.getCurrentUser() && this.apiService.getAuthToken()){
            this.apiService.get('/me').subscribe(user => {
                    console.log("Verify me reponse is: " + JSON.stringify(user, null, 2))
                    if (user) {
                        this.apiService.setCurrentUser(user.data);
                    }
                    return true;
                }, 
                error => {
                    // this.router.navigate(['login']);
                    return false;
                });
                // return true;
        }
        else{
            // this.router.navigate(['login']);
            return false;
        }
    }
}