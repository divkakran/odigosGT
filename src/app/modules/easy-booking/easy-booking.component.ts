import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Contact } from '../become-aguide/contact-model';
import { Validations } from '../../helper/validations';
import { apiUrl } from '../../app.constants';
import { HttpCallService } from '../../helper/httpCall.service'
import { Toaster } from '../../helper/toaster';

@Component({
  selector: 'app-easy-booking',
  templateUrl: './easy-booking.component.html',
  styleUrls: ['./easy-booking.component.css']
})
export class EasyBookingComponent implements OnInit {
  baseImageUrl: string
  setButtonDisable: boolean = false;
  getInTouchObject = { name:'' , email: '' , mobile: '' , city: '' , comment: '' };
  constructor(private toastr: Toaster , private httpCall: HttpCallService) { }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
  }
  submitData(val:any){
    this.setButtonDisable = true;
    let _temp = new Validations().getInTouchValidate(val);
    if(!_temp.isOkay){
      this.toastr.showWaring( _temp.msg );
      this.setButtonDisable = false;
    }else{
      let contact_model = new Contact(val.contact_name , val.contact_mobile , val.contact_email , val.contact_city , val.contact_comments);
      this.httpCall.callApi('POST'  , apiUrl.getInTouch , contact_model).subscribe(res => {
        if(res && res["body"] && res["body"].status == 1){
          for(var value in this.getInTouchObject){
            this.getInTouchObject[value] = '';
          }
          this.setButtonDisable = false;
          this.toastr.showSucess(res["body"].message);
        }else{
          this.setButtonDisable = false;
        }
      });
    }
  }

}
