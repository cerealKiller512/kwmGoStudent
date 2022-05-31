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
  isEditMode = false;

  errors: { [key: string]: string } = {};
  subjectForm: FormGroup;
  appointments: FormArray;
  subject = SubjectFactory.empty();

  categories: Category[] = [];
  levels: Level[] = [];

  constructor(
    private fb: FormBuilder,
    private subjectListService: SubjectListService,
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

    if (id) { // Edit Mode
      this.isEditMode = true;

      this.subjectListService.getSingle(id).subscribe(subject => {
        this.subject = subject;
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
      price: [this.subject.price, [Validators.required, Validators.min(0)]],
      appointments: this.appointments,
      categoryId: [this.subject.category_id, Validators.required],
      levelId: [this.subject.level_id, Validators.required],
    });

    this.subjectForm.statusChanges.subscribe(() => {
      this.updateErrorMessages()
    });

    this.levelService.getAll().subscribe(levels => {
      this.levels = levels;
      this.subjectForm.controls['levelId'].setValue(this.levels[0].id);
    })
    this.catService.getAll().subscribe(categories => {
      this.categories = categories;
      this.subjectForm.controls['categoryId'].setValue(this.categories[0].id);
    })
  }

  buildAppointmentsArray(){
    if(this.subject.appointments.length > 0){
      this.appointments = this.fb.array([], [Validators.required, Validators.minLength(1)]);
      for(let app of this.subject.appointments){
        let fg = this.fb.group(
          {
            id: app.id,
            day: [app.day, Validators.required],
            from: [app.from, Validators.required],
            to: [app.to, Validators.required],
          }
        );
        this.appointments.push(fg);
      }
    }
  }

  addAppointmentControl(){
    this.appointments.push(this.fb.group(
      {
        id: null,
        day: 'Montag',
        from: null,
        to: null,
    }));

  }


  submitForm() {
    const appointments = this.subjectForm.value.appointments.filter(
      (day:{day:string})=>day.day
    )
    const currUserId = this.authService.getCurrentUserId();
    const subject = SubjectFactory.fromObject(this.subjectForm.value, currUserId);
    subject.appointments = appointments;

    if (this.isEditMode) {
      this.subjectListService.update(subject).subscribe(res => {
        this.router.navigate(["../../subjects", subject.id], {
          relativeTo: this.route});
      })
    } else {
      subject.user_id = currUserId;
      this.subjectListService.create(subject, currUserId).subscribe(res => {
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

