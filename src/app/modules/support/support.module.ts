import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';
import { RouterModule } from '@angular/router';
import { routes } from './support.routing';

@NgModule({
  imports: [
    CommonModule , 
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [SupportComponent] ,
  exports: [SupportComponent]
})
export class SupportModule { }
