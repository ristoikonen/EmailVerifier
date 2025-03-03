import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
//import 'rxjs';
//import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { UseriData } from '../models/useri-data';


@Injectable(
//  { providedIn: 'root'}
)
export class DataserviceService {

  constructor(private http: HttpClient) { }

  public getPosts() {
    /*
    var ret = this.http.get<UseriData[]>('https://jsonplaceholder.typicode.com/posts');
    ret.forEach(e => {
      console.log("ok:" + e.values.toLocaleString());  
    });
    */
    return this.http.get<UseriData>('https://jsonplaceholder.typicode.com/posts');
              //.pipe(map(res => res.json()));


  }

  public getUserdata() {

    return this.http.get<UseriData[]>('https://jsonplaceholder.typicode.com/posts')
    .subscribe((d)=>{console.log(d);});
              //.pipe(map(res => res.json()));


  }


}
