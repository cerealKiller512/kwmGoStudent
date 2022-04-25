<?php

namespace Database\Seeders;

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
        $appointment = new \App\Models\Appointment;
        $appointment->day = "Montag";
        $appointment->from = \Carbon\Carbon::createFromFormat('H:i:s','16:00:00')->format('h:i');
        $appointment->to=\Carbon\Carbon::createFromFormat('H:i:s','18:00:00')->format('h:i');



        $appointment->subject()->associate(\App\Models\Subject::find(1));

        $appointment->save();

        $appointment1 = new \App\Models\Appointment;
        $appointment1->day = "Dienstag";
        $appointment1->from = \Carbon\Carbon::createFromFormat('H:i:s','16:00:00')->format('h:i');
        $appointment1->to=\Carbon\Carbon::createFromFormat('H:i:s','18:00:00')->format('h:i');


        $appointment1->subject()->associate(\App\Models\Subject::find(2));

        $appointment1->save();

        $appointment2 = new \App\Models\Appointment;
        $appointment2->day = "Mittwoch";
        $appointment2->from = \Carbon\Carbon::createFromFormat('H:i:s','16:00:00')->format('h:i');
        $appointment2->to=\Carbon\Carbon::createFromFormat('H:i:s','18:00:00')->format('h:i');

        $appointment2->subject()->associate(\App\Models\Subject::find(1));

        $appointment2->save();




    }
}
