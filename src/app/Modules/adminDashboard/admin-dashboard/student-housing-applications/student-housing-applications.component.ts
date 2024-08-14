import { Component, OnInit } from '@angular/core';
import { housingApplicationStatus } from 'src/app/Enums/housingApplicationStatus';
import { IFacultyResponse } from 'src/app/Models/Responses/ifaculty-response';
import { IApplicationStatus } from 'src/app/Models/i-application-status';
import { ICountry } from 'src/app/Models/i-housing-app';
import { IAcademicYearResponse } from 'src/app/Models/iacademic-year';
import { IGetHousingApps } from 'src/app/Models/iget-housing-apps';
import { ConfigurationService } from 'src/app/Services/dashboardService/configuration.service';
import { StudentsAppsService } from 'src/app/Services/dashboardService/students-apps.service';
import { CollegesService } from '../../../../Services/colleges.service';

import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-student-housing-applications',
  templateUrl: './student-housing-applications.component.html',
  styleUrls: ['./student-housing-applications.component.css'],
})
export class StudentHousingApplicationsComponent implements OnInit {
  applicationStatuses: IApplicationStatus[];
  applications: IGetHousingApps[] = [];
  selectedStatusID: number = 0;
  currentPage = 1;
  pageSize = 50;
  totalCount = 0;
  totalPage = 1;
  countries: ICountry[] = [];
  faculties: IFacultyResponse[] = [];
  // year: Date = new Date();
  status: number = 0;
  // currentYear: number = this.year.getFullYear();
  // last5Years: number[] = [];
  selectedAcademicYear: IAcademicYearResponse;
  AcademicYears: IAcademicYearResponse[] = [];
  IsEgyptian: boolean = false;
  IsNotEgyptian: boolean = false;
  IsOld: boolean = false;
  IsNew: boolean = false;
  IsRegular: boolean = false;
  IsPremium: boolean = false;
  levelOrder: number = 0;
  facultyId: number = 0;
  search: string = '';

  housingStatus = housingApplicationStatus;
  constructor(
    private destroyRef: DestroyRef,
    private facultiesService: CollegesService,
    private studentsAppsService: StudentsAppsService,
    private configurationService: ConfigurationService
  ) {
    this.applicationStatuses = Object.values(
      housingApplicationStatus
    ).map<IApplicationStatus>((h) => ({
      id: h.id,
      name: h.arName,
    }));
  }

  ngOnInit(): void {
    this.getAcademicYear();
    this.getFaculties();

    // this.getAcademicYear()
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

  getAcademicYear() {
    this.configurationService
      .getAcademicYears()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.AcademicYears = res.data;
        this.selectedAcademicYear = this.AcademicYears.find((a) => a.isCurrent);

        this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
      });
  }
  onAcademicYearChange(academicYearId: number) {
    this.getAllStudentsHousingApps(academicYearId);
  }

  onHousingTypeChange(e) {
    if (e.target.value == 1) {
      this.IsRegular = true;
      this.IsPremium = false;
      this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
    }
    if (e.target.value == 2) {
      this.IsRegular = false;
      this.IsPremium = true;
      this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
    } else {
      this.IsRegular = false;
      this.IsPremium = false;
      this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
    }
  }

  onOldOrNewChange(e) {
    if (e.target.value == 1) {
      this.IsOld = true;
      this.IsNew = false;
      this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
    }
    if (e.target.value == 2) {
      this.IsOld = false;
      this.IsNew = true;
      this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
    } else {
      this.IsOld = false;
      this.IsNew = false;
      this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
    }
  }

  onPaginationChange(page) {
    this.currentPage = page;
    this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
  }

  onLevelChange(e) {
    this.levelOrder = Number(e.target.value);
    this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
  }

  onNationalityChange(e) {
    if (e.target.value == 1) {
      this.IsEgyptian = true;
      this.IsNotEgyptian = false;
      this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
    }
    if (e.target.value == 2) {
      this.IsEgyptian = false;
      this.IsNotEgyptian = true;
      this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
    } else {
      this.IsEgyptian = false;
      this.IsNotEgyptian = false;
      this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
    }
  }

  onFacultyChange(e) {
    this.facultyId = Number(e.target.value);
    this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
  }

  onSearchChange(e) {
    this.search = e.target.value;
    this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
  }

  onSearchClick(search) {
    this.search = search;
    this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
  }

  onStatusChange(e) {
    this.status = Number(e.target.value);
    this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
  }

  getAllStudentsHousingApps(academicYearId: number) {
    this.studentsAppsService
      .getStudentsHousingApplications(
        this.currentPage,
        this.pageSize,
        this.status,
        academicYearId,
        this.levelOrder,
        this.facultyId,
        this.IsEgyptian,
        this.IsNotEgyptian,
        this.IsOld,
        this.IsNew,
        this.IsRegular,
        this.IsPremium,
        this.search
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.applications = res.data;

          this.totalCount = res.totalCount;
          this.totalPage = res.totalPages;
          this.totalCount = res.totalCount;
          console.log(res.data);
          
        },
      });
  }
  // change housing status by application id
  changeHousingStatus(id: number, statusId: number) {
    this.studentsAppsService
      .changeHousingStatus(id, statusId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          // this.applications.find((app) => app.id === id).status = status.arName;

          this.getAllStudentsHousingApps(this.selectedAcademicYear.id);
        },
      });
  }
}
