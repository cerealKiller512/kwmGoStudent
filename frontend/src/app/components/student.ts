
export class Student{
  constructor(public id:number,
              public firstName:string,
              public lastName:string,
              public email:string,
              public image_url?:string,
              public address?:string,
              public phone?:string,
              public information?:string
  ){
  }
}
