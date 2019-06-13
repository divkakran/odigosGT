import { Component, OnInit } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject , Optional } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { isPlatformBrowser } from '@angular/common';
import { RESPONSE } from "@nguniversal/express-engine/tokens";
import { Response } from 'express';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  // constructor(private platformId: Object,
  //  private response: Response) { }
  constructor() {}

  ngOnInit() {
    // if (!isPlatformBrowser(this.platformId)) {
    //   this.response.status(404);
    // }
  }

}
