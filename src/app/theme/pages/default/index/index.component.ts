import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { JobService } from "../../../../_services/job.service";
import { DesignationService } from "../../../../_services/designation.service";
import { DepartmentService } from "../../../../_services/department.service";
import { EmployeeService } from "../../../../_services/employee.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./index.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit, AfterViewInit {

    public jobs: any = [];
    public noVal = null;
    public designations: any = [];
    public departments: any = [];
    public employees: any = [];

    constructor(private _script: ScriptLoaderService,
        private _jobService: JobService,
        private _employeeService: EmployeeService,
        private _departmentService: DepartmentService,
        private _designationService: DesignationService
    ) {
        this.loadAllDepartments();
        this.loadAllDesignations();
        this.loadAllJobs();
        this.loadAllEmployees();
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
    loadAllJobs(){
        this._jobService.list().subscribe(jobs => {
            if(jobs.success)
                this.jobs = jobs.data;
        });
    }


    loadAllEmployees(){
        this._employeeService.list().subscribe(employees => {
            if(employees.success)
                this.employees = employees.data;
        });
    }

    ngOnInit() {

    }
    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/app/js/dashboard.js');

    }

}