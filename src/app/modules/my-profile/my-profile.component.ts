import { Component, OnInit } from '@angular/core';
import { LoadScript } from '../../helper/loadScript';
import { environment } from '../../../environments/environment';
import { Encryption } from '../../helper/encryption';
import { HttpCallService } from '../../helper/httpCall.service';
import { apiUrl } from '../../app.constants';
import { Validations } from '../../helper/validations';
import { Toaster } from '../../helper/toaster';
import { MyProfileModel } from './my-profile-model';
import { DataPassingService } from '../../helper/dataPassingService';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  baseImageUrl      : String;
  openImageCropper  : boolean = false;
  imageAddress      : Object = {image:'' , userDetail:''};
  userDetail        : Object;
  countryList       : Array<string>;
  currencyList      : Array<string>;
  changePasswordOpen: boolean = false;
  userInformation   : Object ;
  setButtonDisable  : boolean = false;
  constructor(private httpCall: HttpCallService , private toastr: Toaster , private dataShare: DataPassingService) { }

  ngOnInit() {
    this.userInformation = JSON.parse(localStorage.getItem('$user'));
    this.userDetail = Object.create(this.userInformation); 
    if(this.userDetail['gender'] == ""){
      this.userDetail['gender'] = "Male";
    }
    this.baseImageUrl = environment.baseImageUrl;
    this.loadScript();
    this.loadCountryDetail();
  }
  loadScript(){ 
    new Promise((resolve) => {
      new LoadScript().loadScript(["assets/js/custom.js","assets/js/slick.min.js"]);
      resolve(true);
    });
  }
  dropdownsValueClicked(id , type){
    switch(type){
      case 'country' : {
        this.userDetail['country_id'] = id;
        break;
      }
      case 'currency' : {
        this.userDetail['currency_id'] = id;
        break;
      }
      case 'gender' : {
        this.userDetail['gender'] = id; 
        break;
      }
    }
  }
  loadCountryDetail(){
    this.httpCall.callApi('GET' , apiUrl.signUpData , {}).subscribe((res) => {
      if(res && res['body']){
        this.countryList  = res['body'].countryList;
        this.currencyList = res['body'].currencyList;
      }
    });
  }
  openCropperForUploadImage(event){
    this.imageAddress['image']      = event;
    this.imageAddress['userDetail'] = this.userDetail;
    this.openImageCropper = true;
  }
  cropImageComponentListing(obj){
    if(obj['closeCropComponent']){
      if(obj['updatedGuideImage']){
        this.userDetail['image_url'] = obj['updatedGuideImage']
      }
      (<HTMLInputElement>document.getElementById("choose-file")).value='';
      this.openImageCropper = false;
    }
  }
  changePasswordComponentListening(event){
    this.changePasswordOpen = false;
  }
  updateUserDetail(){ 
    this.setButtonDisable = true;
    let _temp = new Validations().profileUpdateValidations(this.userDetail);
    if(_temp.isOkay){
      let _obj = new MyProfileModel(this.userDetail['name'] , this.userDetail['gender'] ,  
      this.userDetail['user_id'] , this.userDetail['country_id'] , this.userDetail['currency_id'] , this.userDetail['mobile'])
      this.httpCall.callApi('POST' , apiUrl.profileUpdate , _obj).subscribe((res) => {
        if(res && res['body']){
          this.dataShare.sendGuideDetail({updatedGuideImage: res['body'].userDetails.image_url , name: res['body'].userDetails['name']})
          localStorage.setItem('$user' , JSON.stringify(res['body'].userDetails));
          this.toastr.showSucess(res['body'].message);
          this.setButtonDisable = false;
        }
      });
    }else{
      this.toastr.showWaring(_temp.msg);
      this.setButtonDisable = false;
    }
  }
  verifyEmail(){
    this.httpCall.callApi('POST' , apiUrl.emailVerify , {user_id: this.userInformation['user_id'] , email:this.userInformation['email']}).subscribe((res) => {
      if(res && res['body']){
        document.getElementById('closingModel').click();
        this.toastr.showSucess(res['body'].message);
      }
    });
  }

}
