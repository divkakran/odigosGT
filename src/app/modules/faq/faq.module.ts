import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';

import { routes } from './faq.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes)
  ],
  declarations: [FaqComponent]
})
export class FaqModule { }
