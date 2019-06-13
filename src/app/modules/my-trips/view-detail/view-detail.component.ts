import { Component, OnInit , OnDestroy , Input , Output , EventEmitter } from '@angular/core';
import { LoadScript } from '../../../helper/loadScript';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.css']
})
export class ViewDetailComponent implements OnInit , OnDestroy {
  baseImageUrl  : String;
  loadAPI: Promise<any>;
  @Input() tripDetail: object;
  @Output() viewDetailCloseEvent = new EventEmitter<Boolean>();
  constructor() { }

  ngOnInit() { console.log('-------',this.tripDetail)
    this.baseImageUrl = environment.baseImageUrl;
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("backdrop");   //add the class
    var element = document.createElement("div");
    element.setAttribute("class", 'overlay');
    document.body.appendChild(element);
    this.loadScript();
  }
  loadScript(){
    this.loadAPI = new Promise((resolve) => {
      new LoadScript().loadScript(["assets/js/custom.js"]);
      resolve(true);
    });
  }
  ngOnDestroy(){
    let c = document.querySelector('.overlay');
    if(c){
      c.classList.remove('overlay');
      let backdrop = document.querySelector('.backdrop');
      backdrop.classList.remove('backdrop');
    }
  }
  closeViewDetail(){
    this.viewDetailCloseEvent.emit();
  }

}
