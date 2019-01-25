import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../pages/default/default.component';
import { UserViewComponent } from './user-view/user-view.component';
import { LayoutModule } from '../layouts/layout.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserService } from './user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    "path": "",
    "component": DefaultComponent,
    "children": [
      {
        "path": "list",
        "component": UserListComponent
      },
      {
        "path": "add",
        "component": UserAddComponent
      },
      {
        "path": ":id",
        "component": UserViewComponent
      },
      {
        "path": "edit/:id",
        "component": UserEditComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule

  ], exports: [
    RouterModule
  ], declarations: [
    UserViewComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent
  ],
  providers: [
    UserService
  ],
})
export class UserModule { }
