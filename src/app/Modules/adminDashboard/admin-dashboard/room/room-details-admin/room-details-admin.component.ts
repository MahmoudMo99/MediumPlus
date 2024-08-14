import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IGetRoomByIdAdmin } from 'src/app/Models/Responses/iget-available-rooms';
import { IAddBedToRoom } from 'src/app/Models/ibeds';
import { BedsService } from 'src/app/Services/dashboardService/beds.service';
import { RoomService } from 'src/app/Services/dashboardService/room.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-room-details-admin',
  templateUrl: './room-details-admin.component.html',
  styleUrls: ['./room-details-admin.component.css'],
})
export class RoomDetailsAdminComponent implements OnInit {
  room: IGetRoomByIdAdmin;
  newBedNumber: number;
  roomId: number;

  constructor(
    private destroyRef: DestroyRef,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private bedsService: BedsService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.getRoomId();
  }

  getRoomId() {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = +params['id'];
        this.roomId = +id;
        this.getRoomData(id);
      });
  }

  getRoomData(id: number) {
    this.roomService
      .getRoom(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.room = res.data;
      });
  }

  addBed() {
    if (this.room) {
      const newBedNumber = this.room.beds.length + 1;
      const newBed: IAddBedToRoom = {
        roomId: this.roomId,
        number: newBedNumber,
      };
      this.bedsService
        .addBedToRoom(newBed)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.toast.success({
              detail: 'صحيح',
              summary: 'تم اضافة سرير بنجاح',
              duration: 3000,
            });
            this.getRoomData(this.roomId);
          },
        });
    }
  }
  deleteBed() {
    if (this.room.beds.length > 0) {
      const lastBedId = this.room.beds[this.room.beds.length - 1].id;
      this.bedsService
        .deleteBedFromRoom(lastBedId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.toast.success({
              detail: 'صحيح',
              summary: 'تم حذف السرير بنجاح ',
              duration: 3000,
            });
            this.getRoomData(this.roomId);
          },
        });
    } else {
      this.toast.error({
        detail: 'خطأ',
        summary: '  لا يوجد سراير فى الغرفة لحذفها     ',
        duration: 3000,
      });
      return;
    }
  }
}
