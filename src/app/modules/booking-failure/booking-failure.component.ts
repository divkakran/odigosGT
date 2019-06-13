import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-booking-failure',
  templateUrl: './booking-failure.component.html',
  styleUrls: ['./booking-failure.component.css']
})
export class BookingFailureComponent implements OnInit {

  baseImageUrl: string;
  constructor() { }

  ngOnInit() {
    this.baseImageUrl = environment.baseImageUrl;
  }

}
