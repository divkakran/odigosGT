import { WINDOW } from '@ng-toolkit/universal';
import { Component , Inject } from '@angular/core';
import { EasyBookingComponent } from './modules/easy-booking/easy-booking.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  hideHeaderFooter: boolean = true;
  public showContent: boolean = false;
  constructor(@Inject(WINDOW) private window: Window) {
  }

  onActivate(event) {
    if(event instanceof EasyBookingComponent){
      this.hideHeaderFooter = false;
    }else{
      this.hideHeaderFooter = true;
    }
    this.window.scroll(0,0);
    setTimeout(()=>this.showContent=true, 1000);
  }
}
