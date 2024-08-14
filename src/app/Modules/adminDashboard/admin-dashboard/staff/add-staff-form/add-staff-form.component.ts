import { Component, OnInit, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IStaffType } from 'src/app/Models/istaff';
import { StaffService } from 'src/app/Services/dashboardService/staff.service';
import {
  CodesAndIdsPatterns,
  NamesPatterns,
} from 'src/app/validation/validation-patterns';
import { ValidateAllForm } from 'src/app/validation/validate-all-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-add-staff-form',
  templateUrl: './add-staff-form.component.html',
  styleUrls: ['./add-staff-form.component.css'],
})
export class AddStaffFormComponent implements OnInit {
  form: FormGroup;
  buttonText: string = 'اضافة';
  staffId: number;
  get formControls() {
    return this.form.controls;
  }
  staffMembers: IStaffType[] = [
    { id: 1, staffName: 'مدير' },
    { id: 2, staffName: 'مشرف' },
  ];
  constructor(
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private StaffService: StaffService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.staffId = +this.activatedRoute.snapshot.paramMap.get('id');
      if (this.staffId != null) {
        this.getStaffData();
      }
    }
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(NamesPatterns.fullNamePattern),
        ],
      ],
      nationalId: [
        '',
        [
          Validators.required,
          Validators.pattern(CodesAndIdsPatterns.GeneralNationalIdPattern),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(CodesAndIdsPatterns.PhoneNumberPattern),
        ],
      ],
      address: [
        '',
        [Validators.required, Validators.pattern(NamesPatterns.addressPattern)],
      ],
      jobTitle: [null, [Validators.required]],
    });
  }

  getStaffData() {
    this.StaffService.getStaffById(this.staffId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.form.patchValue(res.data);
        this.buttonText = 'تعديل ';
      });
  }

  updateStaff() {
    if (this.form.valid) {
      const editStaffData = {
        id: this.staffId,
        name: this.form.value.name,
        nationalId: this.form.value.nationalId,
        address: this.form.value.address,
        phoneNumber: this.form.value.phoneNumber,
        jobTitle: this.form.value.jobTitle,
      };
      this.StaffService.editStaff(editStaffData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم تعديل بيانات الموظف بنجاح',
            duration: 3000,
          });
          this.form.reset();
          this.router.navigate(['/admin-dashboard/employees']);
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.form);
    }
  }

  createStaff() {
    if (this.form.valid) {
      this.StaffService.addStaff(this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم اضافة الموظف بنجاح',
            duration: 3000,
          });
          this.form.reset();
          this.router.navigate(['/admin-dashboard/employees']);
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.form);
    }
  }

  onSubmit() {
    if (this.staffId) {
      this.updateStaff();
    } else {
      this.createStaff();
    }
  }
}
