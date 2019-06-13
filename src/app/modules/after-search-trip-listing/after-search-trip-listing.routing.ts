import { Routes } from '@angular/router';

import { AfterSearchTripListingComponent } from './after-search-trip-listing.component';
import { SeeAllTripsComponent } from './see-all-trips/see-all-trips.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { OtherPackagesComponent } from './other-packages/other-packages.component';

export const routes: Routes = [
    {path:'' , component: AfterSearchTripListingComponent , pathMatch:'full'},
    {path:'see-all' , component: SeeAllTripsComponent},
    {path:'trip-category' , component: TripCardComponent},
    {path:'other-packages' , component: OtherPackagesComponent}
]