import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Useri } from './models/useri';
import { UseriData } from './models/useri-data';
import { User } from "./models/user";
import { catchError, tap } from "rxjs/operators";
import { IAlbum } from "./models/album";

@Injectable({
  providedIn: 'root'
})
export class NutdataService {

  constructor(private http: HttpClient) {}

    readonly url = 'https://reqres.in/api/users?page=1';
    readonly wrongUrl = `https://fakestoreapi.com/users?limit=2`;
    readonly albums_url =  "https://jsonplaceholder.typicode.com/albums";
    
    public getUsers(): Observable<UseriData[]> {

      var ret = this.http.get<UseriData[]>(this.url);

      return this.http.get<UseriData[]>(this.url);
        
      //pipe.map(res => res.json());
    }

    public getAlbums(): Observable<IAlbum[]> {
      return this.http.get<IAlbum[]>(this.albums_url);
    }


    getUserData(): Observable<User[]> {
      return this.http
          .get <User[]> (this.url)
              .pipe(tap((data) => console.log( data)));
    }



}
