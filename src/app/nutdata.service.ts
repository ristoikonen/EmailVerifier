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




    /*
    public sendSimpleMessage() {
      
      const mg = this.Mailgun({
        apiKey: environment.MG_API_KEY || "API_KEY",
        domain: "sandbox343abfec1e804c278a9db15d7b01babd.mailgun.org",
      });
      try {
        const data = mg.messages().send({
          from: "Mailgun Sandbox <postmaster@sandbox343abfec1e804c278a9db15d7b01babd.mailgun.org>",
          to: ["Risto Ikonen <ristoikonen@edny.net>"],
          subject: "Hello Risto Ikonen",
          text: "Congratulations Risto Ikonen, you just sent an email with Mailgun! You are truly awesome!",
        });
    
        console.log(data); // logs response data
      } catch (error) {
        console.log(error); //logs any error
      }

    }

    */

      /*
      const mailgun = new Mailgun(FormData);
      const mg = mailgun({
        username: "api",
        key: environment.MG_API_KEY || "API_KEY",
      });
      try {
        const data = mg.messages.create("sandbox343abfec1e804c278a9db15d7b01babd.mailgun.org", {
          from: "Mailgun Sandbox <postmaster@sandbox343abfec1e804c278a9db15d7b01babd.mailgun.org>",
          to: ["Risto Ikonen <ristoikonen@edny.net>"],
          subject: "Hello Risto Ikonen",
          text: "Congratulations Risto Ikonen, you just sent an email with Mailgun! You are truly awesome!",
        });
    
        console.log(data); // logs response data
      } catch (error) {
        console.log(error); //logs any error
      }
    }
*/
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

/*
    public sendSimpleMessage() {
      const headers = new HttpHeaders({
        'enctype': 'multipart/form-data',
        'Authorization': 'Basic ' + btoa('api:' + 'xyzeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NDEwNjkwMDQsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJhZGRyZXNzIjoicmlzdG9pa29uZW5AZWRueS5uZXQiLCJpZCI6IjY3YzY5OTA2NTViYTZkYzBkNTA4MjJhMSIsIm1lcmN1cmUiOnsic3Vic2NyaWJlIjpbIi9hY2NvdW50cy82N2M2OTkwNjU1YmE2ZGMwZDUwODIyYTEiXX19.D09nrA44_NE7WTBGUmf4362X9KUAAuXxC70O2K1jlbbVM70eKiaOJ-1PrFtH8XvxCQeZoVQt8qZlxt7mbFvSiQ') //environment.MG_API_KEY),
      });
  
      const formData = new FormData();
      formData.append('from', 'Mailgun Sandbox <postmaster@xyzsandbox343abfec1e804c278a9db15d7b01babd.mailgun.org>');
      formData.append('to', 'xyz@edny.net');
      formData.append('subject', 'Hello');
      formData.append('text', 'Email body here.');
  
      this.http
        .post(
          'https://api.mailgun.net/v3/xyzsandbox343abfec1e804c278a9db15d7b01babd.mailgun.org/messages',
          formData,
          { headers }
        ).subscribe(
          res => { console.log('res : ', res); },
          err => { console.log('err : ', err); }
        );
    }
  */

}
