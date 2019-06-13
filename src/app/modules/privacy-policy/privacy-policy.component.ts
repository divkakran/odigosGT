import { Component, OnInit } from '@angular/core';
import { Title , Meta} from '@angular/platform-browser';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private title: Title , private meta: Meta) {
    this.title.setTitle("Privacy Policy");
    this.meta.addTags([{ name:"description" , content: 'Know our Privacy policy' } ,
    {name:'keywords' , content: 'privacy policy'}]);
   }

  ngOnInit() {
  }

}
