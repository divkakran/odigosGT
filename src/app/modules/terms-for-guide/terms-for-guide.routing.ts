import { Routes } from '@angular/router';

import { TermsForGuideComponent } from '../terms-for-guide/terms-for-guide.component'

export const routes: Routes = [
    { path: '' , component: TermsForGuideComponent , pathMatch:'full'}
]