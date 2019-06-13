import { Routes } from '@angular/router';
import { MyTripsComponent } from './my-trips.component';
import { TripDetailForPaymentComponent } from './trip-detail-for-payment/trip-detail-for-payment.component';

export const routes: Routes = [
    {path:'' , component: MyTripsComponent , pathMatch: 'full'},
    {path:'payment' , component: TripDetailForPaymentComponent , pathMatch: 'full'} ,
    {path:'payment-summary' , loadChildren: '../payment-summary/payment-summary.module#PaymentSummaryModule'}
]