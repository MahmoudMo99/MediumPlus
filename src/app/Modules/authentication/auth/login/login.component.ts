import { Component, OnInit, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ValidateAllForm } from 'src/app/validation/validate-all-form';
import { NgToastService } from 'ng-angular-popup';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';
import { ValidationPatterns } from 'src/app/validation/validation-patterns';
import { reloadEntireApp } from 'src/app/helpers/reloadEntireApp';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  iconEye: string = 'eye-slash';

  //for forget password
  public sendEmail?: string;
  public isValidEmail: boolean;
  constructor(
    private destroyRef: DestroyRef,
    public auth: AuthService,
    public router: Router,
    private toast: NgToastService,
    private resetPasswordService: ResetPasswordService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.isLoggedInSubscription();
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(ValidationPatterns.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
        Validators.pattern(ValidationPatterns.passwordPattern),
      ]),
    });
  }
  isLoggedInSubscription() {
    this.auth.isLoggedIn$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.navigateToRedirectUrl();
        }
      });
  }

  get email() {
    return this.formLogin.get('email');
  }
  get password() {
    return this.formLogin.get('password');
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.auth
        .login(this.formLogin.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.navigateToRedirectUrl();
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.formLogin);
    }
  }

  showEye() {
    this.isText = !this.isText;
    if (this.isText) {
      this.iconEye = 'eye';
      this.type = 'text';
    } else {
      this.iconEye = 'eye-slash';
      this.type = 'password';
    }
  }

  //for Forget Password
  checkValiEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if (this.checkValiEmail(this.sendEmail)) {
      //API call
      this.resetPasswordService
        .sendResetEmail(this.sendEmail)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this.sendEmail = '';
            const closeBtnRef = document.getElementById('closeBtn');
            closeBtnRef?.click();
            this.toast.success({
              detail: 'صحيح',
              summary: res.message,
              duration: 3000,
            });
          },
        });
    }
  }

  navigateToRedirectUrl() {
    let returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
    if (!returnUrl) {
      if (this.auth.IsStudent) {
        returnUrl = '/profile';
      } else if (this.auth.IsAdmin) {
        returnUrl = '/admin-dashboard';
      } else {
        this.toast.warning({
          detail: 'تحذير',
          summary: ' هذا الحساب ليس لديه اي صلاحيات',
          duration: 3000,
        });
        returnUrl = '/login';
      }
    }
    this.router.navigate([returnUrl]).then(reloadEntireApp);
  }
}
