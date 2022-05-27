<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $message = new \App\Models\Message();
        $message->text = "Kommentar Test Text";


        $message->user()->associate(\App\Models\User::find(1));

        $message->student()->associate(Student::find(1));

        $message->save();

        $message1 = new \App\Models\Message();
        $message1->text = "Zweiter Kommentar Test Text";


        $message1->user()->associate(\App\Models\User::find(2));

        $message1->student()->associate(Student::find(1));

        $message1->save();

        $message2 = new \App\Models\Message();
        $message2->text = "Dritter Kommentar Test Text";


        $message2->user()->associate(\App\Models\User::find(1));

        $message2->student()->associate(Student::find(2));

        $message2->save();
    }
}
