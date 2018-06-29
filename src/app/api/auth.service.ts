import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{

    constructor(private http: HttpClient, private router: Router){        
    }

    get isAuthenticated(){
        return !!localStorage.getItem('token');
    }

    // QUESTION CRUD

    register(credentials){
        this.http.post<any>(`http://localhost:18080/api/account`, credentials).subscribe(res =>{
            this.authenticate(res);
        })
    }

    login(credentials){
        this.http.post<any>(`http://localhost:18080/api/account/login`, credentials).subscribe(res =>{
            this.authenticate(res);
        })
    }

    authenticate(res){
        localStorage.setItem('token', res);
        this.router.navigate(['/']);
    }

    logout(){
        localStorage.removeItem('token');
    }
   
}