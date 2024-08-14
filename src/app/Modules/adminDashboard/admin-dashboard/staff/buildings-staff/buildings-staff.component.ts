import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import {
  IBuildingsStaff,
  IStaffGetAll
} from 'src/app/Models/istaff';
import { BuildingService } from 'src/app/Services/dashboardService/building.service';
import { StaffService } from 'src/app/Services/dashboardService/staff.service';

import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-buildings-staff',
  templateUrl: './buildings-staff.component.html',
  styleUrls: ['./buildings-staff.component.css'],
})
export class BuildingsStaffComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 50;
  totalCount = 0;
  totalPage = 1;
  search: string = '';
  type: string = '';

  BuildingsStaff: IBuildingsStaff[];
  AllStaff: IStaffGetAll[];

  selectedStaffMember: string;
  selectedStaffMembersIds: number[] = [];

  valueMatSelect: any;

  constructor(
    private destroyRef: DestroyRef,
    private StaffService: StaffService,
    private buildingService: BuildingService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getStaff();
    this.getBuildingStaff();
  }

  getStaff() {
    this.StaffService.getAllBuildingsStaff()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.AllStaff = res.data;
      });
  }

  getBuildingStaff() {
    this.buildingService
      .getBuildingStaff(this.currentPage, this.pageSize, this.search, this.type)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.BuildingsStaff = res.data;
        this.totalCount = res.totalCount;
        this.totalPage = res.totalPages;
        this.totalCount = res.totalCount;
      });
  }

  getStaffIdsByBuildingId(id: number): number[] {
    let Ids = this.BuildingsStaff.find((b) => b.id === id).employeeDetails.map(
      (staff) => staff.id
    );
    return Ids;
  }

  getStaffName(staffId: number): string {
    const staff = this.AllStaff.find((faculty) => faculty.id === staffId);
    return staff ? staff.name : '';
  }

  onSearchChange(e) {
    this.search = e.target.value;
    this.getBuildingStaff();
  }
  onTypeChange(e) {
    this.type = e.target.value;
    this.getBuildingStaff();
  }

  onPaginationChange(page) {
    this.currentPage = page;
    this.getBuildingStaff();
  }

  onSaveBuildingStaff(building: IBuildingsStaff) {
    for (let staffId of building.employeeDetails) {
      this.selectedStaffMembersIds.push(staffId.id);
    }
    this.buildingService
      .assignAndUnassignStaff(building.id, this.selectedStaffMembersIds)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.selectedStaffMembersIds = [];
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم  التعديل بنجاح',
          duration: 3000,
        });
      });
  }

  onStaffSelectionChange(
    selectedStaffMembersIds: number[],
    building: IBuildingsStaff
  ) {
    const newStaff = selectedStaffMembersIds
      .filter(
        (id) => !building.employeeDetails.find((staff) => staff.id === id)
      )
      .map((id) => ({ id, name: this.getStaffName(id) }));

    building.employeeDetails.push(...newStaff);
    building.employeeDetails = building.employeeDetails.filter((staff) =>
      selectedStaffMembersIds.includes(staff.id)
    );
  }
}
