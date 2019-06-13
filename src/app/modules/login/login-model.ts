export class LoginModel{
    login_value    : string;
    login_type     : string;
    uuid_value     : string;
    login_password : string;
    social_id      : string
    constructor(email , loginType , uuid_value , password , socialId){
        this.login_value    = email;
        this.login_type     = loginType;
        this.uuid_value     = uuid_value;
        this.login_password = password;
        this.social_id      = socialId
    }
}