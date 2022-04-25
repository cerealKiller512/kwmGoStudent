<?php

namespace Database\Seeders;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Seeder;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $student1 = new \App\Models\Student;
        $student1->firstName = "Max";
        $student1->lastName = "Mustermann";
        $student1->email = "max.mustermann@gmx.at";
        $student1->information="Hallo, ich bin auf der Suche nach einem Nachhilfe-Lehrer für Mathematik!";
        $student1->phone = "+43 664 123456";
        $student1->address="Beispielweg 1, 4020 Linz, Oberösterreich";
        $student1->password=bcrypt('maxPasswort');
        $student1->image_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Z3JleSUyMGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60";

        $student1->save();


        $student2 = new \App\Models\Student;
        $student2->firstName = "Susi";
        $student2->lastName = "Musterfrau";
        $student2->email = "susi.musterfrau@gmx.at";
        $student2->information="Hallo, ich bin auf der Suche nach einem Nachhilfe-Lehrer für Java!";
        $student2->phone = "+43 664 123456";
        $student2->address="Beispielweg 13, 4030 Linz, Oberösterreich";
        $student2->password=bcrypt('susiPasswort');
        $student2->image_url="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGdyZXklMjBhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60";

        $student2->save();


        $student3 = new \App\Models\Student;
        $student3->firstName = "Sebastian";
        $student3->lastName = "Ecker";
        $student3->email = "sebastian.ecker@gmx.at";
        $student3->information="Servus und Grüß Gott, ich würd mich sehr über Nachhilfe zu Angular für meine bevorstehende Prüfung freuen!";
        $student3->phone = "+43 664 123456";
        $student3->address="Beispielweg 23, 4040 Linz, Oberösterreich";
        $student3->password=bcrypt('sebastianPasswort');
        $student3->image_url="";
        $student2->save();


       // $student1->subjects()->saveMany([Subject::find(1), Subject::find(2)]);
        $student1->save();



        //$student2->subjects()->saveMany([Subject::find(3), Subject::find(5)]);
        $student2->save();



       // $student3->subjects()->saveMany([$subject5, $subject6]);
        $student3->save();
    }


}
