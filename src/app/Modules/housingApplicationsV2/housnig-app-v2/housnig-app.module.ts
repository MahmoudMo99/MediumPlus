import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingApplicationsFormComponent } from './housing-applications-form/housing-applications-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HousingDetailsComponent } from './housing-details/housing-details.component';

@NgModule({
  declarations: [HousingApplicationsFormComponent, HousingDetailsComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [HousingApplicationsFormComponent, HousingDetailsComponent],
})
export class HousnigAppModule {}
