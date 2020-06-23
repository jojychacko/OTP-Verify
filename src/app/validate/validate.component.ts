import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OperationService } from './../operation.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  OTPForm: FormGroup;
  details: object;
  host: string = environment.serverpath;

  login: object;
  token = sessionStorage.getItem( "access" );

  constructor(private router: Router, private http: HttpClient, public operation: OperationService) {
    this.OTPForm = new FormGroup({ phone: new FormControl(''), });
   }

  ngOnInit(): void {
  }
  onSubmit() {
    let data = this.OTPForm.value;
    let userdata = this.details =
    {
      "username": this.operation.mobno,
      "password": data.phone
    }
    console.log(userdata);
    return this.http.post(this.host + '/api/v1/user/get_access_token/', userdata).subscribe(
      res => {
        this.login = res;
        sessionStorage.setItem( "token", this.login[ "access" ]);
        this.router.navigate(['home']);
      },
      err => {
        console.log(err.message);
      }  
    );
  }
}
