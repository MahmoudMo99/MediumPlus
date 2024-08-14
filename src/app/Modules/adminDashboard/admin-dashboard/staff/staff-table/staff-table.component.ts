import { Component, OnInit, DestroyRef } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { IStaffGetAll } from 'src/app/Models/istaff';
import { StaffService } from 'src/app/Services/dashboardService/staff.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-staff-table',
  templateUrl: './staff-table.component.html',
  styleUrls: ['./staff-table.component.css'],
})
export class StaffTableComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 50;
  totalCount = 0;
  search: string = '';

  staffToDeleteId: number | null = null;

  staff: IStaffGetAll[] = [];

  constructor(
    private destroyRef: DestroyRef,
    private toast: NgToastService,
    private StaffService: StaffService
  ) {}

  ngOnInit(): void {
    this.getAllStaff();
  }

  getAllStaff() {
    this.StaffService.getAllStaff(this.currentPage, this.pageSize, this.search)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.staff = res.data;
        this.totalCount = res.totalCount;
      });
  }

  onPaginationChange(page) {
    this.currentPage = page;
    this.getAllStaff();
  }

  setFacultyToDelete(staffId: number) {
    this.staffToDeleteId = staffId;
  }

  deleteStaff() {
    if (this.staffToDeleteId) {
      this.StaffService.deleteStaff(this.staffToDeleteId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this.closeModal();
            this.toast.success({
              detail: 'صحيح',
              summary: 'تم حذف الموظف بنجاح',
              duration: 3000,
            });
            this.getAllStaff();
          },
        });
    }
  }

  onSearchChange(e) {
    this.search = e.target.value;
    this.getAllStaff();
  }

  closeModal() {
    const closeBtnRef = document.getElementById('closeBtn');
    closeBtnRef?.click();
  }
}
