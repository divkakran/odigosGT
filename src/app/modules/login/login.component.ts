import { environment } from './../../../environments/environment';
import { AuthService } from 'angular-6-social-login';
import { Component, OnInit , OnDestroy , Output , EventEmitter} from '@angular/core';
import { HttpCallService } from '../../helper/httpCall.service';
import { apiUrl } from '../../app.constants';
import { LoginModel } from './login-model';
import { Validations } from '../../helper/validations';
import { Toaster } from '../../helper/toaster';
import { SocialLogin } from '../../helper/socialLogin';
import { DataPassingService } from '../../helper/dataPassingService';
import { Encryption } from '../../helper/encryption';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy{

  closeLoginForm   : boolean = true;
  openSignUp       : boolean = false;
  showPassword     : boolean = false;
  loginFormObject  : Object = {email:'' , password:''};
  baseImageUrl     : String;
  setButtonDisable : boolean = false;
  openSocialLogin  : boolean = false;
  _userDetailSignUp: Object;
  notificationCount : any;
  @Output() closeLoginFormEvent = new EventEmitter<string>();
  constructor(private httpCall: HttpCallService , private toastr: Toaster , private socialAuthService: AuthService , 
    private dataPassingService: DataPassingService , private encrypt: Encryption ) { 
    this.baseImageUrl = environment.baseImageUrl;
  }

  // socialSignIn(socialPlatform : string) {
  //   let socialPlatformProvider;
  //   if(socialPlatform == "FB"){
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID; 
  //   }else if(socialPlatform == "GOOGLE_PLUS"){
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }
  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (userData) => {
  //       let _temp = new LoginModel(userData.email , socialPlatform , '1234' , '' , userData.id);
  //       console.log(socialPlatform+" sign in data : " , userData);
  //       this.httpCall.callApi('POST', apiUrl.login , _temp).subscribe((res) => {
  //         if(res && res['body']){
  //           if(res['body'].status == 0){
  //             this._userDetailSignUp = {name:userData.name , email: userData.email, socialId: userData.id , login_type:socialPlatform}
  //             this.openSignUpForm();
  //           }
  //           this.setButtonDisable = false;
  //           console.log(res['body']);
  //         }
  //       });
  //     }
  //   );
  // }
  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("backdrop");   //add the class
    var element = document.createElement("div");
    element.setAttribute("class", 'overlay');
    document.body.appendChild(element);
  }
  ngOnDestroy(){
    let c = document.querySelector('.overlay');
    if(c){
      c.classList.remove('overlay');
      let backdrop = document.querySelector('.backdrop');
      backdrop.classList.remove('backdrop');
    }
  }
  closeLoginFormOnClick(obj){
    if(obj.openLoginForm){
      this.openSignUp      = false;
      this.openSocialLogin = false;
    }else if(obj.closeAll){
      this.openSignUp      = false;
      this.openSocialLogin = false;
      this.closeLoginFormEvent.emit('false');
    }else if(obj.openSocialLoginFromSignUpPage){
      this.openSignUp        = false;
      this._userDetailSignUp = obj.userDetail; 
      this.openSocialLogin   = true;
    }else{
      this.closeLoginFormEvent.emit('false');
    }
  }
  openSignUpForm(){
    let c = document.querySelector('.overlay');
    c.classList.remove('overlay');
    let backdrop = document.querySelector('.backdrop');
    backdrop.classList.remove('backdrop');
    this.openSignUp = true;
  }
  showPasswordClick(){
    if(this.showPassword){
      this.showPassword = false;
    }else{
      this.showPassword = true;
    }
  }
  normalLogin(credentials){ 
    this.setButtonDisable = true;
    let validate = new Validations().loginValidations(credentials);
    if(!validate.isOkay){
      this.toastr.showWaring( validate.msg );
      this.setButtonDisable = false;
    }else{
      let _temp = new LoginModel(credentials.email , 'EMAIL' , '1234' , credentials.password ,'');
      this.httpCall.callApi('POST', apiUrl.login , _temp).subscribe((res) => {
        if(res && res['body']){
          if(res["body"].status!="0"){
            this.closeLoginFormOnClick({openLoginForm:false});
            this.setButtonDisable = false;
            this.toastr.showSucess('Successfully Logged in');
            let encryptUserDetail = JSON.stringify(res['body'].userDetails);
            localStorage.setItem('$user' , encryptUserDetail);
            this.dataPassingService.sendGuideDetail(res['body'].userDetails);
          }else{
            this.setButtonDisable = false;
            this.toastr.showWaring(res["body"].message);
          }
        }
      });
    }
  }
  async socialLogin(type){ 
    let check = await new SocialLogin().socialSignIn(type);
    this.socialAuthService.signIn(check).then(
      (userData) => {
        let _temp = new LoginModel(userData.email , type , '1234' , '' , userData.id);
        console.log(type+" sign in data : " , userData);
        this.httpCall.callApi('POST', apiUrl.login , _temp).subscribe((res) => {
          if(res && res['body']){
            if(res['body'].status == 0){
              this._userDetailSignUp = {name: userData.name , email: userData.email, socialId: userData.id , login_type:type}
              this.openSocialLogin = true; 
            }else{
              let encryptUserDetail = JSON.stringify(res['body'].userDetails);
              localStorage.setItem('$user' , encryptUserDetail);
              this.dataPassingService.sendGuideDetail(res['body'].userDetails);
              this.closeLoginFormEvent.emit('false');
            }
            this.setButtonDisable = false;
          }
        });
      }
    );
  }
  openForgotPassword(){
    let _temp = {forgotPasswordOpen:true , closeLoginForm: true};
    this.closeLoginFormEvent.emit(JSON.stringify(_temp));
  }
}
