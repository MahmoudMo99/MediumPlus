import { SystemSettingsService } from './../../Services/dashboardService/system-settings.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISystemSettingsResponse } from 'src/app/Models/i-system-settings';
import { IAcademicYearResponse } from 'src/app/Models/iacademic-year';
import { AuthService } from 'src/app/Services/auth.service';

import { reloadEntireApp } from 'src/app/helpers/reloadEntireApp';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
import { ProfileService } from 'src/app/Services/profile.service';
import { IProfile } from 'src/app/Models/iprofile';
import { HousingService } from 'src/app/Services/housing.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  photoUrl = environment.domain;
  profileData: IProfile | null;

  showLinks = false;
  showArrow1: boolean = true;
  showArrow2: boolean = true;
  rotationDegree = 0;
  currentYear: IAcademicYearResponse;
  currentYearId: number;
  AcademicYears: IAcademicYearResponse[] = [];
  isUserLogged: boolean = false;
  settings: ISystemSettingsResponse;
  isRoomPeriodAvailable: boolean = false;
  isHousingPeriodAvailable: boolean = false;
  isHousingAppApproved: boolean = false;
  nowDate: Date;

  public role: string;
  constructor(
    private destroyRef: DestroyRef,
    private router: Router,
    public authService: AuthService,
    private systemSettingsService: SystemSettingsService,
    private profileService: ProfileService,
    private housingService: HousingService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.authService.IsStudent) {
      this.validatePeriodsSubscription();
      this.validateHousingApprovedSubscription();
    }
  }
  ngOnInit(): void {
    // this.isUserLogged = this.authService.isUserAuthenticated();
    this.updateLoggedStatus();
    this.profileData = this.activatedRoute.snapshot.data['studentProfile'];
  }

  getProfileData() {
    if (this.authService.IsStudent) {
      this.profileService
        .getProfileData()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.profileData = res.data;
        });
    }
  }

  toggleLinks() {
    this.showLinks = !this.showLinks; // Toggle the value
    this.rotationDegree += 90; // Increment rotation by 90 degrees
  }

  hideMenu() {
    this.showLinks = false; // Hide the menu
    this.rotationDegree -= 90; // Increment rotation by 90 degrees
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(reloadEntireApp);

    this.hideMenu();
  }
  updateLoggedStatus() {
    this.authService.isLoggedIn$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => (this.isUserLogged = status));
  }
  validatePeriodsSubscription() {
    this.systemSettingsService
      .validatePeriods()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.isRoomPeriodAvailable = res.roomSelectionPeriod.valid;
        this.isHousingPeriodAvailable = res.housingPeriod.valid;
      });
  }
  validateHousingApprovedSubscription() {
    this.housingService
      .isHousingAppApproved()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isApproved) => {
        this.isHousingAppApproved = isApproved;
      });
  }
}
