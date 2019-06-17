import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from './guide-information.routing';
import { RouterModule } from '@angular/router';
import { GuideInformationComponent } from './guide-information.component';
import { FormsModule } from '@angular/forms';
import { ThankYouComponent } from './thank-you/thank-you.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule ,
  ],
  declarations: [GuideInformationComponent, ThankYouComponent],
  exports: [ GuideInformationComponent ]
})
export class GuideInformationModule { }
