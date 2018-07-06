import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(){        
    }

    intercept(req, next){
        
        var token = localStorage.getItem('token');

        var authRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`).set('Access-Control-Allow-Origin', 'http://localhost:4200/')
        });
        console.log(authRequest);
        return next.handle(authRequest);
    }
   
}