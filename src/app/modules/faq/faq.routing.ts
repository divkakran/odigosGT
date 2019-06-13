import { Routes } from '@angular/router';

import { FaqComponent } from '../faq/faq.component'
export const routes: Routes = [
    { path: '' , component: FaqComponent , pathMatch:'full'}
]