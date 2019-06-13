import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRedirectionComponent } from './blog-redirection.component';

import { routes } from './blog-redirection.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogRedirectionComponent]
})
export class BlogRedirectionModule { }
