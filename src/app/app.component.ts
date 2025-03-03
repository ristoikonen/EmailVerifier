import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core'; 
import {  Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { NutdataService } from './nutdata.service';
import { UserInformation } from './models/user-information';
import { Useri } from './models/useri';
import { UseriData } from './models/useri-data'; 
import { IAlbum } from "./models/album";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ctor';
  warn = '';
  useries = [];
  userdata$: Array<UseriData> = [];
  udata: UseriData[] = [];
  arrx: UseriData[] | undefined;
  ud: UseriData[] = [];
  album: IAlbum[] = [];
  users = new Array<any>();
  readonly uurl = 'https://reqres.in/api/users?page=1';

  constructor(private http: HttpClient,
    private nutdataService: NutdataService, 
    //private dataService: DataserviceService,
    //private sanitizer: DomSanitizer
    ) { 

      const userObservable = this.nutdataService.getUsers();


      let ud = new Array<UseriData>();  
      this.ud.push({first_name: "Male", id: 1, avatar:"https://reqres.in/img/faces/1-image.jpg", email:"dd", last_name:"dd"});


      //userObservable.pipe(map(r => r)).subscribe((data:UseriData[]) => this.udata = data)
      userObservable.pipe().subscribe((data:UseriData[]) => this.udata = data);
      userObservable.subscribe(data => this.arrx = { ...data });

      //let dataNames = this.userdata.map(e => e.title);
      //console.log(dataNames);      
      //this.userdata.forEach((data)=>{console.log(data.title)})

    }
  
    ngOnInit() {
      // call the method
      this.getUseriData();
      this.getUsers()
      //this.getAlbums();
      this.getAlbumData();
    }

    getUseriData() {
      this.nutdataService.getUsers().subscribe( {
        
        next: (userdata) => {
          this.userdata$ = userdata;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    getAlbumData() {
        this.nutdataService.getAlbums().subscribe( {
          
          next: (data) => {
            this.album = data;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }

      getAlbums() {
        this.nutdataService.getAlbums().subscribe(data=>{
            this.album = data as IAlbum[];
            console.log(this.album);
          }
          , err=>{
            console.log(err);
          }
        );
      }

      getUsers(){

        this.http.get<any>(this.uurl).subscribe(response => {
          this.users = response.data;
          console.log(this.users);
        });

      }

      myFunc(event: Event){
        console.log("function called:" + (event.target as HTMLOptionElement).value);
      }

}


