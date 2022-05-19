<?php

namespace Database\Seeders;

use App\Http\Controllers\SubjectController;
use App\Models\Appointment;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class AppointmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $appointment7 = new Appointment();
        $appointment7->day="Montag";
        $appointment7->from="04:00:00";
        $appointment7->to="06:00:00";
        $appointment7->booked = false;
        $appointment7->completed = false;


        $appointment7->subject()->associate(Subject::find(0));

        $appointment8 = new Appointment();
        $appointment8->day="Mittwoch";
        $appointment8->from="09:00:00";
        $appointment8->to="12:00:00";
        $appointment8->booked = false;
        $appointment8->completed = false;

        $appointment8->subject()->associate(Subject::find(0));

        $appointment = new \App\Models\Appointment;
        $appointment->day = "Montag";
        $appointment->from = \Carbon\Carbon::createFromFormat('H:i:s','16:00:00')->format('h:i');
        $appointment->to=\Carbon\Carbon::createFromFormat('H:i:s','18:00:00')->format('h:i');
        $appointment->booked = false;
        $appointment->completed = false;


        $appointment->subject()->associate(\App\Models\Subject::find(1));

        $appointment->save();

        $appointment1 = new \App\Models\Appointment;
        $appointment1->day = "Dienstag";
        $appointment1->from = \Carbon\Carbon::createFromFormat('H:i:s','16:00:00')->format('h:i');
        $appointment1->to=\Carbon\Carbon::createFromFormat('H:i:s','18:00:00')->format('h:i');
        $appointment1->booked = true;
        $appointment1->completed = false;
        $appointment1->student()->associate(Student::find(3));
        $appointment1->subject()->associate(\App\Models\Subject::find(2));

        $appointment1->save();

        $appointment2 = new \App\Models\Appointment;
        $appointment2->day = "Mittwoch";
        $appointment2->from = \Carbon\Carbon::createFromFormat('H:i:s','16:00:00')->format('h:i');
        $appointment2->to=\Carbon\Carbon::createFromFormat('H:i:s','18:00:00')->format('h:i');
        $appointment2->booked = true;
        $appointment2->completed = true;
        $appointment2->student()->associate(Student::find(2));
        $appointment2->subject()->associate(\App\Models\Subject::find(1));

        $appointment2->save();
    }
}
