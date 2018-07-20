import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    
    constructor(private http: HttpClient, private router: Router) {
    }

    get isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    get whoAmI(){
        return localStorage.getItem('username');
    }

    // QUESTION CRUD

    register(credentials) {
        this.http.post<any>(`http://localhost:18080/api/account`, credentials).subscribe(res => {
            console.log("register ,,, ");
            this.authenticate(res, credentials);
        }, httpError => {
            this.displayEditMessage(httpError);
        })
    }

    login(credentials) {
        this.http.post<any>(`http://localhost:18080/api/account/login`, credentials).subscribe(res => {
            this.authenticate(res, credentials);            
        }, httpError => {
            this.displayEditMessage(httpError);
        })
    }

    authenticate(res, credentials) {
        localStorage.setItem('username', credentials.email);
        localStorage.setItem('token', res);
        this.router.navigate(['/']);
    }

    logout() {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    deleteAccount(credentials){
        this.http.post<any>(`http://localhost:18080/api/account/delete`, credentials).subscribe(res => {
            this.logout();
        }, httpError => {
            this.displayEditMessage(httpError);
        })
    }

    displayEditMessage(httpError) {
        if (httpError) {
            console.log(httpError);
            if (httpError.error) {
                var errorMsg = '';
                httpError.error.forEach(err => {
                    errorMsg += `${httpError.error[0].code} : ${httpError.error[0].description} \n`
                });
                alert(errorMsg);
            }
        }
    }

}