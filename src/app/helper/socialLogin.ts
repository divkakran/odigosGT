import {FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
export class SocialLogin {
    socialPlatformProvider:any;
    constructor(){}
    public socialSignIn(socialPlatform : string) {
        if(socialPlatform == "FB"){
          this.socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID; 
        }else if(socialPlatform == "GOOGLE_PLUS"){
          this.socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
       return this.socialPlatformProvider;
    }
}