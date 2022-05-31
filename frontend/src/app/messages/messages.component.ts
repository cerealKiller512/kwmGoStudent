import { Component, OnInit } from '@angular/core';
//import Pusher from 'pusher-js';
//import {any} from "pusher-js/types/src/core/utils/collections";
import {HttpClient} from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bs-messages',
  templateUrl: './messages.component.html',
  styles: [
  ]
})
export class MessagesComponent implements OnInit {
  messages = [];
  messageForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder,) {
    this.messageForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      receiver: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  submit():void{
    this.http.post('http://kwmgostudent.s1910456021.student.kwmhgb.at/api/messages',{
      username:this.messageForm.value.receiver,
      message:this.messageForm.value.message
    }).subscribe(res => {
      this.messageForm.reset();
    });
  }

}
