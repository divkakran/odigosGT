import { Component, OnInit } from '@angular/core';
import { Title , Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-terms-for-guide',
  templateUrl: './terms-for-guide.component.html',
  styleUrls: ['./terms-for-guide.component.css']
})
export class TermsForGuideComponent implements OnInit {

  constructor(private title: Title , private meta : Meta) {
    this.title.setTitle("Terms For Guide - Odigos");
    this.meta.addTags([{ name:"description" , content: 'Know our terms for guide' } ,
    {name:'keywords' , content: 'terms for guide'}]);
   }

  ngOnInit() {
  }

}
