import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EnquiryComponent } from './enquiry.component';
import { routes } from './enquiry.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes) ,
    FormsModule
  ],
  declarations: [EnquiryComponent]
})
export class EnquiryModule { }
