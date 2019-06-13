export class SignUpModel{
    name          : string;
    login_value   : string;
    login_password: string;
    login_type    : string;
    device_type   : string;
    uuid_value    : string;
    country_id    : string;
    currency_id   : string;
    social_id     : string;
    mobile        : string;
    constructor(name , loginValue , password , loginType , deviceType, uuidValue ,
        countryId , currencyId , socialId , mobile){
        this.name = name;
        this.login_value = loginValue;
        this.login_password = password;
        this.login_type = loginType;
        this.device_type = deviceType;
        this.uuid_value = uuidValue;
        this.country_id = countryId;
        this.currency_id = currencyId;
        this.social_id = socialId;
        this.mobile = mobile;
    }
}