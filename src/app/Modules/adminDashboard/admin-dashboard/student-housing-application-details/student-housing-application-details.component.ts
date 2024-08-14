import { StudentsAppsService } from 'src/app/Services/dashboardService/students-apps.service';
import { Component, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApplicationStatus } from 'src/app/Models/i-application-status';
import { IGetHousingAppByIdInAdmin } from 'src/app/Models/Responses/iget-housing-app-by-id-in-admin-V2';
import { housingApplicationStatus } from 'src/app/Enums/housingApplicationStatus';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-housing-application-details',
  templateUrl: './student-housing-application-details.component.html',
  styleUrls: ['./student-housing-application-details.component.css'],
})
export class StudentHousingApplicationDetailsComponent implements OnInit {
  imageUrl = environment.domain;
  housingAppDetails: IGetHousingAppByIdInAdmin;
  housingAppId: number;
  applicationStatuses: IApplicationStatus[];
  housingStatus = housingApplicationStatus;

  constructor(
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private studentsAppsService: StudentsAppsService
  ) {
    this.applicationStatuses = [
      { id: 1, name: 'Pending' },
      { id: 2, name: 'Approved' },
      { id: 3, name: 'Rejected' },
    ];
  }

  ngOnInit(): void {
    this.getStudentHousingAppDetailsBy();
  }

  getStudentHousingAppDetailsBy() {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.housingAppId = params['id'];
        this.studentsAppsService
          .getStudentHousingAppDetailsById(this.housingAppId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (res) => {
              this.housingAppDetails = res.data;
            },
            error: (err) => {},
          });
      });
  }

  changeHousingStatus(id: number, statusId: number) {
    this.studentsAppsService
      .changeHousingStatus(id, statusId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.getStudentHousingAppDetailsBy();
        },
      });
  }
}
