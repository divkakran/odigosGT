import { Component, OnInit } from '@angular/core';
import { apiUrl } from '../../app.constants';
import { HttpCallService } from '../../helper/httpCall.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  baseImageUrl   : String;
  userDetail     : object;
  isChatAvailable: boolean = false;
  chatList       : Array<object>;
  msgList        : Array<object>;
  guideIdOnClick : string;
  textMsg        : string;
  guideName      : string;
  msgTime        : any;
  guideIdForMsg  : string = '';
  constructor(private httpCall: HttpCallService) { }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
    this.userDetail = JSON.parse(localStorage.getItem('$user'));
    this.guideIdForMsg = this.userDetail['guideIdForMsg'];
    this.loadSidePanel();
  }
  loadSidePanel(){
    let _temp = {tourist_id : this.userDetail['user_id'] , guide_id: this.guideIdForMsg};
    this.httpCall.callApi('POST' , apiUrl.inboxSideListing , _temp).subscribe((res) => {
      if(res && res['body']){
        if(res['body'].chatList.length == 0){
          this.isChatAvailable = false;
        }else{
          this.chatList = res['body'].chatList
          this.isChatAvailable = true;
          this.guideName       = this.chatList[0]['guide_name'];
          this.msgTime         = this.returnTimeFromTimeStamp(this.chatList[0]['time']);
          this.loadChatDetail(this.chatList[0]);
        }
      }
    });
  }
  loadChatDetail(guideId){
    this.guideIdOnClick = guideId;
    let _temp =  {guide_id: guideId.guide_id , tourist_id:this.userDetail['user_id']};
    this.httpCall.callApi('POST' , apiUrl.chatDetail , _temp).subscribe((res) => {
      if(res && res['body']){
        this.msgList = res['body'].chatList;
        // for msg listing var set
        this.guideName       = guideId['guide_name'];
        this.msgTime         = this.returnTimeFromTimeStamp(guideId['time']);
      }
    });
  }
  sendMsg(msg){
    console.log(msg);
    let _temp = {tourist_id:this.userDetail['user_id'] , guide_id: this.guideIdOnClick['guide_id'] , chat:msg.msg };
    this.httpCall.callApi('POST' , apiUrl.msgSend , _temp).subscribe((res) =>{
      if(res && res['body']){
        this.textMsg = '';
        this.loadChatDetail(this.guideIdOnClick);
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
