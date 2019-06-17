import { WINDOW } from '@ng-toolkit/universal';
import { Component , Inject , OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public showContent: boolean = false;
 constructor(@Inject(WINDOW) private window: Window) { }

  onActivate(event) {
    this.window.scroll(0,0);
    setTimeout(()=>this.showContent=true, 2000);
  }
}
