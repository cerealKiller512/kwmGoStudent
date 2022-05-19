import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators, FormControl
} from "@angular/forms";
import { SubjectFormErrorMessages } from "./subject-form-error-messages";
import { SubjectFactory } from "../components/subject-factory";
import { SubjectListService } from "../shared/subject-list.service";
import { Subject } from "../components/subject";
import { SubjectValidators } from "../shared/subject-validators";
import {Category} from "../components/category";
import {Level} from "../components/level";
import {AuthService} from "../shared/auth.service";
import {CategoryListService} from "../shared/category-list.service";
import {LevelListService} from "../shared/level-list.service";
@Component({
  selector: "bs-subject-form",
  templateUrl: "./subject-form.component.html",
  styles: []
})
export class SubjectFormComponent implements OnInit {
  subjectForm: FormGroup;
  subject = SubjectFactory.empty();

  errors: { [key: string]: string } = {};

  isUpdatingSubject = false;

  appointments: FormArray;

  categories: Category[] = [];
  levels: Level[] = [];

  constructor(
    private fb: FormBuilder,
    private bs: SubjectListService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private catService: CategoryListService,
    private levelService: LevelListService
  ) {
    this.subjectForm = this.fb.group({});
    this.appointments = this.fb.array([]);

  }
  ngOnInit():void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      //Update-Modus
      this.isUpdatingSubject = true;

      this.bs.getSingle(id).subscribe(subject => {
        this.subject = subject;
        console.log(subject)
        this.initSubjectForm();
      });
    }
    this.initSubjectForm();
  }


  initSubjectForm() {
    this.buildAppointmentsArray();
    this.subjectForm = this.fb.group({
      id: this.subject.id,
      title: [this.subject.title, Validators.required],
      description: this.subject.description,
      published: [this.subject.published, Validators.required],
      appointments: this.appointments,
      categoryId: this.subject.category_id,
      levelId: this.subject.level_id,
    });
    this.subjectForm.statusChanges.subscribe(() => {
      this.updateErrorMessages()
    });

    this.levelService.getAll().subscribe(levels => {
      console.log("level...", levels)
      this.levels = levels;
      this.subjectForm.controls['levelId'].setValue(this.levels[0].id);
    })
    this.catService.getAll().subscribe(categories => {
      console.log("categories...", categories)
      this.categories = categories;
      this.subjectForm.controls['categoryId'].setValue(this.categories[0].id);
    })
  }

  buildAppointmentsArray(){
    if(this.subject.appointments){
      this.appointments = this.fb.array([]);
      for(let app of this.subject.appointments){
        let fg = this.fb.group(
          {
            id: new FormControl(app.id),
            day: new FormControl(app.day, [Validators.required]),
            from: new FormControl(app.from, [Validators.required]),
            to: new FormControl(app.to, [Validators.required])
          }
        );
        this.appointments.push(fg);
      }
    }
  }

  addAppointmentControl(){
    this.appointments.push(this.fb.group({id:0, day:null,
    from:null, to:null}))
  }


  submitForm() {
    console.log("submit form")
    const currUserId: number = this.authService.getCurrentUserId();
    const subject: Subject = SubjectFactory.fromObject(this.subjectForm.value, currUserId);
    subject.appointments = this.subject.appointments;
    console.log("formValue: ", this.subjectForm.value);
    console.log("subject", subject);

    if (this.isUpdatingSubject) {
      this.bs.update(subject).subscribe(res => {
        this.router.navigate(["../../subjects", subject.id], {
          relativeTo: this.route});
      })
    } else {
      console.log(subject);
      this.bs.create(subject, currUserId).subscribe(res => {
        this.subject = SubjectFactory.empty();
        this.subjectForm.reset(subject);
        this.router.navigate(["../subjects"], { relativeTo: this.route
        });
      });
    }
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of SubjectFormErrorMessages) {
      const control = this.subjectForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}

