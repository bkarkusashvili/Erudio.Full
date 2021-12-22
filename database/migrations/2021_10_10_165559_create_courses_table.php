<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name_ka');
            $table->string('name_en')->nullable();
            $table->string('address_ka')->nullable();
            $table->string('address_en')->nullable();
            $table->integer('price');
            $table->text('goal_ka');
            $table->text('goal_en')->nullable();
            $table->text('methodology_ka');
            $table->text('methodology_en')->nullable();
            $table->text('for_ka');
            $table->text('for_en')->nullable();
            $table->string('phone')->nullable();
            $table->string('image')->nullable();

            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('city_id');
            $table->unsignedBigInteger('instructor_id');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('city_id')->references('id')->on('cities');
            $table->foreign('instructor_id')->references('id')->on('instructors');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
