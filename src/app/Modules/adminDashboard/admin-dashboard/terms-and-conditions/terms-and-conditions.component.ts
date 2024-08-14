import { Component, OnInit, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { TermAndConditionService } from 'src/app/Services/dashboardService/term-and-condition.service';
import { ValidateAllForm } from 'src/app/validation/validate-all-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IGetAllTermAndConditionResponse } from 'src/app/Models/Responses/iterm-and-condition-response';
@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css'],
})
export class TermsAndConditionsComponent implements OnInit {
  form: FormGroup;
  buttonText: string = 'اضافة ';
  items = [];
  indexOfItem: number = null;
  termsAndConditionsTitle = 'اضافة الاحكام والشروط';
  TermsAndConditionsId: number;
  termsAndConditions: IGetAllTermAndConditionResponse[] = [];

  constructor(
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    private termsAndConditionsService: TermAndConditionService,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.initializeForm();
    this.getAllTermsAndConditions();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      termsandConditions: ['', [Validators.required]],
    });
  }

  getTermsAndConditionsId(id: number) {
    this.TermsAndConditionsId = id;
    this.loadFormDetails();
  }

  loadFormDetails() {
    if (!this.indexOfItem) {
      this.termsAndConditionsService
        .getTermsAndConditionsById(this.TermsAndConditionsId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.form.patchValue(res.data);
        });
      this.termsAndConditionsTitle =
        'يمكنك اضافة احكام وشروط او التعديل عليها ';
      this.buttonText = 'ارسال ';
    } else {
      this.form.setValue({ termsandConditions: this.items.join('.') });
    }
  }
  // get All Terms And Conditions
  getAllTermsAndConditions() {
    this.termsAndConditionsService
      .getAllTermsAndConditions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.termsAndConditions = res.data;
        res.data.map((e) => {
          this.items = e.termsandConditions.split('.');
        });
      });
  }
  // delete  one Terms And Conditions
  termsAndConditionsDelete(index: number, TermsAndConditionsId: number) {
    this.indexOfItem = index + 1;
    this.items.splice(index, index + 1);
    const data = {
      id: TermsAndConditionsId,
      termsandConditions: this.form.value.termsandConditions,
    };
    this.termsAndConditionsService
      .updateTermsAndConditions(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم حذف الشرط بنجاح',
          duration: 3000,
        });
      });
  }

  create() {
    if (this.form.valid) {
      const data = {
        termsandConditions: this.form.value.termsandConditions,
      };
      this.termsAndConditionsService
        .createTermsAndConditions(data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم اضافة شروط القبول بنجاح',
            duration: 3000,
          });
          this.form.reset();
          window.location.reload();
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.form);
    }
  }
  edit() {
    const data = {
      id: this.TermsAndConditionsId,
      termsandConditions: this.form.value.termsandConditions,
    };
    this.termsAndConditionsService
      .updateTermsAndConditions(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.form.reset();
        window.location.reload();
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم تعديل البيانات بنجاح',
          duration: 3000,
        });
      });
  }
  delete() {
    this.termsAndConditionsService
      .deleteTermsAndConditionsById(this.TermsAndConditionsId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        window.location.reload();
      });
  }
  onsubmit() {
    if (this.TermsAndConditionsId) {
      this.edit();
    } else {
      this.create();
    }
  }
}
