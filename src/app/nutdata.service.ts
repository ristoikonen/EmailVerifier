import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Useri } from './models/useri';
import { UseriData } from './models/useri-data';
import { User } from "./models/user";
import { catchError, tap } from "rxjs/operators";
import { IAlbum, IMessage, IMessagesResult, IMessages, IMessageItem } from "./models/album";
import { environment } from '../environments/environment';
import FormData from "form-data"; // form-data v4.0.1
//import Mailgun from "mailgun-js"; // mailgun.js v11.1.0


@Injectable({
  providedIn: 'root'
})
export class NutdataService {

  constructor(private http: HttpClient) {}

    readonly url = 'https://reqres.in/api/users?page=1';
    readonly wrongUrl = `https://fakestoreapi.com/users?limit=2`;
    readonly albums_url =  "https://jsonplaceholder.typicode.com/albums";
    readonly message_url =  "https://api.mail.tm/messages/67c69b4334415a88fd982224";
    readonly messages_url =  "https://api.mail.tm/messages";
    //private Mailgun: Mailgun.Mailgun;
    //private Mailgun = require('mailgun.js');

    public getAlbums(): Observable<IAlbum[]> {
      return this.http.get<IAlbum[]>(this.albums_url);
    }

    public getAlbumById(id: number): Observable<IAlbum> {
      return this.http.get<IAlbum>(`${this.albums_url}/${id}`);
    }



    public getUsers(): Observable<UseriData[]> {
      var ret = this.http.get<UseriData[]>(this.url);
      return this.http.get<UseriData[]>(this.url);
      //pipe.map(res => res.json());
    }

    getUserData(): Observable<User[]> {
      return this.http
        
          .get <User[]> (this.url)
              .pipe(tap((data) => console.log( data)));
    }


    getMessageById(): Observable<IMessagesResult> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + environment.token
      })
      return this.http.get<IMessagesResult>(this.message_url, { headers: headers })
    }

    getMessages(): Observable<IMessages<IMessagesResult>>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + environment.token
      })
      return this.http.get<IMessages<IMessagesResult>>(this.messages_url, { headers: headers })
    }
}
