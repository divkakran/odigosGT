export class RequestStatusTrips{
    public getStatus(type , actionBy){ 
        switch(type){
            case '0':{
                return 'Pending';
            }
            case '1':{ 
                return 'Accept';
            }
            case '2':{
                return 'Request rejected by '+ actionBy;
            }
            case '3':{
                return 'Request is Time out';
            }
            case '4':{
                return 'Upcoming';
            }
            case '5':{
                return 'Past';
            }
            case '6':{
                return 'Request cancelled by '+ actionBy;
            }
        }
    }
}