import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EasyBookingComponent } from './easy-booking.component';
import { RouterModule } from '@angular/router';
import { routes } from './easy-booking.route';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule , FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EasyBookingComponent]
})
export class EasyBookingModule { }
