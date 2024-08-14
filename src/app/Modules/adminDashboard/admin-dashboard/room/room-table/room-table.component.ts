import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { IBuildingResponse } from 'src/app/Models/Responses/i-building-data-response';
import { IGetAvailableRooms } from 'src/app/Models/Responses/iget-available-rooms';
import { BuildingService } from 'src/app/Services/dashboardService/building.service';
import { RoomService } from 'src/app/Services/dashboardService/room.service';

import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.css'],
})
export class RoomTableComponent implements OnInit {
  totalCount = 0;
  currentPage: number = 1;
  pageSize: number = 50;
  selectedFloor: number = 0;
  selectedBuilding: number = 0;
  search: string = '';
  StudentCityId: number = 0;
  AvailableOnly: boolean = true;
  rooms: IGetAvailableRooms[] = [];
  roomToDeleteId: number | null = null;
  buildings: IBuildingResponse[] = [];
  
  constructor(
    private destroyRef: DestroyRef,
    private buildingService: BuildingService,
    private roomService: RoomService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.getAllBuilding();
    this.GetAvailableRooms();
  }

  // get  rooms
  GetAvailableRooms() {
    this.roomService
      .getAllRooms(
        this.currentPage,
        this.pageSize,
        this.selectedFloor,
        this.selectedBuilding,
        this.search,
        this.AvailableOnly
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.rooms = res.data;
          this.totalCount = res.totalCount;
        },
      });
  }

  onPaginationChange(page) {
    this.currentPage = page;
    this.GetAvailableRooms();
  }
  getAllBuilding() {
    this.buildingService
      .getAllBuildingsWithParam()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.buildings = res.data;
      });
  }

  trackFn(id: any, item: IGetAvailableRooms): number {
    return item.id;
  }

  onSearchChange(e: any) {
    this.search = e.target.value;
    this.GetAvailableRooms();
  }
  onFloorChange(e: any) {
    this.selectedFloor = e.target.value;
    this.GetAvailableRooms();
  }
  onBuildingChange(e: any) {
    this.selectedBuilding = e.target.value;
    this.GetAvailableRooms();
  }

  setBuildingToDelete(buildingId: number) {
    this.roomToDeleteId = buildingId;
  }
  deleteBuilding() {
    if (this.roomToDeleteId) {
      this.roomService
        .deleteRoom(this.roomToDeleteId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this.closeModal();
            this.GetAvailableRooms();
            this.toast.success({
              detail: 'صحيح',
              summary: 'تم حذف الغرفة بنجاح',
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
