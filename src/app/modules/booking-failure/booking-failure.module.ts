import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingFailureComponent } from './booking-failure.component';
import { routes } from './booking-failure.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes)
  ],
  declarations: [BookingFailureComponent]
})
export class BookingFailureModule { }
