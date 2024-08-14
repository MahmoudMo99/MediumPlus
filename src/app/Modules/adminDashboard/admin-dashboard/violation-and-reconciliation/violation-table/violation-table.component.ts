import { Component, OnInit, DestroyRef } from '@angular/core';
import { ITypesViolation } from 'src/app/Models/Requests/i-violation-request';
import { IViolationsResponses } from 'src/app/Models/Responses/i-violation-reconciliation-responses';
import { IFacultyResponse } from 'src/app/Models/Responses/ifaculty-response';
import { IAcademicYearResponse } from 'src/app/Models/iacademic-year';
import { CollegesService } from 'src/app/Services/colleges.service';
import { ConfigurationService } from 'src/app/Services/dashboardService/configuration.service';
import { ViolationReconciliationService } from 'src/app/Services/dashboardService/violation.reconciliation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-violation-table',
  templateUrl: './violation-table.component.html',
  styleUrls: ['./violation-table.component.css'],
})
export class ViolationTableComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 50;
  totalCount: number = 0;
  totalPage: number = 1;
  search: string = '';
  sortAscending: boolean = true;
  sortBy: string = '';
  selectedFaculty: number = 0;
  selectedViolationType: number = 0;
  selectedAcademicYear: number = 0;
  faculties: IFacultyResponse[] = [];
  AcademicYears: IAcademicYearResponse[] = [];
  violations: IViolationsResponses[] = [];

  types: ITypesViolation[] = [
    { id: 1, name: 'انذار بالحرمان' },
    { id: 2, name: ' حجب النتيجة الدراسية لعدم سداد مصروفات' },
    { id: 3, name: 'تجاوز مدة التصاريح ' },
    { id: 4, name: 'جزاء اداري' },
    { id: 5, name: 'مجلس تأديب' },
    { id: 6, name: 'لفت نظر' },
    { id: 7, name: 'اجراء التحقيق ' },
    { id: 8, name: 'تجاوز مدة الغياب ' },
    { id: 9, name: 'حرمان نهائي' },
    { id: 10, name: 'حرمان مؤقت' },
    { id: 11, name: 'تأخير ' },
    { id: 12, name: 'فصل شهر' },
    { id: 13, name: 'فصل اسبوعين' },
    { id: 14, name: 'فصل اسبوع' },
    { id: 15, name: ' انهاء الاقامة' },
  ];
  constructor(
    private destroyRef: DestroyRef,
    private configurationService: ConfigurationService,
    private violationService: ViolationReconciliationService,
    private facultiesService: CollegesService
  ) {}
  ngOnInit(): void {
    this.getFaculties();
    this.getAcademicYear();
    this.getViolations();
  }
  getViolations() {
    this.violationService
      .getAllStudentsHaveViolation(
        this.currentPage,
        this.pageSize,
        this.selectedFaculty,
        this.search,
        this.sortBy,
        this.sortAscending,
        this.selectedViolationType,
        this.selectedAcademicYear
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.violations = res.data;

        this.totalCount = res.totalCount;
        this.totalPage = res.totalPages;
        this.totalCount = res.totalCount;
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
  trackFn(id: any, item: any): number {
    return item.id;
  }
  getAcademicYear() {
    this.configurationService
      .getAcademicYears()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.AcademicYears = res.data;
        this.selectedAcademicYear =
          this.AcademicYears.find((a) => a.isCurrent)?.id ?? 0;
      });
  }

  sortTable(name: string) {
    this.sortBy = name;
    this.getViolations();
  }

  onPaginationChange(page) {
    this.currentPage = page;
    this.getViolations();
  }
}
