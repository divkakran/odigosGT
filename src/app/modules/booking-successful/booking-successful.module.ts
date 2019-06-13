import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingSuccessfulComponent } from './booking-successful.component';
import { RouterModule } from '@angular/router';
import { routes } from './booking-successful.routing';

@NgModule({
  imports: [
    CommonModule , 
    RouterModule.forChild(routes)
  ],
  declarations: [BookingSuccessfulComponent]
})
export class BookingSuccessfulModule { }
