import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-indian-heritage',
  templateUrl: './indian-heritage.component.html',
  styleUrls: ['./indian-heritage.component.css']
})
export class IndianHeritageComponent implements OnInit {

  isIphone: boolean = false; 
  type: String;
  id  : Number;
  indianHeritageUrl = 'https://www.indiaheritagewalkfestival.com';
  isMobile = {
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }
  }
  
  constructor(private ac: ActivatedRoute) { 
    this.ac.params.subscribe((res) => {
      switch(res['type']){
        case 'register-baithak':
          this.indianHeritageUrl = "https://www.indiaheritagewalkfestival.com/index.php/form/baithak-registration-2019?source_entity_type=node&source_entity_id="+res['id'];
          break;
        case 'register-instameet':
          this.indianHeritageUrl = "https://www.indiaheritagewalkfestival.com/index.php/form/instameet-registration-2019?source_entity_type=node&source_entity_id="+res['id'];
          break;
        case 'register-workshop':
          this.indianHeritageUrl = "https://www.indiaheritagewalkfestival.com/index.php/form/workshops?source_entity_type=node&source_entity_id="+res['id'];
          break;
        case 'register-walk' :
          this.indianHeritageUrl = "https://www.indiaheritagewalkfestival.com/index.php/form/walk-registration-2019?source_entity_type=node&source_entity_id="+res['id'];
          break;
        default:
          this.indianHeritageUrl = 'https://www.indiaheritagewalkfestival.com';
      }
    });
  }

  ngOnInit() {
    if(this.isMobile.iOS()) { 
      this.isIphone = true;
    }
  }
}
