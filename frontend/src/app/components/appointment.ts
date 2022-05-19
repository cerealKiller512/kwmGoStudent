import {Time} from "@angular/common";
import {Student} from "./student";
import {User} from "./user";
import {Subject} from "./subject";

export class Appointment{
  constructor(public id:number,
              public day:string,
              public from:Time,
              public to:Time,
              public subject_id:number,
              public student_id:number,
              public booked:boolean,
              public completed: boolean,
              public status: string,
              public student:Student = null,
              public subject:Subject = null,
              public user:User = null,

  ){
  }
}
