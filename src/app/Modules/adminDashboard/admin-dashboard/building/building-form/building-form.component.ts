import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IBuildingType } from 'src/app/Models/Requests/i-building-data-request';
import { BuildingService } from 'src/app/Services/dashboardService/building.service';
import { NamesPatterns } from 'src/app/validation/validation-patterns';
import { ValidateAllForm } from 'src/app/validation/validate-all-form';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.css'],
})
export class BuildingFormComponent implements OnInit {
  //#region Properties
  get formControls() {
    return this.form.controls;
  }
  form: FormGroup;
  buttonText: string = 'اضافة ';
  buildingId: number;

  types: IBuildingType[] = [
    { id: 1, name: 'ذكور' },
    { id: 2, name: 'اناث' },
  ];
  constructor(
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    private buildingService: BuildingService,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.createForm();
    this.checkBuildingId();
    this.formControls;
  }

  checkBuildingId() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.buildingId = +this.activatedRoute.snapshot.paramMap.get('id');
      if (this.buildingId != null) {
        this.loadFormDetails();
      }
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(NamesPatterns.AdminNamesPattern),
        ],
      ],
      type: [null, [Validators.required]],
      isActive: false,
    });
  }

  loadFormDetails() {
    this.buildingService
      .getBuilding(this.buildingId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.form.patchValue(res.data);
      });
    this.buttonText = 'تعديل ';
  }

  edit() {
    const data = {
      id: this.buildingId,
      name: this.form.value.name,
      type: this.form.value.type,
      isActive: this.form.value.isActive,
    };
    this.buildingService
      .updateBuildingData(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم تعديل البيانات بنجاح',
          duration: 3000,
        });
        this.form.reset();
        this.router.navigate(['/admin-dashboard/buildings']);
      });
  }
  create() {
    if (this.form.valid) {
      this.buildingService
        .creatBuilding(this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم اضافة مبني بنجاح',
            duration: 3000,
          });
          this.form.reset();
          this.router.navigate(['/admin-dashboard/buildings']);
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.form);
    }
  }
  onsubmit() {
    if (this.buildingId) {
      this.edit();
    } else {
      this.create();
    }
  }
}
