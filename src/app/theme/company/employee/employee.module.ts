import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { LayoutModule } from '../../layouts/layout.module';
import { CompanyComponent } from '../company.component';
import { EmployeeService } from "../../../_services/employee.service";
import { DesignationService } from "../../../_services/designation.service";
import { DepartmentService } from "../../../_services/department.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
    {
        "path": "",
        "component": CompanyComponent,
        "children": [
            {
                "path": "",
                "component": EmployeeComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, NgbModule.forRoot(), RouterModule.forChild(routes), LayoutModule, FormsModule, ReactiveFormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        EmployeeComponent
    ],providers: [
        EmployeeService,
        DesignationService,
        DepartmentService
    ],
})
export class EmployeeModule {
}