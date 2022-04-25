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
        //test users
        $user = new \App\Models\User;
        $user->firstName= 'Lisa';
        $user->lastName='Moser';
        $user->email='test@gmail.com';
        $user->password=bcrypt('secret');
        $user->phone= '124567890';
        $user->image_url="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60";

        $user->save();


        $user1 = new \App\Models\User;
        $user1->firstName= 'Julia';
        $user1->lastName='Bauer';
        $user1->email='julia-bauer@gmail.com';
        $user1->password=bcrypt('juliaPasswort');
        $user1->phone= '124567890';

        $user1->save();


        $user2 = new \App\Models\User;
        $user2->firstName= 'Frederik';
        $user2->lastName='Forst';
        $user2->email='frederik-forst@gmail.com';
        $user2->password=bcrypt('frederikPasswort');
        $user2->phone= '124567890';

        $user2->save();
    }

}
