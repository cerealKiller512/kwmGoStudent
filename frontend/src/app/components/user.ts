import {Appointment} from "./appointment";

export class User{
  constructor(public id:number,
              public firstName:string,
              public lastName:string,
              public email:string,
              public phone?:string,
              public image_url?:string,
              public appointments?: Appointment[],
              public education?:string,
              public description?:string
              ) {
  }
}
