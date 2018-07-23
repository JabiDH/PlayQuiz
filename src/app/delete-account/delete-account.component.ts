import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})

export class DeleteAccountComponent implements OnInit {

  form;
  
  constructor(private fb: FormBuilder, private auth: AuthService){  
    let email = fb.control({value: auth.whoAmI, disabled: true});
    let password = fb.control('', [Validators.required]);
    this.form = fb.group({email: email, password: password});       
  }

  ngOnInit() {
  }

  deleteAccount(){    
    this.auth.deleteAccount(this.auth.whoAmI, this.form.value.password);
  }  

}
