import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancellationPolicyComponent } from './cancellation-policy.component';

import { routes } from './cancellation-policy.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes)
  ],
  declarations: [CancellationPolicyComponent]
})
export class CancellationPolicyModule { }
