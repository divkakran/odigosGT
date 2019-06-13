import { Routes } from '@angular/router';
import { PaymentSummaryComponent } from './payment-summary.component';

export const routes: Routes = [
    {path: '' , component : PaymentSummaryComponent , pathMatch: 'full'}
]