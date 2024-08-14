import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { IBuildingResponse } from 'src/app/Models/Responses/i-building-data-response';
import { BuildingService } from 'src/app/Services/dashboardService/building.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-building-table',
  templateUrl: './building-table.component.html',
  styleUrls: ['./building-table.component.css'],
})
export class BuildingTableComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 50;
  totalCount = 0;
  totalPage = 1;
  search: string = '';
  selectedType: string = '';
  selectedIsActive: string = '';
  buildings: IBuildingResponse[] = [];
  buildingToDeleteId: number | null = null;
  constructor(
    private destroyRef: DestroyRef,
    private buildingService: BuildingService,
    private toast: NgToastService
  ) {}
  ngOnInit() {
    this.getBuildings();
  }
  getBuildings() {
    this.buildingService
      .getAllBuildings(
        this.currentPage,
        this.pageSize,
        this.search,
        this.selectedIsActive,
        this.selectedType
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.buildings = res.data;

        this.totalCount = res.totalCount;
        this.totalPage = res.totalPages;
      });
  }

  trackFn(id: any, item: IBuildingResponse): number {
    return item.id;
  }
  onSearchChange(e) {
    this.search = e.target.value;
    this.getBuildings();
  }
  onPaginationChange(page) {
    this.currentPage = page;
    this.getBuildings();
  }
  onTypeChange(e) {
    this.selectedType = e.target.value;
    this.getBuildings();
  }
  onIsActiveChange(e) {
    this.selectedIsActive = e.target.value;
    this.getBuildings();
  }

  setBuildingToDelete(buildingId: number) {
    this.buildingToDeleteId = buildingId;
  }

  deleteBuilding() {
    if (this.buildingToDeleteId) {
      this.buildingService
        .deleteBuilding(this.buildingToDeleteId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            // Close modal after deletion
            this.closeModal();
            // Refresh building list or handle as needed
            this.getBuildings();
            this.toast.success({
              detail: 'صحيح',
              summary: 'تم حذف المبنى بنجاح',
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
}
