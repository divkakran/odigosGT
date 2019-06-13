export class BookNowModel {
    guide_id       : string;
    user_id        : string;
    package_id     : string;
    date_of_tour   : string;
    no_of_adults   : string;
    no_of_children : string;
    guide_charges  : string;
    language_id    : string;
    duration_hours : string;
    vendor_token   : string;
    mobile         : string;
    package_type   : string;
    device_type    : String; 
    constructor(gId , uId , pId , date , numAdult , numChildren , charge , langId , duration 
        , vendorToken , mobile , packageType){
        this.guide_id        = gId;
        this.user_id         = uId;
        this.package_id      = pId;
        this.date_of_tour    = date;
        this.no_of_adults    = numAdult;
        this.no_of_children  = numChildren;
        this.guide_charges   = charge;
        this.language_id     = langId;
        this.duration_hours  = duration;
        this.vendor_token    = vendorToken;
        this.mobile          = mobile;
        this.package_type    = packageType;
        this.device_type     = "WEB";
    }
}