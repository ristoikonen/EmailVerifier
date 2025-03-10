import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core'; 
import {  NotFoundError, Observable, throwError } from 'rxjs';
import { interval } from 'rxjs';
import {elementAt, map} from 'rxjs/operators';
import { NutdataService } from './nutdata.service';
import { UserInformation } from './models/user-information';
import { Useri } from './models/useri';
import { UseriData } from './models/useri-data'; 
import { IAlbum, Album,IMessage, IMessagesResult,IMessages, IMessageItem } from "./models/album";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import {EverifyComponent} from './everify/everify.component';

@Component({
  selector: 'app-root',
  providers: [EverifyComponent],
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Verify Email';
  etitle = '';
  emailhash = '';
  useries = [];
  userdata$: Array<UseriData> = [];
  udata: UseriData[] = [];
  arrx: UseriData[] = [];
  ud: UseriData[] = [];
  albums: IAlbum[] = [];
  album:  Album | undefined;
  message:  IMessagesResult | undefined;
  messages:  IMessages<IMessagesResult> | undefined;
  message_collection: IMessagesResult[] = [];
  message_totalitems: number = 0;
  
  @ViewChild('emailInput', { static: true }) emailInput!: ElementRef;

  users = new Array<any>();
  readonly uurl = 'https://reqres.in/api/users?page=1';

  constructor(private http: HttpClient,
    private nutdataService: NutdataService, 
    public everify: EverifyComponent,
    //private dataService: DataserviceService,
    ) { 

      this.etitle = everify.title
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

/*     observableRef = interval(2*60*1000)
      .subscribe(() => {
        this.getMessageById();
      });
 */
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
            this.albums = data;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }

      getAlbumById(id: number) {
        this.nutdataService.getAlbumById(id).subscribe( data => {
            this.album = data as IAlbum ?? null;
           //console.log("getAlbumById:" + this.album);
          }, 
          (err) => {
            console.log("ER" + err);
            console.log("ER" + err.status);
            this.album = err.status == 404 ? undefined : new Album;
            //console.log("this.album " + this.album );
          }
        );
      }



      getAlbums() {
        this.nutdataService.getAlbums().subscribe(data=>{
            this.albums = data as IAlbum[];
            console.log("all" + this.albums);
          }
          , err=>{
            console.log("eerr" + err);
          }
        );
      }

      getUsers(){

        this.http.get<any>(this.uurl).subscribe(response => {
          this.users = response.data;
          console.log(this.users);
        });

      }

    generateHashOfSix(str: string): number {
        var h: number = 0;
        for (var i = 0; i < str.length; i++) {
            h = 131 * h + str.charCodeAt(i);
        }
        console.log("gh:" + (h%100000));

        this.emailhash = (h%100000).toString();
        //this.setIntervalAndTimeout();
        
        return h%100000;
    }

      getMessageById() {
        this.nutdataService.getMessageById().subscribe( {
          
          next: (data) => {
            this.message = data;
            console.log("data:" + (data).subject);
            console.log("messages:" + this.message.subject);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }

      
      getMessages() {

        let emailIn: string = '';
        
        this.nutdataService.getMessages().subscribe( {
          
          next: (data) => {
            this.messages = data;
            this.message_collection = (data['hydra:member'] as IMessagesResult[]);
            this.message_totalitems = this.messages['hydra:totalItems'];
          /*
            this.message_collection.forEach((result: IMessagesResult) =>{
              console.log("result.intro:" + result.from.address);
              let emailaddress= result.from.address;
              //console.log(emailaddress);

              //const modalElement = this.name.nativeElement;
              //emailIn = document.getElementById('emailInput')?.nodeValue ?? '';
              //console.log(emailIn);
              
            });
            */
           //TODO: add break when match found!
            for (let result of this.message_collection) 
            {

              console.log("FOR result.intro:" + result.from.address);
              let emailaddress= result.from.address;
              console.log(emailaddress);
              //if (match) break;
              
              //const modalElement = this.name.nativeElement;
              //emailIn = document.getElementById('emailInput')?.nodeValue ?? '';
              //console.log(emailIn);
              
            };

            emailIn = this.emailInput.nativeElement.value;
            //console.log(emailIn);

            console.log("data:" + ( (data['hydra:member'] as IMessagesResult[]) )[0].subject);
            console.log("messages:" + this.message_totalitems);
            console.log("message_collection:" + this.message_collection[0].intro);
            console.log("message_collection:" + this.message_collection[0].from.address);

            let hashMsg = this.generateHashOfSix(this.message_collection[0].from.address);
            console.log("hash:" + hashMsg.toString());
            console.log("everify:" + this.everify.title);
            console.log("emailIn:" + emailIn);
            let hashInput = this.generateHashOfSix(emailIn);
            //console.log("emailInput:" + this.emailInput.nativeElement.value);
            console.log(hashMsg === hashInput ? "Match" : "No Match");

            this.emailhash = (hashMsg === hashInput ? "Match" : "No Match");

            
          },
          error: (err) => {
            console.log(err);
          }
        })
      }

      setIntervalAndTimeout() {
        
        // repeat with the interval of 2 seconds
        let timerId = setInterval(() => {this.getMessageById()}, 2000);

        // after 5 seconds stop
        setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
      }


      myFunc(event: Event){
        
        
        console.log("messages:" + this.getMessages());
        console.log("message by id:" + this.getMessageById());

        console.log("function called:" + (event.target as HTMLOptionElement).value);
        let selected_value = (event.target as HTMLOptionElement).value;
        switch (selected_value) {
          case "ACT":
            console.log("ACT:" + selected_value);
            this.getAlbumById(1);
            break;
          case "NSW":
            console.log("NSW:" + selected_value);
            this.getAlbumById(12345);
            break;
          case "QLD":
            console.log("QLD:" + selected_value);
            this.getAlbumById(2);
            break;
        }
      }

}


