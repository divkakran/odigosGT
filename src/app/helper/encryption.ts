import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({providedIn: 'root'})
export class Encryption{
    // public encryptData(obj){
    //     let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), 'my value');
    //     return ciphertext;
    // }
    // public decryptData(ciphertext){
    //     let plainText = JSON.parse(CryptoJS.AES.decrypt(ciphertext.toString(), 'my value').toString(CryptoJS.enc.Utf8));
    //     return plainText;
    // }
}