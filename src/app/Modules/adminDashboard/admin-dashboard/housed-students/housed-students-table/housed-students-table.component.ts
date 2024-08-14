import { Component, OnInit } from '@angular/core';
import { IBuildingResponse } from 'src/app/Models/Responses/i-building-data-response';
import { IFacultyResponse } from 'src/app/Models/Responses/ifaculty-response';
import { IGetAllHousedStudents } from 'src/app/Models/iget-all-housed-students';
import { CollegesService } from 'src/app/Services/colleges.service';
import { BuildingService } from 'src/app/Services/dashboardService/building.service';
import { HousedStudentsService } from 'src/app/Services/dashboardService/housed-students.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { IAcademicYearResponse } from 'src/app/Models/iacademic-year';
import { ConfigurationService } from 'src/app/Services/dashboardService/configuration.service';
@Component({
  selector: 'app-housed-students-table',
  templateUrl: './housed-students-table.component.html',
  styleUrls: ['./housed-students-table.component.css'],
})
export class HousedStudentsTableComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 50;
  totalCount = 0;
  totalPage = 1;
  selectedFloor: number = 0;
  selectedBuilding: number = 0;
  selectedLevel: number = 0;
  selectedFaculty: number = 0;
  selectedNationality: number = 0;
  selectedIsEvacuated: string = '';
  search: string = '';
  selectedAcademicYear: IAcademicYearResponse;
  AcademicYears: IAcademicYearResponse[] = [];
  students: IGetAllHousedStudents[] = [];
  buildings: IBuildingResponse[] = [];
  faculties: IFacultyResponse[] = [];

  constructor(
    private destroyRef: DestroyRef,
    private housedStudentsService: HousedStudentsService,
    private buldingService: BuildingService,
    private facultiesService: CollegesService,private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.getAcademicYear();
    this.getAllBuildings();
    this.getFaculties();
  }

  getAcademicYear() {
    this.configurationService
      .getAcademicYears()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.AcademicYears = res.data;
        this.selectedAcademicYear = this.AcademicYears.find((a) => a.isCurrent);

        this.getAllHousedStudents(this.selectedAcademicYear.id);
      });
  }

  getAllBuildings() {
    this.buldingService
      .getAllBuildingsWithParam()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.buildings = res.data;
      });
  }

  getFaculties() {
    this.facultiesService
      .getAllFacultyForUniversity(1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.faculties = res.data;
        },
      });
  }

  // get  getAllHousedStudents
  getAllHousedStudents(academicYearId: number) {
    this.housedStudentsService
      .getAllHousedStudents(
        this.currentPage,
        this.pageSize,
        this.search,
        this.selectedFloor,
        this.selectedBuilding,
        this.selectedLevel,
        this.selectedFaculty,
        this.selectedNationality,
        academicYearId,
        this.selectedIsEvacuated
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.students = res.data;
          this.totalCount = res.totalCount;
          this.totalPage = res.totalPages;
          this.totalCount = res.totalCount;
        },
      });
  }

  onAcademicYearChange(academicYearId: number) {
    this.getAllHousedStudents(academicYearId);
  }

  onIsEvacuatedChange(e) {
    this.selectedIsEvacuated = e.target.value;
    this.getAllHousedStudents(this.selectedAcademicYear.id);
  }

  onPaginationChange(page) {
    this.currentPage = page;
    this.getAllHousedStudents(this.selectedAcademicYear.id);
  }

  trackFn(id: any, item: IGetAllHousedStudents): number {
    return item.id;
  }

  onBuildingChange(e) {
    this.selectedBuilding = e.target.value;
    this.getAllHousedStudents(this.selectedAcademicYear.id);
  }

  onFloorChange(e) {
    this.selectedFloor = e.target.value;
    this.getAllHousedStudents(this.selectedAcademicYear.id);
  }

  onFacultyChange(e) {
    this.selectedFaculty = e.target.value;
    this.getAllHousedStudents(this.selectedAcademicYear.id);
  }

  onNationalityChange(e) {
    this.selectedNationality = e.target.value;
    this.getAllHousedStudents(this.selectedAcademicYear.id);
  }

  onLevelChange(e) {
    this.selectedLevel = e.target.value;
    this.getAllHousedStudents(this.selectedAcademicYear.id);
  }

  onSearchChange(e: any) {
    this.search = e.target.value;
    this.getAllHousedStudents(this.selectedAcademicYear.id);
  }
}
