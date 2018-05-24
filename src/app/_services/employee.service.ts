import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
@Injectable()
export class EmployeeService {

  constructor(private http: ApiService) { }

  list(){
    return this.http.get('/employees');
    }

    create(employee){
        return this.http.post('/employees', employee);
    }

    update(employee){
        return this.http.put('/employees/', employee);
    }

    destroy(id){
        return this.http.destroy('/employees/' + id);
    }

}