import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Helpers } from '../../../helpers';
import { JobService } from "../../../_services/job.service";
// import { ApiService } from "../../../_services/api.service";

// import { Department } from "../../../_models/index";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./job.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class JobComponent implements OnInit {

    public jobs: any;
    modaal:any;

    public form: FormGroup;
    public editForm: FormGroup;
    
    constructor(
        private _jobService: JobService, 
        // private _apiService: ApiService,
        private fb: FormBuilder,
        private modalService: NgbModal
    ) {
        // this._apiService.isAdmin();
    }
    ngOnInit() {
        this.form = this.fb.group ( {
            //name:               [null , Validators.compose ( [ Validators.required ] )],
            title:              [null , Validators.compose ( [ Validators.required ] )],
            short_description:  [null , Validators.compose ( [ Validators.required ] )],
            long_description:   [null , Validators.compose ( [ Validators.required ] )],
            number_of_position: [null , Validators.compose ( [ Validators.required ] )],
            gender:             [null , Validators.compose ( [ Validators.required ] )],
            closing_date:       [null , Validators.compose ( [ Validators.required ] )],
            is_publish:         [null , Validators.compose ( [ Validators.required ] )],
            max_experience:     [null , Validators.compose ( [ Validators.required ] )],
            department:         [null , Validators.compose ( [ Validators.required ] )],
            designation:        [null , Validators.compose ( [ Validators.required ] )],
            job_type_id :       [null , Validators.compose ( [ Validators.required ] )],
            gender_preferences:  [null , Validators.compose ( [ Validators.required ] )],
        });
        this.editForm = this.fb.group ( {
            title: [''],
            gender_preferences: ['']
        });
        this.loadAllJobs();
    }

    loadAllJobs(){
        this._jobService.list().subscribe(jobs => {
            if(jobs.success)
                this.jobs = jobs.data;
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
        this._jobService.destroy(id).subscribe( result => {
            this.loadAllJobs();
        }, err => {
            err = err.json();
        });
    }

    onSubmit(event){

        let job = {
            title:                  this.form.value.title,
            short_description:      this.form.value.short_description,
            long_description:       this.form.value.long_description,
            number_of_position:     this.form.value.number_of_position,
            gender:                 this.form.value.gender,
            closing_date:           this.form.value.closing_date,
            //is_publish:             this.form.value.is_publish,
            max_experience:         this.form.value.max_experience,
            department:             this.form.value.department,
            designation:            this.form.value.designation,
            job_type_id :           this.form.value.job_type_id,
            gender_preferences:     this.form.value.gender_preferences

        };
        console.log(job);

        this._jobService.create(job).subscribe( result => {
            let response =  result.json();
            if(response.success){
                // this.notify.successNotify(response.message);
                this.modaal.close();
                this.form.reset();
                this.loadAllJobs();
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