import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { apiUrl } from '../../app.constants';
import { HttpCallService } from '../../helper/httpCall.service';
import { Encryption } from '../../helper/encryption';
import { Validations } from '../../helper/validations';
import { Toaster } from '../../helper/toaster';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  baseImageUrl       : String;
  categoryList       : Array<string> = [];
  userDetail         : Object = {name: '' , email: '' , category: '' , image: '' , description: ''};
  disableSubmit      : boolean = false;
  selectDefaultValue : String;
  constructor(private httpCall : HttpCallService ,  private encrypt: Encryption , private toastr: Toaster) { }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
    this.loadCategory();
    if(localStorage.getItem('$user')){
      this.autoFillUserDeatil();
    }
  }
  loadCategory(){
    this.httpCall.callApi('POST' , apiUrl.categoryListForSupport , {}).subscribe((res) => {
      if(res && res['body']){
        this.categoryList = res['body'].categoryList;
      }
    });
  }
  submitSupportRequest(val){
    this.disableSubmit = true;
    let _validate = new Validations().supportPageValidate(this.userDetail);
    if(_validate.isOkay){
      let data = new FormData();
      data.append('name' , val['name']);
      data.append("email_id" , val['email']);
      data.append("category" , this.userDetail['category']);
      data.append("description" , this.userDetail['description']);
      data.append("imagefile" , this.userDetail['image'])
      this.httpCall.callApi('POST' , apiUrl.supportSubmit , data).subscribe((res) => {
        if(res && res['body'] && res['body'].status=="1"){
          this.toastr.showSucess('Form submitted');
          this.disableSubmit = false;
          this.userDetail['description'] = '';
          this.selectDefaultValue = '0';
        }
      });
    }else{
      this.toastr.showWaring(_validate.msg);
      this.disableSubmit = false;
    }
  }
  autoFillUserDeatil(){
    let userData = JSON.parse(localStorage.getItem('$user'));
    for(let detail in userData){
      this.userDetail[detail] = userData[detail];
    }
  }
  changeIssueCategory(val){
    this.selectDefaultValue = '1';
    this.userDetail['category'] = val;
  }
  uploadIssueImage(val){
    this.userDetail['image'] = val.target.files[0];
  }
}
