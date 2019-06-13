import { Component, OnInit , HostListener} from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataPassingService } from '../../helper/dataPassingService';
import { Encryption } from '../../helper/encryption';
import { Router } from '@angular/router';
import { LoadScript } from '../../helper/loadScript';
import { HttpCallService } from '../../helper/httpCall.service';
import { apiUrl } from '../../app.constants';
import { debounceTime } from 'rxjs/operators'; 
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'] ,
  host: {
    '(document:click)': 'makeSearchListNullOnWindowClick($event)',
  },
})
export class NavComponent implements OnInit {
  baseImageUrl       : String;
  isIphone           : boolean = false;
  isAndroid          : boolean = false;
  openLoginForm      : Boolean = false;
  forgotPass         : boolean = false;
  isLoggedIn         : boolean = false;
  touristName        : string;
  userDetail         : Object = {image_url:''};
  keyWord            : String = '';
  searchList         : Array<String>;
  openSearchTripList : boolean = false;
  openNotificationPanel: boolean = false;
  notificationCount  : any;
  userImageSetOnSocialLogin : any = '';

  searchTextChanged = new Subject<string>();

  isMobile = {
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
  }

  constructor(private dataPassingService: DataPassingService ,
     private encrypt: Encryption , private route: Router , private httpCall: HttpCallService) { }
  ngOnInit() { 
    // encryption testing
    this.loadScript();

    localStorage.setItem("$otherTripDateWise" , "false");

    this.httpCall.callApi('GET' , apiUrl.config ,{}).subscribe((res) => {
      if(res && res['body']){
        let lang = res['body'].language_id;
        localStorage.setItem('defaultLang' , lang);
      }
    });
    // let encdata = this.encrypt.encryptData([{id: 1}, {id: 2}]);
    // console.log(encdata);
    // let decr = this.encrypt.decryptData(encdata);
    // end encryption
    this.loadUserData();
    let checkUserStatus = localStorage.getItem('$user');
    this.dataPassingService.guideDetail.subscribe((res) => {
      this.isLoggedIn              = true;
      this.touristName             = res['name'];
      this.notificationCount            = res['notificationCount'];
      if(res['updatedGuideImage']){
        this.userDetail['image_url'] = res['updatedGuideImage'];
      }else {  
        this.userDetail['image_url'] = res['image_url'];
        // this.userImageSetOnSocialLogin = res['image_url']
      }
    });
    if(checkUserStatus){
      this.isLoggedIn = true;
    }
    this.baseImageUrl = environment.baseImageUrl;
    if(this.isMobile.iOS()) { 
      this.isIphone = true;
    }else if(this.isMobile.Android()){
      this.isAndroid = true;
    }
    // search keyword logic
    this.searchTextChanged.pipe(debounceTime(200)).subscribe(() =>{ 
      if(this.keyWord!=''){
        this.httpCall.callApi('POST' , apiUrl.keywordSearch , {keyword: this.keyWord}).subscribe((res) => {
          if(res && res['body']){
            this.searchList = res['body'].list;
          }
        });
      }else{
        this.searchList = [];
      }
    });
    this.route.events.subscribe((route) => {
      this.openNotificationPanel = false;
    });
  }
  closeDownloadMenu(){
    let c = document.querySelector('.appLink');
    document.getElementById("appLink").style.display = "none";
  }
  clickMenu(){
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("backdrop");   //add the class
    var element = document.createElement("div");
    element.setAttribute("class", 'overlay');
    document.body.appendChild(element);
    this.openNotificationPanel = false;
  }
  removeMenuClass(){
    let c = document.querySelector('.overlay');
    c.classList.remove('overlay');
    let backdrop = document.querySelector('.backdrop');
    backdrop.classList.remove('backdrop');
    // let body = document.getElementsByTagName('body')[0];
    // body.classList.remove("overlay"); 
  }
  receiveLoginCloseEvent($event){ 
    if(JSON.parse($event).forgotPasswordOpen){
      this.forgotPass  = true;
    }   
    this.openLoginForm = false;
  }
  receiveForgotPasswordCloseEvent(obj){
    this.forgotPass    = false
    this.openLoginForm = true;
  }
  logOut(){
    this.isLoggedIn = false;
    localStorage.removeItem('userExistance');
    localStorage.removeItem('$user');
    window.location.href = '';
    // this.route.navigate(['']);
  }
  loadUserData(){
    if(localStorage.getItem('$user')){
      this.userDetail  = JSON.parse(localStorage.getItem('$user'));
      this.touristName = this.userDetail['name'];
      this.notificationCount = this.userDetail['notificationCount']
    }
  }
  loadScript(){ 
    new Promise((resolve) => {
      new LoadScript().loadScript(["assets/js/custom.js","assets/js/slick.min.js"]);
      resolve(true);
    });
  }
  keywordSearchKeyUpEvent(){
    this.searchTextChanged.next();
  }
  makeSearchListNullOnWindowClick() {
    this.searchList = [];
  }
  // variable declaration for search Trip list
  placeToBeSearch : String;
  searchTripListing(item){ 
    this.keyWord = item;

    // this.route.navigate(['/trip-listing'] , {queryParams: {destination:  this.keyWord}});
    window.location.href="trip-listing?destination="+this.keyWord;

    this.openSearchTripList = true;
    this.placeToBeSearch = item;

    this.searchList=[];
  }
 
  openNotification(){
    this.notificationCount='';
    let _temp = JSON.parse(localStorage.getItem('$user'));
    _temp['notificationCount'] = '';
    localStorage.setItem('$user' , JSON.stringify(_temp));
    if(this.openNotificationPanel){
      this.openNotificationPanel = false;
    }else {
      this.openNotificationPanel = true;
    }
  }
  @HostListener('document:click', ['$event'])
  clickout(event) {
     
  }
  openLoginMenu(){
    this.openNotificationPanel = false;
  }
}
