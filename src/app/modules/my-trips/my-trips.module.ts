import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTripsComponent } from './my-trips.component';
import { RouterModule } from '@angular/router';
import { routes } from './my-trips.routing';
import { TripCardComponent } from './trip-card/trip-card.component';
import { ViewDetailComponent } from './view-detail/view-detail.component';
import { TripDetailForPaymentComponent } from './trip-detail-for-payment/trip-detail-for-payment.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyTripsComponent, TripCardComponent, ViewDetailComponent, TripDetailForPaymentComponent]
})
export class MyTripsModule { }
