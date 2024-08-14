import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGetRoomById } from 'src/app/Models/Responses/iget-available-rooms';
import { RoomSelectionService } from 'src/app/Services/room-selection.service';
import { NgToastService } from 'ng-angular-popup';
import { ProfileService } from 'src/app/Services/profile.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-room-details-user',
  templateUrl: './room-details-user.component.html',
  styleUrls: ['./room-details-user.component.css'],
})
export class RoomDetailsUserComponent implements OnInit {
  photoUrl = environment.domain;

  // for modal Content
  modal = {
    modalTitleMessageInModal: '',
    modalBodyMeassageInModal: '',
  };
  selectedBed: number;
  room: IGetRoomById;
  roomdId: number;
  IsStudentHasRoom: boolean;

  constructor(
    private destroyRef: DestroyRef,
    private roomService: RoomSelectionService,
    private activateRoute: ActivatedRoute,
    private toast: NgToastService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getIdFromRouter();
    this.getProfileData();
  }
  getProfileData() {
    this.profileService
      .getProfileData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.IsStudentHasRoom = res.data.hasRoom;
      });
  }

  // get id from Router
  getIdFromRouter() {
    this.activateRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const RoomId = +params['rid'];
        this.roomdId = RoomId;
        if (!isNaN(RoomId)) {
          this.getRoomDetails(RoomId);
        }
      });
  }

  // get Room Details
  getRoomDetails(roomId: number) {
    this.roomService
      .getRoomById(roomId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.room = res.data;
        },
      });
  }
  // check if select bed
  checkSelectBed() {
    if (this.selectedBed) {
      this.DisplayModalContent();
    } else {
      this.toast.error({
        detail: 'خطأ',
        summary: ' يجب عليك اختيار سرير اولا ',
        duration: 5000,
      });
    }
  }
  // Modal Content Chanegs
  DisplayModalContent() {
    if (this.IsStudentHasRoom) {
      this.modal.modalTitleMessageInModal =
        '  هل انت متأكد من تعديل اختيار سريرك الذي قمت بإختياره سابقا ؟';
      this.modal.modalBodyMeassageInModal =
        ' للعلم :  سيتم الغاء حجز سريرك الذي  قمت بإختياره سابقا من قبل واختيار هذا السرير بدلا منه .';
    } else {
      this.modal.modalTitleMessageInModal =
        'هل انت متأكد من اختيار هذا السرير ؟';
      this.modal.modalBodyMeassageInModal =
        'سيتم حجز هذا السرير لك فى هذه الغرفة .';
    }
  }

  // Close Modal Content
  closeModal() {
    const closeBtnRef = document.getElementById('closeBtn');
    closeBtnRef?.click();
  }

  // book and edit bed
  bookBed() {
    const message = this.IsStudentHasRoom
      ? 'تم تعديل السرير بنجاح'
      : 'تم اختيار السرير بنجاح';
    this.roomService
      .selectBed(this.selectedBed)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.closeModal();
        this.getProfileData();
        this.getRoomDetails(this.roomdId);
        this.toast.success({
          detail: 'صحيح',
          summary: message,
          duration: 5000,
        });
      });
  }
}
