import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentSummaryComponent } from './payment-summary.component';
import { routes } from './payment-summary.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [PaymentSummaryComponent]
})
export class PaymentSummaryModule { }
