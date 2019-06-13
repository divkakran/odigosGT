import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsForGuideComponent } from './terms-for-guide.component';

import { routes } from './terms-for-guide.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes)
  ],
  declarations: [TermsForGuideComponent]
})
export class TermsForGuideModule { }
