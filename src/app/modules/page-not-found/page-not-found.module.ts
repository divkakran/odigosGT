import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';

import { RouterModule } from '@angular/router';
import { routes } from './page-not-found.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
