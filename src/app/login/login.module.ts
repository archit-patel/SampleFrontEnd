import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthGuard } from '../_guards/auth.guard';
import { AuthenticationService } from '../_services/authentication.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
  ],
})
export class LoginModule { }
