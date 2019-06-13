import { Component, OnInit } from '@angular/core';
import { apiUrl } from '../../app.constants';
import { HttpCallService } from '../../helper/httpCall.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  baseImageUrl       : string;
  userDetail         : object;
  notificationListing: Array<any>;
  constructor(private httpCall: HttpCallService) {
    this.baseImageUrl = environment.baseImageUrl;
  }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem("$user"));
    this.httpCall.callApi('POST' , apiUrl.notification , {user_id:this.userDetail['user_id']}).subscribe((res)=> {
      if(res && res['body'] && res['body'].status=='1'){
        this.notificationListing = res['body'].notificationList;
        console.log("-----------" , res['body']);
      }
    });
  }
 returnTimeFromTimeStamp(timestamp){
    if(new Date().toDateString()==new Date(timestamp * 1000).toDateString()){
      let date = new Date(timestamp * 1000);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      return this.pad(hours)+":"+this.pad(minutes)
    }else{
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      let today = new Date(timestamp * 1000).getDate(); 
      let mm    = new Date(timestamp * 1000).getMonth(); 
      if (today < 10) {
        today = +'0' + today;
      }
      return  today+'-'+monthNames[mm];
    }
  }
  pad(num) { 
    return ("0"+num).slice(-2);
  }

}
