import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IEvacuatetion } from 'src/app/Models/Requests/ievacuatetion';
import { IGethousedStudentInAdmin } from 'src/app/Models/iget-all-housed-students';
import { HousedStudentsService } from 'src/app/Services/dashboardService/housed-students.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-housed-student-details',
  templateUrl: './housed-student-details.component.html',
  styleUrls: ['./housed-student-details.component.css'],
})
export class HousedStudentDetailsComponent implements OnInit {
  date: string;
  evacuationRequest: IEvacuatetion;
  deEvacuationRequest: IEvacuatetion;
  constructor(
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private housedStudentService: HousedStudentsService,
    private toast: NgToastService,
    private router: Router
  ) {}
  imageUrl = environment.domain;
  housedStudentDetails: IGethousedStudentInAdmin;
  housedStudentId: number;
  housingAppId: number;

  ngOnInit(): void {
    this.getHousedStudentById();
  }

  getHousedStudentById() {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.housingAppId = params['id'];

        this.housedStudentService
          .getHousedStudentById(this.housingAppId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (res) => {
              this.housedStudentDetails = res.data;
            },
          });
      });
  }
  evacuateStudent(housingApplicationId: number) {
    if (!this.date) {
      this.toast.error({
        detail: 'خطأ',
        summary: ' من فضلك ادخل تاريخ الاخلاء',
        duration: 3000,
      });
      return;
    }

    this.evacuationRequest = {
      housingApplicationId: housingApplicationId,
      date: this.date,
    };

    this.housedStudentService
      .evacuateStudent(this.evacuationRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم اخلاء الطالب بنجاح',
          duration: 3000,
        });
        const closeBtnRef = document.getElementById('closeBtn');
        closeBtnRef?.click();
        this.router.navigate(['/admin-dashboard/students']);
      });
  }

  deEvacuateStudent(housingApplicationId: number) {
    this.deEvacuationRequest = {
      housingApplicationId: housingApplicationId,
      date: null,
    };

    this.housedStudentService
      .evacuateStudent(this.deEvacuationRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toast.success({
          detail: 'صحيح',
          summary: 'تم الغاء اخلاء الطالب بنجاح',
          duration: 3000,
        });
        const closeBtnRef = document.getElementById('closeBtn');
        closeBtnRef?.click();
        this.router.navigate(['/admin-dashboard/students']);
      });
  }
}
