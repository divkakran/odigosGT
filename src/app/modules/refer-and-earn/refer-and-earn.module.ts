import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferAndEarnComponent } from './refer-and-earn.component';
import { routes } from './refer-and-earn.routing';
import { RouterModule } from '@angular/router';
import {
  Ng6SocialButtonModule,
  SocialServiceConfig
} from "ng6-social-button";

export function getAuthServiceConfigs() {
  let config = new SocialServiceConfig()
      .addFacebook("2088915221226786")
      .addGoogle("Your-Google-Client-Id");
  return config;
}

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes)
  ],
  declarations: [ReferAndEarnComponent],
  providers: [
    {
      provide: SocialServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
})
export class ReferAndEarnModule { }
