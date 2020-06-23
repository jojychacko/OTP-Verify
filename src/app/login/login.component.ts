import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OperationService } from './../operation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  details: object;
  host: string = environment.serverpath;

  constructor(private router: Router, private http: HttpClient, public operation: OperationService) { 
    this.loginForm = new FormGroup({
      mobile: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let data = this.loginForm.value;
    let userdata = this.details = {"phone": "+91" + data.mobile}
    console.log(userdata);
    return this.http.post(this.host + '/api/v1/user/get_otp/', userdata).subscribe(
      res => {
        this.operation.mobno = userdata.phone;
        this.operation.otp = res;
        this.router.navigate(['validate']);
      },
      err => {
        console.log(err.message);
      }
    );
  }

}
