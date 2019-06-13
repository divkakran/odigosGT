import { environment } from './../../../environments/environment';
import { Component, OnInit , Output , EventEmitter , Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallService } from '../../helper/httpCall.service';
import { apiUrl } from '../../app.constants';
import { Validations } from '../../helper/validations';
import { Toaster } from '../../helper/toaster';
import { SignUpModel } from './signUpModel';
import { SocialLogin } from '../../helper/socialLogin';
import { LoginModel } from '../login/login-model';
import { AuthService } from 'angular-6-social-login';
import { DataPassingService } from '../../helper/dataPassingService';
import { Encryption } from '../../helper/encryption';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @Output() closeSignUpFormEvent = new EventEmitter<Object>();
  baseImageUrl      : string;
  showPassword      : boolean = false;
  countryList       : Array<string>;
  currencyList      : Array<string>;
  signUpFormObject  : Object  = {name:'' , email:'' , password:'' , countryId:'' , currencyId:'' , mobile:'' , acceptTerms:'' , login_type:'EMAIL'};
  setButtonDisable  : boolean = false;
  isReadOnly        : boolean = false;
  _userDetailSignUp : Object;
  constructor(private route: Router , private httpCall: HttpCallService , private toastr: Toaster , 
    private socialAuthService: AuthService , private dataPassingService: DataPassingService , private encrypt: Encryption ) { 
    this.baseImageUrl = environment.baseImageUrl;
  }

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("backdrop");   //add the class
    var element = document.createElement("div");
    element.setAttribute("class", 'overlay');
    document.body.appendChild(element);
    this.httpCall.callApi('GET',apiUrl.signUpData,{}).subscribe((res) => {
      if(res && res['body']){
        this.countryList  = res['body'].countryList;
        this.currencyList = res['body'].currencyList;
      }
    });
  }
  closeSignUpFormOnClick(formClose , loginForm){
    let _temp = {'closeForm':formClose , 'openLoginForm':loginForm}
    this.closeSignUpFormEvent.emit(_temp);
  }
  showPasswordClick(){
    if(this.showPassword){
      this.showPassword = false;
    }else{
      this.showPassword = true;
    }
  }
  navigation(){
    this.removeBackdropClass();
    this.closeSignUpFormOnClick(true,false);
    this.route.navigate(['terms-for-guide']);
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
  acceptTermsAndConditions(){
    if(this.signUpFormObject['acceptTerms'] == ''){
      this.signUpFormObject['acceptTerms'] = "clicked";
    }else{
      this.signUpFormObject['acceptTerms'] = '';
    } 
  }
  signUpClick(obj){
    this.setButtonDisable = true;
    let validate = new Validations().signUpValidations(this.signUpFormObject);
    if(!validate.isOkay){
      this.toastr.showWaring( validate.msg ); 
      this.setButtonDisable = false;
    }else{
      let _temp = new SignUpModel(obj.name , obj.email , obj.password , this.signUpFormObject['login_type'] , 'WEB' , '1234' ,
      this.signUpFormObject['countryId'] , this.signUpFormObject['currencyId'] , '' , obj.mobile);
      this.httpCall.callApi('POST' , apiUrl.signUp , _temp).subscribe((res) => {
        if(res && res['body']){
          let body = res['body'];
          if(body.status == 1){
            this.removeBackdropClass();
            this.closeSignUpFormOnClick(true,false);
            this.toastr.showSucess(body.message);
            let encryptUserDetail = JSON.stringify(res['body'].userDetails);
            localStorage.setItem('$user' , encryptUserDetail);
            this.dataPassingService.sendGuideDetail(res['body'].userDetails);
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
  async socialSignUp(type){
    let check = await new SocialLogin().socialSignIn(type);
    this.socialAuthService.signIn(check).then(
      (userData) => {
        let _temp = new LoginModel(userData.email , type , '1234' , '' , userData.id);
        this.httpCall.callApi('POST', apiUrl.login , _temp).subscribe((res) => {
          if(res && res['body']){
            if(res['body'].status == 0){
              this._userDetailSignUp = {name: userData.name , email: userData.email, socialId: userData.id , login_type:type}
              this.closeSignUpFormEvent.emit({openSocialLoginFromSignUpPage : true , userDetail: this._userDetailSignUp});
            }else{
              let encryptUserDetail = JSON.stringify(res['body'].userDetails);
              localStorage.setItem('$user' , encryptUserDetail);
              this.dataPassingService.sendGuideDetail(res['body'].userDetails);
              this.closeSignUpFormEvent.emit({closeAll : true });
            }
            this.setButtonDisable = false;
          }
        });
      }
    )
  }
}
