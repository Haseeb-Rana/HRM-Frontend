import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
@Injectable()
export class EmployeeService {

  constructor(private http: ApiService) { }

  list(){
    return this.http.get('/employees');
}

create(department){
    return this.http.post('/employees', department);
}

update(department, id){
    return this.http.put('/employees/' + id, department);
}

destroy(id){
    return this.http.destroy('/employees/' + id);
}

}