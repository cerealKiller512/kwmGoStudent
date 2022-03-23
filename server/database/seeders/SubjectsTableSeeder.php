<?php

namespace Database\Seeders;

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
       $subject->rating = 9;
       $subject->description = "Einführung in Java, Objektorientierte Programmierung, Hilfe bei Hausübungen";

       $subject->user()->associate(\App\Models\User::find(1));
       $subject->category()->associate(\App\Models\Category::find(2));
       $subject->level()->associate(\App\Models\Level::find(2));

       $subject->save();

       //add images to subject
        $image1 = new \App\Models\Image;
        $image1->title = "Cover1";
        $image1->url = "http://crops.giga.de/37/c9/c9/2694d63efadfee7f3f9b8a3656_YyAxMTI4eDU4OSszNisxOQJyZSAxMjAwIDYyNwMzOTI0M2FlZjlhNQ==.jpg";

        $subject->images()->saveMany([$image1]);

        // $students = \App\Models\Author:all()->pluck("id");
        // $subject->students()->sync($students);
        $subject->save();


        $subject1 = new \App\Models\Subject;
        $subject1->title = "Mathematik";
        $subject1->description = "Grundlagen der Mathematik für AHS Oberstufen";


        $subject1->user()->associate(User::find(1));
        $subject1->category()->associate(\App\Models\Category::find(2));
        $subject1->level()->associate(\App\Models\Level::find(2));

        $subject1->save();

        $subject2 = new \App\Models\Subject;
        $subject2->title = "Englisch";
        $subject2->description = "Englisch in Wort und Schrift - Prüfungs- oder Maturavorbereitungen";
        $subject2->user()->associate(User::find(1));
        $subject2->category()->associate(\App\Models\Category::find(2));
        $subject2->level()->associate(\App\Models\Level::find(2));

        $subject2->save();

        $subject3 = new \App\Models\Subject;
        $subject3->title = "Einführung in Java";
        $subject3->description = "Grundwissen zur Programmierung mit Java für Prüfungsvorbereitung und Hausübungen";
        $subject3->user()->associate(User::find(1));
        $subject3->category()->associate(\App\Models\Category::find(2));
        $subject3->level()->associate(\App\Models\Level::find(2));

        $subject3->save();

        $subject4 = new \App\Models\Subject;
        $subject4->title = "Wahrnehmungspsychologie";
        $subject4->description = "Prüfungsvorbereitung auf Hochschulniveau";
        $subject4->user()->associate(User::find(1));
        $subject4->category()->associate(\App\Models\Category::find(2));
        $subject4->level()->associate(\App\Models\Level::find(2));

        $subject4->save();

        $subject5 = new \App\Models\Subject;
        $subject5->title = "Webentwicklung mit JavaScript";
        $subject5->description = "Grundlagen zu JavaScript; JQuery und AJAX; Prüfungsvorbereitung für Hochschulniveau";
        $subject5->user()->associate(User::find(1));
        $subject5->category()->associate(\App\Models\Category::find(2));
        $subject5->level()->associate(\App\Models\Level::find(2));

        $subject5->save();

        $subject6 = new \App\Models\Subject;
        $subject6->title = "serverseitige Webentwicklung mit PHP";
        $subject6->description = "Grundlagen zu PHP, Praxisbeispiele und Hilfe bei Projekten sowie Prüfungsvorbereitung für Studierende";
        $subject6->user()->associate(User::find(1));
        $subject6->category()->associate(\App\Models\Category::find(2));
        $subject6->level()->associate(\App\Models\Level::find(2));

        $subject6->save();

    }
}
