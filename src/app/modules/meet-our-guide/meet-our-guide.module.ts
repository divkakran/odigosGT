import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetOurGuideComponent } from './meet-our-guide.component';

import { RouterModule } from '@angular/router';
import { routes } from './meet-our-guide.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeetOurGuideComponent]
})
export class MeetOurGuideModule { }
