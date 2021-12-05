<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDaysToCourses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->smallInteger('days')->default(0)->after('text_en');
            $table->smallInteger('type')->default(0)->after('days');
            $table->string('url')->nullable()->after('type');

            $table->string('video')->nullable()->after('phone');
            $table->string('file')->nullable()->after('video');
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
            $table->dropColumn('days');
            $table->dropColumn('type');
            $table->dropColumn('url');
            $table->dropColumn('file');
            $table->dropColumn('video');
        });
    }
}
