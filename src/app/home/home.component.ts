import { Component, ViewChild,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OperationService } from './../operation.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  details:object;
  length: number;
  pageSize: number;
  num: number = 1;
  changeno: number = 1;

  pageEvent: PageEvent;
  displayedColumns: string[] = ['sn', 'id', 'name', 'minorder', 'maxorder', 'price'];
  dataSource = new MatTableDataSource();

  host: string = environment.serverpath;
  token = sessionStorage.getItem("token");
  constructor(private router: Router, private http: HttpClient, public operation: OperationService) { }

  ngOnInit(): void {
    this.prolist(this.num);
    
  }
  prolist(num){
    return this.http.get(this.host + '/api/v1/fish/?page='+num, { headers: new HttpHeaders().set('Authorization',this.token) }).subscribe(
      res => {
        this.details = res["results"];
        console.log(this.details);
        this.pageSize = res["page_size"];
        this.length = res["count"];
        this.num = res["num_pages"];
      },
      err => {
        console.log(err.message);
      }  
    );
  }
  
  index(event){
    console.log(this.pageEvent.pageIndex);
    this.num = this.pageEvent.pageIndex + 1;
    this.prolist(this.num);
    }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }  
      
}
