import { Routes } from '@angular/router';

import { GuideInformationComponent } from './guide-information.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

export const routes: Routes = [
    { path: '' , component: GuideInformationComponent , pathMatch:'full'},
    { path: 'thank-you' , component: ThankYouComponent }
]