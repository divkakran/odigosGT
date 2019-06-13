import { Component, OnInit , Input } from '@angular/core';
import { HttpCallService } from '../../../helper/httpCall.service';
import { apiUrl } from '../../../app.constants';

@Component({
  selector: 'app-trip-search-list',
  templateUrl: './trip-search-list.component.html',
  styleUrls: ['./trip-search-list.component.css']
})
export class TripSearchListComponent implements OnInit {

  @Input() placeName;
  constructor(private httpCall: HttpCallService) { }

  ngOnInit() {
    this.setDate();
    this.loadCategory();
    this.loadCategoryTrips();
  }
  loadCategory(){
    let _temp = {"city_id":"","language_id":"",
    "hire_date":this.setDate(),"no_of_adults":"1","no_of_children":"0","keyword": this.placeName,
    "offset":0,"page":100}
    this.httpCall.callApi('POST' , apiUrl.categoryList , _temp).subscribe((res) => {
      if(res && res['body']){
        console.log('category list' , res['body']);
      }
    });
  }
  loadCategoryTrips(){
    let _temp = {"city_id":"","language_id":"5a93977c4b1b3ece26f2d5ef","keyword":this.placeName,
    "hire_date": this.setDate(),"no_of_adults":"1","no_of_children":"0","offset":0,"page":5}
    this.httpCall.callApi('POST' , apiUrl.categoryTourList , _temp).subscribe((res) => {
      if(res && res['body']){
        console.log('category trips list' , res['body']);
      }
    });
  }
  setDate(){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let today = new Date().getDate() + 1; 
    let mm    = new Date().getMonth(); 
    let yyyy  = new Date().getFullYear();
    if (today < 10) {
      today = +'0' + today;
    }
    return  monthNames[mm] +' ' + today + ', ' + yyyy;
  }

}
