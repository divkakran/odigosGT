import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy.component';

import { RouterModule } from '@angular/router';
import { routes } from './privacy-policy.routing';

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes)
  ],
  declarations: [PrivacyPolicyComponent]
})
export class PrivacyPolicyModule { }
