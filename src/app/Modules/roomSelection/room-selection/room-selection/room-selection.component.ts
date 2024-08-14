import { Component, OnInit, DestroyRef } from '@angular/core';
import { ICity } from 'src/app/Models/i-housing-app';
import { RoomSelectionService } from 'src/app/Services/room-selection.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileService } from 'src/app/Services/profile.service';
import { IProfile } from 'src/app/Models/iprofile';
import { IBuildingsInRoomsStudent } from 'src/app/Models/Responses/i-building-data-response';

@Component({
  selector: 'app-room-selection',
  templateUrl: './room-selection.component.html',
  styleUrls: ['./room-selection.component.css'],
})
export class RoomSelectionComponent implements OnInit {
  constructor(
    private destroyRef: DestroyRef,
    private roomService: RoomSelectionService,
    private profileService: ProfileService
  ) {}

  selectedBuilding: number = 0;
  selectedFloor: number = 0;
  selectedCity: number = 0;
  profileData: IProfile;
  userGender: string;
  buildings: IBuildingsInRoomsStudent[] = [];
  // building: IBuildingsInRoomsStudent;
  cities: ICity[] = [];

  ngOnInit(): void {
    this.getAllBuildings();
    this.getAllCities();
    this.getProfileData();
  }

  getAllCities() {
    this.roomService
      .getAllCitites()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.cities = res.data;
        },
      });
  }
  // get prfile data to get gender
  getProfileData() {
    this.profileService
      .getProfileData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.profileData = res.data;
        this.userGender = res.data.personalInformation.gender;
        this.getAllBuildings();
      });
  }

  getAllBuildings() {
    this.roomService
      .getAllBuildings()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          // Filter buildings based on userGender
          if (this.userGender === 'ذكر') {
            this.buildings = res.data.filter(
              (building: IBuildingsInRoomsStudent) => building.type === 'ذكور'
            );
          } else {
            this.buildings = res.data.filter(
              (building: IBuildingsInRoomsStudent) => building.type === 'اناث'
            );
          }
        },
      });
  }
}
