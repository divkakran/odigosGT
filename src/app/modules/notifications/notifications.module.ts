import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { routes } from './notifications.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule ,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent]
})
export class NotificationsModule { }
