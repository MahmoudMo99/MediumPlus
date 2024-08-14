import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IBuildingResponse } from 'src/app/Models/Responses/i-building-data-response';
import { BuildingService } from 'src/app/Services/dashboardService/building.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css'],
})
export class BuildingDetailsComponent implements OnInit {
  changeActivate: boolean;
  constructor(
    private destroyRef: DestroyRef,
    private buildingService: BuildingService,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute
  ) {}
  building: IBuildingResponse;
  ngOnInit(): void {
    this.BuildingData();
  }

  BuildingData() {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params['id'];
        this.buildingService
          .getBuilding(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.building = res.data;
            this.changeActivate = res.data.isActive;
          });
      });
  }

  onSaveActivateBuilding(id: number) {
    const data = {
      id: id,
      isActive: this.changeActivate,
    };
    this.buildingService
      .changeActivate(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم حفظ التغيرات',
          duration: 1000,
        });
      });
  }
}
