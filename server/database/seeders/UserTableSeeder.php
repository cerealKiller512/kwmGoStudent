<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //test user
        $user = new \App\Models\User;
        $user->firstName= 'Lisa';
        $user->lastName='Moser';
        $user->email='test@gmail.com';
        $user->password=bcrypt('secret');
        $user->phone= '124567890';

        $user->save();


    }

}
