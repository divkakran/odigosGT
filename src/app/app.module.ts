import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './modules/nav/nav.component';
import { FooterComponent } from './modules/footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouteGuard } from './helper/routeGuard';
import { SupportModule } from './modules/support/support.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angular-6-social-login";

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './helper/httpConfig.interceptor';
import { CustomUrlSerializer } from './helper/CustomUrlSerializer';
import { UrlSerializer } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './modules/login/login.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { SocialLoginComponent } from './modules/social-login/social-login.component';
import { TripSearchListComponent } from './modules/nav/trip-search-list/trip-search-list.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("2088915221226786")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("192850950117-t81iitjscuhlq8l4tisf7min1mdj9if4.apps.googleusercontent.com")
      },
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    NotFoundComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    SocialLoginComponent,
    TripSearchListComponent
  ],
  imports:[
    CommonModule,
    NgtUniversalModule,
    TransferHttpCacheModule,
    HttpClientModule, AppRoutingModule , HttpClientModule , BrowserAnimationsModule , 
    FormsModule ,ToastrModule.forRoot() , SocialLoginModule , SupportModule , NotificationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
    RouteGuard
  ],
})
export class AppModule { }
