import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { JobComponent } from './job.component';
import { LayoutModule } from '../../layouts/layout.module';
import { CompanyComponent } from '../company.component';
import { JobService } from "../../../_services/job.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
    {
        "path": "",
        "component": CompanyComponent,
        "children": [
            {
                "path": "",
                "component": JobComponent
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
        JobComponent
    ],providers: [
        JobService
    ],
})
export class JobModule {
}