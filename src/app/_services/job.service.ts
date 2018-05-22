import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable()
export class JobService {

  constructor(private http: ApiService) { }

  list(){
    return this.http.get('/jobs');
}

create(job){
    return this.http.post('/jobs', job);
}

update(job, id){
    return this.http.put('/jobs/' + id, job);
}

destroy(id){
    return this.http.destroy('/jobs/' + id);
}
}
