import { Component, OnInit, DestroyRef } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { IProfile } from 'src/app/Models/iprofile';
import { ProfileService } from 'src/app/Services/profile.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  photoUrl = environment.domain;
  profileData: IProfile;
  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;
  constructor(
    private destroyRef: DestroyRef,
    private profileService: ProfileService,
    private toastService: NgToastService // private router: Router
  ) {}
  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.profileService
      .getProfileData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.profileData = res.data;
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFileUrl = reader.result as string;
      };
    }
  }

  uploadImage() {
    if (!this.selectedFile) {
      this.toastService.error({
        detail: 'خطأ',
        summary: 'لم يتم اختيار صورة جديدة   ',
        duration: 3000,
      });
      return;
    }
    this.profileService
      .uploadProfilePhoto(this.selectedFile)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.closeModal();
        this.toastService.success({
          detail: 'صحيح',
          summary: 'تم تعديل الصورة بنجاح',
          duration: 3000,
        });
        window.location.reload();
      });
  }

  // Close Modal Content
  closeModal() {
    const closeBtnRef = document.getElementById('closeBtn');
    closeBtnRef?.click();
  }
}
