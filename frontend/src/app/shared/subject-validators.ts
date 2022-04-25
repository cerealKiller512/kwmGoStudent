import { Observable } from 'rxjs';
import { FormControl, FormArray } from '@angular/forms';
import {SubjectListService} from "./subject-list.service";
import {map} from 'rxjs/operators';
export class SubjectValidators {

  static idExists(bs : SubjectListService) {
    return function(control: FormControl): Observable<{[error: string]: any}> {
      return bs.check(control.value)
        .pipe(map(exists => !exists ? null : {idExists: {valid: false}}));
    }
  }
}
