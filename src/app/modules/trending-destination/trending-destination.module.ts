import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendingDestinationComponent } from './trending-destination.component';

import { RouterModule } from  '@angular/router';
import { routes } from './trending-destination.routing';

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes),
  ],
  declarations: [TrendingDestinationComponent]
})
export class TrendingDestinationModule { }
