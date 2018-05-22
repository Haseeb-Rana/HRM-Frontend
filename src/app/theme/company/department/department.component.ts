import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Helpers } from '../../../helpers';
import { DepartmentService } from "../../../_services/department.service";
// import { ApiService } from "../../../_services/api.service";

// import { Department } from "../../../_models/index";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./department.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DepartmentComponent implements OnInit {

    public departments: any;
    modaal:any;

    public form: FormGroup;
    public editForm: FormGroup;
    
    constructor(
        private _departmentService: DepartmentService, 
        // private _apiService: ApiService,
        private fb: FormBuilder,
        private modalService: NgbModal
    ) {
        // this._apiService.isAdmin();
    }
    ngOnInit() {
        this.form = this.fb.group ( {
            name: [null , Validators.compose ( [ Validators.required ] )]
        });
        this.editForm = this.fb.group ( {
            name: ['']
        });
        this.loadAllDepartments();
    }

    loadAllDepartments(){
        this._departmentService.list().subscribe(departments => {
            if(departments.success)
                this.departments = departments.data;
        });
    }

    open(content) {
        this.form.value.name = "Faizan"
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
        this._departmentService.destroy(id).subscribe( result => {
            this.loadAllDepartments();
        }, err => {
            err = err.json();
        });
    }

    onSubmit(event){

        let department = {
            name: this.form.value.name
        };

        this._departmentService.create(department).subscribe( result => {
            let response =  result.json();
            if(response.success){
                // this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.loadAllDepartments();
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