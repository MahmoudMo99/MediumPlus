import { Component, OnInit, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import {
  IBuildingResponse,
  IFloorResponse,
} from 'src/app/Models/Responses/i-building-data-response';
import { BuildingService } from 'src/app/Services/dashboardService/building.service';
import { FloorService } from 'src/app/Services/dashboardService/floor.service';
import { RoomService } from 'src/app/Services/dashboardService/room.service';
import { CodesAndIdsPatterns } from 'src/app/validation/validation-patterns';
import { ValidateAllForm } from 'src/app/validation/validate-all-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
})
export class RoomFormComponent implements OnInit {
  form: FormGroup;
  RoomId: number;
  buttonText: string = 'اضافة';
  get formControls() {
    return this.form.controls;
  }
  buildings: IBuildingResponse[] = [];
  floors: IFloorResponse[] = [];
  constructor(
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    private buildingService: BuildingService,
    private floorService: FloorService,
    private roomService: RoomService,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.initializeForm();
    this.getAllBuilding();
    this.getAllFloorForBuilding();
    this.checkId();
  }
  checkId() {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.RoomId = +this.activatedRoute.snapshot.paramMap.get('id');
      if (this.RoomId != null) {
        this.loadFormDetails();
      }
    }
  }
  initializeForm() {
    this.form = this.formBuilder.group({
      buildingId: ['', [Validators.required]],
      floorId: ['', [Validators.required]],
      number: [
        '',
        [
          Validators.required,
          Validators.pattern(CodesAndIdsPatterns.NumberRoomPattern),
        ],
      ],
      fullCapacity: ['', [Validators.required]],
      isActive: [false],
    });
  }
  getAllBuilding() {
    this.buildingService
      .getAllBuildingsWithParam()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.buildings = res.data;
      });
  }
  getAllFloorForBuilding() {
    this.form
      .get('buildingId')
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selectedValue) => {
        if (selectedValue) {
          this.floorService
            .getAllFloorsForBuilding(selectedValue)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((res) => {
              this.floors = res.data;
            });
        } else {
          this.floors = [];
        }
      });
  }

  loadFormDetails() {
    this.roomService
      .getRoom(this.RoomId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.form.patchValue(res.data);
      });
    this.buttonText = 'تعديل ';
  }

  updateRoom() {
    const data = {
      id: this.RoomId,
      buildingId: this.form.value.buildingId,
      floorId: this.form.value.floorId,
      number: this.form.value.number,
      capacity: this.form.value.fullCapacity,
      isActive: this.form.value.isActive,
    };
    this.roomService
      .updateRoomData(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم تعديل البيانات بنجاح',
          duration: 3000,
        });
        this.form.reset();
        this.router.navigate(['/admin-dashboard/rooms']);
      });
  }

  createRoom() {
    if (this.form.valid) {
      this.roomService
        .createRoom(this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم اضافة الغرفه بنجاح',
            duration: 3000,
          });
          this.router.navigate(['/admin-dashboard/rooms']);
        });
    } else {
      ValidateAllForm.validateAllFormFiled(this.form);
    }
  }
  onsubmit() {
    if (this.RoomId) {
      this.updateRoom();
    } else {
      this.createRoom();
    }
  }
}
