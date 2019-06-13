import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AfterSearchTripListingComponent } from './after-search-trip-listing.component';
import { routes } from './after-search-trip-listing.routing';
import { SeeAllTripsComponent } from './see-all-trips/see-all-trips.component';
import { CategoryTripsComponent } from './category-trips/category-trips.component';
import { NgDatepickerModule } from 'ng2-datepicker';
import { TripCardComponent } from './trip-card/trip-card.component';
import { OtherPackagesComponent } from './other-packages/other-packages.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgDatepickerModule
  ],
  declarations: [AfterSearchTripListingComponent, SeeAllTripsComponent, CategoryTripsComponent, TripCardComponent, OtherPackagesComponent],
})
export class AfterSearchTripListingModule { }
