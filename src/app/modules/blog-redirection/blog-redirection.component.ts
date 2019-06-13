import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog-redirection',
  templateUrl: './blog-redirection.component.html',
  styleUrls: ['./blog-redirection.component.css']
})
export class BlogRedirectionComponent implements OnInit {

  constructor(private ac: ActivatedRoute , private router: Router) { }

  ngOnInit() {
    this.ac.params.subscribe((res) => { 
      if(res['id'] == undefined || res['id']==''){
        window.location.href = window.location.origin+'/blog';
      }else{
        console.log('url redirect else' , window.location.origin+'/redirect/https://www.odigosguides.com/blog/');
        window.location.href  = window.location.origin+'/blog/'+res['id'];
        // window.location.href = "http://blog.launderette.staging.birdapps.org/"+res['id'];
      }
    });
  }
}
