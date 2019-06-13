import { Routes } from '@angular/router';

import { PrivacyPolicyComponent } from './privacy-policy.component';

export const routes: Routes = [
    { path: '' , component: PrivacyPolicyComponent ,pathMatch:'full'}
]