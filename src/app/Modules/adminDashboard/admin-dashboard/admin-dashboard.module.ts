import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { StudentHousingApplicationsComponent } from './student-housing-applications/student-housing-applications.component';
import { StudentHousingApplicationDetailsComponent } from './student-housing-application-details/student-housing-application-details.component';
import { RoomFormComponent } from './room/room-form/room-form.component';
import { FloorFormComponent } from './floor-form/floor-form.component';
import { BuildingFormComponent } from './building/building-form/building-form.component';
import { BuildingDetailsComponent } from './building/building-details/building-details.component';
import { RoomDetailsAdminComponent } from './room/room-details-admin/room-details-admin.component';
import { RouterModule } from '@angular/router';
import { BuildingTableComponent } from './building/building-table/building-table.component';
import { RoomTableComponent } from './room/room-table/room-table.component';
import { FacultyFormComponent } from './faculty/faculty-form/faculty-form.component';
import { FacultyTableComponent } from './faculty/faculty-table/faculty-table.component';
import { FacultyConfigurationAcceptedTableComponent } from './faculty-configuration-accepted-table/faculty-configuration-accepted-table.component';
import { SelectFacultiesInsideBuildingComponent } from './select-faculties-inside-building/select-faculties-inside-building.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { AddStaffFormComponent } from './staff/add-staff-form/add-staff-form.component';
import { StaffTableComponent } from './staff/staff-table/staff-table.component';
import { StaffDetailsComponent } from './staff/staff-details/staff-details.component';
import { FacultyDetailsComponent } from './faculty/faculty-details/faculty-details.component';
import { BuildingsStaffComponent } from './staff/buildings-staff/buildings-staff.component';
import { AcceptanceSettingsComponent } from './acceptance-settings/acceptance-settings.component';
import { ViolationFormAndDetailsComponent } from './violation-and-reconciliation/violation-form-and-details/violation-form-and-details.component';
import { ViolationTableComponent } from './violation-and-reconciliation/violation-table/violation-table.component';

import { SystemSettingsComponent } from './system-settings/system-settings.component';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { HousedStudentsTableComponent } from './housed-students/housed-students-table/housed-students-table.component';
import { HousedStudentDetailsComponent } from './housed-students/housed-student-details/housed-student-details.component';
@NgModule({
  declarations: [
    StudentHousingApplicationsComponent,
    StudentHousingApplicationDetailsComponent,
    RoomFormComponent,
    FloorFormComponent,
    BuildingFormComponent,
    BuildingDetailsComponent,
    BuildingTableComponent,
    RoomDetailsAdminComponent,
    RoomTableComponent,
    FacultyFormComponent,
    FacultyTableComponent,
    FacultyConfigurationAcceptedTableComponent,
    SelectFacultiesInsideBuildingComponent,
    TermsAndConditionsComponent,
    AddStaffFormComponent,
    StaffTableComponent,
    StaffDetailsComponent,
    FacultyDetailsComponent,
    BuildingsStaffComponent,
    AcceptanceSettingsComponent,
    ViolationFormAndDetailsComponent,
    ViolationTableComponent,
    SystemSettingsComponent,
    AcademicYearComponent,
    HousedStudentsTableComponent,
    HousedStudentDetailsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule,
    RouterModule,
    MatSelectModule,
    MatIconModule,
  ],
  exports: [
    FacultyFormComponent,
    FacultyTableComponent,
    StudentHousingApplicationsComponent,
    StudentHousingApplicationDetailsComponent,
    RoomFormComponent,
    FloorFormComponent,
    BuildingFormComponent,
    BuildingDetailsComponent,
    BuildingTableComponent,
    RoomDetailsAdminComponent,
    RoomTableComponent,
    FacultyFormComponent,
    FacultyTableComponent,
    FacultyConfigurationAcceptedTableComponent,
    SelectFacultiesInsideBuildingComponent,
    TermsAndConditionsComponent,
    AddStaffFormComponent,
    StaffTableComponent,
    StaffDetailsComponent,
    FacultyDetailsComponent,
    BuildingsStaffComponent,
    AcceptanceSettingsComponent,
    ViolationFormAndDetailsComponent,
    ViolationTableComponent,
    SystemSettingsComponent,
    AcademicYearComponent,
    HousedStudentsTableComponent,
    HousedStudentDetailsComponent,
  ],
})
export class AdminDashboardModule {}
