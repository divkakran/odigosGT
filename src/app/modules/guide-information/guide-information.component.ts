import { Meta , Title } from '@angular/platform-browser';
import { Component, OnInit , Inject} from '@angular/core';
import { ActivatedRoute , Router , NavigationEnd} from  '@angular/router';
import { HttpCallService } from '../../helper/httpCall.service'
import { LoadScript } from './../../helper/loadScript';
import { apiUrl } from '../../app.constants';
import { environment } from '../../../environments/environment';
import { WINDOW } from '@ng-toolkit/universal';
import { Encryption } from './../../helper/encryption';
import { Toaster } from '../../helper/toaster';
import { BookNowModel } from './book-now.model';
import { DataPassingService } from '../../helper/dataPassingService';

@Component({
  selector: 'app-guide-information',
  templateUrl: './guide-information.component.html',
  styleUrls: ['./guide-information.component.css']
})
export class GuideInformationComponent implements OnInit {

  loadAPI                  : Promise<any>;
  name                     : String;
  guideDetail              : Object;
  guidePackageDetail       : Object;
  OtherPackages            : Array<Object>=[];
  readTypeHandle           : String = "Read More";
  readTypeHandleForIntinery: String = "Read More";
  expectedLength           : number = 300;
  expectedLengthForItinery : number = 300;
  packageBanner            : Array<String>=[];
  baseImageUrl             : String;
  metaName                 : String;
  placeUrl                 : String;
  guideNumber              : String;
  defaultLangSelect        : String;
  disableSubmit            : Boolean = false;
  isUserLogin              : Boolean = false;
  openLoginForm            : Boolean = false;
  showLoader               : Boolean = false;

  plceNameForMeta          : string = '';

  constructor(private httpCall: HttpCallService , private dataPassingService: DataPassingService , private route: ActivatedRoute , private meta: Meta , 
    private title: Title , private routeNavigate: Router , @Inject(WINDOW) private window: Window , private toastr: Toaster) {
    this.route.params.subscribe((params) => {
      if(!params.placeUrl){
        this.metaName = params.name.charAt(0).toUpperCase()+(params.name.replace(/-/g," ")).slice(1);
        this.title.setTitle(this.metaName+" Tour Guides - Odigos");
        this.meta.addTags([{ name:"description" , content: 'I am '+ this.metaName +' working as a private tour guide. If you want to know about our culture, Art & history of the tourist place then Hire me & Enjoy your trip hassle-free. I love to stay in touch with people.' } ,
        {name:'keywords' , content: 'Hire tour guides, India tour Guide, best tour guide India'}]);
      }else{
        this.metaName = params.name.charAt(0).toUpperCase()+(params.name.replace(/-/g," ")).slice(1);
        this.plceNameForMeta = params.placeUrl.charAt(0).toUpperCase()+(params.placeUrl.replace(/-/g," ")).slice(1);
        this.title.setTitle(this.metaName+" Tour Guides | "+ this.plceNameForMeta);
        this.meta.addTags([{ name:"description" , content: this.metaName+"Tour Guides |"+ this.placeUrl } ,
        {name:'keywords' , content: 'Hire tour guides, India tour Guide, best tour guide India'}]);
      }
    });
    // reload route
    this.routeNavigate.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

    this.routeNavigate.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.routeNavigate.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    if(localStorage.getItem('$user')){
      this.isUserLogin = true;
      this.guideNumber = JSON.parse(localStorage.getItem('$user')).mobile;
    }
    this.baseImageUrl = environment.baseImageUrl;
    this.route.params.subscribe((params) => {
      this.name     = params.name;
      this.placeUrl = params.placeUrl;
    });
    this.loadGuideDetail(this.name , this.placeUrl);
    // update data when logged in
    this.dataPassingService.guideDetail.subscribe((res) => {
      this.isUserLogin = true;
      this.guideNumber = res['mobile'];
    });
  }
  loadGuideDetail(name , placeUrl){
    this.httpCall.callApi( 'POST' , apiUrl.guideDetails , {web_url: name , place_url:placeUrl}).subscribe(async (res) => {
      if(res && res["body"] && res["body"].status==1) {
        await this.updatingValueOnComponentInit(res);
        this.loadScript();
      }
    });
  }
  updatingValueOnComponentInit(res){
    this.guideDetail        = res["body"].guideDetails;
    this.OtherPackages      = res["body"].guideDetails.packages;
    this.OtherPackages.filter((res) => { 
      res['guide_charges']  = Math.round(res['guide_charges']);
    });
    this.guidePackageDetail = res["body"].packageDetails;
    this.defaultLangSelect  = res["body"].packageDetails.languages[0];
    this.guidePackageDetail['package_charges'] = Math.round(this.guidePackageDetail['package_charges']);
    this.packageBanner      = res["body"].packageBanners;
  }
  loadScript(){  
    this.loadAPI = new Promise((resolve) => {
      new LoadScript().loadScript(["assets/js/custom.js","assets/js/slick.min.js"]);
      resolve(true);
    });
  }
  readMoreClick(type , checkType){
    if(checkType == 'about_me'){
      switch(this.readTypeHandle){ 
        case "Read More":{
          this.readTypeHandle = "...Read Less";
          this.expectedLength = type.length;
          break;
        }
        case "...Read Less":{
          this.readTypeHandle = "Read More";
          this.expectedLength = 300;
          break;
        }
      }
    }else{ 
      switch(this.readTypeHandleForIntinery){ 
        case "Read More":{
          this.readTypeHandleForIntinery = "...Read Less";
          this.expectedLengthForItinery  = type.length;
          break;
        }
        case "...Read Less":{
          this.readTypeHandleForIntinery = "Read More";
          this.expectedLengthForItinery  = 300;
          break;
        }
      }
    }
  }
  reloadOnOtherPackageSelect(guideDetail){
    this.routeNavigate.navigate(['/tour-guide' , this.name , guideDetail.place_url])
    this.window.scroll(0,0);
    // this.window.location.reload();
  }

  getNextDate(){
    if(localStorage.getItem('$trip_date')){  
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      let today = new Date(localStorage.getItem('$trip_date')).getDate(); 
      let mm    = new Date(localStorage.getItem('$trip_date')).getMonth(); 
      let yyyy  = new Date(localStorage.getItem('$trip_date')).getFullYear();
      if (today < 10) {
        today = +'0' + today;
      }
      return  monthNames[mm] +' ' + today + ', ' + yyyy;
    }else{
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      let cDate = new Date();
      let nextDate = cDate.setDate(cDate.getDate()+1);
      let today = new Date(nextDate).getDate(); 
      let mm    = new Date(nextDate).getMonth(); 
      let yyyy  = new Date(nextDate).getFullYear();
      if (today < 10) {
        today = +'0' + today;
      }
      return  monthNames[mm] +' ' + today + ', ' + yyyy;
    }
  }
  requestNowTrip(data){
    this.showLoader = true;
    this.addOverLayClassInBody(this.showLoader);
    this.disableSubmit = true;
    let _validate = this.validatePhoneNumber(data.mobile);
    if(_validate.isOkay){
      let obj = new BookNowModel(this.guideDetail['guide_id'] , JSON.parse(localStorage.getItem('$user')).user_id , 
      this.guidePackageDetail['package_id'] , this.getNextDate() , '1' , '0' , this.guidePackageDetail['package_charges'] , this.defaultLangSelect['id'] , this.guidePackageDetail['duration_hours'] ,
     '' , data.mobile , this.guidePackageDetail['package_type']);
     this.httpCall.callApi('POST' , apiUrl.bookNowGuideDetail , obj).subscribe((res) => {
      if(res && res['body']){
        this.showLoader    = false;
        this.addOverLayClassInBody(this.showLoader);
        this.disableSubmit = false;
        if(res['body'].status == 1){
          document.getElementById('closeModelOnClick').click();
          localStorage.setItem('odigos_ty' , JSON.stringify(res['body'].message));
          this.routeNavigate.navigate(['/tour-guide/'+ this.name + '/'+  this.placeUrl +'/thank-you']);
        }else{
          this.toastr.showWaring(res['body'].message);
        }
      }
     });
    }else{
      this.disableSubmit = false;
      this.showLoader    = false;
      this.addOverLayClassInBody(this.showLoader);
      this.toastr.showWaring(_validate.msg);
    }
    // let _temp = new BookNowModel();
    // this.httpCall.callApi('POST' , apiUrl.bookNowGuideDetail , _temp).subscribe((res) => {
    //   if(res && res['body']){
        
    //   }
    // })
  }
  validatePhoneNumber(mobile){
    let _temp = { isOkay : false , msg:'' };
    if(mobile == ''){
      _temp.msg = "Mobile Num is required";
      return _temp;
    }else if(mobile.length < 10){
      _temp.msg = "Mobile Num is't valid";
      return _temp;
    }else{
      _temp.isOkay = true;
      return _temp;
    }
  }
  selectingLanguage(obj){
    this.defaultLangSelect = obj;
  }
  addOverLayClassInBody(showLoader){
    if(showLoader){
      let body = document.getElementsByTagName('body')[0];
      body.classList.add("loader-overlay");   //add the class
      // var element = document.createElement("div");
      // element.setAttribute("class", 'overlay');
      // document.body.appendChild(element);
    }else{
      let c = document.querySelector('.loader-overlay');
      c.classList.remove('loader-overlay');
      // let backdrop = document.querySelector('.backdrop');
      // backdrop.classList.remove('backdrop');
    }
  }
  navigate(name){
    window.location.href = "tour-guide/"+name;
  }
}
