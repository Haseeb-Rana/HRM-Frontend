import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DesignationComponent } from './designation.component';
import { LayoutModule } from '../../layouts/layout.module';
import { CompanyComponent } from '../company.component';

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
        CommonModule, RouterModule.forChild(routes), LayoutModule
    ], exports: [
        RouterModule
    ], declarations: [
        DesignationComponent
    ]
})
export class DesignationModule {



}