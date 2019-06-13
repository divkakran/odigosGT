import { Component, OnInit } from '@angular/core';
import { HttpCallService } from '../../helper/httpCall.service';
import { apiUrl } from '../../app.constants';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Encryption } from '../../helper/encryption';
import { Toaster } from '../../helper/toaster';
import { DatepickerOptions } from 'ng2-datepicker';
import { Validations } from '../../helper/validations';

@Component({
  selector: 'app-after-search-trip-listing',
  templateUrl: './after-search-trip-listing.component.html',
  styleUrls: ['./after-search-trip-listing.component.css']
})
export class AfterSearchTripListingComponent implements OnInit {

  placeName            : string = "mon";
  baseImageUrl         : String;
  categories           : Array<String> = [];
  tourList             : Array<String> = [];
  seeAllDataForPass    : any;
  placesDetail         : Array<String>;
  destinations         : Array<String> = [];
  dropDownController   : Object = {city: "false" , destination: "false" , language: "false" , numOfPerson: "false" , visitors: "false"};
  dropDownValues       : Object = {city: {city_name:"City"} , destination: {place_name: "Destination"} , language: {name:"Language"}};
  dupliDropDownValues  : Object = {city: {city_name:"City"} , destination: {place_name: "Destination"} , language: {name:"Language"}};
  languages            : Array<String> = [];
  typeOfPackage        : string = 'solo';
  isDropDownOpen       : Boolean = false;
  numOfAdults          : number = 1;
  numOfChildrens       : number = 0;
  totalVisitors        : number = 1;
  date                 : Date = new Date();
  isCategorySelected   : boolean = false;
  categoryName         : string ;
  selectedDate         = '';
  tourByCategoryModel  : object = {"city_id":'' , "keyword":'' , "cat_id": '' , "language_id" : '' , "hire_date" : '' , "no_of_adults":'' , 
  "no_of_children":'' } ;
  soloTripSearchModel  : object = {'city_id':'' , 'place_id':'' , 'language_id':'' , 
  'hire_date':'' , 'no_of_adults':'' , 'no_of_children':'' , 'offset':'' ,'page':''};
  offset               : number = 0;
  page                 : number = 8;

  soloOffset           : number = 0;
  soloPages            : number = 8;

  listByCategory       : object;
  totalCount           : number;
  isTripTypeCombo      : boolean = true;
  _temp                : any;
  searchData           : any;
  // for calender date setup
  currentD = new Date().getDate();
  currentY = new Date().getFullYear();
  currentM = new Date().getMonth()+ 1;
  lastY    = new Date().getFullYear()+1; 
  options: DatepickerOptions = {
    minYear: new Date().getFullYear(),
    maxYear: 2020,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    // locale: frLocale,
    minDate: new Date(this.currentM+'/'+this.currentD+'/'+this.currentY), // Minimal selectable date
    maxDate: new Date(this.currentM+'/'+this.currentD+'/'+this.lastY),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };
  constructor(private httpCall: HttpCallService , private route: ActivatedRoute,
    private router: Router , private encrypt: Encryption , private toastr: Toaster) { }
  
  ngOnInit() { 
    localStorage.removeItem('$trip_date');
    this.route.queryParams.subscribe(params => { 
      this.placeName = params['destination'];
      this.placeName = this.placeName.replace(/-/g, " ");
      this.loadCategory();
    });
    this.baseImageUrl = environment.baseImageUrl;
    this.loadCityDestinationOnPageLoad();
    this.loadDefaultConfigLanguage();
  }
  // header category loaded here
  loadCategory(){
    let _temp = {"city_id":"","language_id":"",
    "hire_date":this.setDate(),"no_of_adults":"1","no_of_children":"0","keyword": this.placeName,
    "offset":0,"page":100}
    this.httpCall.callApi('POST' , apiUrl.categoryList , _temp).subscribe((res) => {
      if(res && res['body']){
        this.categories = res['body'].category;
      }
    });
  }
  // setting next day date
  setDate(myDate?){
    if(myDate){ 
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      let today = new Date(myDate).getDate(); 
      let mm    = new Date(myDate).getMonth(); 
      let yyyy  = new Date(myDate).getFullYear();
      if (today < 10) {
        today = +'0' + today;
      }
      return  monthNames[mm] +' ' + today + ', ' + yyyy;
    } else {
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
  // when user click on see all link under trips
  loadCityDestinationOnPageLoad(){
    // 1 solo
    // 2 combo
    switch(this.typeOfPackage){
      case 'solo':{
        this._temp = {"package_type":1} 
        break;
      }
      case 'combo':{
        this._temp = {"package_type":2} 
      }
    }                                 
    this.httpCall.callApi('POST' , apiUrl.getCityDestinationList , this._temp).subscribe((res) => {
      if(res && res['body']){
        this.placesDetail = res['body'].destinationList;
      }
    })
  }
  // when any option selected from dropdown
  cityName;
  updateDestinationList(selectedCity , optionalPlaceName? , language?){ 
    switch(selectedCity == null){ 
      case true: {
        break;
      }
      case false: {
        this.destinations = this.placesDetail[selectedCity]['destinationList'];
        this.soloTripSearchModel['city_id'] = this.placesDetail[selectedCity]['city_id'];
        this.tourByCategoryModel['city_id'] = this.placesDetail[selectedCity]['city_id'];
        this.cityName                       = this.placesDetail[selectedCity]['city_name']
        break;
      }
    }
    if(optionalPlaceName!=null){
      switch(optionalPlaceName.city_name == undefined){
        case true:{
          this.openDropdown('cloaseAll');          
          this.dropDownValues['destination'] = optionalPlaceName;
          this.soloTripSearchModel['place_id'] = optionalPlaceName['place_id']; 
          this.loadLanguages(this.dropDownValues['city'],this.dropDownValues['destination']);
          this.dropDownValues["language"]["name"] = "Language";
          break;
        }
        case false:{ 
          this.openDropdown('cloaseAll');
          this.dropDownValues['city'] = optionalPlaceName;
          this.dropDownValues['destination']["place_name"] = "Destination";
          this.dropDownValues["language"]["name"] = "Language";
          if(this.typeOfPackage == 'combo'){
            this.loadLanguages(this.dropDownValues['city'],'');
          }
          break;
        }
      }
    } else {
      this.openDropdown('cloaseAll');
      this.dropDownValues['language'] = language;
      this.soloTripSearchModel['language_id'] = language['id'];
      this.tourByCategoryModel['language_id'] = language['id'];
    }
  }
  // event handled when user click on dropdown
  openDropdown(type){
    switch(type){
      case 'city':{
        if(!this.isDropDownOpen){
          this.isDropDownOpen = true;
          for(let item in this.dropDownController){
            if(item!="city"){
              this.dropDownController[item] = "false";
            } else {
              this.dropDownController[item] = "true";
            }
          }
        }else{
          this.isDropDownOpen = false;
          this.openDropdown('cloaseAll');
        }
        break;
      }
      case 'destination':{
        if(this.destinations.length==0){
          this.toastr.showWaring("Select City First");
        }else{
          if(!this.isDropDownOpen){
            this.isDropDownOpen = true;
            for(let item in this.dropDownController){
              if(item!="destination"){
                this.dropDownController[item] = "false"
              } else {
                this.dropDownController[item] = "true";
              }
            }
          }else{
            this.isDropDownOpen = false;
            this.openDropdown('cloaseAll');
          }
        }
        break;
      }
      case 'language':{
        if(this.languages.length==0 && this.typeOfPackage!='combo'){
          this.toastr.showWaring("Select Destination First");
        }else if(this.languages.length==0 && this.typeOfPackage=='combo'){
          this.toastr.showWaring("Select City First");
        }else{
        if(!this.isDropDownOpen){
            this.isDropDownOpen = true;
            for(let item in this.dropDownController){
              if(item!="language"){
                this.dropDownController[item] = "false"
              } else {
                this.dropDownController[item] = "true";
              }
            }
          }else{
            this.isDropDownOpen = false;
            this.openDropdown('cloaseAll');
          }
        }
        break;
      }
      case 'visitors':{
        if(!this.isDropDownOpen){
          this.isDropDownOpen = true;
          for(let item in this.dropDownController){
            if(item!="visitors"){
              this.dropDownController[item] = "false"
            } else {
              this.dropDownController[item] = "true";
            }
          }
        }else{
          this.isDropDownOpen = false;
          this.openDropdown('cloaseAll');
        }
        break;
      }
      default: {
        for(let item in this.dropDownController){
          this.dropDownController[item] = "false";
        } 
      }
    }
  }
  // load language with respect to destination and city
  loadLanguages(cityDetail , placeDetail){
    if(this.typeOfPackage == 'solo'){
      var _temp = {city_id: cityDetail.city_id , place_id: placeDetail.place_id , package_type: '1'};
    }else{
      var _temp = {city_id: cityDetail.city_id , place_id: placeDetail.place_id , package_type: '2'};
    }
    this.httpCall.callApi('POST' , apiUrl.searchLanguage , _temp).subscribe((res) => {
      if(res && res['body']){
        this.languages = res['body'].languageList;
      }
    })
  }
  // handle data when user add number of visitors
  addingVisitors(type , operation){
    switch(operation){
      case 'add':{
        switch(type){
          case 'children': {
            ++this.numOfChildrens;
            ++this.totalVisitors; 
            break;
          }
          case 'adult': {
            ++this.numOfAdults;
            ++this.totalVisitors; 
            break;
          }
        }
        break;
      }
      case 'substract': { 
        switch(type){
          case 'children':{
            if(this.numOfChildrens != 0){
              --this.numOfChildrens;
              --this.totalVisitors; 
            }
            break;
          }
          case 'adult':{
            if(this.numOfAdults != 1){
              --this.numOfAdults;
              --this.totalVisitors; 
            }
            break;
          }
        }
        break;
      }
    }
  }
  categorySelected(type , typeOfCategory){
    this.page = 8;
    this.categoryName = type;
    this.isCategorySelected = true;
    this.tourByCategoryModel['cat_id']  = typeOfCategory.id;
    this.tourByCategoryModel['keyword'] = <any>this.placeName;
    this.tourByCategoryModel['no_of_adults'] = this.numOfAdults;
    this.tourByCategoryModel['no_of_childrens'] = this.numOfChildrens;
    if(this.selectedDate == ''){
      this.tourByCategoryModel['hire_date'] = <any>this.setDate();
    }else{
      this.tourByCategoryModel['hire_date'] = <any>this.setDate(this.selectedDate);
    }
    this.tripsByCtegory(this.offset , this.page);
  }
  tripsByCtegory(offset , page){
    this.tourByCategoryModel['offset'] = offset;
    this.tourByCategoryModel['page'] = page;
    this.httpCall.callApi('POST' , apiUrl.tourByCategoryForGuide , this.tourByCategoryModel).subscribe((res) => {
      if(res && res['body']){
        if(res['body'].status=='1'){
          this.listByCategory = res['body'].list;
          this.totalCount     = res['body'].totalCount;
        }
      }
    }); 
  }

  numOfVisitors: any;
  async searchTrips(type , offset , page ){
    // hide visitor dropdown on search click
    this.dropDownController['visitors'] = 'false';
    // to disable actve class from category
    this.categoryName                   = '100';

    this.soloTripSearchModel['offset']= offset;
    this.soloTripSearchModel['page']= page;

    await this.setSoloTripPostData();
    let _temp = new Validations().validateSearchField(this.soloTripSearchModel , type , this.selectedDate);
    if(_temp.isOkay){
      switch(type){ 
        case 'solo': {
          // this.soloPages = 8 ;
          this.httpCall.callApi('POST' , apiUrl.soloTripSearch , this.soloTripSearchModel).subscribe((res) => {
            if(res && res['body']){
              this.isCategorySelected = true;
              this.isTripTypeCombo    = false; 
              this.listByCategory = res['body']['guideList'];
              this.totalCount     = res['body']['total_records'];
              let _temp = {"city_id": res['body']['city_id'] ,
              "language_id": res['body']['language_id'] , 
              "no_of_adults":res['body']['no_of_adults'],
              "no_of_children": res['body']['no_of_children'] ,
              "hire_date": this.setDate(this.selectedDate)};
              localStorage.setItem("$otherTripDateWise" , "true");
              localStorage.setItem("$otherTrips" , JSON.stringify(_temp));
            }
          });
          break;
        }
        case 'combo':{ 
          let _tempo = {'city_id':this.soloTripSearchModel['city_id'] , 'place_id':'' , 'language_id':this.soloTripSearchModel['language_id'] , 
          'hire_date':this.setDate(this.selectedDate) , 'no_of_adults':this.numOfAdults , 'no_of_children': this.numOfChildrens , 'offset':offset ,'page':page};
          
          this.httpCall.callApi('POST' , apiUrl.categoryTourList , _tempo).subscribe((res) => {
            if(res && res['body']){
              this.isTripTypeCombo    = true;
              this.isCategorySelected = false;
              this.searchData = res['body']['list'];
              this.numOfVisitors = res['body'];
              // same as solo trip search
              let _temp = {"city_id": res['body']['city_id'] ,
              "language_id": res['body']['language_id'] , 
              "no_of_adults":res['body']['no_of_adults'],
              "no_of_children": res['body']['no_of_children'] ,
              "hire_date": this.setDate(this.selectedDate)};
              localStorage.setItem("$otherTripDateWise" , "true");
              localStorage.setItem("$otherTrips" , JSON.stringify(_temp));
              this.router.navigate(['/trip-listing'], {queryParams:{'destination':this.cityName}})
            }
          });
          break;
        }
      }
    } else{
      this.toastr.showWaring(_temp.msg);
    }
  }

  setSoloTripPostData(){
    this.soloTripSearchModel['no_of_adults']= this.numOfAdults;
    this.soloTripSearchModel['no_of_children']= this.numOfChildrens; 

    console.log("adult" , this.numOfAdults , this.numOfChildrens)

    this.soloTripSearchModel['hire_date']= this.setDate(this.selectedDate);
    // setting for guide detail page
    localStorage.setItem('$trip_date' , this.setDate(this.selectedDate));
  }

  sendMoreTrips(){
    this.page = 8+ this.page;
    this.tripsByCtegory(this.offset , this.page);
  }

  typeOfPackageSelected(type){
    this.addClass(type);
    switch(type == this.typeOfPackage){
      case true:{
        break;
      }
      case false: { 
        this.typeOfPackage = type;
        for(let item in this.soloTripSearchModel){
          this.soloTripSearchModel[item] = '';
        }
        this.dropDownValues['city']['city_name'] = 'City';
        this.dropDownValues['destination']['place_name'] = 'Destination';
        this.dropDownValues['language']['name'] = 'Language';
        this.destinations   = [];
        this.languages      = [];
        this.loadCityDestinationOnPageLoad();
      }
    }
    
  }


  loadMoreSearchTripsSolo(){
    this.searchTrips('solo' , this.soloOffset , this.soloPages+=8)
  }

  loadDefaultConfigLanguage(){
    this.httpCall.callApi('GET' , apiUrl.config , {}).subscribe((res) => {
      if(res && res['body']){
        this.tourByCategoryModel['language_id'] = res['body'].language_id;
      }
    });
  }

  addClass(type){
    switch(type){
      case 'solo':{ 
        let c = document.querySelector('.combo');
        if(c){
          c.classList.remove('combo');
        }
        break;
      }
      case 'combo':{
        let body = document.getElementsByTagName('form')[0];
        body.classList.add("combo");   //add the class
      }
    }
  }

}
