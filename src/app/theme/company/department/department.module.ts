import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './department.component';
import { LayoutModule } from '../../layouts/layout.module';
import { CompanyComponent } from '../company.component';
import { DepartmentService } from "../../../_services/department.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "../../../_services/api.service";
const routes: Routes = [
    {
        "path": "",
        "component": CompanyComponent,
        "children": [
            {
                "path": "",
                "component": DepartmentComponent
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
        DepartmentComponent
    ],providers: [
        DepartmentService
    ],
})
export class DepartmentModule {
}