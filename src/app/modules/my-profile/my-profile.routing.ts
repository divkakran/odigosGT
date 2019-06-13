import { Routes } from '@angular/router';

import { MyProfileComponent } from './my-profile.component';
export const routes: Routes = [
    { path: '' , component: MyProfileComponent , pathMatch:'full'}
]