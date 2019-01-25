import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../layouts/layout.module';
import { DefaultComponent } from '../pages/default/default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './role.service';
import { PrivilegesComponent } from './privileges/privileges.component';
import { NgSelectModule } from '@ng-select/ng-select';


const routes: Routes = [
  {
    "path": "",
    "component": DefaultComponent,
    "children": [
      {
        "path": "all",
        "component": RoleComponent
      },
      {
        "path": "assign/privileges",
        "component": PrivilegesComponent
      },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ], exports: [
    RouterModule
  ],
  declarations: [
    RoleComponent,
    PrivilegesComponent
  ],
  providers: [
    RoleService
  ],
})
export class RoleModule { }
