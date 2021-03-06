import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DesignationComponent } from './designation.component';
import { LayoutModule } from '../../layouts/layout.module';
import { CompanyComponent } from '../company.component';
import { DesignationService } from "../../../_services/designation.service";
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
                "component": DesignationComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, NgbModule.forRoot(), RouterModule.forChild(routes), LayoutModule , FormsModule, ReactiveFormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        DesignationComponent
    ], providers: [
        DesignationService,
        DepartmentService
    ],
})
export class DesignationModule {
}