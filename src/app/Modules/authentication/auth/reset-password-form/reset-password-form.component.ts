import { Component, OnInit, DestroyRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IResetPassword } from 'src/app/Models/ireset-password';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';
import { ConfirmPasswordValidator } from 'src/app/validation/confirm-password.validation';
import { ValidationPatterns } from 'src/app/validation/validation-patterns';
import { ValidateAllForm } from 'src/app/validation/validate-all-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css'],
})
export class ResetPasswordFormComponent implements OnInit {
  // eyePass
  typePassword: string = 'password';
  isTextPassword: boolean = false;
  iconEyePassword: string = 'eye-slash';
  // eyeConfirme
  type: string = 'password';
  isText: boolean = false;
  iconEye: string = 'eye-slash';
  // from
  resetPasswordForm: FormGroup;
  submitted = false;

  resetPasswordObj: IResetPassword;
  emailToRest: string;
  uriToken: string;
  emailToken: string;

  constructor(
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private resetService: ResetPasswordService,
    private toast: NgToastService
  ) {
    this.resetPasswordObj = {
      email: '',
      token: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
            Validators.pattern(ValidationPatterns.passwordPattern),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
            Validators.pattern(ValidationPatterns.passwordPattern),
          ],
        ],
      },
      {
        validator: [ConfirmPasswordValidator.MatchPassword],
      }
    );

    // Reset Password

    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((val) => {
        this.emailToRest = val['email'];
        this.uriToken = val['code'];

        this.emailToken = this.uriToken.replace(/ /g, '+');

        this.resetPasswordObj.email = this.emailToRest;
        this.resetPasswordObj.token = this.emailToken;
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.resetPasswordForm.controls;
  }

  showEyePassword() {
    this.isTextPassword = !this.isTextPassword;
    if (this.isTextPassword) {
      this.iconEyePassword = 'eye';
      this.typePassword = 'text';
    } else {
      this.iconEyePassword = 'eye-slash';
      this.typePassword = 'password';
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

  // For reset password
  reset(): void {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword =
        this.resetPasswordForm.value.confirmPassword;

      this.resetService
        .resetPassword(this.resetPasswordObj)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this.toast.success({
              detail: 'صحيح',
              summary: res.message,
              duration: 3000,
            });
            this.router.navigate(['/login']);
          },

          error: (err) => {
            this.toast.error({
              detail: 'خطأ',
              summary: err.error.message,
              duration: 3000,
            });
          },
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.resetPasswordForm);
    }
  }
}
