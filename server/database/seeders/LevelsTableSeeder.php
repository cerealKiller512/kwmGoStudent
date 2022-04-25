<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LevelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $level1 = new \App\Models\Level;
        $level1->level = "Volksschule";

        $level1->save();

        $level2 = new \App\Models\Level;
        $level2->level = "Neue Mittelstufe";

        $level2->save();

        $level3 = new \App\Models\Level;
        $level3->level = "Gymnasium Unterstufe";

        $level3->save();

        $level4 = new \App\Models\Level;
        $level4->level = "Gymnasium Oberstufe";

        $level4->save();


    }
}
