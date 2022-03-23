<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category1 = new \App\Models\Category;
        $category1->name = "Mathematik";

        $category1->save();

        $category2 = new \App\Models\Category;
        $category2->name = "Englisch";

        $category2->save();

        $category3 = new \App\Models\Category;
        $category3->name = "Informatik";

        $category3->save();

        $category4 = new \App\Models\Category;
        $category4->name = "Deutsch";

        $category4->save();


    }
}
