import { Component, OnInit , OnDestroy } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit , OnDestroy {

  disclaimer: String = `You acknowledge and agree that by using Guide Services on 
  Odigos you create a direct business relationship with the  Guide Service 
  Provider/Third Party(ies). Birdres is not responsible or liable for the actions 
  or inactions of the Guide Service Provider/Third Party(ies) in relation to you, 
  your activities or your use of Guide services on Odigos. You shall have the sole 
  responsibility for any obligations or liabilities to Guide Service Provider/Third 
  Party(ies) that arise from your provision of use Guide Services. You acknowledge and 
  agree that you are solely responsible for taking all such precautions as may be 
  reasonable and proper regarding any acts or omissions of a Guide Service 
  Provider/Third Party(ies) and will hold Birdres harmless and indemnified on account hereof. `;

  itineryText : String = "Read More";
  discLength  : Number = 120;
  thankMsg    : String ;
  gName       : String ;
  placeUrl    : String
  constructor(private ac: ActivatedRoute , private route: Router) { }

  ngOnInit() {
    this.ac.paramMap.subscribe((res) => { 
      this.gName     = res.get('name');
      this.placeUrl  = res.get('placeUrl');
    });
    if(localStorage.getItem('odigos_ty')){
      this.thankMsg = JSON.parse(localStorage.getItem('odigos_ty'));
    }else{
      this.route.navigate(['/tour-guide/'+this.gName+'/'+this.placeUrl])
    }
  }

  readMoreReadLess(){
    if(this.itineryText == "Read More"){
      this.discLength   =  this.disclaimer.length;
      this.itineryText  =  "Read Less";
    }else{
      this.discLength  = 120;
      this.itineryText = "Read More"
    }
  }

  dashboard(){
    this.route.navigate(['/tour-guide/'+this.gName+'/'+this.placeUrl]);
  }

  ngOnDestroy(){
    localStorage.removeItem('odigos_ty');
  }

}
