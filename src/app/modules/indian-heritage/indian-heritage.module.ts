import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndianHeritageComponent } from './indian-heritage.component';

import { RouterModule } from '@angular/router';
import { routes } from './indian-heritage.routing';
import { SafePipe } from '../../helper/sanitizePipe'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IndianHeritageComponent , SafePipe]
})
export class IndianHeritageModule { }
