import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-cancellation-policy',
  templateUrl: './cancellation-policy.component.html',
  styleUrls: ['./cancellation-policy.component.css']
})
export class CancellationPolicyComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle("Cancellation Policy");
   }

  ngOnInit() {
  }

}
