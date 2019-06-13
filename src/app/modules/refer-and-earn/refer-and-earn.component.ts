import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Encryption } from '../../helper/encryption';
import {
  SocialService
} from "ng6-social-button";
@Component({
  selector: 'app-refer-and-earn',
  templateUrl: './refer-and-earn.component.html',
  styleUrls: ['./refer-and-earn.component.css'],
  providers: [SocialService],
})
export class ReferAndEarnComponent implements OnInit {

  shareObj = {
    href: "https://odigos.page.link/qbvQ",
    hashtag:"#Download app with "
  };

  baseImageUrl: String;
  loadDetail  : Object;
  constructor(private encrypt: Encryption , private socialAuthService: SocialService) { }

  ngOnInit() {
    this.loadDetail = JSON.parse(localStorage.getItem('$user'));
    this.baseImageUrl = environment.baseImageUrl;
    this.shareObj.hashtag = '#'+ this.loadDetail['referral_code']
  }
  facebookSharing(shareObj: any){
    this.socialAuthService.facebookSharing(shareObj);
  }
  // googleSharing(shareObj: any){
  //   this.socialAuthService.twitterSharing(shareObj);
  // }
}
