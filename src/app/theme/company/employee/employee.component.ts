import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Helpers } from '../../../helpers';
import { EmployeeService } from "../../../_services/employee.service";
import { DesignationService } from "../../../_services/designation.service";
import { DepartmentService } from "../../../_services/department.service";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./employee.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent implements OnInit {

    public employees: any;
    modaal:any;
    public noVal = null;
    public designations: any;
    public departments: any = [];
    public form: FormGroup;
    public editForm: FormGroup;
    constructor(
        private _employeeService: EmployeeService, private _departmentService: DepartmentService, private _designationService: DesignationService,
        // private _apiService: ApiService,
        private fb: FormBuilder,
        private modalService: NgbModal
    ) {
        // this._apiService.isAdmin();
        this.loadAllDepartments();
        this.loadAllDesignations();
    }
    loadAllDepartments(){
        this._departmentService.list().subscribe(departments => {
            if(departments.success)
                this.departments = departments.data;
        });
    }

    loadAllDesignations(){
        this._designationService.list().subscribe(designations => {
            if(designations.success)
                this.designations = designations.data;
        });
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
        this.editForm = this.fb.group ( {
            first_name: [''],
            last_name: [''],
            gender: [''],
            email: [''],
            password:[''],
            salary: ['']
        });
        this.loadAllEmployees();
    }

    loadAllEmployees(){
        this._employeeService.list().subscribe(employees => {
            if(employees.success)
                this.employees = employees.data;
        });
    }

    open(content) {
        this.modaal = this.modalService.open(content);
    }


    closeX(str){
        this.modaal.close();
        this.form.reset();
    }
    closeButton(str){
        this.modaal.close();
        this.form.reset();
    }

    destroy(id){
        console.log(id);
        this._employeeService.destroy(id).subscribe( result => {
            this.loadAllEmployees();
        }, err => {
            err = err.json();
        });
    }

    onSubmit(event){

        let employee = {
            first_name: this.form.value.first_name,
            last_name: this.form.value.last_name,
            gender: this.form.value.gender,
            email: this.form.value.email,
            password: this.form.value.password,
            department: this.form.value.department,
            designation: this.form.value.designation
        };

        this._employeeService.create(employee).subscribe( result => {
            let response =  result.json();
            if(response.success){
                // this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.loadAllEmployees();
            }
            else if(!response.success) {
                for(let i=0;i<response.errors.length;i++){
                    // this.notify.errorNotify(response.errors[i].message);
                }
            }
        }, err => {
            err = err.json();
            // if(err.errors) {
            //     for(let i=0;i<err.errors.length;i++){
            //         this.notify.errorNotify(err.errors[i].message);
            //     }
            // }
            // else{
            //     this.notify.errorNotify("Connectivity issue!");
            // }
        });
    }

    openEditModal(content,id){
        this.editForm.reset();
        // for(let i=0;i<this.users.length;i++){
        //     if(this.users[i].id == id){
        //         this.userToEdit = this.users[i];
        //     }
        // }
        this.modaal = this.modalService.open(content);
    }

    onSaveChanges(userID){
        // let user = {
        //     first_name: this.editForm.value.fname || this.userToEdit['first_name'],
        //     last_name: this.editForm.value.lname || this.userToEdit['last_name'],
        //     role: this.editForm.value.role || this.userToEdit['role'],
        // };

        // this.adminsService.update(userID, user).subscribe(res => {
        //     let response = res.json();
        //     if (response.success) {
        //         this.notify.successNotify(response.message);
        //         this.getUsers(1);
        //         this.modaal.close();
        //         this.form.reset();
        //     }
        //     else if(!response.success) {
        //         for(let i=0;i<response.errors.length;i++){
        //             this.notify.errorNotify(response.errors[i].message);
        //         }
        //     }
        // }, err => {
        //     err = err.json();
        //     if(err.errors) {
        //         for(let i=0;i<err.errors.length;i++){
        //             this.notify.errorNotify(err.errors[i].message);
        //         }
        //     }
        //     else{
        //         this.notify.errorNotify("Connectivity issue!");
        //     }
        // })
    }

}