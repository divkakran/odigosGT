import { Component, OnInit } from '@angular/core';
import { Title , Meta} from '@angular/platform-browser';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private title: Title , private meta: Meta) {
    this.title.setTitle("FAQ- Odigos");
    this.meta.addTags([{ name:"description" , content: 'FAQ of Odigos' } ,
    {name:'keywords' , content: 'FAQ'}]);
   }

  ngOnInit() {
  }

}
