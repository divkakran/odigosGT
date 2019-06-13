import { Injectable } from '@angular/core';

@Injectable({'providedIn':'root'})
export class PaymentSummaryPayU {
    constructor() {}
    post(obj , url){
        let mapForm = document.createElement("form");
        // mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = url;
        Object.keys(obj).forEach((param) => { 
            var mapInput = document.createElement("input");
            mapInput.type = "hidden";
            mapInput.name = param;
            mapInput.setAttribute("value", obj[param]);
            mapForm.appendChild(mapInput);
        });
        document.body.appendChild(mapForm);
        mapForm.submit();
    }
}