import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  captacha: any;
  sitekey: string;
  authenticationError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.sitekey = environment.CAPTCH_SITE_KEY;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      // mobileNo: [null, []],
      // otpNumber: [null, []],
      rememberMe: [false],
      // recaptchaReactive: ['', [Validators.required]],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  // get otpNumber() {
  //   return this.loginForm.get('otpNumber');
  // }

  // get mobileNo() {
  //   return this.loginForm.get('mobileNo');
  // }

  login() {
    if (environment.disableOTPLogin) {
      this.auth
        .login(
          '/authenticate',
          // this.captacha,
          this.username.value,
          this.password.value,
          this.rememberMe.value,
          // null
        )
        .pipe(filter(authenticated => authenticated))
        .subscribe(
          () => {
            this.auth.user().subscribe(user => {
              if (user.authorities) {

                // if (this.auth.hasAnyAuthority(['HOSPITAL_USER'])) {

                //   var hospitalId = user.userAccess[0].accessId;

                //   this.router.navigateByUrl('/public/startaudit/' + hospitalId);

                // } else if (this.auth.hasAnyAuthority(['AUDIT_LIST'])) {

                //   this.router.navigateByUrl('/public/startaudit');
                // } else {
                //   this.router.navigateByUrl('/sessions/403');
                // }
                this.router.navigateByUrl('/public/caselist');
              }
            });
          },
          (error: HttpErrorResponse) => {
            if (error.status === 401) {
              const form = this.loginForm;
              form.get('password').setErrors({
                remote: 'Failed to sign in! Please check your credentials and try again.',
              });
            }
          }
        );
    }
    else {
    //   if (this.otpNumber.value) {
    //     this.auth
    //       .login(
    //         '/authenticateweb',
    //         // this.captacha,
    //         this.username.value,
    //         this.password.value,
    //         this.rememberMe.value
    //         // this.otpNumber.value
    //       )
    //       .pipe(filter(authenticated => authenticated))
    //       .subscribe(
    //         () => {
    //           this.router.navigateByUrl('/admin/beddashboard');
    //         },
    //         (error: HttpErrorResponse) => {
    //           if (error.status === 401) {
    //             const form = this.loginForm;
    //             form.get('otpNumber').setErrors({
    //               remote: error.error.detail,
    //             });
    //           }
    //         }
    //       );
    //   } else {
    //     this.http
    //       .post<any>(environment.courtServiceUrl + '/authenticate', {
    //         username: this.username.value,
    //         password: this.password.value,
    //       })
    //       .subscribe(
    //         response => {
    //           if (response.mobile_no != null) {
    //             this.mobileNo.setValue('******' + response.mobile_no.substring(6, 10));
    //           }

    //           this.mobileNo.disable();
    //         },
    //         (error: HttpErrorResponse) => {
    //           if (error.status === 401) {
    //             const form = this.loginForm;
    //             form.get('password').setErrors({
    //               remote: 'Failed to sign in! Please check your credentials and try again.',
    //             });
    //           }
    //         }
    //       );
    //   }
    }
  }

  // resendOTP() { }

  // handleSuccess(data) {
  //   // console.log(data);
  //   this.captacha=data;
  //  }
}
