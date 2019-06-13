import { Routes } from '@angular/router';

import { TermsForTouristComponent } from '../terms-for-tourist/terms-for-tourist.component'

export const routes: Routes = [
    { path: '' , component: TermsForTouristComponent , pathMatch:'full'}
]