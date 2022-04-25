import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators, FormControl
} from "@angular/forms";
import { SubjectFormErrorMessage } from "./subject-form-error-messages";
import { SubjectFactory } from "../components/subject-factory";
import { SubjectListService } from "../shared/subject-list.service";
import { Subject } from "../components/subject";
import { SubjectValidators } from "../shared/subject-validators";
@Component({
  selector: "bs-subject-form",
  templateUrl: "./subject-form.component.html"
})
export class SubjectFormComponent implements OnInit {
  subjectForm: FormGroup;
  subject = SubjectFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingSubject = false;

  constructor(
    private fb: FormBuilder,
    private bs: SubjectListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingSubject = true;
      this.bs.getSingle(id).subscribe(subject => {
        this.subject = subject;
        this.initSubject();
      });
    }
    this.initSubject();
  }
  initSubject() {

    this.subjectForm = this.fb.group({
      id: this.subject.id,
      title: [this.subject.title, Validators.required],
      description: this.subject.description,
      published: this.subject.published
    });
    this.subjectForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());

  }


  submitForm() {
    const subject: Subject = SubjectFactory.fromObject(this.subjectForm.value);
//deep copy - did not work without??

    console.log(subject);
//just copy the authors
    subject.user = this.subject.user;
    if (this.isUpdatingSubject) {
      this.bs.update(subject).subscribe(res => {
        this.router.navigate(["../../subjects", subject.id], {
          relativeTo: this.route
        });
      });
    } else {
      subject.user_id = 1; // jsut for testing
      console.log(subject);

      this.bs.create(subject).subscribe(res => {
        this.subject = SubjectFactory.empty();
        this.subjectForm.reset(SubjectFactory.empty());
        this.router.navigate(["../subjects"], { relativeTo: this.route
        });
      });
    }
  }
  updateErrorMessages() {
    console.log("Is invalid? " + this.subjectForm.invalid);
    this.errors = {};
    for (const message of SubjectFormErrorMessage) {
      const control = this.subjectForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}

