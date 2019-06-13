import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideRedirectComponent } from './guide-redirect.component';

import { routes } from './guide-redirect.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GuideRedirectComponent]
})
export class GuideRedirectModule { }
