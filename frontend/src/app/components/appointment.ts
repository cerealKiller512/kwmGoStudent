import {Time} from "@angular/common";

export class Appointment{
  constructor(public id:number,
              public day:string,
              public from:Time,
              public to:Time,
              public subject_id:number,
              public student_id:number,
              public booked:boolean
  ){
  }
}
