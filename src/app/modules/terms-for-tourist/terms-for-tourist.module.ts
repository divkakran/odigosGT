import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsForTouristComponent } from './terms-for-tourist.component';

import { routes } from './terms-for-tourist.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes)
  ],
  declarations: [TermsForTouristComponent]
})
export class TermsForTouristModule { }
