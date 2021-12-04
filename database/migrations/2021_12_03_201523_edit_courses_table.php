<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EditCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->boolean('popular_training')->default(false)->after('image');
            $table->boolean('popular_course')->default(false)->after('popular_training');
            $table->boolean('popular_masterclass')->default(false)->after('popular_course');

            $table->text('text_ka')->nullable()->after('popular_course');
            $table->text('text_en')->nullable()->after('text_ka');
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
            $table->dropColumn('popular_training');
            $table->dropColumn('popular_course');
            $table->dropColumn('popular_masterclass');
            $table->dropColumn('text_ka');
            $table->dropColumn('text_en');
        });
    }
}
