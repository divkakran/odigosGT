import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { routes } from './home.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes) ,
    FormsModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
