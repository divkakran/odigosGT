import { Component, OnInit , Output , EventEmitter , OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpCallService } from '../../helper/httpCall.service';
import { apiUrl } from '../../app.constants';
import { Toaster } from '../../helper/toaster';
import { Validations } from '../../helper/validations';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit , OnDestroy {
  @Output() closeForgotPasswordEvent = new EventEmitter<Object>();
  baseImageUrl: String;
  openThankuPopUp : boolean = false;
  constructor(private _httpCall: HttpCallService , private toaster: Toaster) { }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("backdrop");   //add the class
    var element = document.createElement("div");
    element.setAttribute("class", 'overlay');
    document.body.appendChild(element);
  }
  closeForgotPasswordOnClick(){
    let _temp = {closeForgotForm: true , closeLoginForm: false}
    this.closeForgotPasswordEvent.emit(_temp);
  }
  resetPassword(val){ 
    let _temp = new Validations().forgotPasswordValidations(val);
    if(_temp.isOkay){
      this._httpCall.callApi('POST', apiUrl.forgotPassword , {email:val}).subscribe((res) => {
        if(res && res['body']){
          if(res['body'].status == 1){
            this.openThankuPopUp = true;
            console.log(res['body']);
          }else{
            this.toaster.showWaring(res['body'].message);
          }
        }
      });
    }else{
      this.toaster.showWaring(_temp.msg);
    }
  }
  ngOnDestroy(){
    let c = document.querySelector('.overlay');
    c.classList.remove('overlay');
    let backdrop = document.querySelector('.backdrop');
    backdrop.classList.remove('backdrop');
  }
}
