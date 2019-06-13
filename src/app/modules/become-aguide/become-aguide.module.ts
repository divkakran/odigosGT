import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BecomeAGuideComponent } from './become-aguide.component';
import { routes } from './become-aguide.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [BecomeAGuideComponent]
})
export class BecomeAGuideModule { }
