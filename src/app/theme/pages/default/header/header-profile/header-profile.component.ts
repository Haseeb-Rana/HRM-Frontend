import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../../../helpers';
//import { ApiService } from "../../../_services/api.service";
import { ApiService } from "../../../../../_services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "../../../../../_services/employee.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./header-profile.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderProfileComponent implements OnInit {
    public employees: any;
    modaal:any;
    public currentUser: any;
    public form: FormGroup;
    public editForm: FormGroup;
    constructor(private _apiService: ApiService,private fb: FormBuilder, private _employeeService: EmployeeService,
        private _router: Router) {
        this.data();

    }
    ngOnInit() {
        this.form = this.fb.group ( {
            first_name: [null , Validators.compose ( [ Validators.required ] )],
            last_name: [null , Validators.compose ( [ Validators.required ] )],
            gender: [null , Validators.compose ( [ Validators.required ] )],
            email: [null , Validators.compose ( [ Validators.required ] )],
            password: [null , Validators.compose ( [ Validators.required ] )],
            salary: [null , Validators.compose ( [ Validators.required ] )],
            designation: [null , Validators.compose ( [ Validators.required ] )],
            department: [null , Validators.compose ( [ Validators.required ] )]
            
        });
        
        
        this.data();
        

    }

    data(){
        this.currentUser = this._apiService.getCurrentUser();
    }

    onSave(event){
        this.form = this.fb.group ( {
            first_name: [Validators.compose ( [ Validators.required ] )],
            last_name: [Validators.compose ( [ Validators.required ] )],
            gender: [Validators.compose ( [ Validators.required ] )]
            
        });

        let employee = {
            first_name: this.form.value.first_name,
            //last_name: this.form.value.last_name,
            //gender: this.form.value.gender,
            //email: this.form.value.email,
            //password: this.form.value.password,
            //department: this.form.value.department,
            //designation: this.form.value.designation
        };

        console.log(employee);

        this._employeeService.update(employee).subscribe(result =>{
            let response = result.json();
            if(response.success){
                // alert('Successfully Updated.')
                // this.notify.successNotify(response.message);
                // this.modaal.close();
                // this.form.reset();
                
            }
            else if(!response.success) {
                for(let i=0;i<response.errors.length;i++){
                    
                }
            }
        }, err => {
            err = err.json();
            
        });
        
    }

}