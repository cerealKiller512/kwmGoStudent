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
        $student1->phone = "+43 664 123456";
        $student1->save();

        $student2 = new \App\Models\Student;
        $student2->firstName = "Susi";
        $student2->lastName = "Musterfrau";
        $student2->email = "susi.musterfrau@gmx.at";
        $student2->phone = "+43 699 12345590";
        $student2->save();

        $student3 = new \App\Models\Student;
        $student3->firstName = "Herbert";
        $student3->lastName = "Maier";
        $student3->email = "herbert.maier@gmx.at";
        $student3->phone = "+43 650 1245823049";
        $student3->save();


       // $student1->subjects()->saveMany([Subject::find(1), Subject::find(2)]);
        $student1->save();



        //$student2->subjects()->saveMany([Subject::find(3), Subject::find(5)]);
        $student2->save();



       // $student3->subjects()->saveMany([$subject5, $subject6]);
        $student3->save();
    }


}
