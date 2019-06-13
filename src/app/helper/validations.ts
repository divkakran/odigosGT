export class Validations{
    public getInTouchValidate(value){ 
        let _temp = { isOkay : false , msg:'' };
        if(value.contact_name == ""){
            _temp.msg = "Name is required";
            return _temp;
        }else if(value.contact_email == ""){
            _temp.msg = "Email is required";
            return _temp;
        }else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value.contact_email).toLowerCase()))){
            _temp.msg = "Email is not valid";
            return _temp;
        }else if(value.contact_mobile == ""){
            _temp.msg = "Phone is required";
            return _temp;
        }else if(value.contact_mobile.length < 10){
            _temp.msg = "Phone isn't valid";
            return _temp;
        }else if(value.contact_city == ""){
            _temp.msg = "City is required";
            return _temp;
        }else if(value.contact_comments == ""){ 
            _temp.msg = "Comment is required";
            return _temp;
        } else{
            _temp.isOkay = true;
            return _temp;
        }
    }
    public loginValidations(value){
        let _temp = { isOkay : false , msg:'' };
        if(value.email == ""){
            _temp.msg = "Email is required";
            return _temp;
        }else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value.email).toLowerCase()))){
            _temp.msg = "Email is not valid";
            return _temp;
        }else if(value.password == ""){
            _temp.msg = "Password is required";
            return _temp;
        } else{
            _temp.isOkay = true;
            return _temp;
        }
    }
    public signUpValidations(value){
        let _temp = { isOkay : false , msg:'' };
        if(value.name == ""){
            _temp.msg = "Name is required";
            return _temp;
        }else if(value.email == ""){
            _temp.msg = "Email is required";
            return _temp;
        }else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value.email).toLowerCase()))){
            _temp.msg = "Email is not valid";
            return _temp;
        }else if(value.countryId =="" || value.countryId == "0"){
            _temp.msg = "Please select country";
            return _temp;
        }else if(value.currencyId =="" || value.currencyId == "0"){
            _temp.msg = "Please select currency";
            return _temp;
        }else if(value.mobile == ""){
            _temp.msg = "Mobile is required";
            return _temp;
        }else if(value.mobile.length < 10){
            _temp.msg = "Mobile is invalid";
            return _temp;
        }else if(value.password == "" && !value.socialLogin){ 
            _temp.msg = "Password is required";
            return _temp;
        }else if(value.acceptTerms == '' && !value.socialLogin){
            _temp.msg = "Please accept terms and conditions";
            return _temp;
        }else{
            _temp.isOkay = true;
            return _temp;
        }
    }
    public forgotPasswordValidations(val){
        let _temp = { isOkay : false , msg:'' };
        if(val==''){
            _temp.msg = "Please enter email";
            return _temp;
        }else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(val).toLowerCase()))){
            _temp.msg = "Email is not valid";
            return _temp;
        }else{
            _temp.isOkay = true;
            return _temp;
        }
    }
    public profileUpdateValidations(value){ 
        let _temp = { isOkay : false , msg:'' };
        if(value.name == ""){
            _temp.msg = "Name is required";
            return _temp;
        }else if(value.email == ""){
            _temp.msg = "Email is required";
            return _temp;
        }else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value.email).toLowerCase()))){
            _temp.msg = "Email is not valid";
            return _temp;
        }else if(value.country_id =="" || value.country_id == "0"){
            _temp.msg = "Please select country";
            return _temp;
        }else if(value.currency_id =="" || value.currency_id == "0"){
            _temp.msg = "Please select currency";
            return _temp;
        }else if(value.mobile == ""){
            _temp.msg = "Mobile is required";
            return _temp;
        }else if(value.mobile.length < 10){
            _temp.msg = "Mobile is invalid";
            return _temp;
        }else{
            _temp.isOkay = true;
            return _temp;
        }
    }
    public passwordResetValidations(value){
        let _temp = { isOkay : false , msg:'' };
        if(value.cpass == "" ){
            _temp.msg = "Enter Current Password";
            return _temp;
        }else if(value.npass == ""){
            _temp.msg = "Enter New Password";
            return _temp;
        }else if(value.npass == value.cpass){
            _temp.msg = "New and old Password can not be same";
            return _temp;
        }
        else if(value.rpass == ""){
            _temp.msg = "Enter Confirm Password";
            return _temp;
        }else if(value.npass != value.rpass){
            _temp.msg = "Confirm Password isn't correct";
            return _temp;
        }else{
            _temp.isOkay = true;
            return _temp;
        }
    }
    public supportPageValidate(value){
        let _temp = { isOkay : false , msg:'' };
        if(value.name == "" ){
            _temp.msg = "Name is required";
            return _temp;
        }else if(value.email == ""){
            _temp.msg = "Email is required";
            return _temp;
        }else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value.email).toLowerCase()))){
            _temp.msg = "Email is not valid";
            return _temp;
        }else if(value.category == '' || value.category=='0'){
            _temp.msg = "Please select category";
            return _temp;
        }else{
            _temp.isOkay = true;
            return _temp;
        }
    }
    public enquiryPageValidate(value){
        let _temp = { isOkay : false , msg:'' };
        if(value.name == "" ){
            _temp.msg = "Name is required";
            return _temp;
        }else if(value.email == ""){
            _temp.msg = "Email is required";
            return _temp;
        }else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value.email).toLowerCase()))){
            _temp.msg = "Email is not valid";
            return _temp;
        }else if(value.mobile == ''){
            _temp.msg = "Please enter mobile";
            return _temp;
        }else if(value.mobile.length<10){
            _temp.msg = "Mobile isn't valid";
            return _temp;
        }else if(value.query == ''){
            _temp.msg = "Please enter your query";
            return _temp;
        }else{
            _temp.isOkay = true;
            return _temp;
        }
    }
    public validateSearchField(value , type , date?){
        let _temp = { isOkay : false , msg:'' };
        if(value['city_id']==''){
            _temp.msg = "City is required";
            return _temp;
        } 
        else if(value['place_id']=='' && type=='solo'){
            _temp.msg = "Destination is required";
            return _temp;
        } 
        else if(value['language_id']==''){
            _temp.msg = "Language is required";
            return _temp;
        } else if(date == ''){
            _temp.msg = "Date is required";
            return _temp;
        } else{
            _temp.isOkay = true;
            return _temp;
        }
    }
}