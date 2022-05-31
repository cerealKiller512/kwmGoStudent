import { Component, OnInit } from '@angular/core';
import {User} from "./user";


export class ProfileFactory {

  static empty(): User {
    return new User(0, '', '', '', '', '',[], '', '' );

  }

  static fromObject(rawUser: any):User{
    return new User(
      rawUser.id,
      rawUser.firstName,
      rawUser.lastName,
      rawUser.email,
      rawUser.phone,
      rawUser.image_url,
      rawUser.appointments,
      rawUser.education,
      rawUser.description
    );
  }

}
