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
        $user = new \App\Models\User;
        $user->firstName= 'Donald';
        $user->lastName='Duck';
        $user->email='test@gmail.com';
        $user->password=bcrypt('secret');
        $user->phone= '124567890';
        $user->image_url="https://jf-staeulalia.pt/img/other/52/collection-donald-duck-png-transparent-images.png";
        $user->education="Bachelor Kommunikation Wissen Medien FH Hagenberg";
        $user->description="Hallo, ich bin Donald und gebe bereits seit 4 Jahren Nachhilfe! Du kannst dich
        bei mir für Prüfungsvorbereitungen oder auch für Hilfe bei Hausübungen melden! ";

        $user->save();


        $user1 = new \App\Models\User;
        $user1->firstName= 'Mickey';
        $user1->lastName='Mouse';
        $user1->email='julia-bauer@gmail.com';
        $user1->password=bcrypt('juliaPasswort');
        $user1->phone= '124567890';
        $user1->image_url="https://toppng.com/uploads/preview/mickey-mouse-11530968610bkjpvgdnv6.png";
        $user1->education="Bachelor Kommunikation Wissen Medien FH Hagenberg";
        $user1->description="Hallo, ich bin Mickey und gebe bereits seit 4 Jahren Nachhilfe! Du kannst dich
        bei mir für Prüfungsvorbereitungen oder auch für Hilfe bei Hausübungen melden! ";

        $user1->save();


        $user2 = new \App\Models\User;
        $user2->firstName= 'Goofy';
        $user2->lastName='Goof';
        $user2->email='frederik-forst@gmail.com';
        $user2->password=bcrypt('frederikPasswort');
        $user2->phone= '124567890';
        $user2->image_url="https://pngimg.com/uploads/goofy/goofy_PNG6.png";
        $user2->education="Bachelor Kommunikation Wissen Medien FH Hagenberg";
        $user2->description="Hallo, ich bin Frederik oder auch Freddy und gebe bereits seit 4 Jahren Nachhilfe! Du kannst dich
        bei mir für Prüfungsvorbereitungen oder auch für Hilfe bei Hausübungen melden! ";

        $user2->save();
    }

}
