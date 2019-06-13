import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox.component';
import { RouterModule } from '@angular/router';
import { routes } from './inbox.routing';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule ,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InboxComponent]
})
export class InboxModule { }
