import { Component, OnInit } from '@angular/core';
import { Title , Meta} from '@angular/platform-browser';
@Component({
  selector: 'app-terms-for-tourist',
  templateUrl: './terms-for-tourist.component.html',
  styleUrls: ['./terms-for-tourist.component.css']
})
export class TermsForTouristComponent implements OnInit {

  constructor(private title: Title , private meta: Meta) { 
    this.title.setTitle("Terms for Tourist - Odigos");
    this.meta.addTags([{ name:"description" , content: 'Know our Terms for Tourist' } ,
    {name:'keywords' , content: 'Terms for Tourist'}]);
  }

  ngOnInit() {
  }

}
