import { Injectable }     from '@angular/core';
import { ApiService } from "./api.service";

@Injectable()
export class DepartmentService {
    constructor(private http: ApiService) {
    }
    
    list(){
        return this.http.get('/departments');
    }

    create(department){
        return this.http.post('/departments', department);
    }

    update(department, id){
        return this.http.put('/departments/' + id, department);
    }

    destroy(id){
        return this.http.destroy('/departments/' + id);
    }
}