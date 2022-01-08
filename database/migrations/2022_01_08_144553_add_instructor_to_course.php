<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInstructorToCourse extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->boolean('status')->default(true)->after('popular_masterclass');
            $table->unsignedBigInteger('instructor_two_id')->nullable()->after('instructor_id');

            $table->foreign('instructor_two_id')->references('id')->on('instructors');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('instructor_two_id');

            $table->dropForeign('instructor_two_id');
        });
    }
}
