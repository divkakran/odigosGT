import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';
import { HttpCallService } from '../../helper/httpCall.service';
import { apiUrl } from '../../app.constants';
import { Validations } from '../../helper/validations';
import { Toaster } from '../../helper/toaster';
import { SignUpModel } from '../sign-up/signUpModel';
import { Encryption } from '../../helper/encryption';
@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  @Input() signUpWithSocial  : Object;
  @Output() closeSocialLoginEvent = new EventEmitter<Object>();
  signUpFormObject  : Object  = {name:'' , email:'' , password:'' , countryId:'' , currencyId:'' , mobile:'' , acceptTerms:'' , login_type:'' , socialLogin: true};
  
  countryList       : Array<string>;
  currencyList      : Array<string>;
  setButtonDisable  : boolean = false;

  constructor(private httpCall: HttpCallService , private toastr: Toaster , private encrypt: Encryption) {}

  ngOnInit() {
    if(this.signUpWithSocial){ 
      for(let item in this.signUpWithSocial){
        this.signUpFormObject[item] = this.signUpWithSocial[item];
      }
    }
    this.httpCall.callApi('GET',apiUrl.signUpData,{}).subscribe((res) => {
      if(res && res['body']){
        this.countryList  = res['body'].countryList;
        this.currencyList = res['body'].currencyList;
      }
    });
  }
  signUpClick(obj){ 
    this.setButtonDisable = true;
    let validate = new Validations().signUpValidations(this.signUpFormObject);
    if(!validate.isOkay){
      this.toastr.showWaring( validate.msg );
      this.setButtonDisable = false;
    }else{
      let _temp = new SignUpModel(obj.name , this.signUpFormObject['email'] , (Math.floor(Math.random() * (99999 - 9999) ) + 9999) , this.signUpFormObject['login_type'] , 'WEB' , '1234' ,
      this.signUpFormObject['countryId'] , this.signUpFormObject['currencyId'] , this.signUpWithSocial['socialId'] , obj.mobile);
      this.httpCall.callApi('POST' , apiUrl.signUp , _temp).subscribe((res) => {
        if(res && res['body']){
          let body = res['body'];
          if(body.status == 1){
            this.removeBackdropClass();
            this.closeSocialLoginEvent.emit({closeAll: true});
            this.toastr.showSucess(body.message);
            let encryptUserDetail = JSON.stringify(res['body'].userDetails);
            localStorage.setItem('$user' , encryptUserDetail);
          }else{
            this.toastr.showWaring(body.message);
            this.setButtonDisable = false;
          }
        }
      });
    }
  }
  removeBackdropClass(){
    let c = document.querySelector('.overlay');
    c.classList.remove('overlay');
    let backdrop = document.querySelector('.backdrop');
    backdrop.classList.remove('backdrop');
  }
  closeSocialLogin(){
    this.closeSocialLoginEvent.emit({closeAll: false , openLoginForm: true});
  }
  dropdownsValueClicked(id , type){
    switch(type){
      case 'country' : {
        this.signUpFormObject['countryId'] = id;
        break;
      }
      case 'currency' : {
        this.signUpFormObject['currencyId'] = id;
        break;
      }
    }
  }
}
