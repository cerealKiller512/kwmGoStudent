<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->id()->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('rating')->default('1');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->nullable()->constrained();
            $table->foreignId('category_id')->onDelete('cascade');
            $table->foreignId('level_id')->onDelete('cascade');
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
        Schema::dropIfExists('subjects');
    }
}
