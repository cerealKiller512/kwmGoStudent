<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(LevelsTableSeeder::class);
        $this->call(SubjectsTableSeeder::class);
        $this->call(StudentsTableSeeder::class);
        $this->call(AppointmentsTableSeeder::class);
        $this->call(MessagesTableSeeder::class);

    }
}
