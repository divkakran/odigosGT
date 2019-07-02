import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes , RouterModule} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import { RouteGuard } from './helper/routeGuard';

const routes: Routes = [
  {path: '' , loadChildren: './modules/home/home.module#HomeModule'},
  {path: 'trending-destinations-in-india' , loadChildren: './modules/trending-destination/trending-destination.module#TrendingDestinationModule'},
  {path: 'privacy-policy' , loadChildren: './modules/privacy-policy/privacy-policy.module#PrivacyPolicyModule'},
  {path: 'terms-for-tourist' , loadChildren: './modules/terms-for-tourist/terms-for-tourist.module#TermsForTouristModule'},
  {path: 'terms-for-guide' , loadChildren: './modules/terms-for-guide/terms-for-guide.module#TermsForGuideModule'},
  {path: 'faq' , loadChildren: './modules/faq/faq.module#FaqModule'},
  {path: 'cancellation-policy' , loadChildren: './modules/cancellation-policy/cancellation-policy.module#CancellationPolicyModule'},
  {path: 'inbox' , loadChildren: './modules/inbox/inbox.module#InboxModule' , canActivate: [RouteGuard]},
  {path: 'tour-guides' , loadChildren: './modules/meet-our-guide/meet-our-guide.module#MeetOurGuideModule'},
  {path: 'my-profile' , loadChildren: './modules/my-profile/my-profile.module#MyProfileModule'},
  {path: 'refer-and-earn' , loadChildren: './modules/refer-and-earn/refer-and-earn.module#ReferAndEarnModule' , canActivate: [RouteGuard]},
  {path: 'tour-guide/:name' , loadChildren: './modules/guide-information/guide-information.module#GuideInformationModule'},
  {path: 'tour-guide/:name/:placeUrl' , loadChildren: './modules/guide-information/guide-information.module#GuideInformationModule'},
  {path: 'booking-successful' , loadChildren: './modules/booking-successful/booking-successful.module#BookingSuccessfulModule'},
  {path: 'booking-failure' , loadChildren: './modules/booking-failure/booking-failure.module#BookingFailureModule' , canActivate: [RouteGuard]},
  // {path: 'tour-guide' , loadChildren: './modules/guide-redirect/guide-redirect.module#GuideRedirectModule'},
  {path: 'become-guide' , loadChildren: './modules/become-aguide/become-aguide.module#BecomeAGuideModule'},
  {path: 'India-heritage-walk-festival' , loadChildren: './modules/indian-heritage/indian-heritage.module#IndianHeritageModule'},
  {path: 'India-heritage-walk-festival/:type' , loadChildren: './modules/indian-heritage/indian-heritage.module#IndianHeritageModule'},
  {path: 'India-heritage-walk-festival/:type/:id' , loadChildren: './modules/indian-heritage/indian-heritage.module#IndianHeritageModule'},
  {path: 'support' , loadChildren: './modules/support/support.module#SupportModule'},
  {path: 'enquiry' , loadChildren: './modules/enquiry/enquiry.module#EnquiryModule'},
  {path: 'notifications' , loadChildren: './modules/notifications/notifications.module#NotificationsModule'},
  {path: 'trip-listing' , loadChildren: './modules/after-search-trip-listing/after-search-trip-listing.module#AfterSearchTripListingModule'},
  {path: 'easy-booking' , loadChildren: './modules/easy-booking/easy-booking.module#EasyBookingModule'},
  {path: 'my-trips' , loadChildren: './modules/my-trips/my-trips.module#MyTripsModule' , canActivate: [RouteGuard]},
  {path: 'blog/:id'  , loadChildren: './modules/blog-redirection/blog-redirection.module#BlogRedirectionModule'},
  {path: 'blog'  , redirectTo: 'blog/'},
  {path: 'not-found' , loadChildren:'./modules/page-not-found/page-not-found.module#PageNotFoundModule'},
  {path: '**', component:NotFoundComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
