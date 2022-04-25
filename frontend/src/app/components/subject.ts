import {User} from "./user";
import {Appointment} from "./appointment";
export {User} from "./user";

export class Subject {
  constructor(
    public id:number,
    public title:string,
    public user:User,
    public appointments: Appointment[],
    public published: Date,
    public user_id: number,
    public price: number,
    public category_id:number,
    public level_id:number,
    public description?:string,
    public icon?:string

  ) {

  }

}
