import { Component, OnInit , OnDestroy , Input , Output , EventEmitter} from '@angular/core';
import { HttpCallService } from '../../../helper/httpCall.service';
import { apiUrl } from '../../../app.constants';
import { Toaster } from '../../../helper/toaster';
import { Encryption } from '../../../helper/encryption';
import { DataPassingService } from '../../../helper/dataPassingService';
 
@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent implements OnInit , OnDestroy {

  fileObjectToBeUpload : any ;
  @Input() image       : any;
  @Output() cropImageOutput = new EventEmitter<Object>();
  constructor(private httpCall: HttpCallService , private toastr: Toaster , private encrypt: Encryption ,
  private dataShare: DataPassingService) { }

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("backdrop");   //add the class
    var element = document.createElement("div");
    element.setAttribute("class", 'overlay');
    document.body.appendChild(element);
  }

  ngOnDestroy(){
    let c = document.querySelector('.overlay');
    if(c){
      c.classList.remove('overlay');
      let backdrop = document.querySelector('.backdrop');
      backdrop.classList.remove('backdrop');
    }
  }

  closeCropImageComponent(obj){
    this.cropImageOutput.emit(obj);
  }

  urltoFile(url, filename, mimeType){
    return (fetch(url)
      .then(function(res){
        return res.arrayBuffer();
      })
      .then(function(buf){
        return new File([buf], filename, {type:mimeType});
      })
    );
  }

  croppedImage(event){ 
  // dynamic name this.image.image.target.files[0].name
    this.urltoFile(event, 'pic.png', this.image.image.target.files[0].type)
    .then((file) =>  { 
      this.fileObjectToBeUpload = file;
    });
  }
  uploadImage(){
    let formData = new FormData();
    formData.append("user_id"   , this.image.userDetail['user_id']);
    formData.append("imagefile" , this.fileObjectToBeUpload);
    this.httpCall.callApi('POST' , apiUrl.profileImage , formData).subscribe((res) => {
      if(res && res['body']){
        this.updateUserDetailImage(res['body']);
        this.toastr.showSucess(res['body'].message);
        this.dataShare.sendGuideDetail({updatedGuideImage: res['body'].image_url , name: this.image.userDetail['name']});
        this.closeCropImageComponent({closeCropComponent: true , updatedGuideImage: res['body'].image_url });
      }
    });
  }
  
  updateUserDetailImage(data){
    let uDetail = JSON.parse(localStorage.getItem('$user'));
    uDetail['image_url'] = data.image_url;
    localStorage.setItem('$user', JSON.stringify(uDetail));
  }
}
