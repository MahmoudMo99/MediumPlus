import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IUniversity } from 'src/app/Models/i-housing-app';
import { IFacultyType } from 'src/app/Models/ifaculty';
import { CollegesService } from 'src/app/Services/colleges.service';
import { FacultyService } from 'src/app/Services/dashboardService/faculty.service';
import { NamesPatterns } from 'src/app/validation/validation-patterns';
import { ValidateAllForm } from 'src/app/validation/validate-all-form';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-faculty-form',
  templateUrl: './faculty-form.component.html',
  styleUrls: ['./faculty-form.component.css'],
})
export class FacultyFormComponent implements OnInit {
  //#region Properties
  get formControls() {
    return this.form.controls;
  }
  form: FormGroup;
  buttonText: string = 'اضافة';
  FacultyId: number;
  Universities: IUniversity[] = [];
  types: IFacultyType[] = [
    { id: 1, typeName: 'نظرية' },
    { id: 2, typeName: 'عملية' },
  ];
  constructor(
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    private facultyService: FacultyService,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute,
    private collegesService: CollegesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getAllUniversities();
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.FacultyId = +this.activatedRoute.snapshot.paramMap.get('id');
      if (this.FacultyId != null) {
        this.loadFormDetails();
      }
    }
  }
  initializeForm() {
    this.form = this.formBuilder.group({
      universityId: [null, [Validators.required]],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(NamesPatterns.facultyNamePattern),
        ],
      ],
      facultyType: [null, [Validators.required]],
    });
  }
  getAllUniversities() {
    this.collegesService
      .getAllUniversities()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.Universities = res.data;
      });
  }

  loadFormDetails() {
    this.facultyService
      .getFaculty(this.FacultyId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.form.patchValue(res.data);
      });
    this.buttonText = 'تعديل ';
  }
  edit() {
    if (this.form.valid) {
      const data = {
        id: this.FacultyId,
        universityId: this.form.value.universityId,
        name: this.form.value.name,
        facultyType: this.form.value.facultyType,
      };
      this.facultyService
        .updateFacultyData(data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم تعديل البيانات بنجاح',
            duration: 3000,
          });
          this.form.reset();
          this.router.navigate(['/admin-dashboard/faculties']);
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.form);
    }
  }

  create() {
    if (this.form.valid) {
      this.facultyService
        .createFaculty(this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم اضافة الكلية بنجاح',
            duration: 3000,
          });
          this.form.reset();
          this.router.navigate(['/admin-dashboard/faculties']);
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.form);
    }
  }

  onsubmit() {
    if (this.FacultyId) {
      this.edit();
    } else {
      this.create();
    }
  }
}
