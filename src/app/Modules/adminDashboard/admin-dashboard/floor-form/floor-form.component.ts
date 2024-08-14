import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IBuildingResponse } from 'src/app/Models/Responses/i-building-data-response';
import { BuildingService } from 'src/app/Services/dashboardService/building.service';
import { FloorService } from 'src/app/Services/dashboardService/floor.service';
import { ValidateAllForm } from 'src/app/validation/validate-all-form';
import { NamesPatterns } from 'src/app/validation/validation-patterns';

import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-floor-form',
  templateUrl: './floor-form.component.html',
  styleUrls: ['./floor-form.component.css'],
})
export class FloorFormComponent implements OnInit {
  form: FormGroup;
  buttonText: string = 'اضافة';
  FloorId: number;
  get formControls() {
    return this.form.controls;
  }
  buildings: IBuildingResponse[] = [];
  constructor(
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    private buildingService: BuildingService,
    private floorService: FloorService,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.initializeForm();
    this.getAllBuiling();
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.FloorId = +this.activatedRoute.snapshot.paramMap.get('id');
      if (this.FloorId != null) {
        this.loadFormDetails();
      }
    }
  }
  initializeForm() {
    this.form = this.formBuilder.group({
      buildingId: [null, [Validators.required]],
      floorName: [
        '',
        [
          Validators.required,
          Validators.pattern(NamesPatterns.NameWithSpacePattern),
        ],
      ],
      order: [null, [Validators.required]],
      isActive: false,
    });
  }
  getAllBuiling() {
    this.buildingService
      .getAllBuildingsWithParam()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.buildings = res.data;
      });
  }

  loadFormDetails() {
    this.floorService
      .getFloor(this.FloorId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.form.patchValue(res.data);
      });
    this.buttonText = 'تعديل ';
  }

  createFloor() {
    if (this.form.valid) {
      this.floorService
        .createFloor(this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم اضافة الدور بنجاح',
            duration: 3000,
          });
          this.router.navigate(['/admin-dashboard/buildings']);
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.form);
    }
  }
  editFloor() {
    const data = {
      id: this.FloorId,
      buildingId: this.form.value.buildingId,
      floorName: this.form.value.floorName,
      order: this.form.value.order,
      isActive: this.form.value.isActive,
    };
    this.floorService
      .updataFloorData(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم تعديل البيانات بنجاح',
          duration: 3000,
        });
        this.form.reset();
      });
  }

  onsubmit(values: any) {
    if (this.FloorId) {
      this.editFloor();
    } else {
      this.createFloor();
    }
  }
}
