import { Routes } from '@angular/router';

import { GuideRedirectComponent } from './guide-redirect.component';
export const routes: Routes = [
    { path: '' , component: GuideRedirectComponent , pathMatch:'full'}
]