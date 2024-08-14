import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFacultyResponse } from 'src/app/Models/Responses/ifaculty-response';
import { FacultyService } from 'src/app/Services/dashboardService/faculty.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-faculty-details',
  templateUrl: './faculty-details.component.html',
  styleUrls: ['./faculty-details.component.css'],
})
export class FacultyDetailsComponent implements OnInit {
  faculty: IFacultyResponse;
  constructor(
    private destroyRef: DestroyRef,
    private facultyService: FacultyService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.RoomData();
  }

  RoomData() {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params['id'];
        this.facultyService
          .getFaculty(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.faculty = res.data;
          });
      });
  }
}
