import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import {
  IReconciliation,
  IReconciliationForm,
  IReconciliationUpdate,
  IViolation,
  IViolationForm,
  IViolationUpdate,
} from 'src/app/Models/Requests/i-violation-reconciliation';
import { ITypesViolation } from 'src/app/Models/Requests/i-violation-request';
import { IStudentViolationData } from 'src/app/Models/Responses/i-violation-reconciliation-responses';
import { ViolationReconciliationService } from 'src/app/Services/dashboardService/violation.reconciliation.service';
import { ValidateAllForm } from 'src/app/validation/validate-all-form';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-violation-form-and-details',
  templateUrl: './violation-form-and-details.component.html',
  styleUrls: ['./violation-form-and-details.component.css'],
})
export class ViolationFormAndDetailsComponent implements OnInit {
  submitViolationText: string = 'اضافة ';
  submitReconciliationText: string = 'تصالح';
  TitleFormViolation: string = 'اضافة مخالفه';
  TitleFormReconciliation: string = 'اضافة تصالح';
  imageUrl = environment.domain
  violations = null;
  housingId: number = 0;
  studentId: number = 0;
  violationId: number = 0;
  reconciliationId: number = 0;
  student: IStudentViolationData;
  formViolation: FormGroup;
  formReconciliation: FormGroup;
  get ViolationControls() {
    return this.formViolation.controls;
  }
  get ReconciliationControls() {
    return this.formReconciliation.controls;
  }
  types: ITypesViolation[] = [
    { id: 1, name: 'انذار بالحرمان' },
    { id: 2, name: ' حجب النتيجة الدراسية لعدم سداد مصروفات' },
    { id: 3, name: 'تجاوز مدة التصاريح ' },
    { id: 4, name: 'جزاء اداري' },
    { id: 5, name: 'مجلس تأديب' },
    { id: 6, name: 'لفت نظر' },
    { id: 7, name: 'اجراء التحقيق ' },
    { id: 8, name: 'تجاوز مدة الغياب ' },
    { id: 9, name: 'حرمان نهائي' },
    { id: 10, name: 'حرمان مؤقت' },
    { id: 11, name: 'تأخير ' },
    { id: 12, name: 'فصل شهر' },
    { id: 13, name: 'فصل اسبوعين' },
    { id: 14, name: 'فصل اسبوع' },
    { id: 15, name: ' انهاء الاقامة' },
  ];

  constructor(
    private destroyRef: DestroyRef,
    private toast: NgToastService,
    private violationReconciliationService: ViolationReconciliationService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getID();
    this.initViolationForm();
    this.initReconciliationForm();
    this.studentData();
  }

  getID() {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.housingId = +params['housingId'];
        this.studentId = +params['studentId'];
      });
  }

  initViolationForm() {
    this.formViolation = new FormGroup<IViolationForm>({
      description: new FormControl('', [Validators.required]),
      violationType: new FormControl(null, [Validators.required]),
    });
  }

  initReconciliationForm() {
    this.formReconciliation = new FormGroup<IReconciliationForm>({
      description: new FormControl('', [Validators.required]),
    });
  }

  studentData() {
    this.violationReconciliationService
      .getAllViolationRelatedToStudent(this.studentId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.student = res.data;
      });
  }

  reconciliationData(reconciliationId: number) {
    this.violationReconciliationService
      .getReconciliation(reconciliationId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.formReconciliation.patchValue(res.data);
      });
  }

  violationData(violationId: number) {
    this.violationReconciliationService
      .getViolation(violationId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.formViolation.patchValue(res.data);
      });
  }

  editViolation() {
    let data: IViolationUpdate = {
      description: this.formViolation.value.description,
      violationType: +this.formViolation.value.violationType,
      housingApplicationId: +this.housingId,
      id: +this.violationId,
    };
    this.violationReconciliationService
      .UpdateViolation(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم تعديل مخالفه بنجاح',
          duration: 3000,
        });
        this.formViolation.reset();
        window.location.reload();
      });
  }
  editReconciliation() {
    let data: IReconciliationUpdate = {
      description: this.formViolation.value.description,
      violationId: +this.violationId,
      id: +this.reconciliationId,
    };
    this.violationReconciliationService
      .UpdateReconciliation(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم تعديل بيانات التصالح بنجاح',
          duration: 3000,
        });
        this.formReconciliation.reset();
        window.location.reload();
      });
  }
  createViolation() {
    if (this.formViolation.valid) {
      let data: IViolation = {
        description: this.formViolation.value.description,
        violationType: this.formViolation.value.violationType,
        housingApplicationId: this.housingId,
      };

      this.violationReconciliationService
        .CreateViolation(data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم اضافة مخالفه بنجاح',
            duration: 3000,
          });
          this.formViolation.reset();
          window.location.reload();
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.formViolation);
    }
  }
  createReconciliation() {
    if (this.formReconciliation.valid) {
      let data: IReconciliation = {
        description: this.formReconciliation.value.description,
        violationId: this.violationId,
      };
      this.violationReconciliationService
        .CreateReconciliation(data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: 'تمت المصالحه بنجاح',
            duration: 3000,
          });
          this.formReconciliation.reset();
          window.location.reload();
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.formViolation);
    }
  }

  getViolationId(id: number | null) {
    this.violationId = id;
    if (this.violationId) {
      this.TitleFormViolation = 'تعديل بيانات المخالفه';
      this.submitViolationText = 'تعديل';
      this.violationData(id);
    }
  }

  getReconciliationId(id1: number, id2: number) {
    this.violationId = id2;
    this.reconciliationId = id1;
    if (this.reconciliationId) {
      this.TitleFormReconciliation = 'تعديل بيانات التصالح';
      this.submitReconciliationText = 'تعديل';
      this.reconciliationData(id1);
    }
  }

  onSubmitViolation() {
    if (this.violationId) {
      this.editViolation();
    } else {
      this.createViolation();
    }
  }

  onSubmitReconciliation() {
    if (this.reconciliationId) {
      this.editReconciliation();
    } else {
      this.createReconciliation();
    }
  }
}
