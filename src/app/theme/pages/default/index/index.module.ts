import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { UserService } from "../../../../_services/user.service";
import { JobService } from "../../../../_services/job.service";
import { DesignationService } from "../../../../_services/designation.service";
import { DepartmentService } from "../../../../_services/department.service";
import { EmployeeService } from "../../../../_services/employee.service";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": IndexComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule
    ], exports: [
        RouterModule
    ], declarations: [
        IndexComponent
    ],providers: [
        JobService,
        DesignationService,
        DepartmentService,
        EmployeeService
    ],
})
export class IndexModule {



}