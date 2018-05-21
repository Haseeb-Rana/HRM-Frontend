import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable()
export class UserService {
    constructor(private http: ApiService) {
    }

    currentUser(){
      return JSON.parse(localStorage.getItem('currentUser'));

    }
}