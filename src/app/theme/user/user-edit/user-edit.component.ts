import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Role } from '../../role/role';
import { User } from '../User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UserEditComponent implements OnInit {

  roleList: Role[];
  user: User = new User();
  selectedRole: any;
  userAddForm: FormGroup;
  submitted = false;
  userId;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  ngOnInit() {
    this.userId = this._ActivatedRoute.snapshot.params['id'];
    this.userAddForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      password: [this.user.password, Validators.required],
      email: [this.user.email, Validators.required],
      role: [this.user.role, Validators.required]
    });
    this.getUserById(this.userId);
    this.getAllRoles();
  }

  getUserById(id) {
    this.userService.getUserById(id)
      .subscribe(
        data => {
          this.user = data['user'];
        },
        errorCode => {
          console.log("Here In Errpr Code " + errorCode)
        }
      );
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
    this.userService.editUser(this.user)
      .subscribe(
        data => {
          this.router.navigate(['', 'user', 'list']);
        },
        errorCode => {
        }
      );
  }
}
