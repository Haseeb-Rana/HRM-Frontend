import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable()
export class DesignationService {

  constructor(private http: ApiService) { }

  list(){
     
    return this.http.get('/departments/designations/');
}

create(designation){
    return this.http.post('/departments/designations', designation);
}

update(designation, id){
    return this.http.put('/departments/designations/' + id, designation);
}

destroy(id){
    return this.http.destroy('/departments/designations/' + id);
}
}