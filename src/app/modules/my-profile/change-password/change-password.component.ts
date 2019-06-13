import { Component, OnInit, OnDestroy , Input , Output , EventEmitter} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpCallService } from '../../../helper/httpCall.service';
import { Validations } from '../../../helper/validations';
import { Toaster } from '../../../helper/toaster';
import { apiUrl } from '../../../app.constants';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit , OnDestroy{

  @Input() userDetail: Object;
  @Output() closingChnagePasswordEvent = new EventEmitter<Object>();
  baseImageUrl    : string;
  cpass           : boolean = false;
  npass           : boolean = false;
  rpass           : boolean = false;
  changePass      : Object = {cpass:'' , npass:'' , rpass:''};
  setButtonDisable: boolean = false;
  constructor(private httpCall: HttpCallService , private toastr: Toaster) { }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
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
  showPasswordClick(field){
    switch(field){
      case 'cpass':{
        switch(this.cpass){
          case true:{
            this.cpass = false;
            break;
          }
          case false:{
            this.cpass = true
            break;
          }
        }
        break;
      }
      case 'npass':{
        switch(this.npass){
          case true:{
            this.npass = false;
            break;
          }
          case false:{
            this.npass = true
            break;
          }
        }
        break;
      }
      case 'rpass':{
        switch(this.rpass){
          case true:{
            this.rpass = false;
            break;
          }
          case false:{
            this.rpass = true
          }
        }
      }
    }
  }
  closingEvent(){
    this.closingChnagePasswordEvent.emit({changePasswordClose: true});
  }
  updatePassword(obj){
    this.setButtonDisable = true;
    let _temp = new Validations().passwordResetValidations(obj);
    if(_temp.isOkay){
      this.httpCall.callApi('POST', apiUrl.changePassword , {old_password: obj.cpass , new_password: obj.cpass , user_id:this.userDetail['user_id']}).subscribe((res) => {
        if(res && res['body']){
          if(res['body'].status=="0"){
            this.toastr.showWaring(res['body'].message);
            this.setButtonDisable = false;
          }else{
            this.closingChnagePasswordEvent.emit({changePasswordClose: true});
            this.toastr.showSucess(res['body'].message);
            this.setButtonDisable = false;
          }
        }
      });
    }else{
      this.toastr.showWaring(_temp.msg);
      this.setButtonDisable = false;
    }
  }

}
