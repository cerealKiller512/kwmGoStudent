import {Subject, User} from "./subject";
import {Appointment} from "./appointment";


export class SubjectFactory {
  static empty():Subject{
    return new Subject(0, '' , new User(0, '', '', '', '', ''),
     [],
      new Date(), 0, 0, 0, 0, '', '');
  }

  static fromObject(rawSubject: any, userId: number):Subject{
    //cast from JSON Object via REST to Book Domain Object
    return new Subject(
      rawSubject.id,
      rawSubject.title,
      rawSubject.user,
      rawSubject.appointments,
      rawSubject.published,
      userId,
      rawSubject.price,
      rawSubject.categoryId,
      rawSubject.levelId,
      rawSubject.description,
      rawSubject.icon
    );
  }
}
