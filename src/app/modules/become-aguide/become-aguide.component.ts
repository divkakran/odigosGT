import { Meta , Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Toaster } from '../../helper/toaster';
import { Validations } from '../../helper/validations';
import { HttpCallService } from '../../helper/httpCall.service';
import { apiUrl } from '../../app.constants';
import { Contact } from './contact-model';

@Component({
  selector: 'app-become-aguide',
  templateUrl: './become-aguide.component.html',
  styleUrls: ['./become-aguide.component.css']
})
export class BecomeAGuideComponent implements OnInit {

  baseImageUrl    : String;
  getInTouchObject: Object = { name:'' , email: '' , mobile: '' , city: '' , comment: '' };
  setButtonDisable = false;

  constructor(private toastr: Toaster , private httpCall: HttpCallService , private meta: Meta , private title: Title) { 
    this.title.setTitle("How to Become a Tour Guide | Become A Guide Tour - Odigos Guide");
    this.meta.addTags([{ name:"description" , content: 'Worried about how to become travel guides, Odigos offers to become a tour guide & earn more income. Just visit the website & sign up for all procedure & share your knowledge of area, culture & traditions with our tourist.' } ,
    {name:'keywords' , content: 'become a travel guide, become a guide, how to be a tour guide, how to become a tour guide, become a tour guide'}]);
  }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
  }
  getInTouchSubmit(val:any){
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
          this.toastr.showSucess(res["body"].message);
          this.setButtonDisable = false;
        }else{
          this.setButtonDisable = false;
        }
      });
    }
  }

}
