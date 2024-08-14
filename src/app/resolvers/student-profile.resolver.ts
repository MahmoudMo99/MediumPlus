import { ProfileService } from './../Services/profile.service';
import type { ResolveFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { lastValueFrom, map, take } from 'rxjs';
import { IProfile } from '../Models/iprofile';

export const studentProfileResolver: ResolveFn<IProfile> = (route, state) => {
  const authService = inject(AuthService);
  const profileService = inject(ProfileService);

  if (!authService.IsStudent) {
    return null;
  }
  return lastValueFrom(
    profileService.getProfileData().pipe(
      take(1),
      map((res) => res.data)
    )
  );
};
