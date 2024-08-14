import { HousingService } from 'src/app/Services/housing.service';
import { SystemSettingsService } from 'src/app/Services/dashboardService/system-settings.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  IGetAvailableRooms,
  IGetAvailableRoomsRequest,
} from 'src/app/Models/Responses/iget-available-rooms';
import { RoomSelectionService } from 'src/app/Services/room-selection.service';
import { NgToastService } from 'ng-angular-popup';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, OnChanges {
  constructor(
    private destroyRef: DestroyRef,
    private roomService: RoomSelectionService,
    private router: Router,
    private systemSettingsService: SystemSettingsService,
    private housingService: HousingService,
    private toast: NgToastService
  ) {}
  @Input() sentSelectedBuilding: number = 0;
  @Input() sentSelectedFloor: number = 0;
  @Input() sentSelectedCity: number = 0;
  currentPage: number;
  pageSize: number;

  request: IGetAvailableRoomsRequest;

  rooms: IGetAvailableRooms[] = [];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.request = {
      pageNumber: 1,
      pageSize: 12,
      buildingId: this.sentSelectedBuilding,
      floorOrder: this.sentSelectedFloor,
      studentCityId: this.sentSelectedCity,
    } as IGetAvailableRoomsRequest;
    this.GetAvailableRooms(false);
  }

  // get available rooms
  GetAvailableRooms(showMore: boolean = true) {
    this.roomService
      .getAllAvailableRooms(this.request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        let filteredRooms = res.data.filter((r) => r.availablePlaces > 0);
        this.rooms = showMore
          ? [...this.rooms, ...filteredRooms]
          : filteredRooms;
      });
  }

  // load another page ( paginatation )
  loadMoreRooms() {
    this.request.pageNumber++;
    this.GetAvailableRooms();
  }

  // naviagte on room
  navigateToRoomDetails(roomId: number) {
    this.router.navigate(['rooms', roomId]);
  }
}
