import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStaffGetById } from 'src/app/Models/istaff';
import { StaffService } from 'src/app/Services/dashboardService/staff.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css'],
})
export class StaffDetailsComponent implements OnInit {
  staffId: number;
  staffData: IStaffGetById;
  constructor(
    private destroyRef: DestroyRef,
    private activatedRoute: ActivatedRoute,
    private StaffService: StaffService
  ) {}
  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.staffId = +this.activatedRoute.snapshot.paramMap.get('id');
      if (this.staffId != null) {
        this.getStaffData();
      }
    }
  }

  getStaffData() {
    this.StaffService.getStaffById(this.staffId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.staffData = res.data;
      });
  }
}
