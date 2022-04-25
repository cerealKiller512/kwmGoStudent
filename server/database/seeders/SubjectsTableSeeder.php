<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Database\Seeder;
use DateTime;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SubjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $subject = new \App\Models\Subject;
       $subject->title = "Programmierung in Java";
       $subject->description = "Einführung in Java, Objektorientierte Programmierung, Hilfe bei Hausübungen";
       $subject->icon = "fa-brands fa-java";


       $subject->user()->associate(\App\Models\User::find(1));
       $subject->category()->associate(\App\Models\Category::find(2));
       $subject->level()->associate(\App\Models\Level::find(2));

       $subject->save();

       //Anlegen von Appointments
        $appointment3 = new Appointment();
        $appointment3->day="Montag";
        $appointment3->from="04:00:00";
        $appointment3->to="06:00:00";

        $appointment4 = new Appointment();
        $appointment4->day="Mittwoch";
        $appointment4->from="09:00:00";
        $appointment4->to="12:00:00";

        $subject->appointments()->saveMany([$appointment3, $appointment4]);



        $subject1 = new \App\Models\Subject;
        $subject1->title = "Mathematik";
        $subject1->description = "Grundlagen der Mathematik für AHS Oberstufen";
        $subject1->icon = "fa-duotone fa-function";


        $subject1->user()->associate(User::find(1));
        $subject1->category()->associate(\App\Models\Category::find(2));
        $subject1->level()->associate(\App\Models\Level::find(2));

        $subject1->save();

        //Anlegen von Appointments
        $appointment3 = new Appointment();
        $appointment3->day="Dienstag";
        $appointment3->from="04:00:00";
        $appointment3->to="06:00:00";

        $appointment4 = new Appointment();
        $appointment4->day="Samstag";
        $appointment4->from="09:00:00";
        $appointment4->to="12:00:00";

        $subject1->appointments()->saveMany([$appointment3, $appointment4]);


        $subject2 = new \App\Models\Subject;
        $subject2->title = "Englisch";
        $subject2->description = "Englisch in Wort und Schrift - Prüfungs- oder Maturavorbereitungen";
        $subject2->icon = "fa-solid fa-earth-americas";


        $subject2->user()->associate(User::find(1));
        $subject2->category()->associate(\App\Models\Category::find(2));
        $subject2->level()->associate(\App\Models\Level::find(2));

        $subject2->save();

        //Anlegen von Appointments
        $appointment5 = new Appointment();
        $appointment5->day="Samstag";
        $appointment5->from="04:00:00";
        $appointment5->to="06:00:00";

        $appointment6 = new Appointment();
        $appointment6->day="Sonntag";
        $appointment6->from="09:00:00";
        $appointment6->to="12:00:00";

        $subject2->appointments()->saveMany([$appointment5, $appointment6]);


        $subject3 = new \App\Models\Subject;
        $subject3->title = "Einführung in Java";
        $subject3->description = "Grundwissen zur Programmierung mit Java für Prüfungsvorbereitung und Hausübungen";
        $subject3->icon = "fa-brands fa-java";
        $subject3->user()->associate(User::find(1));
        $subject3->category()->associate(\App\Models\Category::find(2));
        $subject3->level()->associate(\App\Models\Level::find(2));

        $subject3->save();

        //Anlegen von Appointments
        $appointment7 = new Appointment();
        $appointment7->day="Montag";
        $appointment7->from="04:00:00";
        $appointment7->to="06:00:00";

        $appointment8 = new Appointment();
        $appointment8->day="Mittwoch";
        $appointment8->from="09:00:00";
        $appointment8->to="12:00:00";

        $subject3->appointments()->saveMany([$appointment7, $appointment8]);


        $subject4 = new \App\Models\Subject;
        $subject4->title = "Wahrnehmungspsychologie";
        $subject4->description = "Prüfungsvorbereitung auf Hochschulniveau";
        $subject4->icon="fa-solid fa-book";
        $subject4->user()->associate(User::find(1));
        $subject4->category()->associate(\App\Models\Category::find(2));
        $subject4->level()->associate(\App\Models\Level::find(2));

        $subject4->save();

        //Anlegen von Appointments
        $appointment9 = new Appointment();
        $appointment9->day="Donnerstag";
        $appointment9->from="04:00:00";
        $appointment9->to="06:00:00";

        $appointment10 = new Appointment();
        $appointment10->day="Freitag";
        $appointment10->from="09:00:00";
        $appointment10->to="12:00:00";

        $subject4->appointments()->saveMany([$appointment9, $appointment10]);


        $subject5 = new \App\Models\Subject;
        $subject5->title = "Webentwicklung mit JavaScript";
        $subject5->description = "Grundlagen zu JavaScript; JQuery und AJAX; Prüfungsvorbereitung für Hochschulniveau";
        $subject5->icon = "fa-brands fa-js";
        $subject5->user()->associate(User::find(1));
        $subject5->category()->associate(\App\Models\Category::find(2));
        $subject5->level()->associate(\App\Models\Level::find(2));

        $subject5->save();

        //Anlegen von Appointments
        $appointment11 = new Appointment();
        $appointment11->day="Dienstag";
        $appointment11->from="04:00:00";
        $appointment11->to="06:00:00";

        $appointment12 = new Appointment();
        $appointment12->day="Mittwoch";
        $appointment12->from="09:00:00";
        $appointment12->to="12:00:00";

        $subject5->appointments()->saveMany([$appointment11, $appointment12]);


        $subject6 = new \App\Models\Subject;
        $subject6->title = "serverseitige Webentwicklung mit PHP";
        $subject6->description = "Grundlagen zu PHP, Praxisbeispiele und Hilfe bei Projekten sowie Prüfungsvorbereitung für Studierende";
        $subject6->icon = "fa-brands fa-php";
        $subject6->user()->associate(User::find(1));
        $subject6->category()->associate(\App\Models\Category::find(2));
        $subject6->level()->associate(\App\Models\Level::find(2));

        $subject6->save();

        //Anlegen von Appointments
        $appointment13 = new Appointment();
        $appointment13->day="Montag";
        $appointment13->from="04:00:00";
        $appointment13->to="06:00:00";

        $appointment14 = new Appointment();
        $appointment14->day="Freitag";
        $appointment14->from="09:00:00";
        $appointment14->to="12:00:00";

        $subject6->appointments()->saveMany([$appointment13, $appointment14]);


    }
}
