import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { IFacultyResponse } from 'src/app/Models/Responses/ifaculty-response';
import { FacultyService } from 'src/app/Services/dashboardService/faculty.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-faculty-table',
  templateUrl: './faculty-table.component.html',
  styleUrls: ['./faculty-table.component.css'],
})
export class FacultyTableComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 50;
  totalCount = 0;
  search: string = '';
  faculty: IFacultyResponse[] = [];
  pagedFaculties: IFacultyResponse[] = [];
  filteredFaculties: IFacultyResponse[] = [];
  // Variable to store the ID of the building to be deleted
  facultyToDeleteId: number | null = null;
  constructor(
    private destroyRef: DestroyRef,
    private facultyService: FacultyService,
    private toast: NgToastService
  ) {}
  ngOnInit() {
    this.getFaculties();
  }
  getFaculties() {
    this.facultyService
      .getAllFaculties(this.currentPage, this.pageSize, this.search)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.faculty = res.data;
        this.totalCount = res.totalCount;
      });
  }

  onPaginationChange(page) {
    this.currentPage = page;
    this.getFaculties();
  }
  setFacultyToDelete(facultyId: number) {
    this.facultyToDeleteId = facultyId;
  }

  deleteFaculty() {
    if (this.facultyToDeleteId) {
      this.facultyService
        .deleteFaculty(this.facultyToDeleteId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            // Close modal after deletion
            this.closeModal();
            // Refresh building list or handle as needed
            this.getFaculties();
            this.toast.success({
              detail: 'صحيح',
              summary: 'تم حذف الطلب بنجاح',
              duration: 3000,
            });
          },
        });
    }
  }

  closeModal() {
    const closeBtnRef = document.getElementById('closeBtn');
    closeBtnRef?.click();
  }

  onSearchChange(e) {
    this.search = e.target.value;
    this.getFaculties();
  }
}
