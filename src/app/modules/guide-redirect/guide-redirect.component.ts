import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-guide-redirect',
  templateUrl: './guide-redirect.component.html',
  styleUrls: ['./guide-redirect.component.css']
})
export class GuideRedirectComponent implements OnInit {

  constructor(private ac: ActivatedRoute) { }

  ngOnInit() {
    this.ac.params.subscribe((res) => { 
      // if(res['id'] == undefined || res['id']==''){ 
      //   window.location.href = window.location.origin+"/tour-guide";
      // }else{
      //   window.location.href = window.location.origin+"/tour-guide";
      // }
    });
  }

}
