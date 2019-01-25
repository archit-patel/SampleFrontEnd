import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { UserService } from '../user.service';
import { Role } from '../../role/role';
import { User } from '../User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare let $: any;
@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class UserAddComponent implements OnInit, AfterViewInit {

  roleList: Role[];
  user: User = new User();
  selectedRole: any;
  userAddForm: FormGroup;
  submitted = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  ngOnInit() {
    this.userAddForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      password: [this.user.password, Validators.required],
      email: [this.user.email, Validators.required],
      role: [this.user.role, Validators.required]
    });
    this.getAllRoles();

  }

  get g() { return this.userAddForm.controls; }

  ngAfterViewInit() {

  }

  getAllRoles() {
    this.userService.getAllRoles()
      .subscribe(
        data => {
          this.roleList = data['data'];
        },
        errorCode => {
          console.log("Here In Errpr Code " + errorCode)
        }
      );
  }

  onSubmit() {
    this.submitted = true;
    if (this.userAddForm.invalid) {
      return;
    }
    this.userService.addUser(this.user)
      .subscribe(
        data => {
          this.router.navigate(['', 'user', 'list']);
        },
        errorCode => {
        }
      );
  }
}
