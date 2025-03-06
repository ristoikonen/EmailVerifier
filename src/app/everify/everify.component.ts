import { Component } from '@angular/core';
import { NutdataService } from '../nutdata.service';
import { IMessages, IMessagesResult } from '../models/album';
// ME: import {EverifyComponent} from './everify.component';


@Component({
  selector: 'app-everify',
  imports: [],
  templateUrl: './everify.component.html',
  styleUrl: './everify.component.css',
})

export class EverifyComponent {
    title = '';
    message:  IMessagesResult | undefined;
    messages:  IMessages<IMessagesResult> | undefined;
    message_collection: IMessagesResult[] = [];
    message_totalitems: number = 0;

    constructor(
      private nutdataService: NutdataService, 
    )
    {
      this.title = 'Verify the  Email';
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

  setIntervalAndTimeout() {
        
    // repeat with the interval of 2 seconds
    let timerId = setInterval(() => {this.getMessageById()}, 2000);

    // after 5 seconds stop
    setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
  }

}
