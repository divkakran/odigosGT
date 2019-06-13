export class Contact {
    name    : String;
    mobile  : String;
    email   : String;
    city    : String;
    comments: String;
    constructor(name , mobile , email , city , comments){
        this.name     = name;
        this.mobile   = mobile;
        this.email    = email;
        this.city     = city;
        this.comments = comments;
    }
}