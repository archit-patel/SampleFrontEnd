import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../theme/user/User';
import { Helpers } from '../helpers';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { first } from 'rxjs/operators';

@Component({
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  user: User = new User();
  username: string;
  password: string;
  returnUrl: string;
  submitted = false;
  loginForm: FormGroup;
  error: String;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _script: ScriptLoaderService,
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this._script.loadScripts('body', [
      'assets/vendors/base/vendors.bundle.js',
      'assets/demo/default/base/scripts.bundle.js'], true).then(() => {
        Helpers.setLoading(false);
      });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    let body = new FormData();
    body.append("username", this.username);
    body.append("password", this.password);

    this.authenticationService.login(body, this.username)
      .pipe(first())
      .subscribe(
        data => {
          //console.log(localStorage.getItem('currentUser'));
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.error = error;
        });
  }
}
