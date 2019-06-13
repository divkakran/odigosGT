export class MyProfileModel{
    name       : string;
    gender     : string;
    user_id    : string;
    country_id : string;
    currency_id: string;
    mobile     : string
    constructor(name , gender , userId , countryId , currencyId , mobile){
        this.name        = name;
        this.gender      = gender;
        this.user_id     = userId;
        this.country_id  = countryId;
        this.currency_id = currencyId
        this.mobile      = mobile;
    }
}