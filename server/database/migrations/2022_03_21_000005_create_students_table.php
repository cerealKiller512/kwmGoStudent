<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email');
            $table->text('information')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('password');
            $table->string('image_url')->nullable()->default('https://images.unsplash.com/photo-1565300667498-2843c56b4603?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z3JleXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
