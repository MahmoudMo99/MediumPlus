import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { IBuildingWithFaculties } from 'src/app/Models/i-building-with-faculties';
import { IFacultySelect } from 'src/app/Models/ifaculty';
import { CollegesService } from 'src/app/Services/colleges.service';
import { BuildingService } from 'src/app/Services/dashboardService/building.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-select-faculties-inside-building',
  templateUrl: './select-faculties-inside-building.component.html',
  styleUrls: ['./select-faculties-inside-building.component.css'],
})
export class SelectFacultiesInsideBuildingComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 50;
  totalCount = 0;
  totalPage = 1;
  search: string = '';
  buildingsWithFaculties: IBuildingWithFaculties[] = [];
  allFaculties: IFacultySelect[] = [];
  selectedFaculty: string;
  selectedFacultyIds: number[] = [];
  valueMatSelect: any;
  type: string = '';

  constructor(
    private destroyRef: DestroyRef,
    private buildingService: BuildingService,
    private facultiesService: CollegesService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.getBuildingsWithFaculties();
    this.getFaculties();
  }

  getBuildingsWithFaculties() {
    this.buildingService
      .getBuildingsWithFaculties(
        this.currentPage,
        this.pageSize,
        this.search,
        this.type
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.buildingsWithFaculties = res.data;

        this.totalCount = res.totalCount;
        this.totalPage = res.totalPages;
        this.totalCount = res.totalCount;
      });
  }

  getFacultyIdsByBuildingId(id: number): number[] {
    let ids = this.buildingsWithFaculties
      .find((b) => b.id === id)
      .facultyDetails.map((faculty) => faculty.id);
    return ids;
  }

  getFaculties() {
    this.facultiesService
      .getAllFacultyForUniversity(1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.allFaculties = res.data;
        },
      });
  }

  getFacultyName(facultyId: number): string {
    const faculty = this.allFaculties.find(
      (faculty) => faculty.id === facultyId
    );
    return faculty ? faculty.name : '';
  }

  onSearchChange(e) {
    this.search = e.target.value;
    this.getBuildingsWithFaculties();
  }

  onPaginationChange(page) {
    this.currentPage = page;
    this.getBuildingsWithFaculties();
  }
  onTypeChange(e) {
    this.type = e.target.value;
    this.getBuildingsWithFaculties();
  }

  onSaveBuildingFaculties(building: IBuildingWithFaculties) {
    for (let facultyId of building.facultyDetails) {
      this.selectedFacultyIds.push(facultyId.id);
    }

    this.buildingService
      .changeOrAddFaculties(building.id, this.selectedFacultyIds)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.selectedFacultyIds = [];
          this.toast.success({
            detail: 'صحيح',
            summary: 'تم  التعديل بنجاح',
            duration: 3000,
          });
        },
      });
  }

  onFacultySelectionChange(
    selectedFacultyIds: number[],
    building: IBuildingWithFaculties
  ) {
    const newFaculties = selectedFacultyIds
      .filter(
        (id) => !building.facultyDetails.find((faculty) => faculty.id === id)
      )
      .map((id) => ({ id, name: this.getFacultyName(id) }));

    building.facultyDetails.push(...newFaculties);
    building.facultyDetails = building.facultyDetails.filter((faculty) =>
      selectedFacultyIds.includes(faculty.id)
    );
  }
}
