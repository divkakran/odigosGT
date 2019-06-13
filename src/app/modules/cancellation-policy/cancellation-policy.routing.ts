import { Routes } from '@angular/router';

import { CancellationPolicyComponent } from '../cancellation-policy/cancellation-policy.component';

export const routes: Routes = [
    { path: '' , component: CancellationPolicyComponent , pathMatch:'full'}
]