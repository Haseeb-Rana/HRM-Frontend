import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
import { ApiService } from '../../_services/api.service'

import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _auth: AuthenticationService, private apiService: ApiService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if(this.apiService.getAuthToken())
            return true;
        else
            return false;
        // return this.apiService._get('\me').map((response: Response) => {
        //         let data = response.json();
        //         if (data && data.success) {
        //             // logged in so return true
        //             return true;
        //         }
        //         this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         return false;
        //     },
        //     error => {
        //         this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         return false;
        //     });
    }
}