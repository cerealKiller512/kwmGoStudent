import { Component, OnInit } from '@angular/core';
//import Pusher from 'pusher-js';
//import {any} from "pusher-js/types/src/core/utils/collections";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'bs-messages',
  templateUrl: './messages.component.html',
  styles: [
  ]
})
export class MessagesComponent implements OnInit {
  username = 'username';
  message = '';
  messages = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
/*    Pusher.logToConsole = true;

    const pusher = new Pusher('9c211fc75b12e10e1805', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', data =>{
      this.messages.push(data);
    });*/
  }

  submit():void{
    this.http.post('http://kwmgostudent.s1910456021.student.kwmhgb.at/api/messages',{
      username:this.username,
      message:this.message
    }).subscribe(()=> this.message = '');
  }

}
