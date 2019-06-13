import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyProfileComponent } from './my-profile.component';
import { RouterModule } from '@angular/router';
import { routes } from './my-profile.routing';
import { CropImageComponent } from './crop-image/crop-image.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ImageCropperModule,
    FormsModule
  ],
  declarations: [MyProfileComponent, CropImageComponent, ChangePasswordComponent]
})
export class MyProfileModule { }
