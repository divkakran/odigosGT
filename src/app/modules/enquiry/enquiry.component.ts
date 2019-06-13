import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { apiUrl } from '../../app.constants';
import { Encryption } from '../../helper/encryption';
import { Validations } from '../../helper/validations';
import { Toaster } from '../../helper/toaster';
import { HttpCallService } from '../../helper/httpCall.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {

  baseImageUrl   : string;
  userDetail     : Object = {name: '' , email: '' , mobile: '' , query: ''};
  disableButton  : boolean = false;
  constructor(private encrypt : Encryption , private toastr: Toaster , private httpCall: HttpCallService) { }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
    if(localStorage.getItem('$user')){
      this.loadGuideDetail();
    }
  }
  loadGuideDetail(){
    let _temp = JSON.parse(localStorage.getItem('$user'));
    for(let item in _temp){
      this.userDetail[item] = _temp[item];
    }
  }
  submiteQuery(val){
    this.disableButton = true;
    let _temp = new Validations().enquiryPageValidate(this.userDetail);
    if(_temp.isOkay){
      this.httpCall.callApi('POST' , apiUrl.enquiry , {name:this.userDetail['name'] , email_id: this.userDetail['email'] , mobile:this.userDetail['mobile'] , query:this.userDetail['query']}).subscribe((res) => {
        if(res && res['body']){
          this.toastr.showSucess(res['body'].message);
          this.disableButton = false;
        }
      })
    }else{
      this.toastr.showWaring(_temp.msg);
      this.disableButton = false;
    }
  }

}
